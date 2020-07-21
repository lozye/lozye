//手机页面滑动监听
var moveJS = (function () {    
    var m_lintened = false;
    var f_default = function (x) { },
        f_up = f_default,
        f_down = f_default,
        f_left = f_default,
        f_right = f_default;
    //监听动作
    var listen = function (method, fn) {
        var fn = fn || function (x) { };
        switch (method) {
            case "up": f_up= fn; break;
            case "down": f_down = fn; break;
            case "left": f_left = fn; break;
            case "right": f_right = fn; break;
            default: return;
        }
        if (m_lintened) return;
        m_lintened = true;
        mouseSrcoll();       
    }
    //开始监听
    var mouseSrcoll = function () {
        m_touch(function (e) {
            if (e.spend < 25) return;
            // left
            if (e.x < -50 && Math.abs(e.y) < 50) { f_left(e); }
            // rigth
            else if (e.x > 50 && Math.abs(e.y) < 50) { f_right(e); }
            // up
            else if (e.y < -100 ) { f_up(e); }
            // down
            else if (e.y > 100) { f_down(e); }   
        });
    }
    //拖到参数
    var m_touch = function (fn) {
        var fn = fn || function () { };
        var m_temp = {};
        window.addEventListener("touchstart", function (e) {
            var touch = e.touches[0];
            m_temp.x = touch.pageX;
            m_temp.y = touch.pageY;
            m_temp.t = e.timeStamp;
        }, false);
        window.addEventListener("touchend", function (e) {
            var touch = e.changedTouches[0];
            var move = { "x": touch.pageX - m_temp.x, "y": touch.pageY - m_temp.y, "spend": parseInt(e.timeStamp - m_temp.t) };
            fn(move);
        }, false);
    }  
    return { "on": listen }
})()