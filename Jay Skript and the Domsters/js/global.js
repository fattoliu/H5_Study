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

function resetFields(whichform) {
    if (Modernizr.input.placeholder) return;
    for(var i = 0 ; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.type == "submit") continue;
        var check = element.placeholder || element.getAttribute("placeholder");
        if (!check) continue;
        element.onfocus = function () {
            var text = this.placeholder || this.getAttribute("placeholder");
            if (this.value == text) {
                this.className = "";
                this.value = "";
            }
        };
        element.onblur = function () {
            if  (this.value == "") {
                this.className = "placeholder";
                this.value = this.placeholder || this.getAttribute("placeholder");
            }
        };
        element.onblur();

    }
}

function isFilled(field) {
    if (field.value.replace("","").length == 0 ) return false;
    var placeholder = field.placeholder || field.getAttribute("placeholder");
    return (field.value != placeholder);
}
function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}
function validateForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.required == "required") {
            if (!isFilled(element)) {
                alert("Please fill in the  " + element.name + " field.");
                return false;
            }
        }
        if (element.type == "email") {
            if (!isEmail(element)) {
                alert("The " + element.name + " field must be a valid email address");
                return false;
            }
        }
    }
    return true;
}

function prepareForms() {
    for(var i = 0; i < document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function () {
            if (!validateForm(this)) return false;
            var article = document.getElementsByTagName("article")[0];
            if (submitFormWithAjax(this, article)) return false;
            return true;
        };
    }
}

// 检测XMLHttpRequest对象
function getHTTPObject() {
    if (typeof XMLHttpRequest === "undefined") {
        XMLHttpRequest = function () {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            } catch (e) {
            }
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            } catch (e) {
            }
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
            }
        };
    }
    return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
    while(element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    var content = document.createElement("img");
    content.setAttribute("src", "images/ajax-loader.gif");
    content.setAttribute("alt", "Loading...");
    element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget) {
    var request = getHTTPObject();
    if (!request) return false;
    displayAjaxLoading(thetarget);
    var dataParts = [];
    var element;
    for (var i = 0; i < whichform.elements.length; i++) {
        element = whichform.elements[i];
        dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
    }
    var data = dataParts.join("&");
    request.open("POST", whichform.getAttribute("action"), true);
    // post 请求必须有头部信息，表示请求中包含 URL 编码的表单
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function () {
      if (request.readyState == 4) {
          if (request.status == 200 || request.status == 0) {
              var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
              if (matches.length > 0) {
                  thetarget.innerHTML = matches[1];
              } else {
                  thetarget.innerHTML = "<p>Oops, there was an error. Sorry.</p>"
              }
          } else {
              thetarget.innerHTML = "<p>"+ request.statusText+"</p>";
          }
      }
    };

    request.send(data);
    return true;

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
addLoadEvent(prepareForms);

