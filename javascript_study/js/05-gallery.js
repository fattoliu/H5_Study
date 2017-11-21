addLoadEvent(prepareGallery);
function showPic(whichPic) {
    // 先找到点击的 a 标签的 href 属性，拿到图片 url
    var source = whichPic.getAttribute("href");

    // 然后根据 id找到需要显示图片的 img 元素

    var img = document.getElementById("placeholder");
    if (!img) {
        return false;
    }
    // 将获取到的图片显示到元素上
    img.setAttribute("src", source);
    var desc = document.getElementById("desc");
    if (desc) {
        var title = whichPic.getAttribute("title");
        var text = title ? title:"";
        switch (text) {
            case "JAY":
                desc.firstChild.nodeValue = "《Jay》是歌手周杰伦的首张音乐专辑，由周杰伦制作、作曲，方文山、徐若瑄等人作词，收录了10首歌曲，2000年11月7日发行 。"
                break;
            case "范特西":
                desc.firstChild.nodeValue = "《范特西》是周杰伦2001年发行的专辑，共收录10首歌曲。该专辑的制作人由周杰伦担任。2002年，该专辑获得第十三届金曲奖颁奖礼最佳流行音乐专辑奖、新加坡金曲奖年度最畅销专辑等奖项。";
                break;
            case "八度空间":
                desc.firstChild.nodeValue = "《八度空间》是周杰伦发行的第3张专辑，由周杰伦作曲并担任制作人，方文山、许世昌、刘耕宏、周杰伦作词。专辑于2002年7月18日发行，共收录10首歌曲。2003年，该张专辑获得了g-music风云榜白金音乐奖十大金碟、华语流行乐传媒大奖十大华语唱片、新加坡金曲奖大奖年度最畅销男歌手专辑等奖项。";
                break;
            case "叶惠美":
                desc.firstChild.nodeValue = "《叶惠美》是周杰伦于2003年发行的专辑，共收录了11首歌曲。专辑的制作人由周杰伦担任。2004年，该专辑获得了第15届金曲奖最佳流行音乐演唱专辑奖、新城国语力颁奖礼新城国语力亚洲大碟奖、第四届全球华语歌曲排行榜颁奖典礼年度最受欢迎专辑奖。";
                break;
        }
    }
    return true;
}

function prepareGallery() {
    // 检查浏览器是否支持该方法，确保兼容性（老浏览器可能不支持）
    if (!document.getElementsByTagName) {
        return false;
    }
    if (!document.getElementById) {
        return false;
    }
    var gallery = document.getElementById("imagegallery");

    // 判断所找的元素是否存在
    if (!gallery) {
        return false;
    }
    var links = gallery.getElementsByTagName("a");

    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return !showPic(this);
        }
    }
}