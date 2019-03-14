import "whatwg-fetch";
import ServiceException from "../exception/ServiceException";
import queryString from "query-string";

import React, {Component} from "react";
import {message, Modal} from "antd";

import urljoin from "url-join";
import MainActionTypes from "../actiontype/MainActionTypes";
import Constants from "../constant/Constants";

import AppContext from "../application/AppContext";


import EmbedUtil from "./EmbedUtil";


const _request = async option => {
    let {
        path = "",
        param = {},
        method = "POST",
        contentType = "json"
    } = option;

    let headers = new Headers();

    if (contentType === "formData") {
        headers.append("Accept", "*/*");
    } else {
        headers.append("Accept", "application/json");
    }

    let body;
    if (contentType === "json") {
        headers.append("Content-Type", "application/json");
        body = JSON.stringify(param);

    } else if (contentType === "formData") {
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        body = queryString.stringify(param);
    } else {
        //query params
        if (param != null) {
            path = `${path}?${queryString.stringify(param)}`;
        }
    }
    // https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api
    // TODO : path params


    const response = await fetch(urljoin(Constants.BASE_URL, path), {
        credentials: "same-origin",
        method,
        body,
        headers,
    });
    const text = await response.text();
    let result: any = null;
    if (text !== "") {
        result = JSON.parse(text);
    }

    if (200 <= response.status &&
        response.status < 300) {
        return result;

    } else if (response.status === 400 ||
        response.status === 401 ||
        response.status === 500) {
        // griffin 自定义错误

        if (result !== null) {
            throw new ServiceException(
                result.errCode,
                result.errMsg,
                result.level,
                path);

        } else {
            throw new ServiceException(
                ServiceException.UNKNOWN,
                "网络请求发生未知错误!",
                null,
                path);
        }
    } else if (400 < response.status &&
        response.status < 500) {
        // 服务器 spring 返回格式 :
        // message
        // path
        // level
        // ...
        //
        // spring 返回错误
        // 400 表示参数提交不合法
        if (result !== null) {
            throw new ServiceException(
                ServiceException.CLIENT_ERROR,
                result.message,
                null,
                path);

        } else {
            throw new ServiceException(
                ServiceException.CLIENT_ERROR,
                null,
                null,
                path);
        }
    } else if (500 < response.status &&
        response.status < 600) {
        // spring 返回错误
        // 500 表示服务计算错误

        if (result !== null) {
            throw new ServiceException(
                ServiceException.SERVER_ERROR,
                result.message,
                null,
                path);

        } else {
            throw new ServiceException(
                ServiceException.SERVER_ERROR,
                null,
                null,
                path);
        }
    } else {
        throw new ServiceException(
            ServiceException.UNKNOWN,
            "网络请求发生未知错误!",
            null,
            path);
    }
};

const request = async option => {
    try {
        return await _request(option);

    } catch (error) {
        // 未登录错误, 不弹框; 返回首页, 将错误显示在首页
        if (error.code === Constants.NO_AUTH_CODE) { //
            AppContext.store.dispatch({
                type: MainActionTypes.ERROR,
                payload: error,
            });
        }
        else {
            Modal.error({
                title: "出错啦!",
                content: error.message,
            });
        }

        throw  error;
    }
};

export default {
    _request,
    request,
}


