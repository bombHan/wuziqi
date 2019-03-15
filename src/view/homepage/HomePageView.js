import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import _ from 'lodash';
import {Badge, Cascader, Form, Icon, Input, Modal, Select, Spin, Table, Menu, Carousel, Button} from 'antd';
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
        this.state={
            tt: 0,
            time: 0,
        }

    }

    componentDidMount() {
        const {actions, dataContext} = this.props;
    }

    render() {
        // (pagination) => {console.log(pagination.current)};
        const {dataContext, actions} = this.props;
        return (
           <div>
               <div
                   style={{
                       display: "flex",
                       flexWrap: "wrap",
                       height: "200px",
                       width: "200px",
                       borderRadius: "2px",
                       background: "#ffd783",
                       margin: "20px auto",
                   }}
               >
                   <div
                       style={{
                           margin: "5px",
                           background: this.state.tt === 1 ? "#ffe297" :"#fff",
                           borderRadius: "4px",
                           height: "60px",
                           width: "60px",
                           lineHeight: "60px",
                           textAlign: "center",
                           color: "red"
                       }}
                   >
                       现金1W
                   </div>
                   <div
                       style={{
                           margin: "5px 5px 5px 0",
                           background: this.state.tt === 2 ? "#ffe297" :"#fff",
                           borderRadius: "4px",
                           height: "60px",
                           width: "60px",
                           lineHeight: "60px",
                           textAlign: "center",
                           color: "red"
                       }}
                   >
                       现金2W
                   </div>
                   <div
                       style={{
                           margin: "5px 5px 5px 0",
                           background: this.state.tt === 3 ? "#ffe297" :"#fff",
                           borderRadius: "4px",
                           height: "60px",
                           width: "60px",
                           lineHeight: "60px",
                           textAlign: "center",
                           color: "red"
                       }}
                   >
                       现金3W
                   </div>
                   <div
                       style={{
                           margin: "0 5px 5px 5px",
                           background: this.state.tt === 8 ? "#ffe297" :"#fff",
                           borderRadius: "4px",
                           height: "60px",
                           width: "60px",
                           lineHeight: "60px",
                           textAlign: "center",
                           color: "red"
                       }}
                   >
                       现金8W
                   </div>
                   <div
                       style={{
                           margin: "0 5px 5px 0",
                           background: "#ffe297",
                           borderRadius: "4px",
                           height: "60px",
                           width: "60px",
                           lineHeight: "60px",
                           textAlign: "center",
                           color: "red",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                       }}
                   >
                       <Button
                           style={{
                               padding: "5px",
                               color: "#fff",
                               background: "#e87814",
                           }}
                           disabled={this.state.time > 0}
                           onClick={() => {
                               let target = null;
                               let ran = Math.ceil(Math.random()*10);
                               ran = ran > 9 || ran === 1 ? 2 : ran;
                               this.setState({
                                   tt: 1,
                                   time: 0,
                               });
                               if (this.timer1  != null) {
                                   clearInterval(this.timer1);
                                   this.timer1 = null;
                               }
                               console.log(ran)

                               if (target) {

                               } else {
                                   this.timer1 = setInterval(() => {
                                       let tt = this.state.tt;
                                       let time = this.state.time + 100;
                                       console.log(time > 2000 , tt === ran)
                                       tt = tt + 1;
                                       if (time > 1000) {
                                           clearInterval(this.timer1);
                                           this.timer2 = setInterval(() => {
                                               let tt = this.state.tt;
                                               let time = this.state.time + 100;
                                               tt = tt + 1;
                                               if (time > 2000 && tt === ran) {
                                                   clearInterval(this.timer2);
                                                   Modal.success({
                                                       title: "恭喜你中奖了",
                                                       zIndex: 10000,
                                                       content: `您中奖的金额为${this.state.tt}万元`,
                                                   });
                                                   this.setState({
                                                       time: 0,
                                                   });
                                               } else {
                                                   this.setState({
                                                       tt: tt === 9 ? 1 : tt,
                                                       time,
                                                   });
                                               }
                                           }, 200)
                                       } else {
                                           this.setState({
                                               tt: tt === 9 ? 1 : tt,
                                               time,
                                           });
                                       }
                                   }, 100);

                               }
                           }}
                       >
                           开始
                       </Button>
                   </div>
                   <div
                       style={{
                           margin: "0 5px 5px 0",
                           background: this.state.tt === 4 ? "#ffe297" :"#fff",
                           borderRadius: "4px",
                           height: "60px",
                           width: "60px",
                           lineHeight: "60px",
                           textAlign: "center",
                           color: "red"
                       }}
                   >
                       现金4W
                   </div>
                   <div
                       style={{
                           margin: "0 5px 5px 5px",
                           background: this.state.tt === 7 ? "#ffe297" :"#fff",
                           borderRadius: "4px",
                           height: "60px",
                           width: "60px",
                           lineHeight: "60px",
                           textAlign: "center",
                           color: "red"
                       }}
                   >
                       现金7W
                   </div>
                   <div
                       style={{
                           margin: "0 5px 5px 0",
                           background: this.state.tt === 6 ? "#ffe297" :"#fff",
                           borderRadius: "4px",
                           height: "60px",
                           width: "60px",
                           lineHeight: "60px",
                           textAlign: "center",
                           color: "red",
                       }}
                   >
                       现金6W
                   </div>
                   <div
                       style={{
                           margin: "0 5px 5px 0",
                           background: this.state.tt === 5 ? "#ffe297" :"#fff",
                           borderRadius: "4px",
                           height: "60px",
                           width: "60px",
                           lineHeight: "60px",
                           textAlign: "center",
                           color: "red"
                       }}
                   >
                       现金5W
                   </div>
               </div>
               <div
                   style={{
                       margin: "0 auto",
                       width: "102px"
                   }}
               >
                   <Button
                       onClick={() => {
                           this.props.history.push({pathname: "wuziqi"})
                       }}
                   >
                       去下五子棋
                   </Button>
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
