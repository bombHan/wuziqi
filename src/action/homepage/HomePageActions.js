import TestActionTypes from "../../actiontype/homepage/TestActionTypes";
import HomePageService from "../../service/core/HomePageService";
import _ from 'lodash';
import moment from "moment";
import TransformUtil from "./TransformUtil";
import getProjectTypeUtil from "./getProjectTypeUtil";

export let initState = {
    subData: [], // 问题增量数组
    solveData: [], // 问题解决数组
    date: [], // 日期数组
    unsolveData: [], // 未解决问题数变化
    week: [], // 为解决问题数变化的横坐标
    productData: [], // 产品支持情况
    maxUnsolve: 0, // 产品支持情况中最大的未解决问题数
    maxUnResponse: 0, // 产品支持情况中最大的未及时响应问题数
    productLoading: false,

    projectDatas: [
        {name: "在建/售后项目总数", key: "sum", value: "0/0", value1: 0, value2: 0}, // 在建/售后项目总数
        {name: "准备项目数", key: "predict", value: 0}, // 准备项目数
        {name: "满意度过低项目数", key: "low", value: 0}, // 满意度过低项目数
        {name: "已解决但未更新问题数", key: "solved", value: 0}, // 已解决但未更新问题数
        {name: "未解决问题总数", key: "unsolve", value: 0}, // 未解决问题总数
    ],
    maxData: null, // 上面数组中最大的对象
    project: [], // 风险项目监控
    projectAll: [], // 所有项目内容平铺
    projectLoading: false, // 风险项目监控全部数据加载中
    current: null, // 当前项目
    autoplaytime: 10000, // 默认10s滚动一次
    allUnsolveData: [], // 各模块未解决问题数
    allBlock: [], // 所有模块

    p0: 0 ,
    p1: 0 ,
    p2: 0 ,
    p3: 0 ,
    complaintData: [], // 投诉项目数据
    complaintLoading: false,
};


function update(val) {
    return {
        type: TestActionTypes.UPDATE,
        payload: val
    }
}

//----------------------------------------------------
// 获取问题增量及解决情况
function getAddAndSolve() {
    return async (dispatch, getState) => {
        try {
            const pojectType = getProjectTypeUtil.getProjectType();
            const dataContext = getState().homepage.testViewModel;
            console.log(pojectType);
            const [subRes, solveRes] = await Promise.all([
                HomePageService.newAsync({
                    pojectType,
                }),
                HomePageService.resolvedAsync({
                    pojectType,
                })
            ])

            const subData = _.map(subRes, "count");
            const solveData = _.map(solveRes, "count");
            const date = _.map(subRes, (item) => {
                return moment(item.occurDate).format("MM-DD");
            });

            dispatch(update({
                subData,
                solveData,
                date,
            }));
        } finally {
        }
    }
}

// 获取未解决问题数变化
function getUnsolve() {
    return async (dispatch, getState) => {
        try {
            const dataContext = getState().homepage.testViewModel;
            const pojectType = getProjectTypeUtil.getProjectType();
            const unsolveRes = await HomePageService.unresolvedAsync({
                pojectType,
            });
            const unsolveData = _.map(unsolveRes, "count");
            const week = _.map(unsolveRes, (item) => {
                return moment(item.occurDate).format("MM-DD");
            });

            dispatch(update({
                unsolveData,
                week,
            }));
        } finally {
        }
    }
}

// 获取产品支持情况
function getProduct() {
    return async (dispatch, getState) => {
        try {
            dispatch(update({
                productLoading: true,
            }));
            const dataContext = getState().homepage.testViewModel;
            const pojectType = getProjectTypeUtil.getProjectType();
            let res = await HomePageService.personalAsync({
                pojectType,
            });
            res = _.map(res, (item) => {
                return {
                    ...item,
                    name: item.assignee.name,
                    num: item.resolvedIssueCount,
                    unsolve: item.unresolvedIssueCount,
                    unresponse: item.untimelyResponseIssueCount,
                }
            });
            dispatch(update({
                productData: res,
            }));
        } finally {
            dispatch(update({
                productLoading: false
            }));
        }
    }
}

