import { Backdrop } from "~/components";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Icons from "../../../../assets/icons";

const { Title } = Typography;

function Orders() {
	const navigate = useNavigate();
	return (
		<Backdrop theme="dark">
			<div className="w-full h-full flex items-center justify-center p-16">
				<div className="bg-white rounded-lg shadow-lg w-full h-full p-4">
					<div className="flex items-center w-full justify-between">
						<Title level={4} className="!mb-0">
							Danh sách đơn hàng
						</Title>
						<Button
							className="bg-transparent cursor-pointer p-1 hover:!text-red-400 hover:!bg-red-300 hover:!bg-opacity-20"
							type="text"
							onClick={() => navigate(-1)}
						>
							<Icons.Close />
						</Button>
					</div>
				</div>
			</div>
		</Backdrop>
	);
}

export default Orders;
