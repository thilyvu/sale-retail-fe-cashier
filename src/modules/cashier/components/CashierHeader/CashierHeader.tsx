import { MenuOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, MenuProps } from "antd";
import OrderIcon from "~/assets/icons/Order";
import ProductSelect from "../ProductSelect";
import CashierTab from "../CashierTab/CashierTab";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/modules/auth/hooks";
import { useEffect } from "react";
import router from "~/routes/routers";

function CashierHeader() {
  const navigate = useNavigate();
  const { loading, account, signOut } = useAuth();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <p className="text-black"> {account?.full_name}</p>
          <p className="text-[#646464]">{account?.email}</p>
          <Divider className="my-0" />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="flex items-center gap-3 text-danger"
          onClick={() => signOut()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          Đăng xuất
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (!loading && !account) {
      navigate(router.auth.signIn);
    }
  }, [loading, account]);
  return (
    <div className="bg-primary flex justify-between">
      <div className="flex items-center">
        <ProductSelect />
        <CashierTab />
      </div>
      <div className="flex items-center justify-between">
        <Button className="bg-transparent cursor-pointer w-fit p-1" type="text">
          <OrderIcon />
        </Button>
        <Divider
          type="vertical"
          style={{ borderColor: "white", height: "2rem" }}
        />
        <Dropdown menu={{ items }} placement="bottom">
          <Button
            className="bg-transparent cursor-pointer w-fit p-1 mr-4 ml-1"
            type="text"
          >
            <MenuOutlined className="text-white text-[1.5rem]" />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}

export default CashierHeader;
