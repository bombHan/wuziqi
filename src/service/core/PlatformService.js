/**
 * Created by lianfan on 2017/12/20.
 */
import RemoteCall from "../../util/RemoteCall";
const remoteCall = new RemoteCall("api/platform/dict");

function getDictAsync(obj) {
    return remoteCall.invoke("getDict",...arguments);
}
function editDictAsync(obj) {
    return remoteCall.invoke("editDict",...arguments);
}
export default {
    getDictAsync,
    editDictAsync,
}
