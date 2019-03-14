// @flow

import urljoin from "url-join";
import RequestUtil from "./RequestUtil";


export default class RemoteCallUtil {

    relativeURL: string;

    constructor(relativeURL: string) {
        this.relativeURL = relativeURL;
    }

    post(path, param) {
        return RequestUtil.request({
            path: urljoin(this.relativeURL, path),
            param,
            method: "POST",
            contentType: "query",
        });
    }

    get (path, param) {
        return RequestUtil.request({
            path: urljoin(this.relativeURL, path),
            param,
            method: "GET",
            contentType: "query",
        });
    }

    delete (path, param) {
        return RequestUtil.request({
            path: urljoin(this.relativeURL, path),
            param,
            method: "DELETE",
            contentType: "query",
        });
    }

    postFormData (path, param) {
        return RequestUtil.request({
            path: urljoin(this.relativeURL, path),
            param,
            method: "POST",
            contentType: "formData",
        });
    }
}





