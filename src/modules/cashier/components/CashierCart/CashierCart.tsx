import { useCashierStore } from '../../stores/cashierStore';
import { DiscountType } from '../../types';
import CashierProduct from '../CashierProduct';
import EmptyCart from '~/assets/images/cashier-placeholder.png';

interface ICashierCartProps {
  children?: React.ReactNode;
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
  const { getActiveTabProducts, removeProduct, changeProductQuantity } = useCashierStore((state) => state);
  const products = getActiveTabProducts() || [];
  return (
    <div className={`${className}`}>
      {products.length > 0 ? (
        products.map((product, index) => {
          return (
            <CashierProduct
              product={product}
              index={index + 1}
              key={product.unit_id}
              onRemoveProduct={() => removeProduct(product.unit_id)}
              onChangeQuantity={(type) => {
                changeProductQuantity(product.unit_id, type);
              }}
            />
          );
        })
      ) : (
        <div className="flex flex-col items-center w-full justify-center h-full">
          <img className="w-[297px] h-[240px] object-cover" src={EmptyCart} alt="" />
          <p className="text-[#2F4858]">Chưa có sản phẩm trả nào</p>
        </div>
      )}
      {children}
    </div>
  );
}

export default CashierCart;
