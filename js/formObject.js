var formObject = (function () {
	var formObject = function (el) {
		this._form = (typeof (el) == "string") ? document.querySelector(el) : el;
		this._temp = [];
	};//end new

	/** @description 序列化一个表单 */
	formObject.prototype.serialize = function () {
		var json = {};
		var list = this._form.querySelectorAll("input");
		list.forEach(function (x) { json[x.getAttribute("name")] = x.value; });
		list = this._form.querySelectorAll("select");
		list.forEach(function (x) { json[x.getAttribute("name")] = x.value; });
		return json;
	};//end serialize   

	/** @description 序列化一个表单 */
	formObject.prototype.onchange = function (child, fn) {
		var target = this._form.querySelector("[name=" + child + "]");
		if (!target) return;
		this._temp.push({ "target": target, "fn": fn });
		target.addEventListener("change", function (e) {
			fn(e.target.value);
		});
	};//end  onchange

	/** @description 序列化一个表单 */
	formObject.prototype.change = function (e) {
		this._temp.forEach(function (x) {
			x.fn(x.target.value);
			if (e) e(x.target.getAttribute("name"), x.target.value)
		})
	};//end change

	/** @description 使一个元素不可用 */
	formObject.prototype.disable = function (child, isdisable) {
		var target = this._form.querySelector("[name=" + child + "]");
		if (!target) return;
		if (isdisable)
			target.setAttribute("disabled", "disabled");
		else
			target.removeAttribute("disabled");
	};//end change

	/** @description 触发事件 */
	var dispatchEvent = function (el, type) {
		try {
			var event = null;
			if (typeof (Event) === 'object') {
				event = document.createEvent('Event');
				event.initEvent(type, true, true);
			}
			else {
				event = new Event(type);
			}
			el.dispatchEvent(event);
		}
		catch (ex) { console.log(ex); }
	};//end dispatchEvent

	/** @description 赋值 */
	formObject.prototype.setValue = function (child, value) {
		var target = this._form.querySelector("[name=" + child + "]");
		if (!target) return;
		switch (target.tagName) {
			case "SELECT":
			case "INPUT": target.value = value; break;
			default: break;
		}
		dispatchEvent(target, 'change');
	};//end change

	/** @description 获取child */
	formObject.prototype.getChild = function (child) {
		var target = this._form.querySelector("[name=" + child + "]");
		return target;
	};//end getChild

	/** @description 提交 */
	formObject.prototype.onsubmit = function (fn) {
		var obj = this;
		this._form.addEventListener("submit", function (e) { fn(obj.serialize()); });
	};//end onsubmit

	return formObject;
})();


