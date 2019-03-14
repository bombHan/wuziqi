import RemoteCall from "../../util/RemoteCall";
import RemoteCallUtil from "../../util/RemoteCallUtil"

const remoteCall = new RemoteCall("api/nursecare/dashbord");
const remoteCallUtil = new RemoteCallUtil("api/noAuth/dingding/auth");
const remoteCallPer = new RemoteCall("api/nursecare/dashbord/core/perm");


function findHospitalProfileAsync(param) {
    return remoteCall.invoke("findHospitalProfile", param);
}
function findUnitProfileAsync(param) {
    return remoteCall.invoke("findUnitProfile", param);
}
function findUserByRoleAsync(param) {
    return remoteCall.invoke("findUserByRole", param);
}
function clearCacheAsync(param) {
    return remoteCall.invoke("clearCache",param)
}
function startSyncAsync(param) {
    return remoteCall.invoke("startSync",param)
}

// 设置配置项
const setConfigAsync = (param) => {
    return remoteCall.invoke('core/config/setConfig', param);
};
// 获取配置项
const getConfigAsync = (param) => {
    return remoteCall.invoke('core/config/getConfig', param);
};
//编辑
function editHospitalManualAsync(param) {
    return remoteCall.invoke("edit/editHospitalManual",param)
}

// 获取树状科室 按照当前选中医院
const findTreeAsync = (param) => {
    return remoteCall.invoke('core/unit/findTree', param);
};

// 获取已指定调班审批科室
const findSwapPlanModeAsync = (param) => {
    return remoteCall.invoke('edit/findSwapPlanMode', param);
};

// 添加指定调班审批科室
const addSwapPlanModeAsync = (param) => {
    return remoteCall.invoke('edit/addSwapPlanMode', param);
};

// 删除指定调班审批科室
const deleteSwapPlanModeAsync = (param) => {
    return remoteCall.invoke('edit/deleteSwapPlanMode', param);
};

// 编辑升级公告
const updateNoticeAsync = (param) => {
    return remoteCall.invoke("platform/updateNotice/update", param);
};


//获取所有医院的存假清零
const findAsync = (param) => {
    return remoteCallPer.invoke("find", param);
};
//改变所有医院的存假清零
const updateStatusAsync = (param) => {
    return remoteCallPer.invoke("updateStatus", param);
};

// 退出登录
const logoutAsync = (param) => {
    return remoteCall.invoke("logout", param);
};

//费用统计权限获取
const getExpenseStatAsync = (param) => {
    return remoteCall.invoke("edit/getExpenseStat", param);
};

//费用统计权限设置
const setExpenseStatAsync = (param) => {
    return remoteCall.invoke("edit/setExpenseStat", param);
};

function getDocOndutyStatusAsync(param) {
    return remoteCall.invoke("edit/getDocOndutyStatus",param)
}

function setDocOndutyStatusAsync(param) {
    return remoteCall.invoke("edit/setDocOndutyStatus",param)
}

function findUnWeekExceedForStoredUnitAsync(param) {
    return remoteCall.invoke("edit/findUnWeekExceedForStoredUnit",param)
}

function deleteUnWeekExceedForStoredUnitAsync(param) {
    return remoteCall.invoke("edit/deleteUnWeekExceedForStoredUnit",param)
}

function addUnWeekExceedForStoredUnitAsync(param) {
    return remoteCall.invoke("edit/addUnWeekExceedForStoredUnit",param)
}

export default {
    findHospitalProfileAsync,
    findUnitProfileAsync,
    findUserByRoleAsync,
    clearCacheAsync,
    startSyncAsync,

    setConfigAsync,
    getConfigAsync,
    editHospitalManualAsync,

    findTreeAsync,
    findSwapPlanModeAsync,
    addSwapPlanModeAsync,
    deleteSwapPlanModeAsync,

    updateNoticeAsync,

    findAsync,
    updateStatusAsync,

    logoutAsync,

    setExpenseStatAsync,
    getExpenseStatAsync,

    getDocOndutyStatusAsync,
    setDocOndutyStatusAsync,

    findUnWeekExceedForStoredUnitAsync,
    deleteUnWeekExceedForStoredUnitAsync,
    addUnWeekExceedForStoredUnitAsync,
}
