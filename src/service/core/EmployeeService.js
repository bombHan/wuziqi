import RemoteCall from "../../util/RemoteCall";

const remoteCall = new RemoteCall("api/nursecarecore/employee");


function findAsync(obj) {
    return remoteCall.invoke("find", ...arguments);
}

function updateAsync(obj) {
    return remoteCall.invoke("update", ...arguments);
}

function findAllDutyAsync(obj) {
    return remoteCall.invoke("findAllDuty",...arguments);
}

function findDDUserAsync(obj) {
    return remoteCall.invoke("findDDUser",...arguments);
}

function resetUserUnitAsync(obj) {
    return remoteCall.invoke("resetUserUnit",...arguments);
}
function updateNurseUnitAsync(obj) {
    return remoteCall.invoke("updateNurseUnit",...arguments);
}
function transferNurseUnitAsync(obj) {
    return remoteCall.invoke("transferNurseUnit",...arguments);
}
function findBasicEmployeeAsync(obj) {
    return remoteCall.invoke("findBasicEmployee",...arguments);
}

function findBasicEmployeeTreeAsync(obj) {
    return remoteCall.invoke("findBasicEmployeeTree",...arguments);
}
function addUserRoleAsync(obj) {
    return remoteCall.invoke("addUserRole",...arguments);
}
function removeUserRoleAsync(obj) {
    return remoteCall.invoke("removeUserRole",...arguments);
}
export default {
    findAsync,
    updateAsync,
    findAllDutyAsync,
    findDDUserAsync,
    resetUserUnitAsync,
    updateNurseUnitAsync,
    transferNurseUnitAsync,
    findBasicEmployeeAsync,
    findBasicEmployeeTreeAsync,

    addUserRoleAsync,
    removeUserRoleAsync,
}
