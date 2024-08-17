import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ITab {
	id: string;
}

interface IState {
	tabs: Array<ITab>;
	activeTab: string;
	setActiveTab: (tabId: string) => void;
	createTab: () => void;
	removeTab: (id: string) => void;
}

function generateTabId() {
	return Date.now().toString();
}

export const useCashierStore = create(
	persist<IState>(
		(set) => ({
			tabs: [],
			activeTab: "",
			setActiveTab: (tabId) => set({ activeTab: tabId }),
			createTab: () =>
				set((state) => {
					const id = generateTabId();
					return {
						tabs: [...state.tabs, { id: id }],
						activeTab: id,
					};
				}),
			removeTab: (id) =>
				set((state) => {
					const remainTabs = state.tabs.filter((tab) => tab.id !== id);
					if (state.activeTab === id) {
						const currentIndex = state.tabs.findIndex((tab) => tab.id === id);
						const nextTab =
							currentIndex === state.tabs.length - 1
								? remainTabs[currentIndex - 1]
								: remainTabs[currentIndex];
						return {
							tabs: remainTabs,
							activeTab: nextTab ? nextTab.id : remainTabs[0]?.id,
						};
					}
					return { tabs: remainTabs };
				}),
		}),
		{
			name: "cashier-store",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
