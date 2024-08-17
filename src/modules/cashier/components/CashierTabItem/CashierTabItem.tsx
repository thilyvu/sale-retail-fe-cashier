import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ITab } from "../../stores/cashierStore";

interface ITabItemProps {
	tab: ITab;
	isActive: boolean;
	isLastTab: boolean;
	tabIndex: number;
	className?: string;
	onDeleteTab: (id: string) => void;
	onChangeActiveTab: (id: string) => void;
}

function CashierTabItem({
	tabIndex,
	isLastTab,
	isActive,
	tab,
	onDeleteTab,
	onChangeActiveTab,
}: ITabItemProps) {
	return (
		<div
			className={`relative flex items-center justify-center p-3 rounded-tl-lg rounded-tr-lg mt-2 whitespace-nowrap max-w-[125px] cursor-pointer ${
				isActive ? "bg-white" : "bg-white bg-opacity-65"
			}`}
		>
			<div
				className="w-full h-full mr-6"
				onClick={(e) => onChangeActiveTab(tab.id)}
			>
				<p className="text-black font-semibold">Hóa đơn {tabIndex} </p>
			</div>
			<Button
				className={`${isLastTab ? "hidden" : "flex"} absolute right-2`}
				type="text"
				onClick={() => onDeleteTab(tab.id)}
				icon={<CloseOutlined />}
				size="small"
			/>
		</div>
	);
}
export default CashierTabItem;
