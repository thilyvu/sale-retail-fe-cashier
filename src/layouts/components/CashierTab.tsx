import { useState } from "react";
import CashierTabItem from "./CashierTabItem";
import "./CashierTab.scss";
import { Button } from "antd";
import AddTab from "~/assets/icons/AddTab";

function CashierTab() {
  const [tabs, setTabs] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ]);
  return (
    <div className="ml-3 tab-container">
      {tabs.map((tab, tabIndex) => (
        <CashierTabItem tabIndex={tabIndex + 1} />
      ))}
      <Button
        className="ml-3"
        style={{ background: "transparent", cursor: "pointer" }}
        type="text"
        icon={<AddTab />}
      ></Button>
    </div>
  );
}
export default CashierTab;
