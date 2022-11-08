/**
 * @author Anders
 */

import * as React from "react";



/**
 * 属性
 */
interface TableRowProps {
    /**
     * remotetable this中的check状态
     * 因为RemoteTable.onSelectChange调用以后，马上会引起tablerow重画，此时state中的check还没更新，导致行不重画
     */
    checkedInControl?: boolean;
    className?: string;
    index: number;
    children : React.ReactNode[]
}
/**
 * 状态
 */
interface TableRowState {
}
/**
 * 画表格行
 */
export class TableRow extends React.Component<TableRowProps, TableRowState>{
    constructor(props: TableRowProps) {
        super(props);
        this.state = {
        }
    }
    /**
     * 是否重画,这条路行不通
     */
    // shouldComponentUpdate(nextProps: TableRowProps, nextState: TableRowState, nextContext: any) {
    //     const { index, checkedInControl, className } = this.props;

    //     const thisChildren: React.ReactNode[] = this.props.children;
    //     const nextChildren: React.ReactNode[] = nextProps.children;

    //     if (index === 0) {
    //         console.log('row' + index)
    //     }
    //     if ( className === nextProps.className &&
    //         this.compareChildren(thisChildren, nextChildren) &&
    //         checkedInControl === nextProps.checkedInControl) {
    //         return false;
    //     }
    //     return true;
    // }

    /**
     * 画行
     */
    render(): React.ReactNode {
        if (this.props.index === 0) {
            console.log('render row' + this.props.index);
        }
        const { checkedInControl, ...others } = this.props;
        return <tr {...others} />;
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
            const r = c1.props === c2.props;
            if (r === false) {
                return false;
            }
        }
        return true;
    }
}