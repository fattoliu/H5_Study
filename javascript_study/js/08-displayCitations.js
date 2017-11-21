addLoadEvent(displayCitations);
function displayCitations() {
    if(!document.getElementsByTagName
        || !document.createElement
        || !document.createTextNode) return false;

    // 取得所有blockquote元素
    var quotes = document.getElementsByTagName("blockquote");
    for (var i = 0; i < quotes.length; i++) {
        // 如果当前元素没有 cite 属性，就跳过
        if (!quotes[i].getAttribute("cite")) continue;
        // 保存 cite 属性值
        var url = quotes[i].getAttribute("cite");
        // 取得blockquote元素的所有元素节点
        var quoteChildren = quotes[i].getElementsByTagName("*");
        // 如果没有元素节点，继续循环
        if(quoteChildren.length < 1) continue;
        // 取出blockquote元素中最后一个元素节点
        var elem = quoteChildren[quoteChildren.length - 1];

        // 创建链接标记
        var link = document.createElement("a");
        var link_text = document.createTextNode("文献来源");
        link.appendChild(link_text);
        link.setAttribute("href", url);
        var superscript = document.createElement("sup");
        superscript.appendChild(link);
        // 在blockquote元素的中的最后一个元素节点后面添加链接标记
        elem.appendChild(superscript);


    }
}