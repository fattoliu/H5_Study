
/*在使用 Ajax 时，要注意同源策略。使用XMLHttpRequest对象发送的请求只能访问与其所在的 HTML 处于同一个域中的数据，不能向其他域发送请求
* 有些浏览器还未限制 Ajax 请求使用的协议。比如 Chrome 中，如果使用 file：// 协议从硬盘里加载 example.txt 文件，就会
* 看到“Cross origin requests are only supported for HTTP”(跨域请求只支持 HTTP 协议)的错误消息
*
*
* 异步请求具有异步性，脚本在发送XMLHttpRequest请求后，仍然会继续执行，不会等待响应返回。例如：47行的 alert 很可能比29行的 alert 先弹出
* 因此，如果其他脚本依赖于服务器的响应，那么就得把相应的代码移到指定给onreadystatechange属性的那个函数中去
* */
function getNewContent() {
    var request = getHTTPObject();
    if (request) {
        // 指定请求目标
        request.open("GET", "example.txt", true);
        /* 指定响应
        事件处理函数，他会在服务器给XMLHttpRequest对象发送回相应的时候被触发执行。在这个处理函数中，可以根据服务器的具体相应做相应
         的处理,*/
        request.onreadystatechange = function () {
            /* 做出响应
            readyState 值：
                0 ： 表示未初始化
                1 ： 表示正在加载
                2 ： 表示加载完毕
                3 ： 表示正在交互
                4 ： 表示完成
             */
            if (request.readyState == 4) {
                alert("Response Received!");

                var para = document.createElement("p");
                var txt = document.createTextNode(request.responseText);
                para.appendChild(txt);
                document.getElementById("new").appendChild(para);
            }
        };
        // 也可以引用一个函数,在引用的时候，函数后面不要加括号，加了括号代表调用函数，而我们在此只想把函数自身的引用（而不是函数的结果）赋值给onreadystate-change属性
        // request.onreadystatechange = doSomething;

        // 发送请求
        request.send(null);
    } else {
        alert("Sorry , your browse doesn\'t support XMLHttpRequest!");
    }


    alert("Function Done!");
}
addLoadEvent(getNewContent);


// function doSomething() {
//     // 做出响应
//     if (request.readyState == 4) {
//         var para = document.createElement("p");
//         var txt = document.createTextNode(request.responseText);
//         para.appendChild(txt);
//         document.getElementById("new").appendChild(para);
//     }
// }