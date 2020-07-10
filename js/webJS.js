var webJS = (function () {
    var js = [
        "/dist/js/httpJS.js",
        "/dist/js/template-simple.js",
        "/dist/js/formObject.js",
        "/dist/js/routeJS.js",
        "/dist/js/messageJS.js",
        "/dist/js/uploadJS.js",
        "/dist/js/signJS.js",
        "/dist/js/navigateJS.js",
        "/dist/js/listJS.js",
        "/dist/js/addJS.js",
        "/dist/js/settingJS.js",
        "/dist/js/dateformat.js",
        "/dist/addon/laydate/laydate.js",
        "/dist/addon/chart/Chart.min.js",
    ];

    /** 默认加载完成时触发的动作，仅对登录完成的用户执行 */
    var current = function () {
        var permit = signJS.getStatus();
        routeJS.render(permit);
    };


    /** js注册，当全部注册完毕后执行fn，not表示是否检查登录默认false检查 */
    var run = function (fn, not) {
        fn = fn || function () { };
        var count = 0;
        for (var i = 0; i < js.length; i++) {
            var _head = document.head || document.getElementsByTagName('head')[0];
            var hjs = document.createElement('script');
            hjs.setAttribute("src", js[i]);
            hjs.setAttribute("charset", "UTF-8");
            hjs.addEventListener("load", function (e) {
                if (e.type === 'load') count++;
                if (count == js.length) { if (!not) current(); fn(); }
            }, { once: true });
            _head.appendChild(hjs);
        }
        //signJS.getStatus();
    };//end run

    return { "run": run };
})();

