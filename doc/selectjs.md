---
layout: post
title: selectJS
tags: js
---

由于需要简单的适配多级联动，所以编写了此`selectJS`

[源](https://github.com/lozye/lozye.github.io/blob/master/opensource/selectJS.js)

### 怎么使用-多级联动

```html
<p>多级联动</p>
<select id="testselect3">
</select>
<select id="testselect2">
</select>
<select id="testselect1">
</select>
```

测试数据
```js
var data=[
		{ "city": "CKG", "country": "CN", "zone": "AS", "id": 1 },
		{ "city": "BKS", "country": "CN", "zone": "AS", "id": 2 },
		{ "city": "SHA", "country": "CN", "zone": "AS", "id": 3 },
		{ "city": "TYO", "country": "JP", "zone": "AS", "id": 4 },
		{ "city": "OSA", "country": "JP", "zone": "AS", "id": 5 },
		{ "city": "BKK", "country": "TH", "zone": "AS", "id": 6 },
		{ "city": "LAX", "country": "US", "zone": "NA", "id": 7 },
		{ "city": "NYC", "country": "US", "zone": "NA", "id": 8 },
		{ "city": "YYZ", "country": "CA", "zone": "NA", "id": 9 },
	];

```

使用
```js
//创建选择对象
var test=new selectJS(data);
//配置
var config1 = {
			default: { "city": "choose city", "country": "choose country", "zone": "choose zone", "id": -1 },//默认选择
			debug:true,//启用调试模式
			selected: function (x) { return x.id == 8; },//已选中
			selector: 
			[
				{
					namefn: function (x) { return x.zone; }
				},
				{
					namefn: function (x) { return x.country; }
				},
				{
					namefn: function (x) { return x.city; },
					valuefn: function (x) { return x.id; },
				}
			]//多级选择器--保证选择器数量与select数量一致
		};

//页面渲染
test.render(
	[
		document.getElementById("testselect3"),
		document.getElementById("testselect2"),
		document.getElementById("testselect1")
	], config1);

//选中数据
test.select(function (x) { return  x.id == 3; })

```