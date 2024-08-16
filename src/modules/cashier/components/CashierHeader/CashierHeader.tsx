import { MenuOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import OrderIcon from "~/assets/icons/Order";
import ProductSelect from "../ProductSelect";
import CashierTab from "../CashierTab/CashierTab";

function CashierHeader() {
	return (
		<div className="bg-primary flex justify-between">
			<div className="flex items-center">
				<ProductSelect />
				<CashierTab />
			</div>
			<div className="flex items-center justify-between">
				<Button className="bg-transparent cursor-pointer w-fit p-1" type="text">
					<OrderIcon />
				</Button>
				<Divider
					type="vertical"
					style={{ borderColor: "white", height: "2rem" }}
				/>
				<Button
					className="bg-transparent cursor-pointer w-fit p-1 mr-4 ml-1"
					type="text"
				>
					<MenuOutlined className="text-white text-[1.5rem]" />
				</Button>
			</div>
		</div>
	);
}

export default CashierHeader;
