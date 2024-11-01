import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, InputRef, Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { searchProduct } from '~/api/product';
import useDebounce from '~/hooks/useDebounce';
import { ESProductDocument } from '~/types/product';
import { useCashierStore } from '../../stores/cashierStore';
import { ProductSelectItem } from './components';

function ProductSelect() {
  const { activeTab, addProduct } = useCashierStore((state) => state);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [products, setProducts] = useState<Array<ESProductDocument>>([]);
  const debounceKeyword = useDebounce(keyword, 300);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    setKeyword('');
    setProducts([]);
    setShowResult(false);
  }, [activeTab]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        inputRef.current?.input &&
        !containerRef.current.contains(event.target as Node) &&
        !inputRef.current.input.contains(event.target as Node)
      ) {
        setShowResult(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!debounceKeyword || debounceKeyword.trim() === '') {
      setProducts([]);
      return;
    }
    setLoading(true);
    async function getProduct() {
      try {
        const result = await searchProduct(debounceKeyword.trim(), 10);
        setProducts(result);
        setShowResult(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setShowResult(false);
      }
    }
    getProduct();
  }, [debounceKeyword]);

  const handleChangeKeyWord = async (keyword: string) => {
    setKeyword(keyword);
  };
  const handleAddProduct = (product: ESProductDocument) => () => {
    addProduct({ ...product, quantity: 1 });
    setShowResult(false);
  };
  return (
    <div className="relative ml-3">
      <Input
        ref={inputRef}
        value={keyword}
        size="large"
        onChange={(e) => handleChangeKeyWord(e.target.value)}
        className="font-body w-[400px] !rounded-se-md !rounded-ee-md"
        placeholder="Tìm kiếm sản phẩm"
        onFocus={() => {
          if (keyword.trim() !== '') {
            setShowResult(true);
          }
        }}
        prefix={<SearchOutlined />}
      />
      {loading ? (
        <div
          ref={containerRef}
          className="bg-white absolute top-[56px] left-0 w-full z-50 rounded-lg flex items-center flex-col justify-center shadow-lg min-h-[150px]"
        >
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        showResult && (
          <div
            ref={containerRef}
            className="absolute top-[110%] left-0 w-full bg-white z-40 rounded-lg shadow-2xl py-1 border border-slate-200"
          >
            {products.length > 0 ? (
              <div className="w-full h-full max-h-[30rem] overflow-y-auto px-1">
                {products.map((product) => (
                  <ProductSelectItem
                    onAddProduct={handleAddProduct(product)}
                    key={product.unit_id}
                    className="w-full flex py-2 hover:bg-blue-500 hover:bg-opacity-10 rounded-md transition-all"
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="min-h-[150px] flex items-center justify-center w-full h-full">
                Không tìm thấy kết quả nào phù hợp
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default ProductSelect;
