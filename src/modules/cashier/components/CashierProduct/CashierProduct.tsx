import React from "react";
import { IProduct } from "../CashierCart/CashierCart";
import { Button, Card, Input, Select } from "antd";
import "./style.scss";
import Trash from "~/assets/icons/Trash";
import PlusNoOutline from "~/assets/icons/PlusNoOutline";
import Minus from "~/assets/icons/Minus";
import EllipsisVertical from "~/assets/icons/EllipsisVertical";
import { ESProductDocument } from "~/types/product";
import { useCashierStore } from "../../stores/cashierStore";
interface ICashierProductProps {
  children: React.ReactNode;
  className?: string;
  product: ESProductDocument;
  index: number;
  onRemoveProduct: () => void;
  onChangeQuantity: (value: string) => void;
}
const CashierProduct = ({
  children,
  className,
  product,
  index,
  onChangeQuantity,
  onRemoveProduct,
}: ICashierProductProps) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className={`${className}`}>
      <Card className=" p-2 mx-4 mt-2   custom-card-padding ">
        <div className="flex items-center">
          <div className="flex items-center cards-left">
            <p className="mx-2 ">{index}</p>
            <Button
              onClick={() => onRemoveProduct()}
              shape="circle"
              className="bg-transparent cursor-pointer w-fit p-1 border-transparent shadow-none"
            >
              <Trash className="text-red-500" />
            </Button>
          </div>
          <div className="flex items-center flex-1 cards-content">
            <p className="ml-3 w-[10rem] max-w-[10rem] min-w-[10rem] break-words">
              {product.sku}
            </p>
            <div className="flex flex-1 flex-row">
              <p>{product.product_name}</p>
              <p className="ml-2 text-[#FF8800] bg-[#FF88001A] px-1 rounded-md">
                {product.stock}
              </p>
            </div>
            <Select
              defaultValue="lon"
              onChange={handleChange}
              value={product.unit_id}
              options={product.units.map((unit) => ({
                label: unit.name,
                value: unit.id,
              }))}
            />
          </div>
          <div className="ml-5 flex items-center">
            <Button
              shape="circle"
              className="bg-transparent cursor-pointer w-fit p-1 shadow-none"
              onClick={() => onChangeQuantity("decrease")}
            >
              <Minus />
            </Button>
            <Input
              variant="borderless"
              className="border-solid border border-t-0 border-r-0 border-l-0 rounded-none border-gray-200 w-[60px] text-center"
              value={product.quantity}
            ></Input>
            <Button
              shape="circle"
              className="bg-transparent cursor-pointer w-fit p-1 shadow-none"
              onClick={() => onChangeQuantity("increase")}
            >
              <PlusNoOutline />
            </Button>
            <p className="ml-3 w-[8rem] max-w-[8rem] min-w-[8rem] text-right">
              {product.units[0].price}
            </p>
            <Button
              shape="circle"
              className="ml-3 bg-transparent border-transparent cursor-pointer w-fit p-1 shadow-none"
            >
              <PlusNoOutline />
            </Button>
            <Button
              shape="circle"
              className=" bg-transparent border-transparent cursor-pointer w-fit p-1 shadow-none"
            >
              <EllipsisVertical />
            </Button>
          </div>
        </div>
      </Card>
      <p></p>
      {children}
    </div>
  );
};

export default CashierProduct;
