var listJS = (function () {
    //js 面向对象
    //return function 为构造函数，可以制定对应参数
    //内部 this.listen [function] 公共方法
    //内部 var POST [function] 私有方法
    //及如果需要指定为公共方法仅需要把方法定义为this.即可，公共参数同理

    return function (target) {
        var _target = target;
        var _option = {};

        /**	开始监听 */
        this.listen = function (option) {
            option = option || {};
            option.render = template.compile(document.querySelector(option.temp || "#s-view-temp").innerHTML);
            if (!option.form) option.form = new formObject(document.getElementById("s-search-form"));
            if (!option.edit) option.edit = "edit.html";
            if (!option.viewbox) option.viewbox = document.getElementById("s-view-list");
            if (!option.size) option.size = 20;
            if (!option.navigate) option.navigate = document.getElementById("s-view-navigate");
            _option = option;

            m_query(1);
            m_listenArray();
        };//end listen


        /** 执行请求 */
        var POST = function (action, data, fn) { httpJS.POST("/api/" + _target + "/" + action, data, fn); };

        /** 高级处理 */
        var m_muti = function (action, name) {
            var data = _option.form.serialize();
            data.action = "count";
            POST("muticheck", data, function (e) {
                var json = httpJS.PARSE(e);
                if (json.status !== 0) { messageJS.msg(json.message); return; }
                if (!confirm("是否确认【" + name + "】按当前条件合计：【" + json.body + "】条数据？")) return;
                data.action = action;
                POST("muticheck", data, function (e) {
                    var json = httpJS.PARSE(e);
                    if (json.status !== 0) { messageJS.msg(json.message); return; }
                    var _temp = null;
                    _temp = messageJS.msg(json.message, function (a) { });
                    setTimeout(function () { _temp.close(); m_query(1); }, 1000);
                });
            });
        };//end m_muti


        /** 监听列表 */
        var m_listenArray = function () {
            var list = [];
            var add = function (id, fn) { list.push({ "id": id, "fn": fn }); };
            add("s-search", function (e) { m_query(1); });
            add("s-create", function (e) { window.open(_option.edit); });
            add("s-import", function (e) {
                uploadJS.upload("/api/" + _target + "/upload", function (e) {
                    var json = httpJS.PARSE(e);
                    if (json.status) { messageJS.msg(json.message); return; }
                    else m_query(1);
                });
            });
            add("s-output", function (e) { uploadJS.download("/api/" + _target + "/download", _option.form.serialize()); });
            add("s-hold", function (e) { m_muti("hold", "挂起"); });
            add("s-unhold", function (e) { m_muti("unhold", "解挂"); });
            add("s-delete", function (e) { m_muti("delete", "删除"); });

            for (var i = 0; i < list.length; i++) {
                var x = list[i];
                var item = document.querySelector("button#" + x.id);
                if (item) item.addEventListener('click', x.fn);
            }
        };//end linsenArray


        /** 查询方法 */
        var m_query = function (page) {
            _option.viewbox.innerHTML = null;
            _option.navigate.style.display = 'none';
            _option.page = page;

            var data = _option.form.serialize();
            data.page = page;
            data.size = _option.size;

            POST("list", data, function (e) {
                var json = httpJS.PARSE(e);
                console.log(json, "json")
                if (json.status !== 0) { messageJS.msg(json.message); return; }
                m_render(json);
            });
        };//end m_query


        /** 列表渲染 */
        var m_render = function (json) {
            var div = _option.viewbox;
            var temp = document.createElement(div.tagName);
            temp.innerHTML += _option.render(json.list);
            while (temp.children.length > 0) {
                var item = temp.children[0];
                m_itemArray(item);
                div.appendChild(item);
            }
            temp = null;
            if (json.count <= _option.size) return;
            navigateJS.render(_option.navigate, json.count, _option.size, function (e) { m_query(e); }, _option.page);
        };//end m_render


        /** 监听列表 */
        var m_itemArray = function (e) {
            var id = e.getAttribute("data-id");
            if (!id) return;
            var list = [];
            var add = function (id, fn) { list.push({ "name": id, "fn": fn }); };
            add("s-btn-view", function (x) { window.open(_option.edit + "?id=" + id); });
            add("s-btn-hold", function (x) { });
            add("s-btn-delete", function (x) {
                if (!confirm("是否确认删除此数据？")) return;
                POST("delete", { "id": id }, function (data) {
                    var json = httpJS.PARSE(data);
                    if (json.status !== 0) { webJS.msg(json.message); return; }
                    _option.viewbox.removeChild(e);
                });
            });

            for (var i = 0; i < list.length; i++) {
                var x = list[i];
                var item = e.querySelector("a." + x.name);
                if (item) item.addEventListener('click', x.fn);
            }
        };//end m_itemArray
    };
})();