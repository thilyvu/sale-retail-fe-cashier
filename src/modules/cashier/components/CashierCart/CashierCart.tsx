import { useCashierStore } from "../../stores/cashierStore";
import { DiscountType } from "../../type/type";
import CashierProduct from "../CashierProduct";

interface ICashierCartProps {
  children: React.ReactNode;
  className?: string;
}
export interface IProduct {
  name: string;
  sku: string;
  units: {
    unit: string;
    price: number;
    remainQuantity: number;
  }[];
  base_price: number;
  discount_price?: number;
  amount?: number;
  discount_type?: DiscountType;
  discount_value?: number;
  discount_amount?: number;
  final_amount?: number;
  product_id?: string;
  product_unit_id?: string;
  unit_multiplier?: number;
  image?: string;
}
function CashierCart({ children, className }: ICashierCartProps) {
  const { getActiveTabProducts, removeProduct, changeProductQuantity } =
    useCashierStore((state) => state);
  const products = getActiveTabProducts() || [];
  return (
    <div className={`${className}`}>
      {products.length > 0 ? (
        products.map((product, index) => {
          return (
            <CashierProduct
              onRemoveProduct={() => removeProduct(product.unit_id)}
              onChangeQuantity={(type) => {
                changeProductQuantity(product.id, type);
              }}
              key={product.unit_id}
              product={product}
              index={index + 1}
            >
              {" "}
            </CashierProduct>
          );
        })
      ) : (
        <div className=" flex flex-col items-center w-full justify-center h-full">
          <img
            className="w-[297px] h-[240px] object-cover"
            src="src/assets/images/cashier-placeholder.png"
          />
          <p className="text-[#2F4858]">Chưa có sản phẩm trả nào</p>
        </div>
      )}
      {children}
    </div>
  );
}

export default CashierCart;
