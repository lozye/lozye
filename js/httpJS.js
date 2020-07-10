var httpJS = (function () {
    /**  XHR ASYNC POST */
    var POST = function (url, data, fn) {
        fn = fn || function (ar) { };
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
        xhr.onreadystatechange = function () { if (xhr.readyState === 4) { fn(xhr.responseText); } }
        xhr.open('POST', url, true);
        //console.log(typeof (data));
        var postBody = typeof (data) == 'object' ? JSON.stringify(data) : data;
        xhr.send(postBody);
    };

    /**  XHR ASYNC GET */
    var GET = function (url, fn) {
        fn = fn || function (ar) { };
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () { if (xhr.readyState === 4) { fn(xhr.responseText); } }
        xhr.open('GET', url, true);
        xhr.send(null);
    };

    /**  APPEND JS */
    var JSONP = function (url) {
        var _head = document.head || document.getElementsByTagName('head')[0];
        var hjs = document.createElement('script');
        hjs.setAttribute("src", url);
        hjs.setAttribute("charset", "UTF-8");
        _head.appendChild(hjs);
    };

    /**  JSON FORMAT */
    var PARSE = function (data) {
        var json = {};
        if (typeof (data) == 'object')
            return data;
        try { json = JSON.parse(data); } catch (ex) { }
        return json;
    };

    /**  获取request参数 */
    var GetAddress = function (key) {
        var select = window.location.search;//?x=1
        if (select.length < 4) return null;
        var a = 1, b = 1;
        while (a < select.length) {
            b = select.indexOf("=", a);
            if (b == -1) return null;
            var i = select.indexOf("&", b);
            if (i == -1) i = select.length;
            var temp = select.substring(a, b);
            if (temp === key) return select.substring(b + 1, i);
            a = i + 1;
        }
        return null;
    };//end GetAddress


    return { "POST": POST, "GET": GET, "PARSE": PARSE, "JSONP": JSONP, "GetAddress": GetAddress };
})(JSON);