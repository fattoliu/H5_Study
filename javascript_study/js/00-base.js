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