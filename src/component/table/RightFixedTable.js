import React, {Component} from "react";
import ReactDOM from "react-dom";

import {Table} from "antd";
import "./RightFixedTable.less";


// NOTE: https://github.com/ant-design/ant-design/releases
// Deprecated onRowClick，onRowDoubleClick、onRowContextMenu、onRowMouseEnter、onRowMouseLeave, please use onRow instead.
// 推荐使用 onRow 代替
// <Table onRow={(record) => ({
//     onClick: () => {},
//     onDoubleClick: () => {},
//     onContextMenu: () => {},
//     onMouseEnter: () => {},
//     onMouseLeave: () => {},
// })} /


// 但是 .\react-component\table\src\TableRow.js 源码里
// onMouseEnter = (event) => {
//     const { record, index, onRowMouseEnter, onHover, rowKey } = this.props;
//     onHover(true, rowKey);
//     if (onRowMouseEnter) {
//         onRowMouseEnter(record, index, event);
//     }
// }
//
// onMouseLeave = (event) => {
//     const { record, index, onRowMouseLeave, onHover, rowKey } = this.props;
//     onHover(false, rowKey);
//     if (onRowMouseLeave) {
//         onRowMouseLeave(record, index, event);
//     }
// }
// 还有 onHover 操作, 如果直接覆盖 onMouseEnter, onMouseLeave 会导致不能高亮


export default class RightFixedTable extends Component {

    // HACk
    // 1. 强制刷新 rc-table 中store 的expandedRowsHeight, 否则fixed right table 的行高不能(因为window resize)实时更新
    // 2. 注意 ant-design 里Table 是对 rc-table 的包装, 但是ant-design 的 Table有一个另外的store.
    // 3. 这里好不容易找到一个方法rowRef可以找到 rc-table 里的 store
    componentWillReceiveProps(nextProps) {
        if (this._row) {
            this._row.store.setState({expandedRowsHeight: {}});
        }
    }

    // componentDidUpdate() {
    //     if (this._row) {
    //         this._row.store.setState({expandedRowsHeight: {}});
    //     }
    // }

    render() {
        const {children, ...rest} = this.props;
        return (
            <Table rowRef={(record, i, indent) => row => {
                this._row = row
            }}
                   prefixCls={"nursecare-right-fixed-table"}
                   onRow={(record,index)=>{
                       return{
                           onMouseEnter:()=>{
                               // console.log(record,index)
                               const dom = ReactDOM.findDOMNode(this).querySelectorAll(".nursecare-right-fixed-table-fixed-right .hover-section")[index];
                               dom && dom.classList.add("hover-section-show");
                           },
                           onMouseLeave:()=>{
                               const dom = ReactDOM.findDOMNode(this).querySelectorAll(".nursecare-right-fixed-table-fixed-right .hover-section")[index];
                               dom && dom.classList.remove("hover-section-show");
                           }
                       }
                   }}

                   // onRowMouseEnter={(record, index) => {
                   //     const dom = ReactDOM.findDOMNode(this).querySelectorAll(".nursecare-right-fixed-table-fixed-right .hover-section")[index];
                   //     dom && dom.classList.add("hover-section-show");
                   // }}
                   // onRowMouseLeave={(record, index) => {
                   //     const dom = ReactDOM.findDOMNode(this).querySelectorAll(".nursecare-right-fixed-table-fixed-right .hover-section")[index];
                   //     dom && dom.classList.remove("hover-section-show");
                   // }}
                   {...rest}>

                {children}

            </Table>
        );
    }
};

