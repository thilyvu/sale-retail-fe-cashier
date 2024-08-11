import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import CashierHeader from "./components/CashierHeader";

const { Header, Footer } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const MainLayout: React.FC = () => {
  return (
    <Layout>
      <CashierHeader />
      <Outlet></Outlet>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;