// 获取在建、已解决、最近一月、未解决、满意度过低5个数据 和 p0p1p2p3 和 各模块未解决问题数分步
function getProjectDatas() {
    return async (dispatch, getState) => {
        try {
            const dataContext = getState().homepage.testViewModel;
            const pojectType = getProjectTypeUtil.getProjectType();
            const [obj, unsolveObj] = await Promise.all([
                HomePageService.countAsync({
                    pojectType,
                }),
                HomePageService.issueCountAsync({
                    pojectType,
                })
            ])

            // 中间上面5个模块数据
            const res = [
                {name: "在建/售后项目总数", key: "sum", value: obj.inBuilding + obj.completed, value1: obj.inBuilding, value2: obj.completed}, // 在建/售后项目总数
                {name: "准备项目数", key: "predict", value: obj.inPreparing}, // 准备项目数
                {name: "满意度过低项目数", key: "low", value: obj.unsatisfied}, // 满意度过低项目数
                {name: "已解决但未更新问题数", key: "solved", value: unsolveObj.resolvedButNotClosed}, // 已解决但未更新问题数
                {name: "未解决问题总数", key: "unsolve", value: unsolveObj.total}, // 未解决问题总数
            ];

            // 各模块未解决问题数分布图
            const allUnsolves = _.map(unsolveObj.categoryCounts, (item) => {
                let group = "";
                if (item.count < 20) {
                    group = "third";
                } else if (item.count > 50) {
                    group = "first";
                } else {
                    group = "second";
                }
                return {
                    ...item,
                    group,
                }
            });
            // console.log(allUnsolves)
            const dataList = _.chain(allUnsolves).groupBy("group").map((item)=> {return item;}).flatten().value();
            const groupList = _.chain(allUnsolves).groupBy("group").keys().value();
            const allUnsolveData = _.map(groupList, (item) => {
                const arr = _.map(dataList, (item0) => {
                    if(item0.group === item) {
                        return item0.count;
                    } else {
                        return "-"
                    }
                });
                return arr;
            })
            // console.log(allUnsolveData);

            dispatch(update({
                projectDatas: res,
                maxData: _.maxBy(res, "value"),
                p0: unsolveObj.priorityCount.p0Count,
                p1: unsolveObj.priorityCount.p1Count,
                p2: unsolveObj.priorityCount.p2Count,
                p3: unsolveObj.priorityCount.p3Count,
                allUnsolveData,
                allBlock: _.map(dataList, "category"),
            }));
        } finally {
        }
    }
}


// 获取风险项目监控
function getProject(that) {
    return async (dispatch, getState) => {
        try {
            dispatch(update({
                projectLoading: true,
            }));
            const dataContext = getState().homepage.testViewModel;
            const typeList = ["newQuestion", "unResponse", "unResolve", "unsatisfy"];
            const pojectType = getProjectTypeUtil.getProjectType();
            let res = await Promise.all([
                HomePageService.manynewAsync({
                    pojectType,
                }),
                HomePageService.untimelyresponseAsync({
                    pojectType,
                }),
                HomePageService.manyunresolvedAsync({
                    pojectType,
                }),
                HomePageService.unsatisfiedAsync({
                    pojectType,
                })
            ]);
            // 给每组数据绑定type,用于下面数据处理
            res = _.map(res, (item, index) => {
                return {
                    type: typeList[index],
                    data: item,
                }
            })
            res = TransformUtil.dealProject(res);
            // console.log(res)

            // 计算出最长轮播图最长用时,且当内容超出当前显示模块时才使用这个时间否则为默认时长10s
            let max = 0;
            _.forEach(res, (item) => {
                if (item.items.length > max) {
                    max = item.items.length;
                }
            });
            const time = (max * 40) * 50;
            if (time > dataContext.autoplaytime && (max * 40) > that.refs.project.offsetHeight) {
                dispatch(update({
                    autoplaytime: time,
                }));
            }
            const projectAll = [];
            _.forEach(res, (item, index) => {
                _.forEach(item.items, (data) => {
                    projectAll.push({
                        ...data,
                        fatherName: item.name
                    });
                })
            })

            dispatch(update({
                project: res,
                // projectAll,
                current: res.length > 0 ? res[0] : null,
            }));

        } finally {
            dispatch(update({
                projectLoading: false,
            }));
        }
    }
}

// 获取投诉项目
function getComplaint() {
    return async (dispatch, getState) => {
        try {
            dispatch(update({
                complaintLoading: true,
            }));
            const dataContext = getState().homepage.testViewModel;
            let res = [
                // {name: "辅111硕",remarks: "11khfkjdshfkjash范德萨发的士大夫士大夫撒大丰收的士大夫士大夫" ,days: 10, times: 12, num: 13, tips: "khfkjdshfkjashjsfkah丰富全额付文峰全方位服务全方位器jkfdshj", time: "12-22"},
                // {name: "辅221硕",remarks: "22khfkjdshfkjash范德萨发的士大夫士大夫撒大丰收的士大夫士大夫" ,days: 10, times: 15, num: 13, tips: "khfkjdshfkjashjsfkah丰富全额付文峰全方位服务全方位器jkfdshj", time: "12-21"},
                // {name: "辅1331硕",remarks: "333khfkjdshfkjash范德萨发的士大夫士大夫撒大丰收的士大夫士大夫" ,days: 32, times: 12, num: 13, tips: "khfkjdshfkjashjsfkah丰富全额付文峰全方位服务全方位器jkfdshj", time: "12-22"},
                // {name: "辅1331硕",remarks: "333khfkjdshfkjash范德萨发的士大夫士大夫撒大丰收的士大夫士大夫" ,days: 32, times: 12, num: 13, tips: "khfkjdshfkjashjsfkah丰富全额付文峰全方位服务全方位器jkfdshj", time: "12-22"}
            ];
            res = _.map(res, (item, index) => {
                const dataArr = [item.days, item.times, item.num];
                const max = _.max(dataArr);
                return {
                    ...item,
                    max
                };
            });

            dispatch(update({
                complaintData: res,
            }));
        } finally {
            dispatch(update({
                complaintLoading: false
            }));
        }
    }
}


export default {
    update,
    getAddAndSolve,
    getUnsolve,
    getProduct,
    getProjectDatas,
    getProject,
    getComplaint,

}
