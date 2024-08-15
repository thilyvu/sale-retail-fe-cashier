import ProductSelect from "~/modules/Cashier/ProductSelect";
import "./CashierHeader.scss";
import CashierTab from "./CashierTab";
import { MenuOutlined } from "@ant-design/icons";
import OrderIcon from "~/assets/icons/Order";
import { Button, Divider } from "antd";
function CashierHeader() {
  return (
    <div className="headerContainer">
      <div style={{ display: "flex" }}>
        <ProductSelect />
        <CashierTab />
      </div>
      <div className="flex-container ">
        <Button className="button-cover " type="text">
          <OrderIcon />
        </Button>
        <Divider
          type="vertical"
          style={{ borderColor: "white", height: "2rem" }}
        ></Divider>
        <Button
          className="button-cover "
          type="text"
          style={{ marginRight: "1rem", marginLeft: "0.3rem" }}
        >
          <MenuOutlined
            style={{
              color: "white",

              fontSize: "20px",
            }}
          />
        </Button>
      </div>
    </div>
  );
}

export default CashierHeader;
