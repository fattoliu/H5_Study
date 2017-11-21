// function styleHeaderSiblings() {
//     if (!document.getElementsByTagName) return false;
//     var headers = document.getElementsByTagName("h1");
//     var elem;
//     for (var i = 0; i < headers.length; i++) {
//         // 注意：这里真正需要的不是“下一个节点”，而是“下一个元素节点”
//         elem = getNextElement(headers[i].nextSibling);
//         elem.style.fontWeight = "bold";
//         elem.style.fontSize = "1.2em";
//         elem.style.color = "purple";
//     }
// }

/*改进版，利用 js 更新元素的 class 属性*/
/*function styleHeaderSiblings() {
    if (!document.getElementsByTagName) return false;
    var headers = document.getElementsByTagName("h1");
    var elem;
    for (var i = 0; i < headers.length; i++) {
        // 注意：这里真正需要的不是“下一个节点”，而是“下一个元素节点”
        elem = getNextElement(headers[i].nextSibling);
        addClass(elem, "intro");
    }
}*/
// addLoadEvent(styleHeaderSiblings);

// 继续改进，将该函数进行抽象
function styleHeaderSiblings(tag, className) {
    if (!document.getElementsByTagName) return false;
    var headers = document.getElementsByTagName(tag);
    var elem;
    for (var i = 0; i < headers.length; i++) {
        // 注意：这里真正需要的不是“下一个节点”，而是“下一个元素节点”
        elem = getNextElement(headers[i].nextSibling);
        addClass(elem, className);
    }
}
addLoadEvent(function () {
    styleHeaderSiblings("h1","intro");
});




