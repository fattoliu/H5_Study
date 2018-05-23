// *********************************************  以下为通用方法 *********************************************

/*加载界面是添加事件函数*/
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            console.log("ssss");
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
        // alert(targetElement.nextSibling.nodeName);
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

function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    //判断 movement 是否存在，存在的话，先调用 clearTimeout，这样就不会存在动画错乱的问题了
    if (elem.movement) {
        clearTimeout(elem.movement);
    }

    //如果 elem 的 left 和 top 属性未设置，会报错，所以先设置默认值
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }

    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }

    /*以下代码执行的动画效果将是匀速的，因为每次都是+1，所以如果目标位置离当前位置很远的话，动画太慢，可以改进*/
    // if (xpos < final_x) {
    //     xpos++;
    // }
    // if (xpos > final_x) {
    //     xpos--;
    // }
    // if (ypos < final_y) {
    //     ypos++;
    // }
    // if (ypos > final_y) {
    //     ypos--;
    // }

    // 改进版
    var dist = 0;
    if (xpos < final_x) {
        // 把元素朝他的目的地移动十分之一的距离
        dist =  Math.ceil((final_x-xpos)/20);
        xpos = xpos+dist;
    }
    if (xpos > final_x) {
        dist =  Math.ceil((xpos-final_x)/20);
        xpos = xpos-dist;
    }

    if (ypos < final_y) {
        // 把元素朝他的目的地移动十分之一的距离
        dist =  Math.ceil((final_y-ypos)/20);
        ypos = ypos+dist;
    }
    if (xpos > final_x) {
        dist =  Math.ceil((ypos-final_y)/20);
        ypos = ypos-dist;
    }

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    // moveElement("elementID',final_x,final_y,interval)
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
    // 需要给这个 elem 定义一个属性 movement，这样在鼠标快速切换产生移动元素的动画是，就可以先判断 movement 是否存在
    // 存在的话，先调用 clearTimeout，这样就不会存在动画错乱的问题了
    elem.movement = setTimeout(repeat, interval);
}