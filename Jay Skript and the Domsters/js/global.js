function highlightPage() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers = document.getElementsByTagName("header");
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for (var i = 0; i < links.length; i++) {
        linkurl = links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl) != -1) {
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id", linktext);
        }
    }
}

function prepareSlideshow() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;

    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");

    var frame = document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("alt", "");
    frame.setAttribute("id", "frame");
    slideshow.appendChild(frame);
    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    var links = document.getElementsByTagName("a");
    var destination;
    for(var i = 0; i < links.length; i++) {
        links[i].onmouseover = function () {
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview",0,0,5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview",-150,0,5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview",-300,0,5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview",-450,0,5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview",-600,0,5);
            }
        }
    }
}

function showSelection(id) {
    var sections = document.getElementsByTagName("section");
    for(var i=0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") != id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function prepareInternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i < links.length;i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = "none";
        //由于 sectionId 是个局部变量，存在作用域的问题，只有在该函数执行期间存在，等到时间处理函数执行的时候就不存在了，所以为每个 link
        // 创建一个自定义的属性
        links[i].destination = sectionId;
        links[i].onclick = function () {
            showSelection(this.destination);
            return false;
        }
    }
}

/*显示图片*/
function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src",source);
    if (document.getElementById("description")) {
        var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
        var description = document.getElementById("description");
        if (description.firstChild.nodeType == 3) {
            description.firstChild.nodeValue = text;
        }
    }

    return true;
}


/*创建图片和描述*/
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;

    var placeholderImage = document.createElement("img");
    placeholderImage.setAttribute("id","placeholder");
    placeholderImage.setAttribute("src", "images/placeholder.gif");
    placeholderImage.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);

    var gallery = document.getElementById("imagegallery");
    insertAfter(description, gallery);
    insertAfter(placeholderImage, description);
}

/*相册列表点击事件分配*/
function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return !showPic(this);
        }
    }
}

/*改进版*/
function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    var odd,rows;
    for (var i = 0; i < tables.length; i++) {
        odd = false;
        rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if(odd) {
                // 通过设置 className来修改背景颜色
                addClass(rows[j], "odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}

function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function () {
            addClass(this, "highlight");
        };
        rows[i].onmouseout = function () {
            this.className = this.oldClassName;
        };
    }
}

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
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
   var articles = document.getElementsByTagName("article");
   if (articles.length == 0) return false;
   var container = articles[0];
   container.appendChild(header);
   container.appendChild(dlist);
}
function focusLabels() {
    if (!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
        if (!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function () {
            var id = this.getAttribute("for");
            if (!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();
        }
    }
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(showSelection);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabels);

