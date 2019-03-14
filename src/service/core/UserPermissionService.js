/**
 * Created by swchen on 2017/6/27.
 */


import RemoteCall from "../../util/RemoteCall";

const remoteCall = new RemoteCall("api/nursecarecore/userPermission");
const newRemoteCall = new RemoteCall("api/platform/User/nurseunit");

function findUserByTextAsync(param) {
    return remoteCall.invoke("findUserByText", param)
}


function findUserAsync(param) {
    return remoteCall.invoke("findUser", param)
}


function listAllPermsAsync() {
    return remoteCall.invoke("listAllPerms");
}

function myPermissionsAsync() {
    return remoteCall.invoke("myPermissions");
}


function findUserWithoutExceptionHandleAsync(param) {
    return remoteCall._invoke("findUser", param)
}

function myPermissionsWithoutExceptionHandleAsync() {
    return remoteCall._invoke("myPermissions");
}

function myMenusFlatWithoutExceptionHandleAsync() {
    return remoteCall._invoke("myMenusFlat");
}

function getSysDictWithoutExceptionHandleAsync() {
    return remoteCall._invoke("getSysDict");
}
function findAllPermissionGroupsAsync(obj) {
    return remoteCall.invoke("findAllPermissionGroups",...arguments);
}

function getListItemsAsync(obj) {
    return newRemoteCall.invoke("listItems",...arguments);
}

export default {
    findUserByTextAsync,
    findUserAsync,
    listAllPermsAsync,
    myPermissionsAsync,
    findUserWithoutExceptionHandleAsync,
    myPermissionsWithoutExceptionHandleAsync,
    myMenusFlatWithoutExceptionHandleAsync,
    getSysDictWithoutExceptionHandleAsync,
    findAllPermissionGroupsAsync,
    getListItemsAsync,

}

