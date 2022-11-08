import { DownOutlined } from '@ant-design/icons';
import { Table, Divider } from 'antd';
import * as React from 'react';
import { ColumnProps } from 'antd/lib/table';
/**
 * 基本用法
 * 简单的表格，最后一列是各种操作。
 * 1.render的用法
 */
const columns: ColumnProps<RecordType>[] = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: (text: string) => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age1',
  key: 'age',
  render: (text: MyValue, record: RecordType) => {
    return (
      <span>
        {text?text.age:'xx'}
      </span>
    );
  },
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text: string, record: RecordType) => {
    return (
      <span>
        <a href="#">Action 一 {record.name}</a>
        <Divider type="vertical" />
        <a href="#">Delete</a>
        <Divider type="vertical" />
        <a href="#" className="ant-dropdown-link">
          More actions <DownOutlined />
        </a>
      </span>
    );
  },
}, {
  title: 'my render test',
  key: 'renderTest',
  dataIndex: 'name',
  render: (text: string, record: RecordType) => {
    let fontcss: React.CSSProperties = {
      fontSize: 18,
      // textDecoration:"line-through",
      textDecoration: "underline",
      // fontWeight:"normal"//bold
      // fontWeight:"bolder"
      fontStyle: "italic",
      color: "red",
      backgroundColor: "yellow"
    }
    return (
      <div style={fontcss}><a href="#">{text}</a></div>
    );
  },
}];
class MyValue{
  constructor(public age:number){

  }
}
interface RecordType {
  key: string,
  name: string,
  age: MyValue,
  address: string,
}
const data: RecordType[] = [{
  key: '1',
  name: 'John Brown',
  age: new MyValue(32),
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: new MyValue(42),
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: new MyValue(32),
  address: `Sidney No. 1 Lake Park41
  afadfas
  asdfasfda
  feew
  erwr
  werer
  1123123
  `,
}];
class BasicGrid extends React.Component {
  render() {
    return <Table columns={columns} dataSource={data} />;
  }
}
export { BasicGrid }
