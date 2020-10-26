var bone = (function () {

    var page = function () {
        var marked = document.getElementById("marked");
        if (marked == undefined || marked== null) return;
        prettyPrint();
    };

    var backgroudScript = function () {
        setTimeout(function () { jsop("https://sslapi.hitokoto.cn/?encode=jsoap&callback=bone.hitokoto"); }, 1000);
        setTimeout(function () { jsop("http://tajs.qq.com/stats?sId=44452194"); }, 1000);
    }

    var jsop = function (url) {
        var _head = document.head || document.getElementsByTagName('head')[0];
        var hjs = document.createElement('script');
        hjs.setAttribute("src", url);
        hjs.setAttribute("charset", "UTF-8");
        _head.appendChild(hjs);
    }

    var hitokoto = function (data) {
        var json = {};
        try {
            if (typeof data == "object")
                json = data;
            else
                json = JSON.parse(data);
        } catch (ex) { }
        if (json.hitokoto == undefined || json.hitokoto == null) return;
        document.getElementById("hitokoto").innerHTML = json.hitokoto;
    };

    var searchevent = function () {
        var val = $("input[type=search].my-searchbox").val();
        var items = $(".my-list .my-item");
        items.css("display", "block");
        if (val == null || val == "") return;
        val = val.toLowerCase()
        var item;
        for (var i = 0; i < items.length; i++) {
            item = $(items[i]);
            if (item.html().toLowerCase().indexOf(val) < 0)
                item.css("display", "none");
        }
    };

    var listen = function () {
        var search = $("input[type=search].my-searchbox");
        if (search == undefined || search == null) return;
        search.on("change", function () { searchevent(); });
        $(".my-list span").on("click", function () {
            search.val($(this).html());
            search.trigger("change");
        })
    };

    var render = function (data) {
        var html = template("temp_list", data);
        document.querySelector("#md_list").innerHTML = html;
        listen();
    };

    var lst = function () {
        document.querySelector("#md_list").innerHTML = "Loading....";
        jsop("/md/md_list.js?v" + Math.random());
    }

    var hide = function () { $(".bone-foot").hide(); };//end

    return { "start": backgroudScript, "hitokoto": hitokoto, "page": page, "render": render, "lst": lst, "hide": hide }
})(jQuery);