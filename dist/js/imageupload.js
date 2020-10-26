//需要上传图片的框体加上class=>uploadimage
//接口调用UEditor图片上传接口
//自定义接口需返回{"state":"","url":""}格式
var imgUpload = (function () {
    var action = "";
    var flag = "0";
    var inp = undefined;
    var form = undefined;
    var elem = undefined;
    var frm = undefined;
    var markbox = undefined;
    var config = function (setting) {
        action = setting.action;
        if (setting.flag != undefined)
            flag = setting.flag;
    };
    var htmlLoad = function () {
        var html = "";
        if (action == "") {
            throw "必须先设置action路径 调用imgUpload.config({\"action\":\".....\"});";
        }
        html += "   <form action='" + action + "' method='post' target='frmimgupload' enctype='multipart/form-data'>";
        html += "   <input type='file' id='fileBtn' name='upfile' autocomplete='off' style='display:none;'>";
        html += "   </form><iframe name='frmimgupload' style='display:none'></iframe>";
        $("body").append(html);
        inp = $("#fileBtn");
        form = $("form[target=frmimgupload]");
        frm = $("iframe[name=frmimgupload]");
        markbox = $("div.markdownStr");
    }//end htmlLoad
    var btnLoad = function () {
        $(".uploadimage").unbind("click");
        $(".uploadimage").css("cursor", "pointer");
        $(".uploadimage").css("overflow", "hidden");
        $(".uploadimage").on("click", function () {
            elem = $(this);
            inp.click();
        });
    };//end btnLoad
    var message = function (msg) {
        if (typeof (layer) == "undefined")
            alert(msg);
        else
            layer.msg(msg, { time: 1000 });
    }

    var picRender = function () {
        inp.change(function () {
            var value = inp.val();
            if (value != null && value != "") {
                markbox.hide();
                form.submit();
            }
        });
        frm.load(function () {
            var data = $(window.frames['frmimgupload'].document).find("body pre").html();
            if (data != "" && data != null) {
                var j = {};
                try { j = JSON.parse(data); } catch (ex) { console.log(data); console.log(ex); }
                if (j.status != flag) { message("图片上传失败"); return; }
                elem.html("<img width=\"100%\" heigth=\"100%\" src=\"" + j.body + "\">");
                markbox.html("![image](" + j.body + ")");
                markbox.show();
            }
            else {
                message("图片上传失败");
            }
        });
    }//end picRender
    return {
        "config": config,
        "Load": function () {
            if (frm == undefined) {
                htmlLoad(); btnLoad(); picRender();
            } else {
                btnLoad();
            }
        }
    }
})();