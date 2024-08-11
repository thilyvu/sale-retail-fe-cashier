import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./CashierTabItem.scss";

interface ITabItemProps {
  children?: React.ReactNode;
  className?: string;
  tabIndex?: number;
}

function CashierTabItem({ children, tabIndex, className }: ITabItemProps) {
  return (
    <div className={`tabItemContainer ${className}`}>
      <p style={{ color: "black", fontWeight: "500" }}>Hóa đơn {tabIndex} </p>
      <Button
        className="ml-2"
        type="text"
        icon={<CloseOutlined />}
        size="small"
      />
      {children}
    </div>
  );
}
export default CashierTabItem;
