import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { OrderStatus } from "../type/type";
import { ESProductDocument } from "~/types/product";

export interface ITab {
  id: string;
  products?: Array<ESProductDocument> | undefined;
  customer_id?: string;
  payment_method?: string;
  total_amount?: number;
  customer_paid_amount?: number;
  final_amount?: number;
  discount_type?: string;
  discount_value?: number;
  status?: OrderStatus;
}

interface IState {
  tabs: Array<ITab>;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  createTab: () => void;
  removeTab: (id: string) => void;
  addProduct: (product: ESProductDocument) => void;
  changeProductQuantity: (productId: string, type: string) => void;
  removeProduct: (id: string) => void;
  removeAllProducts: () => void;
  getActiveTabProducts: () => Array<ESProductDocument> | undefined;
}

function generateTabId() {
  return Date.now().toString();
}
const defaultTabId = generateTabId();
export const useCashierStore = create(
  persist<IState>(
    (set, get) => ({
      tabs: [
        {
          id: defaultTabId,
          products: [],
        },
      ],
      activeTab: defaultTabId,
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
      changeProductQuantity: (productId: string, type: string) => {
        set((state) => {
          const tab = state.tabs.find((tab) => tab.id === state.activeTab);
          if (!tab) return state;

          // Update products array
          const updatedProducts = (tab.products as Array<ESProductDocument>)
            .map((p) =>
              p.id === productId
                ? {
                    ...p,
                    quantity:
                      type === "increase"
                        ? (p.quantity || 0) + 1
                        : (p.quantity || 0) - 1,
                  }
                : p
            )
            .filter((p) => p.quantity || 0 > 0);

          const newTab = {
            ...tab,
            products: updatedProducts,
          };

          return {
            tabs: state.tabs.map((tab) =>
              tab.id === state.activeTab ? newTab : tab
            ),
          };
        });
      },

      addProduct: (product: ESProductDocument) =>
        set((state) => {
          const tab = state.tabs.find((tab) => tab.id === state.activeTab);
          if (!tab) return state;
          const existingProductIndex = (
            tab.products as Array<ESProductDocument>
          ).findIndex((p) => p.unit_id === product.unit_id);

          let updatedProducts;

          if (existingProductIndex > -1) {
            updatedProducts = (tab.products as Array<ESProductDocument>).map(
              (p, index) =>
                index === existingProductIndex
                  ? {
                      ...p,
                      quantity: (p.quantity || 0) + (product.quantity || 1),
                    }
                  : p
            );
          } else {
            updatedProducts = [
              ...(tab.products as Array<ESProductDocument>),
              product,
            ];
          }
          const newTab = {
            ...tab,
            products: updatedProducts,
          };

          return {
            tabs: state.tabs.map((tab) =>
              tab.id === state.activeTab ? newTab : tab
            ),
          };
        }),
      removeProduct: (productUnitId: string) =>
        set((state) => {
          const tab = state.tabs.find((tab) => tab.id === state.activeTab);
          if (!tab) return state;
          const newTab = {
            ...tab,
            products: (tab.products as Array<ESProductDocument>).filter(
              (p) => p.unit_id !== productUnitId
            ),
          };
          return {
            tabs: state.tabs.map((tab) =>
              tab.id === state.activeTab ? newTab : tab
            ),
          };
        }),
      removeAllProducts: () =>
        set((state) => {
          const tab = state.tabs.find((tab) => tab.id === state.activeTab);
          if (!tab) return state;
          const newTab = {
            ...tab,
            products: [],
          };
          return {
            tabs: state.tabs.map((tab) =>
              tab.id === state.activeTab ? newTab : tab
            ),
          };
        }),
      getActiveTabProducts: () => {
        const state = get();
        const activeTab = state.tabs.find((tab) => tab.id === state.activeTab);
        return activeTab?.products || []; // Returns products of active tab
      },
    }),

    {
      name: "cashier-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
