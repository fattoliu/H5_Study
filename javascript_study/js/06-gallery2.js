addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);

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

/*创建图片和描述*/
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;

    var placeholderImage = document.createElement("img");
    placeholderImage.setAttribute("id","placeholder");
    placeholderImage.setAttribute("src", "../html_css_study/images/banner_one.jpg");
    placeholderImage.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);
    // 传统方法
    // document.getElementsByTagName("body")[0].appendChild(placeholderImage);
    // document.getElementsByTagName("body")[0].appendChild(description);

    // insertBefore方法
    /*调用改方法的必须要告诉它三件事：
    *   1.新元素：你想插入的元素（newElement）
    *   2.目标元素：你想把这个元素插入到哪个元素（targetElement）之前
    *   3.父元素：目标元素的父元素（parentElement）
    *   parentElement.insertBefore（newElement，targetElement）*/
    // var imagegallery = document.getElementById("imagegallery");
    // imagegallery.parentNode.insertBefore(placeholderImage,imagegallery);
    // imagegallery.parentNode.insertBefore(description,imagegallery);

    // 自己编写 insertAfter 函数（因为系统没提供该方法）
    var imagegallery = document.getElementById("imagegallery");
    insertAfter(placeholderImage, imagegallery);
    insertAfter(description, placeholderImage);


}

// *********************************************  以下为通用方法 *********************************************


/* 自己编写 insertAfter 函数（因为系统没提供该方法）
*/
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    // 如果目标元素是父元素中最后一个，那newElement直接以子元素形式添加到父元素上
    if (parent.lastChild === targetElement) {
        parent.appendChild(newElement);
    } else {
        // 如果不是最后一个，就把新元素插入到目标元素和目标元素的下一个兄弟元素之间，目标元素的下一个兄弟元素即目标元素的 nextSibling 属性
        // 用insertBefore 把新元素插入到目标元素的下一个兄弟元素之前：
        alert(targetElement.nextSibling.nodeName);
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

/*加载界面是添加事件函数*/
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}