function transformtime(data) {
    var date = new Date(data)
    return date.toLocaleDateString();
}
export default {
    transformtime
}