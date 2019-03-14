import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import _ from 'lodash';
import {NavLink,HashRouter, Route,Link,Redirect,Switch} from 'react-router-dom'
import Constants from '../../constant/Constants';
import {Badge, Cascader, Form, Icon, Input, Modal, Select, Spin, Table, Menu, Button} from 'antd';
import ReactEcharts from 'echarts-for-react';
import confirm from "../../custom/modal/confirm";

import DataSummryActions from "../../action/homepage/DataSummaryActions";


class DataSummryView extends Component {
    constructor(...props) {
        super(...props);


    }
    componentWillMount() {
        const {dataContext, actions} = this.props;
    }


    render() {

        const {dataContext, actions} = this.props;
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                }}
                disabled={dataContext.finished}
            >
                <div
                    style={{
                        flex: 1,
                        marginTop: "0.8rem"
                    }}
                >
                    <div
                        style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: "20px"
                        }}
                    >
                        终极五子棋火火
                    </div>
                    <div
                        style={{
                            position: "relative",
                            margin: "0 auto",
                            width: "650px"
                        }}
                    >
                        {/*棋盘*/}
                        <div
                            style={{
                                position: "absolute",
                                top: "0px",
                                left: "50px",
                                zIndex: 1,
                            }}
                        >
                            {_.map(dataContext.value, (item1, index1) => {
                                if (index1 !== 0) {
                                    return (
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                            key={`boxs${index1}`}
                                        >
                                            {
                                                _.map(item1, (item2, index2) => {
                                                    if (index2 !== 0) {
                                                        return (
                                                            <div
                                                                style={{
                                                                    height: "40px",
                                                                    width: "40px",
                                                                    borderRight: "1px solid #000",
                                                                    borderBottom: "1px solid #000",
                                                                    borderTop: index1 === 1 ? "1px solid #000" : null,
                                                                    borderLeft: index2 === 1 ? "1px solid #000" : null,
                                                                    cursor: item2 === 2 ? "pointer" : null,
                                                                    background: "#eea145",
                                                                }}
                                                            >
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    )
                                }

                            })}
                        </div>

                        {/*棋子*/}
                        <div
                            style={{
                                position: "absolute",
                                top: "-20px",
                                left: "30px",
                                zIndex: 999,
                            }}
                        >
                            {_.map(dataContext.value, (item1, index1) => {
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                        }}
                                        key={`box${index1}`}
                                    >
                                        {
                                            _.map(item1, (item2, index2) => {
                                                return (
                                                    <div
                                                        style={{
                                                            height: "40px",
                                                            width: "40px",
                                                            // borderRight: "1px solid #000",
                                                            // borderBottom: "1px solid #000",
                                                            // borderTop: index1 === 0 ? "1px solid #000" : null,
                                                            // borderLeft: index2 === 0 ? "1px solid #000" : null,
                                                            cursor: item2 === 2 ? "pointer" : null,
                                                            // background: "#eea145",
                                                        }}
                                                        onClick={() => {
                                                            if (!dataContext.finished) {
                                                                if (item2 === 2) {
                                                                    console.log("下棋", dataContext.currentColor);
                                                                    const nowColor = dataContext.currentColor === "white" ? 0 : 1;
                                                                    let newValue = dataContext.value;
                                                                    newValue[index1][index2] = nowColor;
                                                                    let win = false;
                                                                    _.forEach(newValue, (it1, in1) => {
                                                                        _.forEach(it1, (it2, in2) => {
                                                                            if (it2 === nowColor) {
                                                                                // 向下找
                                                                                if (in1 < 11) {
                                                                                    if (it2 === newValue[in1 + 1][in2] && it2=== newValue[in1 + 2][in2] && it2 === newValue[in1 + 3][in2] && it2 === newValue[in1 + 4][in2]) {
                                                                                        win = true;
                                                                                    }
                                                                                }
                                                                                // 向右
                                                                                if (in2 < 11) {
                                                                                    if (it2 === newValue[in1][in2 + 1] && it2 === newValue[in1][in2 + 2] && it2 === newValue[in1][in2 + 3] && it2 === newValue[in1][in2 + 4]) {
                                                                                        win = true;
                                                                                    }
                                                                                }
                                                                                // 向右上
                                                                                if (in1 > 3 && in2 < 11) {
                                                                                    if (it2 === newValue[in1 - 1][in2 + 1] && it2 === newValue[in1 -2][in2 + 2] && it2 === newValue[in1 -3][in2 + 3] && it2 === newValue[in1 -4][in2 + 4]) {
                                                                                        win = true;
                                                                                    }
                                                                                }
                                                                                // 向右下
                                                                                if (in1 < 11 && in2 < 11) {
                                                                                    if (it2 === newValue[in1 + 1][in2 + 1] && it2 === newValue[in1 + 2][in2 + 2] && it2 === newValue[in1 + 3][in2 + 3] && it2 === newValue[in1 + 4][in2 + 4]) {
                                                                                        win = true;
                                                                                    }
                                                                                }


                                                                            }
                                                                        })
                                                                    });
                                                                    if (win) {
                                                                        console.log(`${nowColor === 0 ? "白色玩家" : "黑色玩家"}获胜`);
                                                                        actions.update({
                                                                            value: newValue,
                                                                            currentColor: nowColor === 0 ? "black" : "white",
                                                                            finished: true,
                                                                        });
                                                                        confirm({
                                                                            iconType: null,
                                                                            title: "结束对局",
                                                                            okType: "normal",
                                                                            okPlacement: "left",
                                                                            content: (
                                                                                <div style={{textAlign: "center"}}>{nowColor === 0 ? "白色玩家" : "黑色玩家"}获胜</div>
                                                                            ),
                                                                            okText: "重新开始",
                                                                            onOk: () => {
                                                                                actions.update({
                                                                                    currentColor: "white",
                                                                                    value: _.times(15, (index) => {
                                                                                        return _.times(15, () => {
                                                                                            return 2;
                                                                                        })
                                                                                    }),
                                                                                    finished: false,
                                                                                })
                                                                            },
                                                                            onCancel() {
                                                                            },
                                                                        });
                                                                    } else {
                                                                        console.log("下一步")
                                                                        actions.update({
                                                                            value: newValue,
                                                                            currentColor: nowColor === 0 ? "black" : "white",
                                                                        })
                                                                    }

                                                                } else {
                                                                    console.log("已经有子了")
                                                                }
                                                            } else {
                                                                confirm({
                                                                    iconType: null,
                                                                    title: "结束对局",
                                                                    okType: "normal",
                                                                    okPlacement: "left",
                                                                    content: (
                                                                        <div style={{textAlign: "center"}}>
                                                                            <div>
                                                                                对局已经结束，{dataContext.currentColor === "white" ? "黑色玩家" : "白色玩家"}获胜
                                                                            </div>
                                                                            <div>
                                                                                请问是否需要重新开始
                                                                            </div>
                                                                        </div>
                                                                    ),
                                                                    okText: "重新开始",
                                                                    onOk: () => {
                                                                        actions.update({
                                                                            currentColor: "white",
                                                                            value: _.times(15, (index) => {
                                                                                return _.times(15, () => {
                                                                                    return 2;
                                                                                })
                                                                            }),
                                                                            finished: false,
                                                                        })
                                                                    },
                                                                    onCancel() {
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: item2 === 2 ? "none" : "block",
                                                                height: "30px",
                                                                width: "30px",
                                                                borderRadius: "15px",
                                                                background: item2 === 0 ? "#e2e7ed" : "black",
                                                                margin: "5px auto",
                                                            }}
                                                        ></div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )

                            })}
                        </div>
                    </div>


                </div>
                <div
                    style={{
                        width: "300px",
                        padding: "40px"
                    }}
                >
                    <div
                        style={{
                            fontSize: "16px",
                        }}
                    >
                        游戏获胜方: {dataContext.finished ? (dataContext.currentColor === "white" ? "黑色玩家获胜" : "白色玩家获胜") : "对局中..."}
                    </div>
                    <Button
                        style={{
                            margin: "20px 0"
                        }}
                        type="normal"
                        onClick={() => {
                            actions.update({
                                currentColor: "white",
                                value: _.times(15, (index) => {
                                    return _.times(15, () => {
                                        return 2;
                                    })
                                }),
                                finished: false,
                            });
                        }}
                    >
                        重新开始
                    </Button>
                </div>

            </div>

        );
    }

}


export default connect(
    state => ({
        dataContext: state.homepage.dataSummryViewModel,
    }),
    dispatch => ({
        actions: bindActionCreators(DataSummryActions, dispatch),

    })
)(Form.create()(DataSummryView));
