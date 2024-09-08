import CashierCart from '../CashierCart';
import CashierForm from '../CashierForm';

function CashierContent() {
  return (
    <div className="grid grid-cols-7 h-[calc(100vh-56px)] pb-2">
      <CashierCart className="col-span-5" />
      <CashierForm className="col-span-2" />
    </div>
  );
}
export default CashierContent;
