import { Button, Card, Form, Input, Radio } from "antd";
import { useState } from "react";
import UserSelect from "../UserSelect";
import { formatCurrency } from "~/helper/formatter";
import Icons from "~/assets/icons";
interface ICashierFormProps {
  children: React.ReactNode;
  className?: string;
}
type LayoutType = Parameters<typeof Form>[0]["layout"];
function CashierForm({ children, className }: ICashierFormProps) {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  return (
    <Card className={` ${className}  mt-6 mr-6`} bordered={false}>
      <Form
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item>
          <UserSelect></UserSelect>
        </Form.Item>
        <div className="flex items-center justify-between mt-7">
          <p className="text-[#646464]">Tổng tiền (0 sản phẩm) </p>{" "}
          <p className="text-black">{formatCurrency(0, true)}</p>
        </div>
        <Form.Item>
          <div className="grid grid-cols-4 mt-7">
            <div className="flex items-center">
              <p className="text-[#646464]">Giảm giá </p>
            </div>
            <Input
              variant="borderless"
              placeholder="Nhập giảm giá"
              className="col-span-3 border-solid border border-t-0 border-r-0 border-l-0 rounded-none border-gray-200"
            ></Input>
          </div>
        </Form.Item>
        <div className="flex items-center justify-between mt-7">
          <div className="flex items-center">
            <p className="text-[#646464]">Khách cần trả</p>
          </div>
          <p className="text-black">{formatCurrency(0, true)}</p>
        </div>
        <Form.Item>
          <div className="grid grid-cols-3 mt-7">
            <div className="flex items-center">
              <p className="text-[#646464]">Khách thanh toán </p>
            </div>
            <Input
              variant="borderless"
              placeholder="Nhập thanh toán"
              className="col-span-2 border-solid border border-t-0 border-r-0 border-l-0 rounded-none border-gray-200"
            ></Input>
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
          ></Input>
          <Button type="default" className="bg-primary text-white w-full  ">
            THANH TOÁN
          </Button>
        </Form.Item>
      </Form>
      {children}
    </Card>
  );
}
export default CashierForm;
