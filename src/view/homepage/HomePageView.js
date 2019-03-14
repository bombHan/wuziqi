import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import _ from 'lodash';
import {Badge, Cascader, Form, Icon, Input, Modal, Select, Spin, Table, Menu, Carousel} from 'antd';
import HomePageActions from "../../action/homepage/HomePageActions";
import './HomePageView.less'
import ReactEcharts from 'echarts-for-react';
import title from "../../asset/image/title.png";
import Text from "../../component/text/Text";
import moment from "moment";
import AutoView from "./AutoView";
import AutoPlayTable from "../../component/autoplaytable/AutoPlayTable";
import ComplaintAutoView from "./ComplaintAutoView";
import Word from "../../asset/icon/word.svg";

class HomePageView extends Component {
    constructor(...props) {
        super(...props);
        this.productTitle=[
            {
                name: "姓名",
                key: "name",
                dataIndex: "name",
                width: "20%",
            },
            {
                name: "未解决",
                key: "unsolve",
                dataIndex: "unsolve",
                width: "20%",
                maxRed: true,
            },
            {
                name: "未及时响应",
                key: "unresponse",
                dataIndex: "unresponse",
                width: "30%",
                maxRed: true,
            },
            {
                name: "近半月解决",
                key: "num",
                dataIndex: "num",
                width: "30%",
                maxRed: true,
            },
        ]

    }

    componentDidMount() {
        const {actions, dataContext} = this.props;
        actions.getAddAndSolve(); // 获取问题增量及解决情况
        actions.getUnsolve(); // 获取未解决问题数变化
        actions.getProduct(); // 获取产品支持情况
        actions.getProjectDatas(); // 获取在建、已解决、最近一月、未解决、满意度过低5个数据 和 p0p1p2p3 和 各模块未解决问题数分步
        actions.getProject(this); // 获取风险项目监控
        // actions.getComplaint(); // 获取投诉项目
        this.request = setInterval(() => {
            actions.getAddAndSolve(); // 获取问题增量及解决情况
            actions.getUnsolve(); // 获取未解决问题数变化
            actions.getProduct(); // 获取产品支持情况
            actions.getProjectDatas(); // 获取在建、已解决、最近一月、未解决、满意度过低5个数据 和 p0p1p2p3 和 各模块未解决问题数分步
            actions.getProject(this); // 获取风险项目监控
            // actions.getComplaint(); // 获取投诉项目
        }, 600000)
    }

    componentWillUnMount() {
        if (this.request  != null) {
            clearInterval(this.request);
            this.request = null;
        }
    }

