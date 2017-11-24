function convertToGS(img) {
    if (!Modernizr.canvas) {
        alert("qqq");
        return false;
    }
    // 保存原始图片信息（彩色）
    img.colorful = img.src;
    // 创建灰度图片（黑白）
    img.grayscale = createGSCanvas(img);

    img.onmouseover = function () {
        this.src = this.colorful;
    };
    img.onmouseout = function () {
        this.src = this.grayscale;
    };
    img.onmouseout();
}

/*把彩色图片转换成灰度图片*/
function createGSCanvas(img) {
    // 创建一个新的 canvas 画布
    var canvas = document.createElement("canvas");
    // 指定宽高
    canvas.width = img.width;
    canvas.height = img.height;

    // 在画布上绘制图片
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // 注意：getImageData 只能操作与脚本位于同一个域中的图片
    var c = ctx.getImageData(0, 0, img.width, img.height);
    // 循环遍历每一个像素，蒋每个彩色像素的红、绿、蓝的彩色成分求平均值，得到对应彩色值的灰度值
    for (var i = 0; i < c.height; i++) {
        for (var j = 0; j < c.width; j++) {
            var x = (i * 4) * c.width + (j * 4);
            var r = c.data[x];
            var g = c.data[x + 1];
            var b = c.data[x + 2];
            c.data[x] = c.data[x + 1] = c.data[x + 2] = (r + g + b) / 3;

        }
    }

    // 把灰度数据放回到画布的绘图环境中，返回原始的图像数据作为新灰度图片的来源
    ctx.putImageData(c, 0, 0, 0, 0, c.width, c.height);
    return canvas.toDataURL();
}

addLoadEvent(function () {
    convertToGS(document.getElementById("candy"));
});