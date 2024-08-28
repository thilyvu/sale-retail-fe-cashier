import { Input, Space, Spin } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import ProductSelectItem from "./components/ProductSelectItem/ProductSelectItem";
import useDebounce from "~/hooks/useDebounce";
import { searchProduct } from "~/api/product";
import { toast } from "react-toastify";
import { ESProductDocument } from "~/types/product";
import { useCashierStore } from "../../stores/cashierStore";

function ProductSelect() {
  const { addProduct } = useCashierStore((state) => state);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<Array<ESProductDocument>>([]);
  const debounceKeyword = useDebounce(keyword, 300);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setKeyword("");
        setProducts([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!debounceKeyword) {
      setProducts([]);
      return;
    }
    setLoading(true);
    async function getProduct() {
      try {
        const result = await searchProduct(debounceKeyword, 10);
        setProducts(result);
        setLoading(false);
      } catch (error) {
        toast.error(error as string);
        setLoading(false);
      }
    }
    getProduct();
  }, [debounceKeyword]);
  const handleChangeKeyWord = async (keyword: string) => {
    setKeyword(keyword);
  };
  const handleAddProduct = (product: ESProductDocument) => () => {
    addProduct({ ...product, quantity: 1 });
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
      <div ref={containerRef}>
        {loading ? (
          <div className="absolute bg-white top-[56px]  left-[12px] w-full min-h-[150px] z-40 rounded-lg flex items-center flex-col justify-center shadow-lg">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
        ) : (
          keyword && (
            <div className="absolute bg-white top-[56px]  left-[12px] w-full min-h-[150px] z-40 rounded-lg flex items-center flex-col justify-center shadow-lg">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductSelectItem
                    onAddProduct={handleAddProduct(product)}
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
          )
        )}
      </div>
    </Space.Compact>
  );
}

export default ProductSelect;
