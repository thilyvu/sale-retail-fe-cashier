import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./CashierTabItem.scss";
import { ITab } from "./CashierTab";

interface ITabItemProps {
  children?: React.ReactNode;
  className?: string;
  tabIndex?: number;
  onDeleteTab: Function;
  onChangeActiveTab: Function;
  tab: ITab;
  tabs: Array<ITab>;
}

function CashierTabItem({
  children,
  tabIndex,
  className,
  tab,
  onChangeActiveTab,
  onDeleteTab,
  tabs,
}: ITabItemProps) {
  return (
    <div
      className={`tabItemContainer ${className}`}
      onClick={() => onChangeActiveTab(tab.id)}
    >
      <p style={{ color: "black", fontWeight: "500" }}>Hóa đơn {tabIndex} </p>
      <Button
        className="ml-2"
        type="text"
        style={{ visibility: tabs.length === 1 ? "hidden" : "initial" }}
        onClick={() => onDeleteTab(tab.id)}
        icon={<CloseOutlined />}
        size="small"
      />
      {children}
    </div>
  );
}
export default CashierTabItem;
