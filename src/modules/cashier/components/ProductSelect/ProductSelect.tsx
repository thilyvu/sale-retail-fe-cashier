import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ProductSelectItem from "./components/ProductSelectItem/ProductSelectItem";
import useDebounce from "~/hooks/useDebounce";
import { searchProduct } from "~/api/product";
import { toast } from "react-toastify";
import { ESProductDocument } from "~/types/product";

function ProductSelect() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<Array<ESProductDocument>>([]);
  const debounceKeyword = useDebounce(keyword, 300);
  useEffect(() => {
    async function getProduct() {
      try {
        const result = await searchProduct(debounceKeyword, 10);
        setProducts(result);
      } catch (error) {
        toast.error(error as string);
      }
    }
    getProduct();
  }, [debounceKeyword]);
  const handleChangeKeyWord = async (keyword: string) => {
    setKeyword(keyword);
    console.log(keyword);
  };
  return (
    <Space.Compact size="middle" className="relative">
      <Input
        value={keyword}
        onChange={(e) => handleChangeKeyWord(e.target.value)}
        className="m-2 ml-3 w-[400px] h-10"
        placeholder="Tìm kiếm sản phẩm"
        prefix={<SearchOutlined />}
      />
      {keyword && (
        <div className="absolute bg-white top-[56px]  left-[12px] w-full min-h-[150px] z-40 rounded-lg flex items-center flex-col justify-center shadow-lg">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductSelectItem
                key={product.unit_id}
                className="w-full flex mt-2 pb-2 hover:bg-blue-500 hover:bg-opacity-10"
                product={product}
              >
                {" "}
              </ProductSelectItem>
            ))
          ) : (
            <div className="text-center">
              {" "}
              Không tìm thấy kết quả nào phù hợp
            </div>
          )}
        </div>
      )}
    </Space.Compact>
  );
}

export default ProductSelect;
