/**
 * @author Anders
 */

import * as React from "react";

/**
 * 属性
 */
interface TableTdProps {
    dataIndex: string;
    rowIndex: number;
    children: React.ReactNode[];
}
/**
 * 状态
 */
interface TableTdState {

}
/**
 * 画表格行
 */
export class TableTd extends React.Component<TableTdProps, TableTdState>{
    constructor(props: TableTdProps) {
        super(props);
    }
    shouldComponentUpdate(nextProps: TableTdProps, nextState: TableTdState, nextContext: any) {
        const { dataIndex, rowIndex, ...other } = this.props;

        const thisChildren: React.ReactNode[] = this.props.children;
        const nextChildren: React.ReactNode[] = nextProps.children;

        if (this.props.rowIndex === 0 && this.props.dataIndex === "age1") {
            console.log('scu');
        }
        if (dataIndex === nextProps.dataIndex &&
            this.compareChildren(thisChildren, nextChildren) &&
            rowIndex === nextProps.rowIndex) {
            return false;
        }
        return true;
    }
    /**
     * 画行
     */
    render(): React.ReactNode {

        const { rowIndex, dataIndex, ...others } = this.props;
        if (this.props.rowIndex === 0 && this.props.dataIndex === "age1") {
            console.log('age1');
        }
        return <td {...others} />;
    }
    /**
  * 判断两个数组是否相等
  */
    private compareChildren(thisChildren: React.ReactNode[], nextChildren: React.ReactNode[]): boolean {
        if (thisChildren.length !== nextChildren.length) {
            return false;
        }
        for (let i = 0; i < thisChildren.length; i++) {
            const c1: any = thisChildren[i];
            const c2: any = nextChildren[i];
            if (c1 !==undefined && c2!==undefined) {
                if (c1 && c2) {
                    const r = c1.props === c2.props;
                    if (r === false) {
                        return false;
                    }
                }
            }
            
        }
        return true;
    }
}