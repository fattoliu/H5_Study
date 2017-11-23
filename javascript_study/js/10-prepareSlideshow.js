// function prepareSlideshow() {
//     if (!document.getElementsByTagName) return false;
//     if (!document.getElementById) return false;
//     if (!document.getElementById("linklist")) return false;
//     if (!document.getElementById("preview")) return false;
//
//     var preview = document.getElementById("preview");
//     preview.style.position = "absolute";
//     preview.style.left = "0px";
//     preview.style.top = "0px";
//
//     var list = document.getElementById("linklist");
//     var links = list.getElementsByTagName("a");
//     links[0].onmouseover = function () {
//         moveElement("preview", -150,0,10);
//     };
//     links[1].onmouseover = function () {
//         moveElement("preview", -300,0,10);
//     };
//     links[2].onmouseover = function () {
//         moveElement("preview", -450,0,10);
//     };
// }
// addLoadEvent(prepareSlideshow);

function prepareSlideshow() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("linklist")) return false;

    // 动态生成 slideshow 的 div 和 preview 的 img 两个标签
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("src", "images/total.png");
    preview.setAttribute("alt", "building blocks of web design");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    var list = document.getElementById("linklist");
    insertAfter(slideshow,list);
    var links = list.getElementsByTagName("a");
    //分配事件
    links[0].onmouseover = function () {
        moveElement("preview", -150,0,10);
    };
    links[1].onmouseover = function () {
        moveElement("preview", -300,0,10);
    };
    links[2].onmouseover = function () {
        moveElement("preview", -450,0,10);
    };
}
addLoadEvent(prepareSlideshow);