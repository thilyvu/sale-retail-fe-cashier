import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ITab, useCashierStore } from "~/store/cashierStore";
import "./CashierTabItem.scss";

interface ITabItemProps {
  className?: string;
  tabIndex?: number;
  tab: ITab;
  isActive?: boolean;
}

function CashierTabItem({ isActive, tabIndex, tab }: ITabItemProps) {
  const { activeTab, tabs, setTabs, setActiveTab } = useCashierStore(
    (state) => state
  );

  const handleDeleteTab = (tabId: string) => {
    const remainTabs = tabs.filter((tab) => tab.id !== tabId);
    if (tabId === activeTab) {
      setActiveTab(remainTabs[0].id);
    }
    setTabs(remainTabs);
  };

  return (
    <div
      className={`tabItemContainer ${
        isActive ? "tab-container__active" : "tab-container__deActive"
      }`}
      onClick={() => setActiveTab(tab.id)}
    >
      <p style={{ color: "black", fontWeight: "500" }}>Hóa đơn {tabIndex} </p>
      <Button
        className="ml-2"
        type="text"
        style={{ visibility: tabs.length === 1 ? "hidden" : "initial" }}
        onClick={() => handleDeleteTab(tab.id)}
        icon={<CloseOutlined />}
        size="small"
      />
    </div>
  );
}
export default CashierTabItem;
