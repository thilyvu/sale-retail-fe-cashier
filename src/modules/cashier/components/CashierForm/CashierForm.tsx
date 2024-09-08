import { Button, Card, Form, Input, InputNumber, InputNumberProps, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import Icons from '~/assets/icons';
import { formatCurrency } from '~/helper/formatter';
import { useCashierStore } from '../../stores/cashierStore';
import { DiscountType } from '../../types';
import UserSelect from '../UserSelect';

const { Option } = Select;

interface ICashierFormProps {
  children?: React.ReactNode;
  className?: string;
}
type LayoutType = Parameters<typeof Form>[0]['layout'];
function CashierForm({ children, className }: ICashierFormProps) {
  const { tabs, activeTab, changeDiscountType } = useCashierStore((state) => state);

  const [discountType, setDiscountType] = useState(tabs[activeTab].discount_type);

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const cartQuantity = useMemo(
    () => Object.values(tabs[activeTab].products).reduce((sum, item) => sum + item.quantity, 0),
    [activeTab, tabs]
  );

  const totalAmount = useMemo(
    () => Object.values(tabs[activeTab].products).reduce((sum, item) => sum + item.price * item.quantity, 0),
    [activeTab, tabs]
  );

  const [customerNeedToPay, setCustomerNeedToPay] = useState(totalAmount);

  const onChangeDiscountValue: InputNumberProps['onChange'] = (value) => {
    console.log('onChangeDiscountValue', value);
  };

  const onChangeCustomerPaid: InputNumberProps['onChange'] = (value) => {
    setCustomerNeedToPay((value as number) || 0);
  };

  const onChangeDiscountType = (value: DiscountType) => {
    setDiscountType(value);
    changeDiscountType(value);
  };

  const selectAfter = (
    <Select
      defaultValue={DiscountType.AMOUNT}
      value={discountType}
      onChange={onChangeDiscountType}
      style={{ width: 60 }}
    >
      <Option value={DiscountType.AMOUNT}>{'đ'}</Option>
      <Option value={DiscountType.PERCENTAGE}>{'%'}</Option>
    </Select>
  );

  useEffect(() => {
    setCustomerNeedToPay(totalAmount);
  }, [totalAmount]);

  return (
    <Card className={`${className} mt-2`} bordered={false}>
      <Form form={form} initialValues={{ layout: formLayout }} onValuesChange={onFormLayoutChange}>
        <Form.Item>
          <UserSelect />
        </Form.Item>
        <div className="flex items-center justify-between mt-7">
          <p className="text-[#646464]">{`Tổng tiền (${cartQuantity} sản phẩm) `}</p>{' '}
          <p className="text-black">{formatCurrency(totalAmount, true)}</p>
        </div>
        <Form.Item>
          <div className="flex items-center justify-between mt-7">
            <div className="flex items-center w-[10rem] flex-shrink-0">
              <p className="text-[#646464]">Giảm giá </p>
            </div>
            <InputNumber<number>
              defaultValue={tabs[activeTab].discount_value}
              addonAfter={selectAfter}
              onChange={onChangeDiscountValue}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
              placeholder="Giảm giá"
              className="flex-1"
            />
          </div>
        </Form.Item>
        <div className="flex items-center justify-between mt-7">
          <div className="flex items-center w-[10rem]">
            <p className="text-[#646464]">Khách cần trả</p>
          </div>
          <p className="text-black">{formatCurrency(0, true)}</p>
        </div>
        <Form.Item>
          <div className="flex items-center justify-between mt-7">
            <div className="flex items-center w-[10rem] flex-shrink-0">
              <p className="text-[#646464]">Khách thanh toán </p>
            </div>
            <InputNumber<number>
              value={customerNeedToPay}
              addonAfter="đ"
              step={500}
              onChange={onChangeCustomerPaid}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
              className="flex-1"
              placeholder="Khách thanh toán"
            />
          </div>
        </Form.Item>
        <div className="flex items-center justify-between mt-7">
          <div className="flex items-center">
            <p className="text-[#646464]">Tiền thừa trả khách</p>
          </div>
          <p className="text-black">{formatCurrency(0, true)}</p>
        </div>
        <Form.Item className="absolute bottom-0 w-[calc(100%-48px)]">
          <Input
            variant="borderless"
            placeholder="Nhập ghi chú"
            prefix={<Icons.Pencil />}
            className="mb-2 border-solid border border-t-0 border-r-0 border-l-0 rounded-none border-gray-200"
          />
          <Button size="large" color="#2F4858" type="primary" className="bg-primary w-full">
            THANH TOÁN
          </Button>
        </Form.Item>
      </Form>
      {children}
    </Card>
  );
}
export default CashierForm;
