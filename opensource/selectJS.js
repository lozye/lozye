var selectJS = (function () {
	return function (array) {
		if (!array || !array.length) throw "args not array";
		var _array = array;
		var _config;
		var _target;

		/**
		 * 单个select渲染
		 * @param target 指定的select 支持多个当多个的时候 config 使用 selector下的第一个选择器
		 * @param config 配置 selector 选择器；default 默认值；selected 已选值；
		 */
		this.render = function (target, config) {
			if (_config) throw "only can be render once";
			config = config || {};
			if (!config.selector) { config.selector = [{}]; }
			else if (!config.selector.length) { config.selector = [config.selector]; }
			if (!target.length) return renderone(target, config);
			else if (target.length == 1) return renderone(target[0], config);
			else return rendermuti(target, config);
		};//END render

		/** 选择一个值 */
		this.select = function (fn) {			
			if (!fn) return;
			var value;
			for (var i = 0; i < _array.length; i++) {
				if (!fn(_array[i])) continue;
				value = _array[i]; break;
			}
			if (_config.debug)  console.log(value);
			if (!value) return;

			if (_target.tagName == "SELECT") {
				_target.value = _config.selector[0].valuefn(value);
				dispatchEvent(_target, 'change');
			}
			else {
				for (var i = 0; i < _target.length; i++) {
					var fn = _config.selector[i];
					fn = (i == _target.length - 1) ? fn.valuefn : fn.namefn;
					_target[i].value = fn(value);		
					dispatchEvent(_target[i], 'change');
				}
			}
		};//end select

		/** 单级渲染 */
		var renderone = function (target, config) {
			var selector = config.selector[0];
			if (!selector.namefn) selector.namefn = function (x) { return x; };
			if (!selector.valuefn) selector.valuefn = selector.namefn;
			if (config.default) target.appendChild(createoption(selector.namefn(config.default), selector.valuefn(config.default)));

			var hasselected = false;
			for (var i = 0; i < array.length; i++) {
				var item = createoption(selector.namefn(array[i]), selector.valuefn(array[i]));
				if (config.selected && config.selected(array[i])) {
					if (hasselected) throw "selected not unique";
					item.setAttribute("selected", "selected"); hasselected = true;
				}
				target.appendChild(item);
			}

			_config = config;
			_target = target;
		};//end renderone

		/** 多级联动 */
		var rendermuti = function (targets, config) {
			if (targets.length != config.selector.length) throw "args selector match fail";
			var lastcol = targets.length - 1;

			var index = [];
			for (var i = 0; i < config.selector.length; i++) index.push({});
			var selectedvalue;

			//create index
			for (var i = 0; i < _array.length; i++) {
				var item = _array[i];
				if (config.selected && config.selected(array[i])) {
					if (selectedvalue) throw "selected not unique";
					selectedvalue = array[i];
				}
				for (var k = 0; k < config.selector.length; k++) {
					var fn = config.selector[k];
					var name = fn.namefn(item);

					if (k != lastcol) {
						var child = config.selector[k + 1].namefn(item);
						if (!index[k][name]) index[k][name] = [child];
						else if (!has(index[k][name], child)) { index[k][name].push(child); }
					} else {
						index[k][name] = item;
					}
				}
			}

			if (config.debug) console.log(index);

			//addEventListener
			for (var i = 0; i < targets.length - 1; i++) {
				let x = i;
				targets[x].addEventListener("change", function (e) {
					var nextcol = x + 1;
					//clear last
					targets[nextcol].innerHTML = null;
					if (config.default) {
						var key = config.selector[nextcol].namefn(config.default);
						var val = (nextcol == lastcol) ? config.selector[nextcol].valuefn(config.default) : "";
						targets[nextcol].appendChild(createoption(key, val));
					}
					var value = this.value;
					try {
						if (!value) return;

						var list = index[x][value];
						for (var j = 0; j < list.length; j++) {
							var val = list[j];
							if (nextcol == lastcol) {
								var fn = config.selector[nextcol].valuefn;
								val = fn ? fn(index[lastcol][val]) : val;
							}
							targets[nextcol].appendChild(createoption(list[j], val));
						}
					} finally {
						dispatchEvent(targets[x + 1], 'change');
					}
				});
			}

			//render first
			if (config.default) targets[0].appendChild(createoption(config.selector[0].namefn(config.default), ""));
			for (var key in index[0]) targets[0].appendChild(createoption(key, key));


					
			//render selected
			if (selectedvalue) {
				for (var i = 0; i < targets.length; i++) {
					var fn = config.selector[i];
					fn = (i == targets.length - 1) ? fn.valuefn : fn.namefn;
					targets[i].value = fn(selectedvalue);
					dispatchEvent(targets[i], 'change');
				}
			} else {
				dispatchEvent(targets[0], 'change');
			}
			if (config.debug) console.log(targets[0].value);	
			_config = config;
			_target = targets;
		};//end rendermuti

		/** 判断元素是否存在 */
		var has = function (array, value) {
			for (var i = 0; i < array.length; i++)
				if (array[i] == value) return true;
			return false;
		};//end has

		/** 触发事件 */
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

		/** 创建一个option标签 */
		var createoption = function (name, value) {
			var item = document.createElement("option");
			item.setAttribute("value", value);
			item.innerText = name;
			return item;
		};//end createoption

	}
})();