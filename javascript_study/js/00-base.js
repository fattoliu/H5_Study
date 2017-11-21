// *********************************************  以下为通用方法 *********************************************

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

/*获取下一个元素节点*/
function getNextElement(node) {
    // 如果是元素节点，直接返回
    if (node.nodeType == 1) {
        return node;
    }
    // 如果有下一个节点，就递归
    if (node.nextSibling) {
        return getNextElement(node.nextSibling);
    }
    return null;
}

/*为元素添加 class 属性，追加属性，而非替换*/
function addClass(element, value) {
    if(!element.className) {
        element.className = value;
    } else {
        element.className += " " + value;
    }
}