    render() {
        // (pagination) => {console.log(pagination.current)};
        const {dataContext, actions} = this.props;
        const options1 = {
            title: {
                text: "问题增量及解决情况",
                textStyle:{
                    color: "#fff",
                    fontSize: 14
                },
            },
            legend: {
                data:['增量','解决'],
                textStyle:{
                    color: "#BEDAFB"//字体颜色
                },
                x: 'right',
            },
            grid: {
                top: "25%",
                left: '3%',
                right: '6%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: dataContext.date,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#BEDAFB",
                        fontSize: "0.12rem"
                    }
                },
                axisLine:{
                    lineStyle: {
                        color: "#58CCFD",
                    },
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#BEDAFB',
                        fontSize: "0.12rem"
                    }
                },
                axisLine:{
                    lineStyle: {
                        color: "#58CCFD"
                    }
                },
                splitLine: {
                    show: false
                },
                // min: (value) => {
                 //   return value.min - 50;
               // },
            },
            series: [
                {
                    name:'增量',
                    type:'line',
                    symbol: 'circle',
                    data: dataContext.subData,
                    // label: {
                    //     normal: {
                    //         show: true,
                    //         position: 'top',
                    //         textStyle: {
                    //             color: '#FF6466"'
                    //         },
                    //     }
                    // },
                    itemStyle: {
                        normal: {
                            color: "#FF6466",//折线点的颜色
                            lineStyle: {
                                color: "#FF6466"//折线的颜色
                            }
                        }
                    },
                },
                {
                    name:'解决',
                    type:'line',
                    symbol: 'circle',
                    data:dataContext.solveData,
                    // label: {
                    //     normal: {
                    //         show: true,
                    //         position: 'top',
                    //         textStyle: {
                    //             color: '#52F889'
                    //         },
                    //     }
                    // },
                    itemStyle: {
                        normal: {
                            color: "#52F889",//折线点的颜色
                            lineStyle: {
                                color: "#52F889"//折线的颜色
                            }
                        }
                    },
                },
            ]

        };
        const options2 = {
            title: {
                text: "未解决问题数变化",
                textStyle:{
                    color: "#fff",
                    fontSize: 14
                },
            },
            grid: {
                top: "20%",
                left: '3%',
                right: '6%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: dataContext.week,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#BEDAFB",
                        fontSize: "0.12rem"
                    }
                },
                axisLine:{
                    lineStyle: {
                        color: "#58CCFD"
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#BEDAFB',
                        fontSize: "0.12rem"
                    }
                },
                axisLine:{
                    lineStyle: {
                        color: "#58CCFD"
                    }
                },
                splitLine: {
                    show: false
                },
                // min: (value) => {
                //    return value.min - 100;
                //},
            },
            series: [
                {
                    name:'问题数',
                    type:'line',
                    symbol: 'circle',
                    data: dataContext.unsolveData,
                    // label: {
                    //     normal: {
                    //         show: true,
                    //         position: 'top',
                    //         textStyle: {
                    //             color: '#58CCFD"'
                    //         },
                    //     }
                    // },
                    itemStyle: {
                        normal: {
                            color: "#58CCFD",//折线点的颜色
                            lineStyle: {
                                color: "#58CCFD"//折线的颜色
                            }
                        }
                    },
                },
            ]

        };
        const options3 =  {
            title: {
                text: "各模块未解决问题数分布图",
                textStyle:{
                    color: "#fff",
                    fontSize: 14
                },
            },
            grid: {
                top: "22%",
                left: '2%',
                right: '2%',
                bottom: '-7%',
                containLabel: true
            },
            color: ["#EDAB4F", "#53CBA1", "#2A6CD8"],
            xAxis: {
                type : 'category',
                splitLine: {show:false},
                data: dataContext.allBlock,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#BEDAFB",
                        fontSize: "0.12rem"
                    },
                    formatter: function (value) {
                        return value.split("").join("\n");
                    }
                },
                axisLine:{
                    lineStyle: {
                        color: "#58CCFD"
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: false,
                    textStyle: {
                        color: '#BEDAFB',
                        fontSize: "0.12rem"
                    }
                },
                axisLine:{
                    lineStyle: {
                        color: "#58CCFD"
                    }
                },
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    name: '第一模块',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    data: dataContext.allUnsolveData[0] || []
                },
                {
                    name: '第二模块',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    data: dataContext.allUnsolveData[1] || []
                },
                {
                    name: '第三模块',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    data: dataContext.allUnsolveData[2] || [],
                },
            ]
        }
        // console.log(dataContext.current, dataContext.project, dataContext.autoplaytime);
        // console.log(dataContext.project)
        return (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    padding: 0,
                    color: "#BEDAFB",
                }}
            >
                {/* 左边模块 */}
                <div
                    style={{
                        width: "28%",
                        padding: "1%",
                        background: "#0f2468",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    {/* 问题增量及解决情况 */}
                    <div
                        style={{
                            background: "#0D3B88",
                            height: "32%",
                            borderRadius: " 4px",
                        }}
                    >
                        <ReactEcharts
                            style={{height: "100%",width: "100%",marginTop: "0.05rem"}}
                            option={options1}
                            notMerge={true}
                            theme={'my_theme'}
                            lazyUpdate={true}
                        />
                    </div>

                    {/* 未解决问题数 */}
                    <div
                        style={{
                            background: "#0D3B88",
                            height: "32%",
                            borderRadius: " 4px"
                        }}
                    >
                        <ReactEcharts
                            style={{height: "100%",width: "100%",marginTop: "5px"}}
                            option={options2}
                            notMerge={true}
                            theme={'my_theme'}
                            lazyUpdate={true}
                        />
                    </div>

                    {/* 产品支持情况 */}
                    <div
                        style={{
                            background: "#0D3B88",
                            height: "32%",
                            borderRadius: " 0.04rem",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                color: "#fff",
                                marginLeft: "0.05rem",
                                marginTop: "0.05rem",
                            }}
                        >
                            产品支持情况
                        </div>
                        {
                            dataContext.productData.length > 0
                                ? (
                                    <AutoPlayTable
                                        title={this.productTitle}
                                        dataSource={dataContext.productData}
                                    />
                                )
                                : null
                        }
                    </div>
                </div>

                {/* 中间模块 */}
                <div
                    style={{
                        width: "44%",
                        padding: "1% 0",
                        background: "#0f2468",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    {/*在建*/}
                    <div
                        style={{
                            width: "100%",
                            height: "12%",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        {
                            _.map(dataContext.projectDatas, (item) => {
                                return (
                                    <div
                                        key={item.name}
                                        style={{
                                            color: "#fff",
                                            height: "100%",
                                            width: "19%",
                                            // background: dataContext.maxData && item.value === dataContext.maxData.value ? "#D75556" : "#0D3B88",
                                            background: "#0D3B88",
                                            padding: "0.1rem",
                                            borderRadius: "0.08rem",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            position: "relative",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "no-wrap",
                                                fontSize: "0.24rem"
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row-reverse",
                                                fontSize: "0.26rem",
                                                position: "absolute",
                                                right: "0.1rem",
                                                bottom: "0.02rem",
                                            }}
                                        >
                                            {
                                                item.key === "sum"
                                                    ? (
                                                        <span>
                                                            {item.value1}/{item.value2}
                                                        </span>
                                                    )
                                                    : (
                                                        <span>
                                                            {item.value}
                                                        </span>
                                                    )
                                            }
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>

                    {/* 风险项目监控 */}
                    <div
                        style={{
                            height: "52%",
                            width: "100%",
                            background: "#0D3B88",
                            borderRadius: "0.06rem",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    margin: "0.1rem 0 0 0.1rem",
                                }}
                            >
                                {dataContext.current && dataContext.current.name}({dataContext.current && dataContext.current.items && dataContext.current.items.length})
                            </div>
                            {/*<img src={title} alt="title" style={{height: "0.5rem", width: "2.4rem"}}/>*/}
                            <Word style={{height: "0.5rem", width: "3.6rem"}} />
                        </div>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                color: "#58CCFD",
                                padding: "0.1rem 0.1rem 0 0.1rem",
                                fontSize: "0.20rem"
                            }}
                        >
                            <div>
                                项目名称
                            </div>
                            <div>
                                {dataContext.current && dataContext.current.title}
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: "1",
                            }}
                            ref="project"
                        >
                            {
                                dataContext.current
                                    ? (
                                        <Carousel
                                            autoplay
                                            infinite
                                            autoplaySpeed ={dataContext.autoplaytime}
                                            afterChange={(current) => {
                                                // console.log(current);
                                                actions.update({
                                                    current: dataContext.project[current],
                                                });
                                            }}
                                            ref={(re) => {
                                                this.carouselRef = re;
                                            }}
                                        >
                                            {
                                                _.map(dataContext.project, (project, index) => {
                                                    return (
                                                        <div>
                                                            <AutoView name={`project${index}`} list={project.items} max={project.max}/>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </Carousel>
                                    )
                                    : null
                            }
                        </div>

                    </div>

                    {/* 各模块为解决问题数分布图 */}
                    <div
                        style={{
                            height: "32%",
                            width: "100%",
                            background: "#0D3B88",
                            borderRadius: "0.06rem",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <ReactEcharts
                            style={{height: "100%",width: "100%",marginTop: "5px"}}
                            option={options3}
                        />
                    </div>
                </div>

                {/* 右边模块 */}
                <div
                    style={{
                        width: "28%",
                        padding: "1%",
                        background: "#0f2468",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* P模块 */}
                    <div
                        style={{
                            height: "13%",
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            marginBottom: "2%"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "#FF6466",
                                background: "#573767",
                                fontSize: "0.24rem",
                                borderRadius: "0.06rem",
                                width: "48%",
                                height: "44%",
                                padding: "0 5%",
                                margin: "0 1% 1% 0",
                                alignItems: "center",
                            }}
                        >
                            <span>
                                P0
                            </span>
                            <span>
                                {dataContext.p0}
                            </span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "#E9A444",
                                background: "#4F4A5D",
                                fontSize: "0.24rem",
                                borderRadius: "0.06rem",
                                width: "48%",
                                height: "44%",
                                padding: "0 5%",
                                margin: "0 1% 1% 0",
                                alignItems: "center",
                            }}
                        >
                            <span>
                                P1
                            </span>
                            <span>
                                {dataContext.p1}
                            </span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "#3FCB6D",
                                background: "#204C69",
                                fontSize: "0.24rem",
                                borderRadius: "0.06rem",
                                width: "48%",
                                height: "44%",
                                padding: "0 5%",
                                margin: "0 1% 1% 0",
                                alignItems: "center",
                            }}
                        >
                            <span>
                                P2
                            </span>
                            <span>
                                {dataContext.p2}
                            </span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "#57CBFC",
                                background: "#183E90",
                                fontSize: "0.24rem",
                                borderRadius: "0.06rem",
                                width: "48%",
                                height: "44%",
                                padding: "0 5%",
                                margin: "0 1% 1% 0",
                                alignItems: "center",
                            }}
                        >
                            <span>
                                P3
                            </span>
                            <span>
                                {dataContext.p3}
                            </span>
                        </div>
                    </div>

                    {/* 投诉项目 */}
                    <div
                        style={{
                            flex: 1,
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: 14,
                                marginBottom: "0.1rem",
                            }}
                        >
                            投诉项目({dataContext.complaintData.length || 0})
                        </div>
                        {
                            dataContext.complaintData.length > 0
                                ? (
                                    <ComplaintAutoView complaintData={dataContext.complaintData} />
                                )
                                : null
                        }

                        <div
                            style={{
                                display: "none",
                                flexDirection: "column",
                                flex: 1,
                                position: "relative",
                                overflow: "hidden",
                            }}
                            ref="complaintwrap"
                        >
                            {/*<div*/}
                                {/*style={{*/}
                                    {/*position: "absolute",*/}
                                    {/*top: " 0",*/}
                                    {/*left: " 0",*/}
                                    {/*width: "100%",*/}
                                {/*}}*/}
                                {/*ref="complaint"*/}
                            {/*>*/}
                                {/*{*/}
                                    {/*_.map(dataContext.complaintData, (item, index) => {*/}
                                        {/*return (*/}
                                            {/*<div*/}
                                                {/*style={{*/}
                                                    {/*height: "160px",*/}
                                                    {/*marginBottom: index === dataContext.complaintData.length - 1 ? 0 : "10px",*/}
                                                    {/*width: "100%",*/}
                                                    {/*borderRadius: "6px",*/}
                                                    {/*background: "#0D3B88",*/}
                                                    {/*padding: "10px",*/}
                                                    {/*display: "flex",*/}
                                                    {/*flexDirection: "column",*/}
                                                    {/*justifyContent: "space-between"*/}
                                                {/*}}*/}
                                            {/*>*/}
                                                {/*<Text*/}
                                                    {/*style={{*/}
                                                        {/*color: "#BEDAFB",*/}
                                                        {/*fontSize: "16px"*/}
                                                    {/*}}*/}
                                                {/*>*/}
                                                    {/*{item.name}*/}
                                                {/*</Text>*/}
                                                {/*<Text*/}
                                                    {/*style={{*/}
                                                        {/*color: "#E9A444",*/}
                                                        {/*fontSize: "14px",*/}
                                                        {/*margin: "10px 0"*/}
                                                    {/*}}*/}
                                                {/*>*/}
                                                    {/*{item.remarks}*/}
                                                {/*</Text>*/}
                                                {/*<div*/}
                                                    {/*style={{*/}
                                                        {/*display: "flex",*/}
                                                    {/*}}*/}
                                                {/*>*/}
                                                    {/*<div*/}
                                                        {/*style={{*/}
                                                            {/*margin: "0 10px 10px 0",*/}
                                                            {/*background: item.days >= item.times && item.days >= item.num ? "#D75556" : "#2A6CD8",*/}
                                                            {/*borderRadius: "10px",*/}
                                                            {/*padding: "0px 10px",*/}
                                                            {/*color: "#FFFFFF",*/}
                                                        {/*}}*/}
                                                    {/*>*/}
                                                        {/*投诉天数 {item.days}*/}
                                                    {/*</div>*/}
                                                    {/*<div*/}
                                                        {/*style={{*/}
                                                            {/*margin: "0 10px 10px 0",*/}
                                                            {/*background: item.times >= item.days && item.times >= item.num ? "#D75556" : "#2A6CD8",*/}
                                                            {/*borderRadius: "10px",*/}
                                                            {/*padding: "0px 10px",*/}
                                                            {/*color: "#FFFFFF",*/}
                                                        {/*}}*/}
                                                    {/*>*/}
                                                        {/*累计投诉次数 {item.times}*/}
                                                    {/*</div>*/}
                                                    {/*<div*/}
                                                        {/*style={{*/}
                                                            {/*margin: "0 10px 10px 0",*/}
                                                            {/*background: item.num >= item.days && item.num >= item.times ? "#D75556" : "#2A6CD8",*/}
                                                            {/*borderRadius: "10px",*/}
                                                            {/*padding: "0px 10px",*/}
                                                            {/*color: "#FFFFFF",*/}
                                                        {/*}}*/}
                                                    {/*>*/}
                                                        {/*问题数 {item.num}*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                                {/*<div*/}
                                                    {/*style={{*/}
                                                        {/*display: "flex",*/}
                                                        {/*width: "100%",*/}
                                                        {/*justifyContent: "space-between"*/}
                                                    {/*}}*/}
                                                {/*>*/}
                                                    {/*<Text>*/}
                                                        {/*{item.tips}*/}
                                                    {/*</Text>*/}
                                                    {/*<span*/}
                                                        {/*style={{*/}
                                                            {/*width: "70px",*/}
                                                            {/*flex: "none",*/}
                                                            {/*display: "flex",*/}
                                                            {/*flexDirection: "row-reverse"*/}
                                                        {/*}}*/}
                                                    {/*>*/}
                                                        {/*{*/}
                                                            {/*moment(item.time).format("MM-DD")*/}
                                                        {/*}*/}
                                                    {/*</span>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*)*/}
                                    {/*})*/}
                                {/*}*/}
                                {/*{*/}
                                    {/*dataContext.complaintData.length > 0 && this.refs.complaintwrap && dataContext.complaintData.length * 170 > this.refs.complaintwrap.offsetHeight*/}
                                        {/*? (*/}
                                            {/*<div>*/}
                                                {/*{*/}
                                                    {/*_.map(dataContext.complaintData, (item, index) => {*/}
                                                        {/*return (*/}
                                                            {/*<div*/}
                                                                {/*style={{*/}
                                                                    {/*height: "160px",*/}
                                                                    {/*marginBottom: index === dataContext.complaintData.length - 1 ? 0 : "10px",*/}
                                                                    {/*width: "100%",*/}
                                                                    {/*borderRadius: "6px",*/}
                                                                    {/*background: "#0D3B88",*/}
                                                                    {/*padding: "10px",*/}
                                                                    {/*display: "flex",*/}
                                                                    {/*flexDirection: "column",*/}
                                                                    {/*justifyContent: "space-between",*/}
                                                                    {/*marginTop: index === 0 ? "10px" : 0,*/}
                                                                {/*}}*/}
                                                            {/*>*/}
                                                                {/*<Text*/}
                                                                    {/*style={{*/}
                                                                        {/*color: "#BEDAFB",*/}
                                                                        {/*fontSize: "16px"*/}
                                                                    {/*}}*/}
                                                                {/*>*/}
                                                                    {/*{item.name}*/}
                                                                {/*</Text>*/}
                                                                {/*<Text*/}
                                                                    {/*style={{*/}
                                                                        {/*color: "#E9A444",*/}
                                                                        {/*fontSize: "14px",*/}
                                                                        {/*margin: "10px 0"*/}
                                                                    {/*}}*/}
                                                                {/*>*/}
                                                                    {/*{item.remarks}*/}
                                                                {/*</Text>*/}
                                                                {/*<div*/}
                                                                    {/*style={{*/}
                                                                        {/*display: "flex",*/}
                                                                    {/*}}*/}
                                                                {/*>*/}
                                                                    {/*<div*/}
                                                                        {/*style={{*/}
                                                                            {/*margin: "0 10px 10px 0",*/}
                                                                            {/*background: item.days >= item.times && item.days >= item.num ? "#D75556" : "#2A6CD8",*/}
                                                                            {/*borderRadius: "10px",*/}
                                                                            {/*padding: "0px 10px",*/}
                                                                            {/*color: "#FFFFFF",*/}
                                                                        {/*}}*/}
                                                                    {/*>*/}
                                                                        {/*投诉天数 {item.days}*/}
                                                                    {/*</div>*/}
                                                                    {/*<div*/}
                                                                        {/*style={{*/}
                                                                            {/*margin: "0 10px 10px 0",*/}
                                                                            {/*background: item.times >= item.days && item.times >= item.num ? "#D75556" : "#2A6CD8",*/}
                                                                            {/*borderRadius: "10px",*/}
                                                                            {/*padding: "0px 10px",*/}
                                                                            {/*color: "#FFFFFF",*/}
                                                                        {/*}}*/}
                                                                    {/*>*/}
                                                                        {/*累计投诉次数 {item.times}*/}
                                                                    {/*</div>*/}
                                                                    {/*<div*/}
                                                                        {/*style={{*/}
                                                                            {/*margin: "0 10px 10px 0",*/}
                                                                            {/*background: item.num >= item.days && item.num >= item.times ? "#D75556" : "#2A6CD8",*/}
                                                                            {/*borderRadius: "10px",*/}
                                                                            {/*padding: "0px 10px",*/}
                                                                            {/*color: "#FFFFFF",*/}
                                                                        {/*}}*/}
                                                                    {/*>*/}
                                                                        {/*问题数 {item.num}*/}
                                                                    {/*</div>*/}
                                                                {/*</div>*/}
                                                                {/*<div*/}
                                                                    {/*style={{*/}
                                                                        {/*display: "flex",*/}
                                                                        {/*width: "100%",*/}
                                                                        {/*justifyContent: "space-between"*/}
                                                                    {/*}}*/}
                                                                {/*>*/}
                                                                    {/*<Text>*/}
                                                                        {/*{item.tips}*/}
                                                                    {/*</Text>*/}
                                                                    {/*<span*/}
                                                                        {/*style={{*/}
                                                                            {/*width: "70px",*/}
                                                                            {/*flex: "none",*/}
                                                                            {/*display: "flex",*/}
                                                                            {/*flexDirection: "row-reverse"*/}
                                                                        {/*}}*/}
                                                                    {/*>*/}
                                                        {/*{*/}
                                                            {/*moment(item.time).format("MM-DD")*/}
                                                        {/*}*/}
                                                    {/*</span>*/}
                                                                {/*</div>*/}
                                                            {/*</div>*/}
                                                        {/*)*/}
                                                    {/*})*/}
                                                {/*}*/}
                                            {/*</div>*/}
                                        {/*)*/}
                                        {/*: null*/}
                                {/*}*/}
                            {/*</div>*/}
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}


export default connect(
    state => ({
        dataContext: state.homepage.testViewModel,
    }),
    dispatch => ({
        actions: bindActionCreators(HomePageActions, dispatch),

    })
)(Form.create()(HomePageView));
