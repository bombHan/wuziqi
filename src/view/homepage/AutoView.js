import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import _ from 'lodash';


class AutoView extends Component {
    constructor(...props) {
        super(...props);
        this.state={
            height: 1200,
        }
    }

    componentDidMount() {
        const {name, list} = this.props;
        if (this.refs[`${name}wrap`] && list.length * 40 > this.refs[`${name}wrap`].offsetHeight) {
            // 用于判断是否需要滚动时渲染两遍内容
            this.setState({
                height: this.refs[`${name}wrap`].offsetHeight,
            });
            this.id = setInterval(() => {
                const oUl=this.refs[name];
                if(oUl) {
                    if (oUl.offsetTop == -(40 * list.length)) {
                        oUl.style.top=0;
                    }
                    oUl.style.top=oUl.offsetTop-1+'px';
                }
            },50);
        }
    }

    componentDidUpdate(pre) {
        const {name, list} = this.props;
        // console.log(pre, list)
        if(pre.list && pre.list.length !== list.length) {
            if (this.id  != null) {
                clearInterval(this.id );
                this.id = null;
            }
            this.refs[name].style.top = 0;
            if (this.refs[`${name}wrap`] && list.length * 40 > this.refs[`${name}wrap`].offsetHeight) {
                // 用于判断是否需要滚动时渲染两遍内容
                this.setState({
                    height: this.refs[`${name}wrap`].offsetHeight,
                });
                this.id = setInterval(() => {
                    const oUl=this.refs[name];
                    if(oUl) {
                        if (oUl.offsetTop == -(40 * list.length)) {
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

    render() {
        const {name, list, max} = this.props;
        // console.log(max)
        return (
            <div
                style={{
                    width: "100%",
                    height: "90%",
                    position: "relative",
                    overflow: "hidden",
                }}
                ref={`${name}wrap`}
            >
                <div
                    style={{
                        position: "absolute",
                        top: " 0",
                        left: " 0",
                        width: "100%",
                        fontSize: "0.22rem"
                    }}
                    ref={name}
                >
                    {
                        _.map(list, (item, index0) => {
                            return (
                                <div
                                    style={{
                                        justifyContent: "space-between",
                                        display: "flex",
                                        height: "40px",
                                        // height: index0 === 0 && this.refs[`${name}wrap`] && list.length * 40 > this.state.height ? "39px" : "40px",
                                        // borderTop: index0 === 0 && this.refs[`${name}wrap`] && list.length * 40 > this.state.height ? "1px solid #58DCFF" : null,
                                        lineHeight: "40px",
                                        background: index0 % 2 === 0 ? "#194699" : "transparent",
                                        padding: "0 10px",
                                    }}
                                >
                                    <div>
                                        {item.name}
                                    </div>
                                    <div>
                                        {item.leftData ? `${item.leftData} / ` : ""}
                                        <span
                                            style={{
                                                color: max === item.rightData ? "#fb6367" : null,
                                            }}
                                        >
                                            {item.rightData}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    }
                    {
                        list.length > 0 && this.refs[`${name}wrap`] && list.length * 40 > this.state.height
                            ? (
                                <div>
                                    {
                                        _.map(list, (item, index0) => {
                                            return (
                                                <div
                                                    style={{
                                                        justifyContent: "space-between",
                                                        display: "flex",
                                                        height: "40px",
                                                        // height: index0 === 0 ? "39px" : "40px",
                                                        // borderTop: index0 === 0 ? "1px solid #58DCFF" : null,
                                                        lineHeight: "40px",
                                                        background: index0 % 2 === 0 ? "#194699" : "transparent",
                                                        padding: "0 10px",
                                                    }}
                                                >
                                                    <div>
                                                        {item.name}
                                                    </div>
                                                    <div>
                                                        {item.leftData ? `${item.leftData} / ` : ""}
                                                        <span
                                                            style={{
                                                                color: max === item.rightData ? "#fb6367" : null,
                                                            }}
                                                        >
                                                            {item.rightData}
                                                        </span>
                                                    </div>
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
        );
    }

}


export default AutoView;
