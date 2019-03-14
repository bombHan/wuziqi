/**
 * Created by lianfan on 2018/1/11.
 */
import RemoteCall from "../../util/RemoteCall";
const remoteCall = new RemoteCall("api/platform/gridComponent");

function getByCodeAsync(obj) {
    return remoteCall.invoke("getByCode",...arguments);
}

export default {
    getByCodeAsync,
}
