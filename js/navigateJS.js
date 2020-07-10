var navigateJS = (function () {

    var templateText = function () {
        var strVar = "";
        strVar += "<span>合计 {{count}} 条<\/span>";
        strVar += "		<ul>";
        strVar += "			<li {{if page==1}} class=\"disable\" {{ /if }}><a class=\"x-ne\" data-val=\"1\">首页<\/a><\/li>";
        strVar += "			<li {{if page==1}} class=\"disable\" {{ /if }}><a class=\"x-ne\" data-val=\"{{page-1}}\">上一页<\/a><\/li>";
        strVar += "			{{ each list as k v }}";
        strVar += "			{{if k ==-1}}";
        strVar += "			<li>...<\/li>";
        strVar += "			{{ else if k==page  }}";
        strVar += "			<li class=\"active\"><a data-val=\"{{k}}\">{{k}}<\/a><\/li>";
        strVar += "			{{ else }}";
        strVar += "			<li><a data-val=\"{{k}}\">{{k}}<\/a><\/li>";
        strVar += "			{{ /if }}";
        strVar += "			{{ /each }}";
        strVar += "			<li {{if page==max}} class=\"disable\" {{ /if }}><a class=\"x-ne\" data-val=\"{{page+1}}\">下一页<\/a><\/li>";
        strVar += "			<li {{if page==max}} class=\"disable\" {{ /if }}><a class=\"x-ne\" data-val=\"{{max}}\">尾页<\/a><\/li>";
        strVar += "			<li><a><input type=\"number\" /><\/a><\/li>";
        strVar += "			<li><a><button>跳转<\/button><\/a><\/li>";
        strVar += "		<\/ul>";
        return strVar;
    };

	/**
	 * 导航器渲染
	 * @param {any} target 目标元素
	 * @param {any} count 最大条数
	 * @param {any} size 单页最大值
	 * @param {any} fn 回调函数 void(int);
	 * @param {any} page 当前页 可选
	 */
    var render = function (target, count, size, fn, page) {
        var max = Math.ceil(count / size);
        page = Number(page);
        var m_render = template.compile(templateText());
        var elem = typeof (target) == 'string' ? document.querySelector(target) : target;
        elem.style.display = 'block';
        elem.innerHTML = m_render({
            "page": page,
            "max": max,
            "count": count,
            "list": view(max, page)
        });
        elem.querySelector("button").addEventListener("click", function (e) {
            var value = elem.querySelector("input").value;
            if (!value || value < 1 || value > max || value == page) return;
            fn(value);
        }, false);
        var elems = elem.querySelectorAll("a");
        for (var i = 0; i < elems.length; i++) {
            elems[i].addEventListener("click", function (e) {
                var value = this.getAttribute("data-val");
                if (!value || value < 1 || value > max || value == page) return;
                fn(value);
            }, false);
        }
    };

    var view = function (max, page) {
        var child = [];
        if (max < 10) {
            for (var i = 0; i < max; i++) child.push(i + 1);
        }
        else if (page < 5) {
            for (var i = 0; i < page + 4; i++) child.push(i + 1);
            child.push(-1);
            child.push(max);
        }
        else if (page + 5 > max) {
            child.push(1);
            child.push(-1);
            for (var i = page - 4; i < max; i++)  child.push(i + 1);
        }
        else {
            child.push(1);
            child.push(-1);
            for (var i = page - 3; i < page + 2; i++)child.push(i + 1);
            child.push(-1);
            child.push(max);
        }
        return child;
    };


    return { "render": render, "view": view }
})();