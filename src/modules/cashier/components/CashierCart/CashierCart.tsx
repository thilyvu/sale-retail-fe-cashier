import CashierProduct from "../CashierProduct";

interface ICashierCartProps {
  children: React.ReactNode;
  className?: string;
}
export interface IProduct {
  id: number;
  name: string;
  sku: string;
  units: {
    unit: string;
    price: number;
    remainQuantity: number;
  }[];
}
function CashierCart({ children, className }: ICashierCartProps) {
  const products = [
    {
      id: 1,
      name: "Product 1",
      sku: "SP0000001",
      units: [
        { unit: "piece", price: 19.99, remainQuantity: 100 },
        { unit: "box", price: 189.99, remainQuantity: 20 },
      ],
    },
    {
      id: 2,
      name: "Product 2",
      sku: "P002",
      units: [
        { unit: "piece", price: 29.99, remainQuantity: 50 },
        { unit: "box", price: 279.99, remainQuantity: 15 },
      ],
    },
    {
      id: 3,
      name: "Product 3",
      sku: "P003",
      units: [
        { unit: "piece", price: 9.99, remainQuantity: 200 },
        { unit: "dozen", price: 99.99, remainQuantity: 30 },
      ],
    },
    {
      id: 4,
      name: "Product 4",
      sku: "P004",
      units: [
        { unit: "piece", price: 49.99, remainQuantity: 75 },
        { unit: "box", price: 479.99, remainQuantity: 10 },
      ],
    },
    {
      id: 5,
      name: "Product 5",
      sku: "P005",
      units: [
        { unit: "piece", price: 15.99, remainQuantity: 120 },
        { unit: "pack", price: 149.99, remainQuantity: 25 },
      ],
    },
  ];

  return (
    <div className={`${className}`}>
      {products.map((product, index) => {
        return (
          <CashierProduct key={product.id} product={product} index={index + 1}>
            {" "}
          </CashierProduct>
        );
      })}
      {children}
    </div>
  );
}

export default CashierCart;
