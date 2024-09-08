import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CashierCartItem } from '~/types/product';
import { DiscountType, PaymentMethod } from '../types';

export interface ITab {
  id: string;
  products: Record<string, CashierCartItem>;
  customer_id: string | null;
  payment_method: PaymentMethod;
  total_amount: number;
  customer_paid_amount: number;
  discount_type: DiscountType;
  discount_value: number;
}

interface ICashierState {
  tabs: Record<string, ITab>;
  activeTab: string;
}

interface ICashierAction {
  setActiveTab: (tabId: string) => void;
  createTab: () => void;
  removeTab: (id: string) => void;
  addProduct: (product: CashierCartItem) => void;
  changeDiscountType: (type: DiscountType) => void;
  changeProductQuantity: (unit_id: string, type: 'increase' | 'decrease') => void;
  removeProduct: (id: string) => void;
  removeAllProducts: () => void;
  getActiveTabProducts: () => Array<CashierCartItem> | undefined;
}

function generateTabId() {
  return Date.now().toString();
}
const defaultTabId = generateTabId();
export const useCashierStore = create<ICashierState & ICashierAction>()(
  persist(
    (set, get) => ({
      tabs: {
        [defaultTabId]: {
          id: defaultTabId,
          products: {},
          customer_id: null,
          payment_method: PaymentMethod.CASH,
          total_amount: 0,
          customer_paid_amount: 0,
          discount_type: DiscountType.AMOUNT,
          discount_value: 0,
        },
      },
      activeTab: defaultTabId,
      // Actions
      setActiveTab: (tabId) => set({ activeTab: tabId }),
      createTab: () =>
        set((state) => {
          const id = generateTabId();
          return {
            tabs: {
              ...state.tabs,
              [id]: {
                id: id,
                products: {},
                customer_id: null,
                payment_method: PaymentMethod.CASH,
                total_amount: 0,
                customer_paid_amount: 0,
                final_amount: 0,
                discount_type: DiscountType.AMOUNT,
                discount_value: 0,
              },
            },
            activeTab: id,
          };
        }),
      removeTab: (id) =>
        set((state) => {
          const tabValues = Object.values(state.tabs);
          const remainTabs = tabValues.filter((tab) => tab.id !== id);
          const remainTabRecord = remainTabs.reduce((acc, tab) => {
            acc[tab.id] = tab;
            return acc;
          }, {} as Record<string, ITab>);
          if (state.activeTab === id) {
            const currentIndex = tabValues.findIndex((tab) => tab.id === id);
            const nextTab =
              currentIndex === tabValues.length - 1 ? remainTabs[currentIndex - 1] : remainTabs[currentIndex];

            return {
              tabs: remainTabRecord,
              activeTab: nextTab ? nextTab.id : remainTabs[0]?.id,
            };
          }
          return { tabs: remainTabRecord };
        }),
      changeProductQuantity: (unit_id: string, type: 'increase' | 'decrease') => {
        set((state) => {
          const tab = state.tabs[state.activeTab];
          if (!tab) return state;

          const targetProduct = tab.products[unit_id];

          if (!targetProduct) return state;

          let updatedProducts: Record<string, CashierCartItem> = tab.products;

          if (targetProduct.quantity === 1 && type === 'decrease') {
            delete updatedProducts[unit_id];
          } else {
            updatedProducts = {
              ...updatedProducts,
              [unit_id]: {
                ...targetProduct,
                quantity:
                  type === 'increase'
                    ? (tab.products[unit_id].quantity || 0) + 1
                    : (tab.products[unit_id].quantity || 0) - 1,
              },
            };
          }

          const total_amount = Object.values(updatedProducts).reduce((acc, product) => {
            return acc + (product.price * product.quantity || 0);
          }, 0);

          const final_amount =
            total_amount -
            (tab.discount_type === DiscountType.AMOUNT
              ? tab.discount_value
              : (total_amount * tab.discount_value) / 100);

          const newTab = { ...tab, products: updatedProducts, total_amount, final_amount };

          return {
            tabs: {
              ...state.tabs,
              [state.activeTab]: newTab,
            },
          };
        });
      },

      addProduct: (product) =>
        set((state) => {
          const tab = state.tabs[state.activeTab];
          if (!tab) return state;

          const updatedProducts: Record<string, CashierCartItem> = tab.products;

          if (tab.products[product.unit_id]) {
            updatedProducts[product.unit_id] = {
              ...tab.products[product.unit_id],
              quantity: (tab.products[product.unit_id].quantity || 0) + (product.quantity || 1),
            };
          } else {
            updatedProducts[product.unit_id] = product;
          }

          const total_amount = Object.values(updatedProducts).reduce((acc, product) => {
            return acc + (product.price * product.quantity || 0);
          }, 0);

          const final_amount =
            total_amount -
            (tab.discount_type === DiscountType.AMOUNT
              ? tab.discount_value
              : (total_amount * tab.discount_value) / 100);

          const newTab = { ...tab, products: updatedProducts, total_amount, final_amount };

          return { tabs: { ...state.tabs, [state.activeTab]: newTab } };
        }),

      removeProduct: (productUnitId) =>
        set((state) => {
          const tab = state.tabs[state.activeTab];
          if (!tab) return state;

          const updatedProducts = tab.products;
          delete updatedProducts[productUnitId];

          const total_amount = Object.values(updatedProducts).reduce((acc, product) => {
            return acc + (product.price * product.quantity || 0);
          }, 0);

          const final_amount =
            total_amount -
            (tab.discount_type === DiscountType.AMOUNT
              ? tab.discount_value
              : (total_amount * tab.discount_value) / 100);

          const newTab = { ...tab, products: updatedProducts, total_amount, final_amount };

          return { tabs: { ...state.tabs, [state.activeTab]: newTab } };
        }),

      removeAllProducts: () =>
        set((state) => {
          const tab = state.tabs[state.activeTab];
          if (!tab) return state;
          const newTab = {
            ...tab,
            products: {},
          };
          return {
            tabs: { ...state.tabs, [state.activeTab]: newTab },
          };
        }),

      getActiveTabProducts: () => {
        const state = get();
        const activeTab = state.tabs[state.activeTab];
        return Object.values(activeTab?.products) || []; // Returns products of active tab
      },

      changeDiscountType: (type) =>
        set((state) => {
          const tab = state.tabs[state.activeTab];
          if (!tab) return state;
          const discount_value =
            type === DiscountType.AMOUNT ? tab.discount_value : (tab.total_amount * tab.discount_value) / 100;

          const newTab = { ...tab, discount_type: type, discount_value };

          return { tabs: { ...state.tabs, [state.activeTab]: newTab } };
        }),
    }),

    {
      name: 'cashier-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
