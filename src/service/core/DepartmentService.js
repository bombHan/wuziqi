/**
 * Created by swchen on 2017/6/7.
 */


import RemoteCall from "../../util/RemoteCall";

const remoteCall = new RemoteCall("api/nursecarecore/department");

//获取所有科室(平铺
function findAllUnitsAsync() {
    return remoteCall.invoke("findAllUnits");
}

//获取所有科室(树形
function findAllUnitsInTreeAsync() {
    return remoteCall.invoke("findAllUnitsInTree");
}

function findAuthUnitsAsync() {
    return remoteCall.invoke("findAuthUnits", {permission: true});
}

function findAuthUnitsInTreeAsync() {
    return remoteCall.invoke("findAuthUnitsInTree", {permission: true});
}


function getNurseInitAsync(param) {
    return remoteCall.invoke("getNurseInit", param);
}


function getRootNurseUnitAsync(param) {
    return remoteCall.invoke("getRootNurseUnit");
}

function getRootNurseUnitWithoutExceptionHandleAsync(param) {
    return remoteCall._invoke("getRootNurseUnit");
}

function findEditAllAsync(obj) {
    return remoteCall.invoke("findEditAll",...arguments);
}

function updateNurseUnitAsync(obj) {
    return remoteCall.invoke("updateNurseUnit",...arguments);
}

function deleteNurseUnitAsync(obj) {
    return remoteCall.invoke("deleteNurseUnit",...arguments);
}
function findNurseUnitByUserInfoAsync(obj) {
    return remoteCall.invoke("findNurseUnitByUserInfo",...arguments);
}
function addNurseUnitAsync(obj) {
    return remoteCall.invoke("addNurseUnit",...arguments);
}
function getNurseUnitAsync(obj) {
    return remoteCall.invoke("getNurseUnit",...arguments);
}

export default {
    findAuthUnitsAsync,
    findAllUnitsAsync,
    findAllUnitsInTreeAsync,
    findAuthUnitsInTreeAsync,
    getNurseInitAsync,
    getRootNurseUnitAsync,
    getRootNurseUnitWithoutExceptionHandleAsync,
    findEditAllAsync,
    updateNurseUnitAsync,
    deleteNurseUnitAsync,
    addNurseUnitAsync,
    findNurseUnitByUserInfoAsync,
    getNurseUnitAsync
}
