"use client";
import { useEffect, useState } from "react";
import {
  MdBarcodeReader,
  MdDelete,
  MdPersonAdd,
  MdPersonRemove,
} from "react-icons/md";
import { mockProducts } from "../Productos/page";
import { toastError } from "@/libs/Sonner";
import { Cliente, InvoiceInterface, SelectInputs } from "@/types/VentasTypes";
import { useClients } from "@/hooks/useClients";
import { useProducts } from "@/hooks/useProducts";
import Select from "react-select";
const defaultInterface: InvoiceInterface = {
  id: 0,
  factura: {
    id: 0,
    tipo: "",
  },
  products: [],
  client: undefined,
  clientType: "",
  generalDiscount: 0,
  paymentMethod: "",
  total: 0,
};

export default function GeneradorFactura() {
  //clients Functionality
  const { clients } = useClients();
  const [clientOptions, setClientOptions] = useState<unknown[]>([]);
  const [clientSelect, setClientSelect] = useState<Cliente | undefined>(
    undefined
  );
  useEffect(() => {
    if (clients) {
      const options = clients.map((client) => ({
        value: client.name,
        label: `${client.name} - ${client.cuil}`,
      }));
      setClientOptions(options);
    }
  }, [clients]);

  const handleClientChange = (newValue: unknown) => {
    const selectedOption = newValue as SelectInputs;
    const found = clients?.find(
      (client) => client.name === selectedOption.value
    );
    if (!found) {
      toastError("No se encontró el cliente");
      return;
    }
    setInvoices((prev) =>
      prev.map((invoice, index) =>
        index === currentInvoice ? { ...invoice, client: found } : invoice
      )
    );

    setClientSelect(found);
  };

  // Products Functionality
  const { products } = useProducts();

  const [productOptions, setProductOptions] = useState<SelectInputs[]>([]);

  useEffect(() => {
    if (products) {
      const options = products.map((product) => ({
        value: product.name,
        label: `${product.name} - ${product.codeBar}`,
      }));
      setProductOptions(options);
    }
  }, [products]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProductChange = (newValue: any) => {
    const found = products?.find((product) => product.name === newValue.value);
    if (!found) {
      toastError("No se encontró el producto");
      return;
    }
    setInvoices((prev) => {
      return prev.map((invoice, index) =>
        index === currentInvoice
          ? {
              ...invoice,
              products: [...invoice.products, found!],
            }
          : invoice
      );
    });
  };

  const deleteProduct = (id: number) => {
    setInvoices((prev) =>
      prev.map((invoice, index) =>
        index === currentInvoice
          ? {
              ...invoice,
              products: invoice.products.filter((product) => product.id !== id),
            }
          : invoice
      )
    );
  };

  const handleCantidad = (id: number, value: number) => {
    setInvoices((prev) => {
      return prev.map((invoice) => ({
        ...invoice,
        products: invoice.products.map((product) =>
          product.id === id
            ? { ...product, stock: product.stock - value }
            : product
        ),
      }));
    });
  };

  const handleDiscountChange = (value: number) => {
    if (value < 0 || value > 100) return;
    setInvoices((prev) => {
      return prev.map((invoice) => ({
        ...invoice,
        products: invoice.products.map((product) => ({
          ...product,
          discount: value,
        })),
      }));
    });
  };

  const handleGeneralDiscountChange = (value: number) => {
    if (value < 0 || value > 100) return;
    setInvoices((prev) => {
      return prev.map((invoice) => ({
        ...invoice,
        generalDiscount: value,
      }));
    });
  };

  //Invoices Functionality
  const [invoices, setInvoices] = useState<InvoiceInterface[]>([
    defaultInterface,
  ]);
  const [currentInvoice, setCurrentInvoice] = useState<number>(0);
  const [nextInvoiceId, setNextInvoiceId] = useState(1);

  const addNewInvoice = () => {
    const NewInterface: InvoiceInterface = {
      id: nextInvoiceId,
      factura: {
        id: 0,
        tipo: "",
      },
      products: [],
      client: undefined,
      clientType: "",
      generalDiscount: 0,
      paymentMethod: "",
      total: 0,
    };
    setInvoices([...invoices, NewInterface]);
    setCurrentInvoice(invoices.length);
    setNextInvoiceId((prev) => prev + 1);
    setClientSelect(NewInterface.client);
  };

  const changeCurrentInvoice = (id: number) => {
    const foundInvoice = invoices.find((invoice) => invoice.id === id);
    if (foundInvoice) {
      setCurrentInvoice(id);
      setClientSelect(foundInvoice.client);
    }
  };

  const updateInvoice = (updatedInvoice: InvoiceInterface) => {
    setInvoices(
      invoices.map((inv) => (inv.id === currentInvoice ? updatedInvoice : inv))
    );
  };
  const deleteInvoice = (id: number) => {
    console.log(id);
    setInvoices((prevInvoices) => {
      const updatedInvoices = prevInvoices.filter(
        (invoice) => invoice.id !== id
      );

      if (updatedInvoices.length === 0) {
        setCurrentInvoice(0); // Restablecer al primer índice si no hay facturas
        return [defaultInterface]; // Si no hay facturas, volver a la predeterminada
      } else {
        // Si el currentInvoice es mayor o igual que la longitud de las facturas restantes, ajustarlo
        if (currentInvoice >= updatedInvoices.length) {
          setCurrentInvoice(updatedInvoices.length - 1);
        }
        return updatedInvoices;
      }
    });
  };

  const optionsIVA = [
    { value: "consumidorFinal", label: "Consumidor Final" },
    {
      value: "responsableInscripto",
      label: "Responsable Inscripto",
    },
  ];
  const optionsPagos = [
    { value: "efectivo", label: "efectivo" },
    { value: "mercadoPago", label: "Mercado Pago" },
    { value: "TarjetaD", label: "Tarjeta Debito" },
    { value: "TarjetaC", label: "Tarjeta Credito" },
  ];
  return (
    <div className="w-full mx-auto dark:bg-[#1b1e24] text-texto-ligth dark:text-texto-dark text-[.5rem] shadow-lg rounded-lg min-h-[96vh] flex flex-col justify-between">
      <div className="flex justify-between items-center rounded-t-lg bg-secundario dark:bg-fondo-dark p-1">
        <h2 className="text-base font-bold">Punto de Ventas</h2>
        <p className="text-sm">Factura Tipo: B - Nº:</p>
        <div className="flex items-center gap-2">
          <select
            className="p-[2px] px-1 border rounded bg-fondo-ligth text-texto-ligth text-[.5rem]"
            value={currentInvoice}
            onChange={(e) => changeCurrentInvoice(Number(e.target.value))}
          >
            {invoices.map((invoice) => (
              <option key={invoice.id} value={invoice.id}>
                Venta Nº {invoice.id} {/* Usar el ID real */}
              </option>
            ))}
          </select>

          <button
            className="p-2 border rounded hover:scale-105"
            onClick={addNewInvoice}
          >
            Nueva Venta
          </button>
        </div>
      </div>

      {/* Cliente */}
      <div className="flex flex-col gap-2 w-full px-2 mt-1">
        <div className="flex flex-row justify-between gap-1">
          <div className="flex items-center space-x-2 w-2/3">
            <button className="text-xl hover:scale-105 hover:text-green-600">
              <MdPersonAdd />
            </button>
            <div className="relative flex flex-grow items-center">
              <span className="absolute left-1">🔍</span>
              <Select
                options={clientOptions}
                onChange={handleClientChange}
                placeholder="Buscar cliente"
                noOptionsMessage={() => "No hay coincidencias"}
                isSearchable
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
                className="w-full placeholder-shown:text-black text-black outline-none border-none focus:ring-0"
              />
            </div>
          </div>
          <div className="w-1/3 border p-[2px] flex flex-col items-center justify-center min-h-full rounded">
            {clientSelect ? (
              <div className="flex flex-col items-start">
                <div className="flex flex-row gap-2">
                  <p>{clientSelect.name}</p>
                  <p>CUIL: {clientSelect.cuil}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <p>{clientSelect.address}</p>
                  <button onClick={() => setClientSelect(undefined)}>
                    <MdPersonRemove />
                  </button>
                </div>
              </div>
            ) : (
              <p>Cliente Genérico</p>
            )}
          </div>
        </div>

        {/* Productos */}
        <div className="flex flex-row justify-between gap-1">
          <div className="flex items-center space-x-2 w-2/3">
            <button className="text-xl hover:scale-105 hover:text-green-600">
              <MdBarcodeReader />
            </button>
            <div className="relative flex flex-grow items-center">
              <span className="absolute left-1">🔍</span>
              <Select
                autoFocus
                isSearchable
                noOptionsMessage={() => "No hay coincidencias"}
                options={productOptions}
                onChange={handleProductChange}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
                placeholder="Buscar Producto"
                className="w-full placeholder-shown:text-black text-black"
              />
            </div>
          </div>
          <Select
            options={optionsIVA}
            placeholder="Tipo de IVA"
            className="w-1/3 placeholder-shown:text-black text-black"
          />
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="space-y-2 p-1">
        <div className="min-h-[20vh]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border text-[.5rem]">Código de Barras</th>
                <th className="border text-[.5rem]">Producto</th>
                <th className="border text-[.5rem]">Precio</th>
                <th className="border text-[.5rem]">Cantidad</th>
                <th className="border text-[.5rem]">Descuento</th>
                <th className="border text-[.5rem]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {invoices[currentInvoice].products.map((product) => (
                <tr key={product.id}>
                  <td className="border text-center text-[.5rem] p-[0px]">
                    {product.codeBar}
                  </td>
                  <td className="border text-center text-[.5rem] p-[0px]">
                    {product.name}
                  </td>
                  <td className="border text-center text-[.5rem] p-[0px]">
                    ${product.price}
                  </td>
                  <td className="border text-center text-[.5rem] w-[5vw]">
                    <input
                      type="number"
                      onChange={(e) =>
                        handleCantidad(product.id, Number(e.target.value))
                      }
                      min={1}
                      className="w-full text-center p-[0px] text-[.5rem]"
                    />
                  </td>
                  <td className="border text-center text-[.5rem] w-[5vw]">
                    <input
                      type="number"
                      onChange={(e) =>
                        handleDiscountChange(Number(e.target.value))
                      }
                      className="w-full text-center p-[0px] text-[.5rem]"
                    />
                  </td>
                  <td className="border text-center">
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="hover:text-red-500"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Resumen de la Venta */}
        <div className="space-y-1 flex px-2 justify-between">
          <div className="flex gap-1 items-center">
            <span>Descuento General:</span>
            <input
              type="number"
              onChange={(e) =>
                handleGeneralDiscountChange(Number(e.target.value))
              }
              className="w-12 p-0 rounded text-[.5rem] h-5 text-black text-center"
            />
          </div>
          <div className="flex gap-1 font-semibold text-[1rem]">
            <span>Total:</span>
            <span>${invoices[currentInvoice].total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-between items-center p-2 bg-secundario dark:bg-fondo-dark rounded-b-lg">
        <Select
          placeholder="Metodo de Pago"
          menuPlacement="top"
          options={optionsPagos}
          onChange={(e) =>
            updateInvoice({
              ...invoices[currentInvoice],
              paymentMethod: e?.toString() || "",
            })
          }
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "black",
            },
          })}
          className="w-1/5  placeholder-shown:text-black text-black outline-none border-none focus:ring-0"
        ></Select>
        <button
          onClick={() => deleteInvoice(currentInvoice)}
          className="bg-red-500 p-2 rounded hover:scale-105"
        >
          Cancelar Venta
        </button>
        <button className="bg-green-500 p-2 rounded hover:scale-105">
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
