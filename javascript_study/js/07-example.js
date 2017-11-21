
window.onload = function () {
    var testdiv = document.getElementById("testdiv");
    var content = "<p>I inserted <em>this</em> content by innerHTML.</p>"
    testdiv.innerHTML = content;
    careteTag();
};

/*创建和插入节点：
*   1.创建一个元素节点
*   2.把该元素节点追加到 html 的元素节点上
*   3.创建一个文本节点
*   4.把文本节点追加到创建的元素节点上
*/
function careteTag() {
    var testdom = document.getElementById("testdom");

    // 创建p 元素节点，此时该元素还不是 DOM 树的一部分，此时称为文档碎片 document fragment，还无法显示在浏览器窗口里面
    var aTag = document.createElement("a");
    var info = "nodeName is : ";
    info += aTag.nodeName;
    info += " nodeType is : ";
    info += aTag.nodeType;
    alert(info);
    var pTag = document.createElement("p");
    // 创建文本节点
    var text = document.createTextNode("this is created Text");
    pTag.appendChild(text);

    aTag.appendChild(pTag);
    testdom.appendChild(aTag);

}