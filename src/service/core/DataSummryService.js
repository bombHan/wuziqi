import RemoteCall from "../../util/RemoteCall";

const remoteCall = new RemoteCall("api/nursecare/dashbord/summary/");

function findSummaryStatsAsync(param) {
    return remoteCall.invoke("findSummaryStats", param);
}
function findMonthCreateStatsAsync(param) {
    return remoteCall.invoke("findMonthCreateStats", param);
}
function findPreviousWeekStatsAsync(param) {
    return remoteCall.invoke("findPreviousWeekStats", param);
}


export default {
    findSummaryStatsAsync,
    findMonthCreateStatsAsync,
    findPreviousWeekStatsAsync,
}
