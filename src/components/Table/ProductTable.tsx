import Link from "next/link";
import { IProduct } from "../Cards/ProductCard";
import "./ProductTable.css";
interface ProductTableProps {
  data: IProduct[];
}

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  return (
    <table className="text-black border table-fill ">
      <thead>
        <tr className="shadow-lg">
          <th className="text-left">Producto</th>
          <th className="text-left">Marca</th>
          <th className="text-left">Descripción</th>
          <th className="text-left">Categoría</th>
          <th className="text-left">Precio</th>
          <th className="text-left">Acción</th>
        </tr>
      </thead>
      <tbody className="table-hover">
        {data.map((product) => (
          <tr key={product.id}>
            <td className="text-left">{product.name}</td>
            <td className="text-left">{product.brand}</td>
            <td className="text-left">{product.description}</td>
            <td className="text-left">{product.category}</td>
            <td className="text-left">$ {product.price}</td>
            <td className="text-left">
              <Link href={`/products/${product.id}`}>Ver Imagen</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
