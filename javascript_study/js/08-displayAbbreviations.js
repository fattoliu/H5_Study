addLoadEvent(displayAbbreviations);

function displayAbbreviations() {

    if(!document.getElementsByTagName
        || !document.createElement
        || !document.createTextNode) return false;

    // 取得所有缩略词
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    // 遍历这些缩略词
    var defs = new Array();
    for (var i = 0; i < abbreviations.length; i ++) {
        var current_abbr = abbreviations[i];
        // 处理 IE6 及一下的 IE 对 abbr 不支持的兼容性问题
        if (current_abbr.childNodes.length < 1) continue;

        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    // 创建定义列表
    var dlist = document.createElement("dl");
    for (key in defs) {
        var definition = defs[key];
        // 创建缩略词标题
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        // 创建缩略词描述
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        // 添加到缩略词列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    // 处理 IE6 及一下的 IE 对 abbr 不支持的兼容性问题
    if (dlist.childNodes.length < 1) return false;
    // 创建标题
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    //把标题添加到页面上
    document.getElementsByTagName("body")[0].appendChild(header);
    //把缩略词列表添加到页面上
    document.getElementsByTagName("body")[0].appendChild(dlist);
}