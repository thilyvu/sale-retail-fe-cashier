import { formatCurrency } from "~/helper/formatter";
import { ESProductDocument } from "~/types/product";

interface IProductSelectItemProps {
  children: React.ReactNode;
  product: ESProductDocument;
  className?: string;
}
const ProductSelectItem = ({
  children,
  product,
  className,
}: IProductSelectItemProps) => {
  return (
    <div className={`${className}`}>
      <div className="flex-0 p-3">
        <img className="w-10 h-10 object-cover" src={product.image} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-black font-bold">{product.product_name}</p>
          <p className="text-blue-600 font-bold mr-2">
            {formatCurrency(product.price)}
          </p>
        </div>
        <p className="mt-1">{product.sku}</p>
        <p>Tồn :{product.stock}</p>
      </div>

      {children}
    </div>
  );
};

export default ProductSelectItem;
