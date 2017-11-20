alert(typeof document.getElementById("purchases"));
var li = document.getElementsByTagName("li");
for (var i = 0; i < li.length; i ++){
    alert(typeof  li[i]);
}
alert("该 html 中总共有：" + document.getElementsByTagName("*").length + "节点");

alert("sale的节点共 " + document.getElementsByClassName("sale").length + " 个");
//多个类名空格隔开，是否与标签中的类名顺序是否一致没关系
alert("sale important 的节点共 " + document.getElementsByClassName("important sale").length + " 个");

//由于getElementsByClassName是新出的方法，所以有兼容性问题，以下方法适合新老浏览器，但不支持多个类名

var shopping = document.getElementById("purchases");
var sales = getElementsbyClassName(shopping, "sale");
alert("自己实现的查找类名方法：类名为 sale 的节点有：" +sales.length + " 个");
/*
* 第一个参数：node 表示 DOM 书中的搜索起点
* 第二个参数：classname 具体要搜索的类名
* */
function getElementsbyClassName(node, classname) {
    if(node.getElementsByClassName) {
        return node.getElementsByClassName(classname);
    } else {
        var results = new Array();
        var elems = node.getElementsByTagName("*");
        for (var i = 0; i<elems.length;i++) {
            if (elems[i].className.indexOf(classname) != -1) {
                results[results.length] =elems[i];
            }
        }
        return results;
    }

}

/************************************************ 总结 **********************************************************/
/*
* 一份文档就是一棵节点树；
* 节点分为不同的类型：元素节点、属性节点、文本节点等；
* getElementById 将返回一个对象，该对象对应着文档里的一个特定的元素；
* getElementsByTagName和getElementsByClassName将返回一个对象数组，他们分别对应着文档里的一组特定的元素节点；
* 每个节点都是一个对象；
* */