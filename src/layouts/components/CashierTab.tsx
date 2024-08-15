import { useState } from "react";
import CashierTabItem from "./CashierTabItem";
import "./CashierTab.scss";
import { Button } from "antd";
import AddTab from "~/assets/icons/AddTab";
export interface ITab {
  id: number;
}

function CashierTab() {
  const id = Math.random();
  const [tabs, setTabs] = useState([{ id }]);
  const [activeTab, setActiveTab] = useState(id);
  const handleAddTab = () => {
    const id = Math.random();
    setTabs((previousTab) => [...previousTab, { id }]);
    setActiveTab(id);
  };
  const handleDeleteTab = (id: number) => {
    const newTabs = tabs.filter((item) => item.id !== id);
    setTabs(newTabs);
    setTimeout(() => {
      setActiveTab(newTabs[newTabs.length - 1].id);
    }, 0);
  };
  const handleChangeActiveTab = (id: number) => {
    setActiveTab(id);
  };
  return (
    <div className="ml-3 flex-item tab-wrapper">
      <div className="tab-container lg:max-w-[70vw] lg:overflow-hidden md:max-w-[60vw] md:overflow-hidden sm:max-w-[20vw] sm:overflow-hidden">
        {tabs.map((tab, tabIndex) => (
          <CashierTabItem
            className={
              activeTab === tab.id
                ? "tab-container__active"
                : "tab-container__deActive"
            }
            onChangeActiveTab={(id: number) => handleChangeActiveTab(id)}
            onDeleteTab={(id: number) => handleDeleteTab(id)}
            tab={tab}
            tabs={tabs}
            tabIndex={tabIndex + 1}
            key={tab.id}
          />
        ))}
      </div>

      <Button
        className="ml-3 button-cover"
        type="text"
        icon={<AddTab />}
        onClick={handleAddTab}
      ></Button>
    </div>
  );
}
export default CashierTab;
