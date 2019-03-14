function getProjectType() {
    return window.bridge ? window.bridge.getType() : "护理管理"
}

export default {
    getProjectType,
}
