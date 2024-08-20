interface ICashierCartProps {
  children: React.ReactNode;
  className?: string;
}
function CashierCart({ children, className }: ICashierCartProps) {
  return (
    <div className={`${className}`}>
      Cashier Cart
      {children}
    </div>
  );
}

export default CashierCart;
