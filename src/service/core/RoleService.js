import RemoteCall from "../../util/RemoteCall";
const remoteCall = new RemoteCall("api/nursecarecore/role");


function findAllAsync(obj) {
    return remoteCall.invoke("findAll",...arguments);
}
function addRoleAsync(obj) {
    return remoteCall.invoke("addRole",...arguments);
}
function updateRoleAsync(obj) {
    return remoteCall.invoke("updateRole",...arguments);
}
function deleteRoleAsync(obj) {
    return remoteCall.invoke("deleteRole",...arguments);
}
function findRolePermissionGroupsAsync(obj) {
    return remoteCall.invoke("findRolePermissionGroups",...arguments);
}
function updateRolePermissionGroupAsync(obj) {
    return remoteCall.invoke("updateRolePermissionGroup",...arguments);
}

export default {
    findAllAsync,
    addRoleAsync,
    updateRoleAsync,
    deleteRoleAsync,
    findRolePermissionGroupsAsync,
    updateRolePermissionGroupAsync,
}
