---
layout: default
title:  Command
---

#### CentOS
+ [centos shadowsocks install](https://github.com/lozye/lozye.github.io/blob/master/doc/centosshadowsockslibev.sh)
+ [centos HAProxy install](https://github.com/lozye/lozye.github.io/blob/master/doc/shadowsocksrelay.sh)



## DATABASE
#### PostgreSQL
+ [datetime functions](https://www.postgresql.org/docs/9.3/functions-datetime.html)


#### SqlServer
+ [datetime convert](doc/sqlserverconvert)



## LANGUAGE
#### JavaScript
+ [addEventListener](doc/jsevent)

#### C#
+ ...


> code test

```js
  /**  XHR ASYNC GET */
    var GET = function (url, fn) {
        fn = fn || function (ar) { };
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () { if (xhr.readyState === 4) { fn(xhr.responseText); } }
        xhr.open('GET', url, true);
        xhr.send(null);
    };
```