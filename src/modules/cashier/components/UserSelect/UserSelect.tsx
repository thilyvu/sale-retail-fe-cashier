import { Select } from 'antd';

function UserSelect() {
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };
  return (
    <Select
      showSearch
      placeholder="Khách lẻ"
      optionFilterProp="label"
      allowClear
      onChange={onChange}
      variant="borderless"
      className="border-solid border border-t-0 border-r-0 border-l-0 rounded-none border-gray-200"
      onSearch={onSearch}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'tom',
          label: 'Tom',
        },
      ]}
    />
  );
}
export default UserSelect;
