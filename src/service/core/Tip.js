import RemoteCall from "../../util/RemoteCall";

const remoteCall = new RemoteCall("api/nursecare/dashbord/edit/");

function countUnreadAsync(param) {
    return remoteCall.invoke("countUnread", param);
}
function findExpenseAsync(param) {
    return remoteCall.invoke("findExpense", param);
}
function auditExpenseAsync(param) {
    return remoteCall.invoke("auditExpense", param);
}
function findAppointAsync(param) {
    return remoteCall.invoke("findAppoint", param);
}
function setAppointStatusAsync(param) {
    return remoteCall.invoke("setAppointStatus", param);
}
function findSurveyAsync(param) {
    return remoteCall.invoke("findSurvey", param);
}
function setSurveyStatusAsync(param) {
    return remoteCall.invoke("setSurveyStatus", param);
}

export default {
    countUnreadAsync,
    findExpenseAsync,
    auditExpenseAsync,
    findAppointAsync,
    setAppointStatusAsync,
    findSurveyAsync,
    setSurveyStatusAsync,

}
