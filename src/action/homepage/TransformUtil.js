import _ from 'lodash';
import moment from "moment";

function dealProject(res) {
    res = _.map(res, (block, index) => {
        if (block.type === "newQuestion") {
            return {
                name: "新增问题过多的项目",
                items: _.map(block.data, (item) => {
                    return {
                        ...item,
                        name: item.projectName,
                        rightData: item.newIssueCount,
                    }
                }),
                max: (_.maxBy(block.data, "newIssueCount") || {}).newIssueCount,
                title: "新增问题数",
            }
        } else if (block.type === "unResponse") {
            return {
                name: "未及时响应的项目",
                items: _.map(block.data, (item) => {
                    return {
                        ...item,
                        name: item.projectName,
                        leftData: `${item.untimelyResponseRatio}%`,
                        rightData: item.unresolvedIssueCount,
                    }
                }),
                max: (_.maxBy(block.data, "unresolvedIssueCount") || {}).unresolvedIssueCount,
                title: "未及时响应问题比例 / 未解决问题数"
            }
        } else if (block.type === "unResolve") {
            return {
                name: "未解决问题过多项目",
                items: _.map(block.data, (item) => {
                    return {
                        ...item,
                        name: item.projectName,
                        rightData: item.unresolvedIssueCount,
                    }
                }),
                max: (_.maxBy(block.data, "unresolvedIssueCount") || {}).unresolvedIssueCount,
                title: "未解决的问题数",
            }
        } else if (block.type === "unsatisfy") {
                return {
                    name: "满意度低的项目",
                    items: _.chain(block.data).map((item) => {
                        return {
                            ...item,
                            name: item.projectName,
                            rightData: item.satisfication,
                        };
                    }).sortBy("satisfication").value(),
                    max: (_.minBy(block.data, "satisfication") || {}).satisfication,
                    title: "满意度",
                }
        }
    });
    return res
}


export default {
    dealProject
}
