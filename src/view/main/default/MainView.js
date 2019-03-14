import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {HashRouter, Route, Link,Redirect,Switch} from "react-router-dom";
import _ from "lodash";
import classNames from "classnames";

import {Spin, Modal, Button, Menu, Icon, message} from "antd";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import style from "./MainView.scss";
import Constants from "../../../constant/Constants";
import MainActions from "../../../action/main/defalut/MainActions";

import MenuView from "../MenuView";
import MenuConfig from "./MenuConfig";


import Lazy from "../../../component/lazy/Lazy";


import AppContext from "../../../application/AppContext";

// {(Comp) => (Comp
//         ? <Comp/>
//         : <Loading />
// )}
const getLazyComp = load => props => (
    <Lazy load={load}>
        {Comp => <Comp {...props}/>}
    </Lazy>
);


const getRoutes = (list, baseUrl = "") => {
    return _.chain(list)
        .flatMap(item => {
            const path = baseUrl + "/" + item.key;
            let result = [];
            if (item.children) {
                result = getRoutes(item.children, path);
            }

            if (item.component) {
                result.push(<Route key={path} path={path} component={getLazyComp(item.component)}/>)
            }

            return result;
        })
        .value();
};

const messageBox = (title, message) => {

    const cls = classNames(
        style["message-box"],
        style["border"]);

    return (
        <div style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "#F8FAFC",
            overflow: "auto",
        }}>

            <div className={cls}>
                <Icon type="close-circle"
                      style={{
                          color: "#F04134",
                          fontSize: "24px",
                          marginRight: "16px",
                          padding: "0 1px",
                          float: "left"
                      }}/>
                <span style={{color: "rgba(0, 0, 0, 0.65)", fontWeight: "bold", fontSize: "14px"}}>
                    {title}
                </span>
                <div
                    style={{
                        marginLeft: "42px",
                        fontSize: "12px",
                        color: "rgba(0, 0, 0, 0.65)",
                        marginTop: "8px"
                    }}>{message}</div>
            </div>
        </div>
    );

};


class MainView extends Component {

    componentWillMount() {
        // const {actions} = this.props;
        // actions.getData();
    }

    //     // 判断是否有权限访问菜单 pathname
    // componentWillReceiveProps(nextProps) {
    //
    //     // 用户权限Auth
    //     // A React Higher Order Component (HOC) for handling Authentication and Authorization with Redux and React-Router
    //     // https://github.com/mjrussell/redux-auth-wrapper
    //     // Sample project showing possible authentication flow using React, Redux, React-Router, and JWT
    //     // https://github.com/joshgeller/react-redux-jwt-auth-example
    //     const {
    //         dataContext : {isExecuting, user},
    //         location : {pathname}
    //     } = nextProps;
    //
    //
    //     if (!isExecuting) {
    //         if (user != null) {
    //             // 1. 存在user的时候才判断hasPermission
    //             // 否则每次componentWillReceiveProps进来都要被重定向到 hashHistory.replace("/")
    //             //
    //             // 2. user为null的情况在render中处理
    //             // NOTE : User必须有Constants.MENU_TYPES.ROOT权限, 否则会造成死循环
    //
    //             if (!PermissionUtil.allowPath(user.role.code, pathname)) {
    //
    //                 //TODO: react-router-redux
    //                 // dispatch(replace("/"))
    //                 hashHistory.replace(Constants.MENU_TYPES.ROOT);
    //             }
    //         }
    //     }
    // }


    render() {
        const {dataContext, actions} = this.props;

        if (dataContext.isExecuting) {
            return (
                <div style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Spin className={style["spin"]} size="large" tip="正在初始化数据..."/>
                </div>
            );
        } else if (dataContext.error != null) {
            return messageBox(
                "出错啦!", // dataContext.error.code,
                dataContext.error.message
            );
        }
        // else if (AppContext.user == null) {
        //     return messageBox(
        //         "出错啦!", // 100001,
        //         "用户信息获取失败!"
        //     );
        // }

        // else if (dataContext.config == null) {
        //     return messageBox(
        //         "出错啦!", // 100001,
        //         "配置信息获取失败!"
        //     );
        // }
        // 判断用户是否有登录权限
        // else if (!PermissionUtil.alloLogin(dataContext.user.role.code)) {
        //     return messageBox(
        //         "出错啦!", // 100001,
        //         "该用户没有登录权限，请使用管理员账号登录!"
        //     );
        // }
        else {
            let routes = getRoutes(MenuConfig.menu);
            routes.unshift(<Route key={"/menu"} path={"/menu"} render={() => <MenuView menu={MenuConfig.menu}/>}/>);
            return (
                        <div style={{
                            position: "fixed",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                        }}>
                            <Switch>
                                <Redirect exact from='/' to='/wuziqi'/>
                                {routes}
                            </Switch>
                        </div>
            );

        }
    }
}


export default connect(
    state => ({
        dataContext: state.mainViewModel
    }),
    dispatch => ({
        actions: bindActionCreators(MainActions, dispatch)
    })
)(MainView);

