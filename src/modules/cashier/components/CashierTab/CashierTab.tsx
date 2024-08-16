import { Button } from "antd";
import AddTab from "~/assets/icons/AddTab";
import { useCashierStore } from "~/store/cashierStore";
import CashierTabItem from "../CashierTabItem/CashierTabItem";

function CashierTab() {
	const { activeTab, tabs, addNewTab } = useCashierStore((state) => state);

	return (
		<div className="relative flex items-center">
			<div className="flex items-center gap-2 lg:max-w-[70vw] overflow-hidden md:max-w-[60vw] sm:max-w-[20vw]">
				{tabs.map((tab, tabIndex) => {
					return (
						<CashierTabItem
							key={tab.id}
							isActive={tab.id === activeTab}
							tab={tab}
							tabIndex={tabIndex + 1}
						/>
					);
				})}
			</div>

			<Button
				className="ml-3 bg-transparent cursor-pointer w-fit p-1"
				type="text"
				icon={<AddTab />}
				onClick={addNewTab}
			/>
		</div>
	);
}
export default CashierTab;
