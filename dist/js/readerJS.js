var readerJS = (function () {
    var apiEp = "http://api.lozye.com/read/";
    //"http://localhost:6975/read/";//
    //
    var page = function (data) {
        var target = $("#viewTarget");
        if (data.status != 0) {
            target.html("error:" + data.msg);
            return;
        }
        target.html(template("view_temp", data));
        var pageprv = $("#viewPage .pageprv");
        var pagenxt = $("#viewPage .pagenxt");
        if (data.backward == "")
            pageprv.addClass("z-dis");
        else
            pageprv.attr("href", "page.html?value=" + data.backward);
        if (data.forward == "")
            pagenxt.addClass("z-dis");
        else
            pagenxt.attr("href", "page.html?value=" + data.forward);
        $("#viewPage").show();

    };//end page
    var Request = function () {
        var json = {};
        var search = window.location.search;
        if (search == null || search.length == 0)
            return _tempRequest = json;
        if (!search.startsWith('?'))
            return _tempRequest = json;
        var index = 1;
        while (true) {
            var a = search.indexOf('=', index);
            if (a == -1)
                break;
            var b = search.indexOf('&', a);
            var c = b == -1 ? search.length : b;
            json[search.substring(index, a)] = search.substring(a + 1, c);
            if (b == -1)
                break;
            index = b + 1;
        }
        return _tempRequest = json;
    };
    var lststart = function () {
        var request = Request();
        var page = Number(request["page"]);
        var id = request["id"];
        var source = request["s"];
        if (!source || source == undefined) source = "ZT";
        localStorage.setItem("temp_source", source);

        var target = $("#listTarget");
        if (!id) { target.html("emputy parament"); return; }
        if (!page || page == NaN) page = 1;
        target.html("loading...");
        jsonp(apiEp + "list/" + source + "_" + id + "_" + page);
        var pageprv = $("#listPage").find(".pageprv");
        var pagenxt = $("#listPage").find(".pagenxt");
        if (page == 1) {
            pageprv.attr("href", "list.html?page=2&id=" + id);
            pagenxt.addClass("z-dis");
        } else {
            pageprv.attr("href", "list.html?page=" + (page + 1) + "&id=" + id);
            pagenxt.attr("href", "list.html?page=" + (page - 1) + "&id=" + id);
        }
    };//end lststart
    var pagestart = function () {
        var request = Request();
        var value = request["value"];
        var source = localStorage.getItem("temp_source");
        var target = $("#viewTarget");
        if (!value) { target.html("emputy parament"); return; }
        target.html("loading...");
        jsonp(apiEp + "page/" + source + "_" + value);
    };//pagestart
    var jsonp = function (url) {
        var _head = document.head || document.getElementsByTagName('head')[0];
        var hjs = document.createElement('script');
        hjs.setAttribute("src", url);
        hjs.setAttribute("charset", "UTF-8");
        _head.appendChild(hjs);
    };//end jsonp
    var list = function (data) {
        var target = $("#listTarget");
        if (data.status != 0) {
            target.html("error:" + data.msg);
            return;
        }
        target.html(template("temp_lst", data));
        $("#listPage").show();
    };//end page
    return { "list": list, "page": page, "lststart": lststart, "pagestart": pagestart }
})();