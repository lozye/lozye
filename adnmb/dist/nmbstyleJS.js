//用于打开和关闭各个窗口..巴拉巴拉..及监听滑动底部
var nmbstyleJS = (function () {

    var jsop = function (url) {
        var _head = document.head || document.getElementsByTagName('head')[0];
        var hjs = document.createElement('script');
        hjs.setAttribute("src", url);
        hjs.setAttribute("charset", "UTF-8");
        _head.appendChild(hjs);
    }
    //窗体大小，避免mobie地址栏隐藏时的bug
    var win_height = 0;
    var nmb_lst = true;
    //是否打开侧边栏
    var m_side = false;
    //是否打开底部栏
    var m_foot = false;
    //是否打开通知
    var m_onmsg = false;
    //是否打开加载中
    var m_onload = false;
    //获取几个指定的窗口
    var get_side = () => document.getElementsByClassName("nmb-side")[0];
    var get_foot = () => document.getElementsByClassName("nmb-foot")[0];
    var get_content = () => document.getElementsByClassName("nmb-content")[0];
    var get_mask = () => document.getElementsByClassName("nmb-mask")[0];
    //通知_fn关闭时的回调
    var msg = function (msg, fn) {
        if (!msg || msg == undefined) return;
        if (m_onmsg) return;

        var fn = fn || function () { };
        m_side_off();
        m_foot_off();
        m_onmsg = true;
        var mask = get_mask();
        mask.style.setProperty("display", "block");
        var box = document.getElementsByClassName("nmb-msg")[0];
        box.getElementsByClassName("nmb-msg-content")[0].innerHTML = msg;
        box.style.setProperty("display", "block");
        var v_close = function (e) {
            m_onmsg = false;
            mask.style.setProperty("display", "none");
            box.style.setProperty("display", "none");
            mask.removeEventListener("click", v_close, false);
            fn();
        }
        mask.addEventListener("click", v_close, false);
    }

    var msg_off = function () {
        m_onmsg = false;
        get_mask().style.setProperty("display", "none");
        var box = document.getElementsByClassName("nmb-msg")[0];
        box.style.setProperty("display", "none");
    }

    //侧边栏
    var m_side_on = function () {
        if (m_onmsg) return;

        if (m_side) return;
        m_side = true;
        m_foot_off();

        //全屏适配
        var tem_height = window.outerHeight;
        var el_side = get_side();
        var el_mask = get_mask();
        if (win_height != tem_height) {
            el_side.style.height = tem_height + 'px';
            el_mask.style.height = tem_height + 'px';
            win_height = tem_height;
        }

        el_side.style.setProperty("display", "block");
        el_mask.style.setProperty("display", "block");
    }

    //重新加载
    var m_refush = function () { if (nmb_lst) window.location.reload(); };


    var m_side_off = function () {
        if (!m_side) { m_refush(); return; }
        m_side = false;
        get_side().style.setProperty("display", "none");
        get_mask().style.setProperty("display", "none");
    }

    //底部栏
    var m_foot_on = function () {
        if (m_side || m_onmsg) return;

        if (m_foot) return;
        m_foot = true;
        get_foot().style.setProperty("display", "block")
        get_content().style.setProperty("bottom", "50px");
    }
    var m_foot_off = function () {
        if (!m_foot) return;
        m_foot = false;
        get_foot().style.setProperty("display", "none")
        get_content().style.setProperty("bottom", "0");
    }
    //监听滚动_滚动到底部触发next事件
    var m_scroll = function (e) {
        if (m_side) return;
        if (m_onload) return;

        var _temp = get_content();
        var top = _temp.scrollTop + _temp.clientHeight;
        var _height = Math.abs(_temp.scrollHeight - top);
        if (_height > 1500) return;
        on_next(e);
    }
    var on_next = function (fn) {
        m_onload = true;
        try { fn_next(); } catch (ex) { if (console.log) console.log(ex); }
    }
    //监听滑动事件
    var on_right = function (e) { m_side_on(); }
    var on_close = function (e) {
        window.opener = null;
        window.open('', '_self');
        window.close();
    }
    var on_left = function (e) { m_side_off(); }
    var on_up = function (e) { m_foot_off(); m_scroll(e); }
    var on_down = function (e) { m_foot_on(); }
    var listen = function (setting) {
        win_height = window.outerHeight;
        var setting = setting || { "nmb_lst": false };
        nmb_lst = setting.nmb_lst;
        var array = document.querySelector(".nmb-helper").querySelectorAll(".nmb-helper-td");

        moveJS.on("up", on_up);
        array[3].addEventListener('click', on_up, false);
        //禁止下拉菜单时为列表否则为详情      
        if (setting.nmb_lst) {
            moveJS.on("right", on_right);
            moveJS.on("left", on_left);

            array[2].addEventListener('click', on_right, false);
            array[1].addEventListener('click', on_left, false);
        }
        else {
            moveJS.on("down", on_down);
            moveJS.on("left", on_down);
            moveJS.on("right", on_close);

            array[0].addEventListener('click', on_down, false);
            array[1].addEventListener('click', on_down, false);
            array[2].addEventListener('click', on_close, false);
        }
        var mask = get_mask();
        //在弹出窗口时禁用滚动
        mask.addEventListener("touchmove", function (e) { e.stopPropagation(); }, false);
        setTimeout(function () { jsop("http://tajs.qq.com/stats?sId=44452194"); }, 1000);
    }

    //注册
    var fn_next = function (x) { };
    var next_on = function (fn) { fn_next = fn || function (x) { }; }
    var next_finish = function () { m_onload = false; }
    //暴露接口
    return {
        "listen": listen,
        "next": next_on,
        "finish": next_finish,
        "msg": msg,
        "msg_off": msg_off
    }
})(moveJS);