import { create } from "zustand";

export interface ITab {
	id: string;
}
interface IState {
	tabs: Array<ITab>;
	activeTab: string | null;
	setTabs: (tabs: Array<ITab>) => void;
	setActiveTab: (tabId: string) => void;
	addNewTab: () => void;
}

function generateTabId() {
	return Date.now().toString();
}

export const useCashierStore = create<IState>((set) => ({
	tabs: [],
	activeTab: null,
	setTabs: (tabs) => set({ tabs }),
	setActiveTab: (tabId) => set({ activeTab: tabId }),
	addNewTab: () =>
		set((state) => {
			const id = generateTabId();
			return {
				tabs: [...state.tabs, { id: id }],
				activeTab: id,
			};
		}),
}));
