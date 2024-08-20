import { Layout } from "antd";
import { CashierHeader } from "../components";
import CashierContent from "../components/CashierContent";

export default function Cashier() {
  return (
    <Layout>
      <CashierHeader />
      <CashierContent />
    </Layout>
  );
}
