import CashierCart from "../CashierCart";
import CashierForm from "../CashierForm";

function CashierContent() {
  return (
    <div className="grid grid-cols-7 h-[calc(100vh-56px)] pb-6 ">
      <CashierCart className="col-span-5"> </CashierCart>
      <CashierForm className="col-span-2 "> </CashierForm>
    </div>
  );
}
export default CashierContent;
