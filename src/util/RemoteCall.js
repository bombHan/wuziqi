// @flow

import urljoin from "url-join";
import RequestUtil from "./RequestUtil";


export default class RemoteCall {

    relativeURL: string;

    constructor(relativeURL: string) {
        this.relativeURL = relativeURL;
    }

    _invoke(methodName: string, param: any = {}): Promise<any> {
        return RequestUtil._request({
            path: urljoin(this.relativeURL, methodName),
            param,
            method: "POST",
            contentType: "json",
        })
    }

    invoke(methodName: string, param: any): Promise<any> {
        return RequestUtil.request({
            path: urljoin(this.relativeURL, methodName),
            param,
            method: "POST",
            contentType: "json",
        })
    }
}
