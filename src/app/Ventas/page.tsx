"use client";
import React, { useState } from "react";
import { MdDelete, MdPersonAdd } from "react-icons/md";

interface Product {
  id: number;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
}

interface Invoice {
  id: number;
  products: Product[];
  clientSearch: string;
  invoiceNumber: number;
  clientType: string;
  generalDiscount: number;
  paymentMethod: string;
}

export default function GeneradorFactura() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      products: [
        {
          id: Date.now(),
          barcode: "",
          name: "",
          price: 0,
          quantity: 1,
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

  const addProduct = () => {
    const updatedInvoice = {
      ...currentInvoice,
      products: [
        ...currentInvoice.products,
        {
          id: Date.now(),
          barcode: "",
          name: "",
          price: 0,
          quantity: 1,
          discount: 0,
        },
      ],
    };
    updateInvoice(updatedInvoice);
  };

  const updateProduct = (
    id: number,
    field: keyof Product,
    value: string | number
  ) => {
    const updatedProducts = currentInvoice.products.map((product) =>
      product.id === id ? { ...product, [field]: value } : product
    );
    updateInvoice({ ...currentInvoice, products: updatedProducts });
  };

  const removeProduct = (id: number) => {
    const updatedProducts = currentInvoice.products.filter(
      (product) => product.id !== id
    );
    updateInvoice({ ...currentInvoice, products: updatedProducts });
  };

  const calculateSubtotal = (product: Product) => {
    return product.price * product.quantity * (1 - product.discount / 100);
  };

  const calculateTotal = () => {
    const subtotal = currentInvoice.products.reduce(
      (sum, product) => sum + calculateSubtotal(product),
      0
    );
    return subtotal * (1 - currentInvoice.generalDiscount / 100);
  };

  const addNewInvoice = () => {
    const newInvoice: Invoice = {
      id: Date.now(),
      products: [
        {
          id: Date.now(),
          barcode: "",
          name: "",
          price: 0,
          quantity: 1,
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
              barcode: "",
              name: "",
              price: 0,
              quantity: 1,
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
    <div className="w-full mx-auto p-2 bg-secundario dark:bg-fondo-dark  text-[.5rem] shadow-lg rounded-lg dark:text-texto-dark min-h-[96vh]">
      <div className="mb-1">
        <div className="flex justify-between items-center ">
          <h2 className="text-base font-bold">Punto de Ventas</h2>
          <div className="space-x-2">
            <select
              value={currentInvoiceId.toString()}
              onChange={(e) => setCurrentInvoiceId(parseInt(e.target.value))}
              className="p-2 border rounded-lg bg-fondo-ligth text-texto-ligth"
            >
              {invoices.map((invoice) => (
                <option key={invoice.id} value={invoice.id.toString()}>
                  Venta Nº {invoice.invoiceNumber}
                </option>
              ))}
            </select>
            <button
              onClick={addNewInvoice}
              className="px-4 py-2 border-collapse  rounded hover:border border-black dark:hover:border dark:hover:border-white"
            >
              Nueva Venta
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <button className="text-xl hover:scale-105">
            <MdPersonAdd />
          </button>
          <div className="relative flex flex-grow items-center">
            <span className="absolute left-1">🔍</span>
            <input
              type="text"
              placeholder="Buscar cliente"
              value={currentInvoice.clientSearch}
              onChange={(e) =>
                updateInvoice({
                  ...currentInvoice,
                  clientSearch: e.target.value,
                })
              }
              className="w-full p-1 pl-8 border dark:border-texto-ligth rounded"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <select
            value={currentInvoice.clientType}
            onChange={(e) =>
              updateInvoice({ ...currentInvoice, clientType: e.target.value })
            }
            className="p-1 border dark:border-texto-ligth rounded dark:text-texto-ligth"
          >
            <option value="consumidor-final">Consumidor Final</option>
            <option value="responsable-inscripto">Responsable Inscripto</option>
          </select>
          <p className="text-sm">Factura Nº: {currentInvoice.invoiceNumber}</p>
        </div>

        <table className="w-full border-collapse text-[.1rem]">
          <thead>
            <tr>
              <th className="border dark:border-texto-dark text-[.5rem] py-1">
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
                Descuento (%)
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
                <td className="border px-1">
                  <input
                    type="text"
                    autoFocus
                    value={product.barcode}
                    onChange={(e) =>
                      updateProduct(product.id, "barcode", e.target.value)
                    }
                    className="w-full p-1 border rounded dark:text-texto-ligth"
                  />
                </td>
                <td className="border">
                  <p>{product.name}</p>
                </td>
                <td className="border">
                  <p>$ {product.price}</p>
                </td>
                <td className="border">
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      updateProduct(
                        product.id,
                        "quantity",
                        parseInt(e.target.value)
                      )
                    }
                    className=" p-1 border rounded  dark:text-texto-ligth"
                  />
                </td>
                <td className="border">
                  <input
                    type="number"
                    value={product.discount}
                    onChange={(e) =>
                      updateProduct(
                        product.id,
                        "discount",
                        parseFloat(e.target.value)
                      )
                    }
                    className=" p-1 border rounded  dark:text-texto-ligth"
                  />
                </td>
                <td className="border">
                  ${calculateSubtotal(product).toFixed(2)}
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addProduct}
          className="w-full px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded hover:bg-green-700 dark:hover:bg-green-600"
        >
          + Agregar Producto
        </button>

        <div className="flex items-center justify-between">
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="general-discount" className="font-medium">
              Descuento General (%)
            </label>
            <input
              id="general-discount"
              type="number"
              value={currentInvoice.generalDiscount}
              min={0}
              max={100}
              onChange={(e) =>
                updateInvoice({
                  ...currentInvoice,
                  generalDiscount: parseFloat(e.target.value),
                })
              }
              className="w-24 p-1 border rounded  dark:text-texto-ligth"
            />
          </div>
          <p className="text-right text-lg font-semibold">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>
      </div>
      <div className=" flex justify-between">
        <select
          value={currentInvoice.paymentMethod}
          onChange={(e) =>
            updateInvoice({ ...currentInvoice, paymentMethod: e.target.value })
          }
          className="p-2 border rounded dark:text-texto-ligth"
        >
          <option value="">Seleccionar medio de pago</option>
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
