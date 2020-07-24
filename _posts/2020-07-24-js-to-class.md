---
layout: post
title: 如果使用原生JS实现一个对象
tags: js
---

> talk is cheep ，show me ur code

```js
var democlass = (function () {
  /** 直接响应即可 如果需要构造函数仅需指定function的参数 */
  return function (args) {
    var current=0;
    var tempWeather=["晴","雨","阴"];

    /** 定义私有变量 */
    var _temp = args || { name: "test", age: 16 }; //args 为空时自动构造空对象

    /** 定义公共变量 */
    Object.defineProperty(this, "Name", {get: function () { return _temp.name + ",@"+getWeather();}});

    /** 定义私有方法 */
    var getWeather=function(){
        current++;
        if(current>=tempWeather.length) current=0;
        return tempWeather[current];
    };

    /** 定义公共方法 */
    this.Who=function(){ return "Be called "+_temp.name + ", A "+(_temp.age==16?"JK":"Counter"); };
  };
})();
```

### 开始测试
直接已静态方法访问
```js
> democlass.Name
undefined

> democlass.Who()
Uncaught TypeError: democlass.Who is not a function

> tempWeather.getWeather()
Uncaught TypeError: democlass.getWeather is not a function
```

定义对象访问公共属性
```js
var user=new democlass({name:"stu",age:24});
> user.Name
"stu,@雨"

> user.Name
"stu,@晴"
```
下面尝试访问私有属性
```js
> user.tempWeather
undefined
```
下面尝试访问公共方法
```js
> user.Who()
"Be called stu, A Counter"
```
继续尝试访问私有方法
```js
> user.getWeather()
Uncaught TypeError: user.getWeather is not a function
```

### 结束
好的小朋友们，本期的js定义class的讲解就到这里，下面开始`技术总结`
+ 公共属性的定义需要借助`Object.defineProperty`来实现，直接使用`this.`定义会发生什么呢，小朋友可以去尝试一下
+ 公共方法与私有方法的定义就很简单了，使用`this.`暴露出去就是公共的
+ 下期来个静态类下的私有变量和私有方法