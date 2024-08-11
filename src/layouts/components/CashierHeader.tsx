import ProductSelect from "~/modules/Cashier/ProductSelect";
import "./CashierHeader.scss";
import CashierTab from "./CashierTab";
import { MenuOutlined } from "@ant-design/icons";
function CashierHeader() {
  return (
    <div className="headerContainer">
      <div style={{ display: "flex" }}>
        <ProductSelect />
        <CashierTab />
      </div>
      <div>
        <MenuOutlined style={{ color: "white" }} width={"2em"} />
      </div>
    </div>
  );
}

export default CashierHeader;
