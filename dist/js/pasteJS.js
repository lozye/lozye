var pasteJS = (function () {
    var message_result = document.getElementById("message-result");
    var message_btn = document.getElementById("message-btn");
    var message_input = document.getElementById("message-input"); 
    var token = {
        "a": "ETNIDBHXRW",
        "b": CryptoJS.enc.Utf8,
        "c": CryptoJS.enc.Hex,
        "d": s => s.split('').reverse(),
        "e": s => token.d(s).join(''),
        "f": "http://www.lozye.com/",
        "h": "view/death.html?"
    };

    var error = function (a) {
        message_result.innerHTML = a;
        message_result.style.display = "block";
        message_result.style.backgroundColor = "#E74C3C";
        message_result.style.border = "1px solid #E74C3C";
    }
    var success = function (a) {
        message_result.innerHTML = a;
        message_result.style.display = "block";
        message_result.style.backgroundColor = "#1ABC9C";
        message_result.style.border = "1px solid #16A085";
    }
    var read = function () {
        var param = window.location.search;
        if (param.length > 11) {
            var body = strde(param.substring(1));
            if (body.status != 0) error("信息已过期");
            else success(body.value);
        }
        message_btn.addEventListener("click", function (e) {
            var x = message_input.value.length;
            if (x == 0 || x > 128) error("信息为空或太长")
            else success(token.f + token.h + strec(message_input.value));
        }, false);
    }
    var strec = function (text) {
        var num = (new Date().getTime() / 1000 + 3600);
        var k1 = nmbec(num);
        var k2 = token.b.parse(text);
        var k3 = token.c.stringify(k2);
        return token.e(k3.toUpperCase()) + k1;
    }
   
    var strde = function (text) {
        var result = { "status": 2 };
        if (text.length < 10) return result;
        try {
            var nmbtext = text.substring(text.length - 10);
            if (nmbde(nmbtext) < new Date().getTime() / 1000) return result;
            var k3 = token.c.parse(token.e(text.substring(0, text.length - 10)));
            var k4 = token.b.stringify(k3);
            result.status = 0;
            result.value = k4;
            return result;
        } catch (ex) {
            return result;
        }
    }
    var _keyArray = token.a;
    var nmbec = function (_number) {
        var _numberStr = parseInt(_number).toString();
        var _result = "";
        var count = _numberStr.length;
        for (var i = 0; i < 10 - count; i++)
            _numberStr = "0" + _numberStr;
        for (var i = 0; i < 10; i++)
            _result += _keyArray[parseInt(_numberStr[i])];
        return _result;
    }
    var nmbde = function (text) {
        var _result = "";
        for (var i = 0; i < text.length; i++)
            for (var j = 0; j < _keyArray.length; j++)
                if (_keyArray[j] == text[i])
                    _result += j.toString();
        if (_result.length != text.length) return 0;
        return parseInt(_result);
    }

    return {
        "read": read
    };
})();