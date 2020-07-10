var uploadJS = (function () {

	var onupload = function (server) {
		var name = "up_" + parseInt(Math.random() * 10000);

		var strVar = "<iframe name=\"" + name + "\"><\/iframe>";
		strVar += "<form action = \"" + server + "\" method = \"post\" target = \"" + name + "\" enctype = \"multipart/form-data\">";
		strVar += "<input type = \"file\" name = \"file\" autocomplete = \"off\">";
		strVar += "</form>";

		var uploaddiv = document.createElement("div");
		uploaddiv.setAttribute("id", name);
		uploaddiv.style.display = 'none';
		uploaddiv.innerHTML = strVar;
		return uploaddiv;
	}

	/** @description 上传文件 */
	var upload = function (server, fn) {
		var uploaddiv = onupload(server);
		var _body = document.body || document.getElementsByTagName('body')[0];
		_body.appendChild(uploaddiv);

		var frame = uploaddiv.querySelector("iframe");
		var form = uploaddiv.querySelector("form");
		var input = uploaddiv.querySelector("input");
		var temp = {};

		//完毕事件
		frame.addEventListener("load", function (e) {
			var body = window.frames[uploaddiv.getAttribute("id")].document.body;
			var pre = body.querySelector("pre");
			if (!pre) { var data = { "status": -1, "message": window.frames[uploaddiv.getAttribute("id")].document.title }; }
			else { var data = pre.innerHTML; }

			temp.close();
			try { fn(data); } catch (ex) { console.warn(ex); }
			_body.removeChild(uploaddiv);
		});

		//文件按钮
		input.addEventListener("change", function (e) {
			//console.log(input.value);
			form.submit();
			var current = 1;
			temp = messageJS.msg("正在上传，请勿关闭窗口", function (b) {
				b.info.innerHTML = "[" + current++ + "] 正在上传，请等待...";
			});
		});

		input.click();
	};//end update

	var ondownload = function (server, argument) {
		var name = "dw_" + parseInt(Math.random() * 10000);
		var strVar = "<form action=\"" + server + "\" method=\"post\" target=\"_blank\">\n";
		for (var key in argument) {
			strVar += "<input type=\"hidden\" name=\"" + key + "\" autocomplete=\"off\" value=\"" + argument[key] + "\">\n";
		}
		strVar += "<\/form>";

		var downloaddiv = document.createElement("div");
		downloaddiv.setAttribute("id", name);
		downloaddiv.style.display = 'none';
		downloaddiv.innerHTML = strVar;
		return downloaddiv;

	};//end ondownload


	/** @description 下载文件 */
	var download = function (server, argument) {		
		var downloaddiv = ondownload(server, argument || {});
		var _body = document.body || document.getElementsByTagName('body')[0];
		_body.appendChild(downloaddiv);

		var form = downloaddiv.querySelector("form");
		form.submit();
		_body.removeChild(downloaddiv);
	};//end download


	return { "upload": upload, "download": download };
})();