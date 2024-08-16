import { Button } from "antd";
import AddTab from "~/assets/icons/AddTab";
import { useCashierStore } from "~/store/cashierStore";
import "./CashierTab.scss";
import CashierTabItem from "./CashierTabItem";
function CashierTab() {
  const { activeTab, tabs, addNewTab } = useCashierStore((state) => state);

  return (
    <div className="ml-3 flex-item tab-wrapper">
      <div className="tab-container lg:max-w-[70vw] lg:overflow-hidden md:max-w-[60vw] md:overflow-hidden sm:max-w-[20vw] sm:overflow-hidden">
        {tabs.map((tab, tabIndex) => {
          return (
            <CashierTabItem
              isActive={tab.id === activeTab}
              tab={tab}
              tabIndex={tabIndex + 1}
              key={tab.id}
            />
          );
        })}
      </div>

      <Button
        className="ml-3 button-cover"
        type="text"
        icon={<AddTab />}
        onClick={addNewTab}
      ></Button>
    </div>
  );
}
export default CashierTab;
