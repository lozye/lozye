/** UI调试 */
var coverJS = (function () {
    /** 开始模拟 */
    var run = function (option) {
        conf = { bgcolor: "#ddd", heigth: 20 };
        if (option) for (var key in option) { conf[key] = option[key]; }

        var list = document.querySelectorAll("*[class^=cover-]");
        for (var i = 0; i < list.length; i++) {
            //单线程，不能共用regex
            var regex = new RegExp("cover-(\\d+%?)(x(\\d+))?", "ig");
            var item = list[i];
            var cl = item.getAttribute("class");
            var match = regex.exec(cl);
            if (!match) continue;

            //处理默认值
            var height = conf.heigth;
            if (match[3]) height = match[3];
            var width = match[1];

            var span = document.createElement("span");
            span.style.display = "inline-block";
            span.innerHTML = "&nbsp;";
            if (conf.bgcolor) span.style.backgroundColor = conf.bgcolor;
            if (height) { span.style.lineHeight = height + "px"; span.style.height = height + "px"; }
            span.style.width = width.endsWith("%") ? width : width + "px";
            item.innerHTML = null;
            item.appendChild(span);
        }
    };//end run
    return { run: run };
})();