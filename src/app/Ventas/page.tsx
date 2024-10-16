"use client";
import { Invoice, Product } from "@/types/VentasTypes";
import React, { useEffect, useState } from "react";
import { MdDelete, MdPersonAdd } from "react-icons/md";
import { mockProducts } from "../Productos/page";
import { IProduct } from "@/types/basicTypes";
import { toastError } from "@/libs/Sonner";

export default function GeneradorFactura() {
  const [products, setProducts] = useState<IProduct[]>(mockProducts);
  const [clients, setClients] = useState<{ name: string; id: number }[]>();
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      products: [
        {
          id: 1,
          name: "",
          codeBar: "",
          price: 0,
          stock: 1,
          discount: 0,
        },
      ],
      clientSearch: "",
      invoiceNumber: 1,
      clientType: "consumidor-final",
      generalDiscount: 0,
      paymentMethod: "",
    },
  ]);
  const [currentInvoiceId, setCurrentInvoiceId] = useState(1);

  const currentInvoice =
    invoices.find((inv) => inv.id === currentInvoiceId) || invoices[0];

  const updateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === currentInvoiceId ? updatedInvoice : inv
      )
    );
  };

  // 1. Búsqueda de Cliente
  const handleClientSearch = (searchTerm: string) => {
    const client = clients?.find((client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (client) {
      updateInvoice({ ...currentInvoice, clientSearch: client.name });
    } else {
      toastError("Cliente no encontrado");
    }
  };

  // 2. Validar código de barras
  const handleProductSearch = (codeBar: string) => {
    const product = products.find((prod) => prod.codeBar === codeBar);
    if (product) {
      const updatedInvoice = {
        ...currentInvoice,
        products: [
          ...currentInvoice.products,
          { ...product, stock: 1, discount: 0 }, // stock inicial en 1
        ],
      };
      updateInvoice(updatedInvoice);
    } else {
      toastError("Producto no encontrado");
    }
  };

  // 3. Control de stock y descuento
  const handleStockChange = (productId: number, stock: number) => {
    const updatedProducts = currentInvoice.products.map((product) =>
      product.id === productId && stock <= product.stock
        ? { ...product, stock }
        : product
    );
    updateInvoice({ ...currentInvoice, products: updatedProducts });
  };

  const handleDiscountChange = (productId: number, discount: string) => {
    let discountValue = parseFloat(discount);

    // Si el input está vacío o no es un número válido
    if (isNaN(discountValue)) {
      discountValue = 0; // Asigna 0 como valor por defecto
    }

    // Asegurar que el descuento siempre esté entre 0 y 100
    if (discountValue < 0) discountValue = 0;
    if (discountValue > 100) discountValue = 100;

    const updatedProducts = currentInvoice.products.map((product) =>
      product.id === productId
        ? { ...product, discount: discountValue }
        : product
    );

    updateInvoice({ ...currentInvoice, products: updatedProducts });
  };

  // 4. Descuento general
  const handleGeneralDiscountChange = (discount: number) => {
    updateInvoice({ ...currentInvoice, generalDiscount: discount });
  };

  // Calcular subtotal
  const calculateSubtotal = (product: Product) => {
    return product.price * product.stock * (1 - (product.discount ?? 0) / 100);
  };

  const calculateTotal = () => {
    const subtotal = currentInvoice.products.reduce(
      (sum, product) => sum + calculateSubtotal(product),
      0
    );
    return subtotal * (1 - currentInvoice.generalDiscount / 100);
  };

  useEffect(() => {
    //TODO cargar usuarios, medios de pagos, Nro de factura y productos
  }, []);

  const addNewInvoice = () => {
    const newInvoice: Invoice = {
      id: Date.now(),
      products: [
        {
          id: Date.now(),
          codeBar: "",
          name: "",
          price: 0,
          stock: 1,
          discount: 0,
        },
      ],
      clientSearch: "",
      invoiceNumber: invoices.length + 1,
      clientType: "consumidor-final",
      generalDiscount: 0,
      paymentMethod: "",
    };
    setInvoices([...invoices, newInvoice]);
    setCurrentInvoiceId(newInvoice.id);
  };
  const removeProduct = (id: number) => {
    const updatedProducts = currentInvoice.products.filter(
      (product) => product.id !== id
    );
    updateInvoice({ ...currentInvoice, products: updatedProducts });
  };

  const addProduct = () => {
    const updatedInvoice = {
      ...currentInvoice,
      products: [
        ...currentInvoice.products,
        {
          id: Date.now(),
          codeBar: "",
          name: "",
          price: 0,
          stock: 0,
          discount: 0,
          brand: "",
          category: "",
        },
      ],
    };
    updateInvoice(updatedInvoice);
  };
  const deleteInvoice = () => {
    const updatedInvoices = invoices.filter(
      (inv) => inv.id !== currentInvoiceId
    );
    if (invoices.length === 1) {
      setInvoices([
        {
          id: 1,
          products: [
            {
              id: Date.now(),
              codeBar: "",
              name: "",
              price: 0,
              stock: 1,
              discount: 0,
            },
          ],
          clientSearch: "",
          invoiceNumber: 1,
          clientType: "consumidor-final",
          generalDiscount: 0,
          paymentMethod: "",
        },
      ]);
      return;
    }
    setInvoices(updatedInvoices);
    setCurrentInvoiceId(invoices[updatedInvoices.length - 1].id);
  };

  return (
    <div className="w-full mx-auto  dark:bg-[#1b1e24] text-texto-ligth dark:text-texto-dark text-[.5rem] shadow-lg rounded-lg  min-h-[96vh] flex flex-col justify-between">
      <div className="flex justify-between items-center rounded-t-lg bg-secundario dark:bg-fondo-dark p-1">
        <h2 className="text-base font-bold">Punto de Ventas</h2>
        <div className="flex items-center gap-2">
          <select
            value={currentInvoiceId.toString()}
            onChange={(e) => setCurrentInvoiceId(parseInt(e.target.value))}
            className="p-[2px] px-1 border rounded bg-fondo-ligth text-texto-ligth text-[.5rem]"
          >
            {invoices.map((invoice) => (
              <option key={invoice.id} value={invoice.id.toString()}>
                Venta Nº {invoice.invoiceNumber}
              </option>
            ))}
          </select>
          <button
            onClick={addNewInvoice}
            className="p-2 border-collapse outline outline-1 rounded hover:bg-secundario-ligth hover:dark:bg-secundario hover:scale-105"
          >
            Nueva Venta
          </button>
        </div>
      </div>

      <div className="space-y-2 p-1">
        <div className="flex items-center space-x-2">
          <button className="text-xl hover:scale-105 hover:text-green-600">
            <MdPersonAdd />
          </button>
          <div className="relative flex flex-grow items-center">
            <span className="absolute left-1">🔍</span>
            <input
              id="SearchClient"
              type="text"
              placeholder="Buscar cliente"
              value={currentInvoice.clientSearch}
              onChange={(e) => handleClientSearch(e.target.value)}
              className="w-[85%] p-[.1rem] pl-8 border dark:border-texto-ligth rounded text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mx-auto">
          <select
            value={currentInvoice.clientType}
            onChange={(e) =>
              updateInvoice({ ...currentInvoice, clientType: e.target.value })
            }
            className="p-[2px] border dark:border-texto-ligth rounded dark:text-texto-ligth text-[.5rem] cursor-pointer"
          >
            <option value="consumidor-final">Consumidor Final</option>
            <option value="responsable-inscripto">Responsable Inscripto</option>
          </select>
          <p className="text-sm">Factura Nº: {currentInvoice.invoiceNumber}</p>
        </div>
        <div className="min-h-[20vh]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border dark:border-texto-dark text-[.5rem] w-[15vw]">
                  Código de Barras
                </th>
                <th className="border dark:border-texto-dark text-[.5rem]">
                  Producto
                </th>
                <th className="border dark:border-texto-dark text-[.5rem]">
                  Precio
                </th>
                <th className="border dark:border-texto-dark text-[.5rem]">
                  Cantidad
                </th>
                <th className="border dark:border-texto-dark  text-[.5rem]">
                  Desc. (%)
                </th>
                <th className="border dark:border-texto-dark text-[.5rem]">
                  Subtotal
                </th>
                <th className="border dark:border-texto-dark text-[.5rem]">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {currentInvoice.products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <input
                      type="text"
                      value={product.codeBar}
                      onChange={(e) => handleProductSearch(e.target.value)}
                      className="w-full h-full border-none dark:text-texto-ligth text-[.5rem]"
                    />
                  </td>
                  <td className="border text-center p-[0px]">
                    <p>{product.name}</p>
                  </td>
                  <td className="border text-center p-[0px] w-[10vw]">
                    <p>$ {product.price}</p>
                  </td>
                  <td className="border w-[10vw] p-[0px]">
                    <input
                      id="stockProduct"
                      type="number"
                      value={product.stock}
                      onChange={(e) =>
                        handleStockChange(product.id, parseInt(e.target.value))
                      }
                      min={0}
                      max={product.stock}
                      className="w-full h-full border-none dark:text-texto-ligth text-[.5rem]"
                    />
                  </td>
                  <td className="border p-[0px] w-[10vw] ">
                    <input
                      id="discountProduct"
                      type="number"
                      value={product.discount || 0}
                      onChange={(e) =>
                        handleDiscountChange(
                          product.id,
                          parseInt(e.target.value)
                        )
                      }
                      min={0}
                      max={100}
                      className="w-full h-full border-none dark:text-texto-ligth text-center text-[.5rem]"
                    />
                  </td>
                  <td className="border p-[0px] text-center w-[10vw]">
                    ${calculateSubtotal(product).toFixed(2)}
                  </td>
                  <td className="border  text-center">
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600 hover:scale-105"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addProduct}
          className="px-2 py-2 mx-1 bg-green-600 dark:bg-green-700 text-white rounded hover:bg-green-700 dark:hover:bg-green-600"
        >
          + Agregar Producto
        </button>

        <div className="flex items-center justify-between px-1">
          <div className="flex flex-row gap-2 items-center">
            <input
              id="general-discount"
              type="number"
              min={0}
              max={100}
              value={currentInvoice.generalDiscount}
              onChange={(e) =>
                handleGeneralDiscountChange(parseFloat(e.target.value))
              }
              className=" border rounded p-[0px] text-center dark:text-texto-ligth text-[.5rem]"
            />
            <label htmlFor="general-discount" className="font-medium">
              Descuento General (%)
            </label>
          </div>
          <p className="text-right text-lg font-semibold">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>
      </div>
      <div className="p-1 rounded-b-lg flex justify-between bg-secundario dark:bg-fondo-dark">
        <select
          value={currentInvoice.paymentMethod}
          onChange={(e) =>
            updateInvoice({ ...currentInvoice, paymentMethod: e.target.value })
          }
          className="p-[1px] px-1 border rounded dark:text-texto-ligth text-[.5rem] cursor-pointer"
        >
          <option value="">Medio de pago</option>
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia</option>
          <option value="mercadoPago">Mercado Pago</option>
        </select>
        <div className="space-x-2">
          <button
            className="px-4 py-2 border rounded hover:bg-red-500 dark:hover:bg-red-700"
            onClick={deleteInvoice}
          >
            Cancelar
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
