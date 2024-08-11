import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function ProductSelect() {
  return (
    <Space.Compact size="middle">
      <Input
        className=" m-2 ml-3"
        style={{ width: "200px", height: "40px" }}
        placeholder="Tìm kiếm sản phẩm"
        prefix={<SearchOutlined />}
      />
    </Space.Compact>
  );
}

export default ProductSelect;
