/**
 * Created by swchen on 2017/5/8.
 */


import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {HashRouter, Route, Link,} from "react-router-dom";
import _ from "lodash";
import classNames from "classnames";

import {Spin, Modal, Button, Menu, Icon, message, Card} from "antd";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const getLinks = (list, baseUrl = "") => {
    return _.chain(list)
        .flatMap(item => {
            const path = baseUrl + "/" + item.key;

            let result = [];
            if (item.children) {
                result = getLinks(item.children, path);
            }

            if (item.component) {
                result.unshift(
                    <tr key={path}>
                        <td><Link to={path}>{item.name}</Link></td>
                        <td><Link to={path} style={{marginLeft: 10}}>{item.key}</Link></td>
                    </tr>);
            } else {
                result.unshift(
                    <tr key={path}>
                        <td>{item.name}</td>
                        <td>
                            <div style={{marginLeft: 10, fontWeight: "bold"}}>{path}</div>
                        </td>
                    </tr>);
            }

            return result;
        })
        .value();
};

const getCards = list => _.map(list, (item, key) => (
    <Card style={{flex: "none", margin: "0 10px 10px 0", lineHeight: 1.47, fontSize: 14}}
          title={`${item.name} : ${item.key}`}
          key={key}>
        <table style={{fontSize: 13}}>
            <tbody>
            {
                getLinks(item.children, item.key)
            }
            </tbody>
        </table>
    </Card>
));

export default class MenuView extends Component {

    render() {
        const {menu} = this.props;
        return (
            <div style={{
                height: "100%",
                overflow: "auto",
                display: "flex",
                alignItems: "flex-start",
                flexWrap: "wrap",
                padding: 20
            }}>
                {
                    getCards(menu)
                }
            </div>
        );
    }
}