import React, {Component} from "react";
import _ from 'lodash';
import {Badge, Cascader, Form, Icon, Input, Modal, Select, Spin, Table, Menu, Carousel} from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from "moment";
import PropTypes from "prop-types";

const nop = () => {
    // Do nothing
};

class AutoPlayTable extends Component {
    static propTypes = {
        title: PropTypes.array,
        dataSource: PropTypes.array,
        lineHeight: PropTypes.number,
        titleHeight: PropTypes.string,
    };

    static defaultProps = {
        title: [
            {
                // name: "序号",
                // key: "index",
                // dataIndex: "index",
                // maxRed: false,
            }
        ],
        dataSource: [],
        lineHeight: 30,
        titleHeight: "30px",
    };

    constructor(...props) {
        super(...props);
        this.state={
            height: 150,
        }
    }

    componentDidMount() {
        const {dataSource, lineHeight, title} = this.props;
        console.log(dataSource.length * lineHeight, this.refs.wrap.offsetHeight)
        if (this.refs.wrap && dataSource.length * lineHeight > this.refs.wrap.offsetHeight) {
            // 用于判断是否需要滚动时渲染两遍内容
            this.setState({
                height: this.refs.wrap.offsetHeight,
            });
            this.id = setInterval(() => {
                const oUl=this.refs.content;
                if(oUl) {
                    if (oUl.offsetTop == -(lineHeight * dataSource.length)) {
                        oUl.style.top=0;
                    }
                    oUl.style.top=oUl.offsetTop-1+'px';
                }
            },50);
        }
    }

    componentDidUpdate(pre,prep) {
        const {dataSource, lineHeight, title} = this.props;
        // console.log(pre,prep, dataSource)
        if(pre.dataSource && pre.dataSource.length !== dataSource.length) {
            if (this.id  != null) {
                clearInterval(this.id );
                this.id = null;
            }
            this.refs.content.style.top = 0;
            if (this.refs.wrap && dataSource.length * lineHeight > this.refs.wrap.offsetHeight) {
                // 用于判断是否需要滚动时渲染两遍内容
                this.setState({
                    height: this.refs.wrap.offsetHeight,
                });
                this.id = setInterval(() => {
                    const oUl=this.refs.content;
                    if(oUl) {
                        if (oUl.offsetTop == -(lineHeight * dataSource.length)) {
                            oUl.style.top=0;
                        }
                        oUl.style.top=oUl.offsetTop-1+'px';
                    }
                },50);
            }
        }
    }

    componentWillUnMount() {
        if (this.id  != null) {
            clearInterval(this.id );
            this.id = null;
        }

    }

    getmax(title, dataSource) {
        const newTitle = _.map(title, (item) => {
            if (item.maxRed) {
                const max = (_.maxBy(dataSource, item.dataIndex))[item.dataIndex];
                return {
                    ...item,
                    max,
                };
            } else {
                return item;
            }
        })
        return newTitle;
    }

    render() {
        let {title, dataSource, lineHeight, titleHeight} = this.props;
        const {height} = this.state;
        title = this.getmax(title, dataSource);
        // console.log(dataSource, this.id)
        return (
            <div
                style={{
                    background: "#0D3B88",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    fontSize: "0.20rem",
                }}
            >
                <div
                    style={{
                        height: title.length > 0 ? titleHeight : 0,
                        width: "100%",
                        background: "transparent",
                        color: "#58DCFF",
                        display: "flex",
                        lineHeight: titleHeight,
                        textAlign: "center",
                        justifyContent: "space-around",
                    }}
                >
                    {
                        _.map(title, (item) => {
                            return (
                                <div
                                    style={{
                                        width: item.width || null,
                                    }}
                                >
                                    {item.name}
                                </div>
                            );
                        })
                    }
                </div>
                <div
                    style={{
                        flex: "1",
                        position: "relative",
                        width: "100%",
                        overflow: "hidden"
                    }}
                    ref="wrap"
                >
                    <div
                        style={{
                            position: "absolute",

                            top: " 0",
                            left: " 0",
                            width: "100%",
                        }}
                        ref="content"
                    >
                        {
                            _.map(dataSource, (item, index) => {
                                return (
                                    <div
                                        key={`content${index}`}
                                        style={{
                                            height: `${lineHeight}px`,
                                            width: "100%",
                                            background: index % 2 === 0 ? "#194699" : "transparent",
                                            color: "#BEDAFB",
                                            display: "flex",
                                            lineHeight: `${lineHeight}px`,
                                            textAlign: "center",
                                            justifyContent: "space-around",
                                        }}
                                    >
                                        {
                                            _.map(title, (titleItem) => {
                                                // console.log(item, titleItem.dataIndex, item[titleItem.dataIndex])
                                                return (
                                                    <div
                                                        style={{
                                                            width: titleItem.width || null,
                                                            color: item[titleItem.dataIndex] === titleItem.max ? "#fb6367" : null,
                                                            overflow: "hidden"
                                                        }}
                                                    >
                                                        {
                                                            item[titleItem.dataIndex]
                                                        }
                                                    </div>
                                                )

                                            })
                                        }
                                    </div>
                                );
                            })
                        }
                        {
                            dataSource.length > 0 && this.refs.wrap && dataSource.length * lineHeight > height
                                ? (
                                    <div>
                                        {
                                            _.map(dataSource, (item, index) => {
                                                return (
                                                    <div
                                                        key={`content${index}`}
                                                        style={{
                                                            height: `${lineHeight}px`,
                                                            width: "100%",
                                                            background: index % 2 === 0 ? "#194699" : "transparent",
                                                            color: "#BEDAFB",
                                                            display: "flex",
                                                            lineHeight: `${lineHeight}px`,
                                                            textAlign: "center",
                                                            justifyContent: "space-around",
                                                        }}
                                                    >
                                                        {
                                                            _.map(title, (titleItem) => {
                                                                return (
                                                                    <div
                                                                        style={{
                                                                            width: titleItem.width || null,
                                                                            color: item[titleItem.dataIndex] === titleItem.max ? "#fb6367" : null,
                                                                        }}
                                                                    >
                                                                        {
                                                                            item[titleItem.dataIndex]
                                                                        }
                                                                    </div>
                                                                )

                                                            })
                                                        }
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                )
                                : null
                        }

                    </div>
                </div>

            </div>
        );
    }


}

export default AutoPlayTable;
