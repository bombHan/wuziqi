import RemoteCall from "../../util/RemoteCall";

const projectRemoteCall = new RemoteCall("api/project");
const remoteCall = new RemoteCall("api/issue");
const responsibilityRemoteCall = new RemoteCall("api/responsibility");

function countAsync(param) {
    return projectRemoteCall.invoke("count", param);
}

function issueCountAsync(param) {
    return remoteCall.invoke("count", param);
}

function newAsync(param) {
    return remoteCall.invoke("trend/new", param);
}

function resolvedAsync(param) {
    return remoteCall.invoke("trend/resolved", param);
}

function unresolvedAsync(param) {
    return remoteCall.invoke("trend/unresolved", param);
}

function manynewAsync(param) {
    return projectRemoteCall.invoke("issue/manynew", param);
}

function manyunresolvedAsync(param) {
    return projectRemoteCall.invoke("issue/manyunresolved", param);
}

function untimelyresponseAsync(param) {
    return projectRemoteCall.invoke("issue/untimelyresponse", param);
}

function unsatisfiedAsync(param) {
    return projectRemoteCall.invoke("unsatisfied", param);
}

function personalAsync(param) {
    return responsibilityRemoteCall.invoke("personal", param);
}

export default {
    countAsync,
    issueCountAsync,
    newAsync,
    resolvedAsync,
    unresolvedAsync,
    manynewAsync,
    manyunresolvedAsync,
    untimelyresponseAsync,
    unsatisfiedAsync,
    personalAsync,
}
