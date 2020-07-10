var addJS = (function () {
	return function (target) {
		var _target = target;
		var _option = {};

		/**	开始监听 */
		this.listen = function (option) {
			option = option || {};
			if (!option.form) option.form = new formObject(document.getElementById("s-edit-form"));
			_option = option;

			m_start();
		};//end listen


		/** 执行请求 */
		var POST = function (action, data, fn) { httpJS.POST("/api/" + _target + "/" + action, data, fn); };

		/** @description 真实启动 */
		var m_start = function () {
			//debugger;
			var id = httpJS.GetAddress("id");
			if (id) {
				_option.id = id;
				_option.form.setValue("执行类型", "加载中...");
				POST("one", { "id": _option.id }, function (e) {
					var json = httpJS.PARSE(e);
					if (json.status !== 0) { messageJS.msg(json.message); return; }
					_option.form.setValue("执行类型", "修改");
					for (var key in json.body)
						_option.form.setValue(key, json.body[key]);
					m_listenArray();
				});
			} else {
				_option.form.setValue("执行类型", "新增");
				m_listenArray();
			}
		};//end m_start

		/**  可监听列表 */
		var m_listenArray = function () {
			var list = [];
			var add = function (id, fn) { list.push({ "id": id, "fn": fn }); };
			add("s-quit", function (e) { window.close(); });
			add("s-copy", function (e) {
				var item = _option.form.getChild("执行类型");
				//修改
				if (item.value !== "修改") { messageJS.msg("不能切换至新增模式"); return; }
				item.value = "新增";
				messageJS.msg("已切换至新增模式");
			});
			add("s-history", function (e) {
				//修改
				if (!_option.id) { messageJS.msg("你新增的有哪门子历史记录"); return; }
				var win = window.open();
				win.opener = null;
				win.location = "/web/docment/history.html?type=" + option.topic + "&id=" + option.id;
			});
			add("s-save", function (e) {
				var data = _option.form.serialize();
				data.id = _option.id;
				//webJS.msg(JSON.stringify(data)); return;
				POST(data["执行类型"] !== "新增" ? "update" : "add", data, function (e) {
					var json = httpJS.PARSE(e);
					if (json.status === 0) {
						messageJS.msg("保存成功");
						setTimeout(function () { window.close(); }, 500);
					} else {
						messageJS.msg(json.message);
						return;
					}
				});
			});

			for (var i = 0; i < list.length; i++) {
				var x = list[i];
				var item = document.querySelector("button#" + x.id);
				if (item) item.addEventListener('click', x.fn);
			}
			return list;
		};//end m_list

	};//end addJS
})();