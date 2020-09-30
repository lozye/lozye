---
layout: post
title: html-dom object sync
tags: js
excerpt_separator: <!--more-->
---
通过 html 元素做索引，创建一个根据你的选择器创建一个 object 对象。
你可以操作 object 对象来改变对应元素的值，当然你也可以通过改变元素的值来修改 object 对应属性值。
这个对象暂时命名为 `propObject` ，但是它的名字注定会改变的<s>注意黑字多意</s>。
<!--more-->


## 0X1 摘要

通过 html 元素做索引，创建一个根据你的选择器创建一个 object 对象。
你可以操作 object 对象来改变对应元素的值，当然你也可以通过改变元素的值来修改 object 对应属性值。
这个对象暂时命名为 `propObject` ，但是它的名字注定会改变的<s>注意黑字多意</s>。

## 0X2 使用

它有非常简单的使用方式，默认情况你在监控表单时仅需要

```js
var prop = new propObject(document.querySelector("#myform"));
```

来声明一个`propObject`对象。
然后你就可以操作`from`里的`input`、`select`元素了。

## 0X3 样例

```html
<form id="myform">
  <input name="a6" />
  <select name="a7">
    <option value="1">1</option>
    <option value="5">5</option>
  </select>
</form>
<script>
  var prop = new propObject(document.querySelector("#myform"));
  prop.a6 = 18;
  console.log(prop.get("a6").value);
  // < 18
  prop.get("a6").value = "21";
  console.log(prop.a6);
  // < 21
</script>
```

## 0X4 方法说明

<s>其实我有写注释</s>

| 方法名                   | 说明                                           |
| ------------------------ | ---------------------------------------------- |
| string function()        | 获取此对象中值的 json 文本                     |
| object serialize()       | 获取此对象中值的 json                          |
| void onchange(name, fn)  | 属性值变化监听，name 需要监听的属性名，fn 回调 |
| void onchange(name, fn)  | 属性值变化监听，name 需要监听的属性名，fn 回调 |
| void visable(name, show) | 使一个对象可见，show 是否可见                  |
| void disable(name, show) | 使一个对象可交互，show 是否可交互              |
| object get(name)         | 获取对应元素                                   |

## 0X5 自定义

很多时候<s>并没有</s>，我们需要可扩展，所以选择器是可以通过在实例化时指定 `{selectors:[]}` 来注入的。

```js
//interface
{
	keySelector: function (_el) { },//对应元素已什么为key
	get: function (_el) { },//get方法
	set: function (_el, value) { },//set方法
	query: function (_body) { }//需要匹配哪些元素
}
```
通过实现此 `interface` <s>大雾</s>，来自定义的注入选择器，那么来看看应用。

```html
<div id="____id">
	<div name="a1"></div>
	<div name="a2">大笨蛋</div>
	<div name="a3"></div>
	<div name="a4"></div>
	<div name="a5"></div>
</div>

<script>
	var obj = new propObject(document.getElementById("____id"), {
		selectors: [{
			keySelector: function (_el) { return _el.getAttribute("name"); },
			get: function (_el) { return _el.innerText; },
			set: function (_el, value) { _el.innerText = value; },
			query: function (_body) { return _body.querySelectorAll("div"); }
		}]
	});
	obj.a1 = "555";
	obj.a3=obj.a2;
	obj.a2="你才是";
</script>
```
通过自定义的选择器，实现操作div的内部文本

## 0X6 注意

内部是通过 `{}` 来做 `key` 映射的，故不支持同 `key` 节点。

## 0X7 源码

```javascript
"use strict";
var propObject = (function () {
  /** 默认读取接口 */
  var defaultGetter = (function () {
    return function (cssSelector) {
      var _cssSelector = cssSelector;
      this.keySelector = function (_el) {
        return _el.getAttribute("name");
      };
      this.get = function (_el) {
        return _el.value;
      };
      this.set = function (_el, value) {
        _el.value = value;
      };
      this.query = function (_body) {
        return _body.querySelectorAll(_cssSelector);
      };
    };
  })();

  /** 双向绑定 */
  return function (body, opt) {
    var prop = {};
    var target = this;

    /** 绑定对象 */
    var initialize = function (option) {
      for (var i = 0; i < option.selectors.length; i++) {
        var getter = option.selectors[i];
        if (
          typeof getter.keySelector != "function" ||
          typeof getter.get != "function" ||
          typeof getter.set != "function" ||
          typeof getter.query != "function"
        )
          continue;
        var list = getter.query(body);

        if (!list || list.length == 0) continue;
        for (var k = 0; k < list.length; k++) defineProperty(list[k], getter);
      }
      //console.log(prop);
    }; //end initialize

    /** 定义属性 */
    var defineProperty = function (el, getter) {
      var name = getter.keySelector(el);
      if (!name || prop[name]) return;
      prop[name] = el;
      Object.defineProperty(target, name, {
        get: function () {
          return getter.get(el);
        },
        set: function (val) {
          getter.set(el, val);
          try {
            el.dispatchEvent(new Event("change"));
          } catch (ex) {
            console.log(ex);
          }
        },
      });
    }; // end defineProperty

    //执行初始化
    initialize(
      opt || {
        selectors: [new defaultGetter("select"), new defaultGetter("input")],
      }
    );

    /** 转化为文本 */
    this.tostring = function () {
      return JSON.stringify(this.serialize(), null, "\t");
    }; //end toString

    /** 序列化对象 */
    this.serialize = function () {
      var json = {};
      for (var key in prop) json[key] = this[key];
      return json;
    }; //end serialize

    /** 值变化事件 */
    this.onchange = function (name, fn) {
      prop[name].addEventListener("change", fn);
    }; //end On

    /** 使一个对象可见 */
    this.visable = function (name, show) {
      prop[name].style.display = show ? null : "none";
    }; //end visable

    /** 使一个对象可交互 */
    this.disable = function (name, show) {
      if (show) prop[name].removeAttribute("disabled");
      else prop[name].setAttribute("disabled", "disabled");
    }; //end disable

    /** 独立的获取元素方法 */
    this.get = function (name) {
      return prop[name];
    }; //end  get
  };
})();
```
