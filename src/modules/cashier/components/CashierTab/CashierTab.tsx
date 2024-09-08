import { Button } from "antd";
import AddTab from "~/assets/icons/AddTab";
import { useCashierStore } from "../../stores/cashierStore";
import CashierTabItem from "../CashierTabItem";

function CashierTab() {
	const { tabs, activeTab, createTab, setActiveTab, removeTab } =
		useCashierStore((state) => state);

	return (
		<div className="relative flex items-center ml-4">
			<div className="flex items-center gap-2 lg:max-w-[70vw] overflow-hidden md:max-w-[60vw] sm:max-w-[20vw]">
				{Object.values(tabs).map((tab, index) => {
					return (
						<CashierTabItem
							key={index}
							tab={tab}
							isActive={tab.id === activeTab}
							tabIndex={index + 1}
							isLastTab={Object.keys(tabs).length === 1}
							onDeleteTab={(id) => removeTab(id)}
							onChangeActiveTab={setActiveTab}
						/>
					);
				})}
			</div>

			<Button
				className="ml-3 bg-transparent cursor-pointer w-fit p-1"
				type="text"
				icon={<AddTab />}
				onClick={createTab}
			/>
		</div>
	);
}
export default CashierTab;
