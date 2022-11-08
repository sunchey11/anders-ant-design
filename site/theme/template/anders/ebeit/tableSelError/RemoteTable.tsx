/**
 * 远程表格
 * @author Anders
 */
import { Divider, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import * as React from "react";

import { DatabaseFilled, DownOutlined } from '@ant-design/icons';
import { TableRow } from "./TableRow";
import { TableTd } from "./TableTd";

const columns: ColumnProps<RecordType>[] = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a href="#">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age1',
    key: 'age',
    render: (text: MyValue, record: RecordType, i:number) => {
        if(i===0){
            console.log('column render '+ i);
        }
        return (
            <span>
                {text ? text.age : 'xx'}
            </span>
        );
    },
    onCell : (data: RecordType, i): any => {
        return {
            dataIndex: 'age1',
            rowIndex:i
        }
    }
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
class MyValue {
    constructor(public age: number) {

    }
}
interface RecordType {
    key: string,
    name: string,
    age: MyValue,
    address: string,
}
const data: RecordType[] = [];
for (let i = 0; i < 5; i++) {
    data.push({
        key: i.toString(),
        name: 'user' + i,
        age: new MyValue(10000 + i),
        address: 'xian' + i,
    })

}

/**
 * 属性
 */
interface RemoteTableProps {



}
/**
 * 远程数据表格的状态定义
 */
interface RemoteTableState {
    /**
     * 游标行
     */
    cursorRowKey?: string | number;
    /**
     * 当前选中行
     */
    selectedRowKeys: React.Key[];


}
/**
 * 读取远程数据的表格,在antd Table控件的基础上，增加了通过Store读取分页数据的表格
 * T为每行数据的类型
 */
export class RemoteTable extends React.Component<RemoteTableProps, RemoteTableState> {
    private components = {
        body: {
            // row 属性是一个控件类
            row: TableRow,
            // cell: TableTd
        },
    };
    /**
     * 当前选中行,不应该使用此属性，应该使用state中的属性
     * 因为RemoteTable.onSelectChange调用以后，马上会引起tablerow重画，此时state中的check还没更新，导致行不重画
     */
    selectedRowKeysInControl: React.Key[] = [];
    public constructor(props: Readonly<RemoteTableProps>) {
        super(props);
        this.state = { selectedRowKeys: [] }
    }
    /**
     * 渲染表格
     */
    render() {
        const onSelectChange = (selectedRowKeys: string[] | number[], selectedRows: RecordType[]) => {
            this.selectedRowKeysInControl.splice(0, this.selectedRowKeysInControl.length);
            this.selectedRowKeysInControl.push(...selectedRowKeys);
            this.setState({ selectedRowKeys: selectedRowKeys });
        }
        let rowSelection: TableRowSelection<RecordType> = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: onSelectChange
        };

        return (
            <>
                <Table<RecordType>
                    pagination={false}
                    onRow={this.onRow}
                    components={this.components}
                    dataSource={data}
                    columns={columns}
                    rowSelection={rowSelection}
                    rowClassName={this.setRowClassName}
                >
                </Table>
            </>
        );
    }

    /**
     * 渲染行
     */
    private onRow = (record: RecordType, index?: number): any => {
        if (index || index === 0) {
            const onRowClick = async (event: any, arg2: any): Promise<void> => {
                this.setState({ cursorRowKey: record.key, selectedRowKeys: [record.key] });
            };
            const key: string = record.key;
            let rowProps: any = {
                index: index,
                onClick: onRowClick,
                checkedInControl: this.selectedRowKeysInControl.includes(key),
            };

            return rowProps;
        }

    }
    /**
     * 高亮被选中行
     * 隔行变色
     */
    private setRowClassName = (record: RecordType, index: number): string => {
        const cursorRowKey = this.state.cursorRowKey;
        const key = record.key;
        if ((cursorRowKey || cursorRowKey === 0) && (cursorRowKey === key)) {
            return 'ant-table-row-selected';
        } else {
            return 'ant-table-row-custom';
        }
    }
}
