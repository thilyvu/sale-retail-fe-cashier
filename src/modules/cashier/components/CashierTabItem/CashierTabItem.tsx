import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ITab, useCashierStore } from "~/store/cashierStore";

interface ITabItemProps {
	className?: string;
	tabIndex?: number;
	tab: ITab;
	isActive?: boolean;
}

function CashierTabItem({ isActive, tabIndex, tab }: ITabItemProps) {
	const { tabs, setTabs, setActiveTab } = useCashierStore((state) => state);

	const handleDeleteTab = (tabId: string) => {
		const remainTabs = tabs.filter((tab) => tab.id !== tabId);
		setActiveTab(remainTabs[0].id);
		setTabs(remainTabs);
	};

	return (
		<div
			className={`flex items-center justify-center p-3 rounded-tl-lg rounded-tr-lg mt-2 whitespace-nowrap max-w-[125px] cursor-pointer ${
				isActive ? "bg-white" : "bg-white bg-opacity-65"
			}`}
			onClick={() => setActiveTab(tab.id)}
		>
			<p className="text-black font-semibold">Hóa đơn {tabIndex} </p>
			<Button
				className={`ml-2 ${tabs.length === 1 ? "invisible" : "visible"}`}
				type="text"
				onClick={() => handleDeleteTab(tab.id)}
				icon={<CloseOutlined />}
				size="small"
			/>
		</div>
	);
}
export default CashierTabItem;
