/**
 * Created by swchen on 2017/6/27.
 */
// 护理排版管理
import HomePageView from "bundle-loader?lazy!../../homepage/HomePageView";

import DataSummaryView from "bundle-loader?lazy!../../homepage/DataSummaryView";

const menu = [
    {
        key: "homepage",
        name: "首页",
        component: HomePageView,
        // children: [{
        //     key: "hospitaldetail",
        //     name: "医院明细",
        //     component: HospitalDetailView,
        // },]
    },{
        key: "wuziqi",
        name: "五子棋",
        component: DataSummaryView,
        // children: [{
        //     key: "hospitaldetail",
        //     name: "医院明细",
        //     component: HospitalDetailView,
        // },]
    }];


export default {
    menu,
}
