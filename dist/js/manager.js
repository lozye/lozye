var manager = (function () {
    var format = function (data) {
        var result = {};
        try {
            if (typeof data == 'string')
                result = JSON.parse(data);
            result = data;
        }
        catch (ex) { }
        return result;
    }
    var start = function () {
        $.post("/api/logined", Math.random(), function (data) {
            var json = format(data);
            if (json.status == "0") {
                $(".bone-wapper").show();
            } else {
                location.href = "/admin/login.html";
            }
        });
    }//end start

    var listen = function () {
        var btn = $(".login-form button");
        btn.on("click", function () {
            //console.log("sds");
            var val = $(".login-form input[name=link]").val();
            if (val == null) return;
            $.post("/api/login", val, function (data) {
                var json = format(data);
            
                if (json.status == "0") {
                    btn.css("background-color", "#2ECC71");
                    btn.html("success");
                } else {
                    btn.css("background-color", "#E74C3C");    
                    console.log(json);
                    btn.html(json.msg);
                }
            })
        });
    }




    return {
        "start": start,
        "listen": listen
    }

})(jQuery);