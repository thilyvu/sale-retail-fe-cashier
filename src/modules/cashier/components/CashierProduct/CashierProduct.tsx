import { Button, Card, Input, Select } from 'antd';
import React, { useMemo } from 'react';
import EllipsisVertical from '~/assets/icons/EllipsisVertical';
import Minus from '~/assets/icons/Minus';
import PlusNoOutline from '~/assets/icons/PlusNoOutline';
import Trash from '~/assets/icons/Trash';
import { CashierCartItem } from '~/types/product';
import './style.scss';

interface ICashierProductProps {
  children?: React.ReactNode;
  className?: string;
  product: CashierCartItem;
  index: number;
  onRemoveProduct: () => void;
  onChangeQuantity: (value: 'increase' | 'decrease') => void;
}

const CashierProduct = ({ className, product, index, onChangeQuantity, onRemoveProduct }: ICashierProductProps) => {
  const handleChangeUnit = (value: string) => {
    console.log(`selected ${value}`);
  };

  const amount = useMemo(() => product.quantity * product.price, [product.quantity, product.price]);

  return (
    <div className={`${className}`}>
      <Card className="p-2 mx-4 mt-2 custom-card-padding shadow-sm border border-slate-200 transition-all">
        <div className="flex items-center">
          <div className="flex items-center cards-left">
            <p className="mx-2 ">{index}</p>
            <Button
              onClick={() => onRemoveProduct()}
              shape="circle"
              className="bg-transparent cursor-pointer w-fit p-1 border-transparent"
            >
              <Trash className="text-red-500" />
            </Button>
          </div>
          <div className="flex items-center flex-1 cards-content">
            <div className="flex gap-2 items-center w-full">
              <p className="ml-3 text-base">{product.sku}</p>
              <p className="text-base">{product.product_name}</p>
              <p className="ml-2 text-[#FF8800] bg-[#FF88001A] px-1 rounded-md font-semibold">
                {`Tồn: ${product.stock}`}
              </p>
            </div>
            <Select
              className="w-40"
              onChange={handleChangeUnit}
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
              onClick={() => onChangeQuantity('decrease')}
            >
              <Minus />
            </Button>
            <Input
              variant="borderless"
              className="border-solid border border-t-0 border-r-0 border-l-0 rounded-none border-gray-200 w-[60px] text-center"
              value={product.quantity}
            />
            <Button
              shape="circle"
              className="bg-transparent cursor-pointer w-fit p-1 shadow-none"
              onClick={() => onChangeQuantity('increase')}
            >
              <PlusNoOutline />
            </Button>
            <p className="ml-2 w-[5rem] text-center">{product.units[0].price}</p>
            <p className="ml-2 text-right font-bold w-[5rem]">{amount}</p>
            <Button
              shape="circle"
              className="ml-3 bg-transparent border-transparent cursor-pointer w-fit p-1 shadow-none"
            >
              <PlusNoOutline />
            </Button>
            <Button shape="circle" className=" bg-transparent border-transparent cursor-pointer w-fit p-1 shadow-none">
              <EllipsisVertical />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CashierProduct;
