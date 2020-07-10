var messageJS = (function () {
	var isloaded = false;
	var messagediv = function () {
		var div = document.querySelector(".x-message");
		if (!isloaded) {
			//var _head = document.head || document.getElementsByTagName('head')[0];
			//var hjs = document.createElement('link');
			//hjs.setAttribute("href", getCurrent("messageJS.js") + "messageJS.css");
			//hjs.setAttribute("rel", "stylesheet");
			//_head.appendChild(hjs);

			if (!div) {
				div = document.createElement("div");
				div.setAttribute("class", "x-message");
				div.innerHTML = "<div class='x-messageinfo'></div>";
				var _body = document.body || document.getElementsByTagName('body')[0];
				_body.appendChild(div);
			}
			isloaded = true;
		}
		return div;
	};//end  load

	var getCurrent = function (name) {
		var col = document.scripts;
		for (var i = 0; i < col.length; i++) {
			var item = col[i];
			if (!item.src) continue;
			var index = item.src.toLowerCase().indexOf(name.toLowerCase());
			if (index == -1) continue;
			var path = item.src.substring(0, index);
			return path.substring(path.indexOf('/', 8));
		}
		return "/";
	};//end getCurrent


	/** @description 消息弹窗 */
	var msg = function (text, callback) {
		var div = messagediv();
		var info = div.querySelector(".x-messageinfo");
		info.innerHTML = text;
		var param = { "info": info };

		//正常流程
		var fn = function (e) {
			if (e.target == info) return;
			if (callback) { callback(param); return; }
			div.style.display = 'none';
			div.removeEventListener("click", fn);
		};
		div.addEventListener("click", fn);
		div.style.display = 'block';

		//带callback流程
		if (!callback) return;
		param.close = function () { div.style.display = 'none'; div.removeEventListener("click", fn); };
		return param;
	};//end msg

	return { "msg": msg }
})();