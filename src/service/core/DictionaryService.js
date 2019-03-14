/**
 * Created by wyt on 2017/8/11.
 */
import RemoteCall from "../../util/RemoteCall";
const remoteCall = new RemoteCall("api/nursecarecore/dictionary");

function loadListAsync(str) {
    return remoteCall.invoke("loadList", ...arguments);
}




export default {
   loadListAsync
}