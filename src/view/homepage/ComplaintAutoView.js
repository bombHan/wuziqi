import React, {Component} from "react";
import _ from 'lodash';
import moment from "moment/moment";
import Text from "../../component/text/Text";

class ComplaintAutoView extends Component {
    constructor(...props) {
        super(...props);
        this.state={
            height: 510,
        }
    }

    componentDidMount() {
        const {complaintData} = this.props;
        // console.log(complaintData.length * 170, this.refs.complaintwrap.offsetHeight)
        if (this.refs.complaintwrap && complaintData.length * 170 > this.refs.complaintwrap.offsetHeight) {
            // 用于判断是否需要滚动时渲染两遍内容
            this.setState({
                height: this.refs.complaintwrap.offsetHeight,
            });
            this.id = setInterval(() => {
                const oUl = this.refs.complaint;
                if (oUl) {
                   if(oUl.offsetTop === -(170 * complaintData.length)) {
                       oUl.style.top = 0;
                   }
                   oUl.style.top = oUl.offsetTop - 1 + "px";
                }
            }, 50)
        }
    }

    componentDidUpdate(pre) {
        const {complaintData} = this.props;
        console.log(pre, complaintData)
        if(pre.complaintData && pre.complaintData.length !== complaintData.length) {
            if (this.id  != null) {
                clearInterval(this.id );
                this.id = null;
            }
            this.refs.complaint.style.top = 0;
            if (this.refs.complaintwrap && complaintData.length * 170 > this.refs.complaintwrap.offsetHeight) {
                // 用于判断是否需要滚动时渲染两遍内容
                this.setState({
                    height: this.refs.complaintwrap.offsetHeight,
                });
                this.id = setInterval(() => {
                    const oUl = this.refs.complaint;
                    if (oUl) {
                        if(oUl.offsetTop === -(170 * complaintData.length)) {
                            oUl.style.top = 0;
                        }
                        oUl.style.top = oUl.offsetTop - 1 + "px";
                    }
                }, 50)
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
        const {complaintData} = this.props;
        const {height} = this.state;
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    position: "relative",
                    overflow: "hidden",
                    fontSize: "0.24rem"
                }}
                ref="complaintwrap"
            >
                <div
                    style={{
                        position: "absolute",
                        top: " 0",
                        left: " 0",
                        width: "100%",
                    }}
                    ref="complaint"
                >
                    {
                        _.map(complaintData, (item, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        height: "160px",
                                        marginBottom: index === complaintData.length - 1 ? 0 : "10px",
                                        width: "100%",
                                        borderRadius: "6px",
                                        background: "#0D3B88",
                                        padding: "0.1rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#BEDAFB",
                                            fontSize: "0.32rem"
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#E9A444",
                                            fontSize: "0.28rem",
                                            margin: "0.1rem 0"
                                        }}
                                    >
                                        {item.remarks}
                                    </Text>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <div
                                            style={{
                                                margin: "0 0.1rem 0.1rem 0",
                                                background: item.days === item.max ? "#D75556" : "#2A6CD8",
                                                borderRadius: "0.2rem",
                                                padding: "0rem 0.1rem",
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            投诉天数 {item.days}
                                        </div>
                                        <div
                                            style={{
                                                margin: "0 0.1rem 0.1rem 0",
                                                background: item.times === item.max ? "#D75556" : "#2A6CD8",
                                                borderRadius: "0.2rem",
                                                padding: "0rem 0.1rem",
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            累计投诉次数 {item.times}
                                        </div>
                                        <div
                                            style={{
                                                margin: "0 0.1rem 0.1rem 0",
                                                background: item.num === item.max ? "#D75556" : "#2A6CD8",
                                                borderRadius: "0.2rem",
                                                padding: "0rem 0.1rem",
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            问题数 {item.num}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <Text>
                                            {item.tips}
                                        </Text>
                                        <span
                                            style={{
                                                width: "1.4rem",
                                                flex: "none",
                                                display: "flex",
                                                flexDirection: "row-reverse"
                                            }}
                                        >
                                            {
                                                moment(item.time).format("MM-DD")
                                            }
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        complaintData.length > 0 && this.refs.complaintwrap && complaintData.length * 170 > height
                            ? (
                                <div>
                                    {
                                        _.map(complaintData, (item, index) => {
                                            return (
                                                <div
                                                    key={`copy${index}`}
                                                    style={{
                                                        height: "160px",
                                                        marginTop: index === 0 ? "10px" : 0,
                                                        marginBottom: index === complaintData.length - 1 ? 0 : "10px",
                                                        width: "100%",
                                                        borderRadius: "6px",
                                                        background: "#0D3B88",
                                                        padding: "0.1rem",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "space-between"
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: "#BEDAFB",
                                                            fontSize: "16px"
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color: "#E9A444",
                                                            fontSize: "14px",
                                                            margin: "0.1rem 0"
                                                        }}
                                                    >
                                                        {item.remarks}
                                                    </Text>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                margin: "0 0.1rem 0.1rem 0",
                                                                background: item.days === item.max ? "#D75556" : "#2A6CD8",
                                                                borderRadius: "0.2rem",
                                                                padding: "0 0.1rem",
                                                                color: "#FFFFFF",
                                                            }}
                                                        >
                                                            投诉天数 {item.days}
                                                        </div>
                                                        <div
                                                            style={{
                                                                margin: "0 0.1rem 0.1rem 0",
                                                                background: item.times === item.max ? "#D75556" : "#2A6CD8",
                                                                borderRadius: "0.2rem",
                                                                padding: "0 0.1rem",
                                                                color: "#FFFFFF",
                                                            }}
                                                        >
                                                            累计投诉次数 {item.times}
                                                        </div>
                                                        <div
                                                            style={{
                                                                margin: "0 0.1rem 0.1rem 0",
                                                                background: item.num === item.max ? "#D75556" : "#2A6CD8",
                                                                borderRadius: "0.2rem",
                                                                padding: "0 0.1rem",
                                                                color: "#FFFFFF",
                                                            }}
                                                        >
                                                            问题数 {item.num}
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            width: "100%",
                                                            justifyContent: "space-between"
                                                        }}
                                                    >
                                                        <Text>
                                                            {item.tips}
                                                        </Text>
                                                        <span
                                                            style={{
                                                                width: "1.4rem",
                                                                flex: "none",
                                                                display: "flex",
                                                                flexDirection: "row-reverse"
                                                            }}
                                                        >
                                                            {
                                                                moment(item.time).format("MM-DD")
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            )
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


export default ComplaintAutoView;
