//对nmb的内容做控制
//更新了叠加方法，原始的太弱了
var adnmbJS = (function () {
    //http://cover.acfunwiki.org/luwei.json
    var loadingArray = ["友谊魔法加载中", "WTMSB", "( 察ω觉)", "雪中傲梅", "(　^ω^)那你好棒棒哦",
        "劲爆大象部落", "A岛唯一官方指定发型–空气刘海", "重生之我是芦苇娘", "hafu hafu", "must yourself",
        "人，是会思考的芦苇——帕斯卡，《思想录》", "开放包容，理性客观，有事说事，就事论事", "我赵日天并不服！",
        "晒妹会被SAGE哟，晒姐酌情", "来杯淡定红茶( ´_ゝ`)", "诸君→朱军→董卿", "赛，赛程安排！", "排，排球比赛！",
        "接 龙 大 成 功", "稀……干……", "仙客来根雕", "保安！病栋里的病人跑出来了！", "小刘，喂公子吃药",
        "小刘，6床加大用药量", "刘星打完夏东海，满头大汉", "Z(ﾟ∀。)Z Walk like an egyptian", "不要误会，我不是针对你，我是说……",
        "我是说，在座的各位都是肥宅", "我是说，在座的肥宅都是乐色", "My Little Pony, My Little Pony, Ah~",
        "一男子由于笑里藏刀，导致面部多处割伤", "旅馆大酬宾", "旅长爱搞基", "Duang的一下，就加载出来了",
        "寂寞了？画个可爱的女朋友吧", "没时间解释了！快上车！", "你不能让我加载，我就马上加载", "想歪的自重，这是芦苇！",
        "Wow, so doge, much cute, many moe", "再也没有什么不能淡定的了（ ´_ゝ`)",
        "UCCU等待加载的样子真是丑陋 ﾟ∀ﾟ)σ", "你听说过把妹公式吗？", "求和 、羁、飞马都会被碎饼干哟",
        "食我大雕辣(つд⊂)", "世界上没什么比爱的力量更强大，除了...", "齐齐蛤尔σ`∀´)", "总有一天你们会看着我画的东西撸！",
        "听说,下雨天三文鱼和叉烧酱更配哦", "冷漠得肥宅", "鉴你个面包！", "我淡淡地说，这是信仰", "你没几天好蹦跶了",
        "丞相 手 棺材——你TM倒是发个图啊", "这里是独裁岛，不爽不要玩(＾o＾)ﾉ", "你死定了，猴子*眼小", "可是朱云心里明白",
        "加qq337845818逆天改命", "炫酷红名，十元每月（大雾）", "是在下输了（抱拳）", "小姐，请问有没有卖半岛鸡盒",
        "服务员，来一份手撕逼", "今天岛上没有智障", "人生最好的五年，我都干什么了啊！", "为二次元献出心脏！", "三管不过冈",
        "事到如今就别再给我装什么正义人士了", "你们整天鉴婊鉴婊能找到媳妇吗", "为我们的友谊干杯", "在下弗了（抱拳）",
        "注意（白）字多义", "为了照顾智商不如蟑螂的虫族选手", "当你刷A岛很卡时，你很火大", "你有你的张起灵，我有我的芦苇酱",
        "貳叁叁叁", "齐齐蛤尔（注意“蛤”字多义）", "我是理性的机器", "天下尴共十尬，君独占八尬", "【版规】飞马会被碎饼干哟",
        "这个月A岛多了26只白羊，你有什么头猪吗？", "我刷A岛只有一个原则，那就是", "无图言雕，A岛白养你了", "你完了，猴子*眼小",
        "实际上上一周我都在外地并且", "我坠入黑暗，没有了光", "君日本语本当上手", "真是自私的神啊", "A岛土著 八辈渔民 大海血脉",
        "领导夹菜我转桌", "卧槽 NB", "重生之我在等待加载", "微信公众号“芦苇娘的胖次”欢迎关注~", "人类的本质是复读机", "在A岛，只有bog在抓bog",
        "看什么看你也是ATM", "淦，是n98肥宅！", "我狗比酱今日便是要打爆你喵喵酱的狗头", "欧吉车技腐乳句句然到雾入饭卡死了",
        "你说得对，那也轮不到你来说啊？？", "光来！"];

    var loadingText = function () { return loadingArray[parseInt(Math.random() * loadingArray.length)]; };

    var m_host = "http://api.lozye.com";// "http://localhost:80";//

    var debug = function () {
        jsonp(m_host + "/adnmb/doc/14886120");
    };
    var jsonp = function (url) {
        var _head = document.head || document.getElementsByTagName('head')[0];
        var hjs = document.createElement('script');
        hjs.setAttribute("src", url);
        hjs.setAttribute("charset", "UTF-8");
        _head.appendChild(hjs);
    };//end jsonp
    var Request = function () {
        var json = {};
        var search = window.location.search;
        if (search === null || search.length === 0)
            return _tempRequest = json;
        if (!search.startsWith('?'))
            return _tempRequest = json;
        var index = 1;
        while (true) {
            var a = search.indexOf('=', index);
            if (a === -1)
                break;
            var b = search.indexOf('&', a);
            var c = b === -1 ? search.length : b;
            json[search.substring(index, a)] = search.substring(a + 1, c);
            if (b === -1)
                break;
            index = b + 1;
        }
        return _tempRequest = json;
    };

    /*-- 渲染方法 --*/
    var doc_compile = () => { },
        ref_compile = doc_compile,
        lst_compile = doc_compile;
    var doc_compiled = false,
        ref_compiled = false,
        lst_compiled = false;
    var temp_doc = function (item) {
        if (!doc_compiled) {
            doc_compiled = true;
            doc_compile = template.compile(document.getElementById("temp_doc").innerHTML);
        }
        var dd = document.createElement("li");
        dd.innerHTML = doc_compile(item);
        return dd;
    };
    var temp_ref = function (item) {
        if (!ref_compiled) {
            ref_compiled = true;
            ref_compile = template.compile(document.getElementById("temp_ref").innerHTML);
        }
        var dd = document.createElement("div");
        dd.innerHTML = ref_compile(item);
        return dd;
    };
    var temp_lst = function (item) {
        if (!lst_compiled) {
            lst_compiled = true;
            lst_compile = template.compile(document.getElementById("temp_lst").innerHTML);
        }
        var dd = document.createElement("dd");
        dd.innerHTML = lst_compile(item);
        return dd;
    };

    /*-- 串方法开始 --*/
    var doc_hash = {};
    var doc_init = false;
    var doc_over = false;
    var doc_po = "";
    var doc_size = 1;
    var topic_id = 0;
    var doc = function (data) {
        nmbstyleJS.finish();
        var loading = document.getElementsByClassName("nmb-content-loading")[0];
        loading.style.setProperty("display", "none");
        if (data.status !== 0) { nmbstyleJS.msg("错误：" + data.msg); m_page--; return; }
        doc_size = data.thread_size;
        if (doc_size <= m_page) { doc_over = true; } else { doc_over = false; }

        var doc = data.docment;
        var item = null;
        /*-- 修正渲染方法，原始方法太烧机器了 --*/
        var v_template = (x) => {
            var dd = temp_doc(x);
            var t_refs = dd.querySelectorAll(".h-threads-content>font");
            if (t_refs.length === 0) return dd;
            on_ref(t_refs);
            return dd;
        };
        var target = null;
        /*-- 初始化判定 --*/
        if (!doc_init) {
            doc_init = true;
            item = doc.topic;
            target = document.getElementById("nmb-topic");
            doc_po = item.uid;
            item.uid = "<b>" + item.uid + "</b>";
            target.innerHTML = null;
            target.appendChild(v_template(item));
        }
        /*-- 避免target冲突-大雾 --*/
        target = document.getElementById("dynamic_view");
        for (var i = 0; i < doc.lst.length; i++) {
            item = doc.lst[i];
            if (doc_hash[item.thread_id] || item.thread_id === 9999999) continue;
            //新增本串引用自动展开
            ref_hash[item.thread_id] = item;
            doc_hash[item.thread_id] = true;
            if (doc_po === item.uid) item.uid = "<b>" + item.uid + "</b>";
            target.appendChild(v_template(item));
        }
    };//end doc

    var on_doc = function () {
        var loading = document.getElementsByClassName("nmb-content-loading")[0];
        loading.innerHTML = loadingText();
        loading.style.setProperty("display", "block");
        var request = Request();
        var value = request.id;
        m_page = request.p || 1;
        if (!value || value === undefined) return;
        on_forward(value);
        jsonp(m_host + "/adnmb/doc/" + value + "/" + m_page);
        nmbstyleJS.next(() => {
            if (doc_over) {
                var loading = document.getElementsByClassName("nmb-content-loading")[0];
                loading.style.setProperty("display", "block");
                loading.innerHTML = "没有更多内容了";
                nmbstyleJS.finish();
                return;
            }
            m_page++;
            on_refresh(value);
        });
    };
    var on_refresh = function (id) {
        var loading = document.getElementsByClassName("nmb-content-loading")[0];
        loading.style.setProperty("display", "block");
        loading.innerHTML = loadingText();
        jsonp(m_host + "/adnmb/doc/" + id + "/" + m_page);
    };
    //底部按钮事件监听
    var on_forward = function (id) {
        topic_id = id;

        document.getElementById("nmb-btn-close").addEventListener("click", function () {
            window.opener = null;
            window.open('', '_self');
            window.close();
        }, false);

        var history = function () {
            var topic = document.getElementById("nmb-topic");
            var _content = topic.getElementsByClassName("h-threads-content");
            var text = "";
            if (_content.length > 0) text = _content[0].innerHTML.trim();
            if (text.length > 60) text = text.substr(0, 50).trim() + "...";
            window.localStorage.setItem("nmb_" + id, m_page + "|" + text);
        };

        document.getElementById("nmb-btn-history").addEventListener("click", function () {
            history();
            nmbstyleJS.msg("已收藏");
        }, false);

        document.getElementById("nmb-btn-raw").addEventListener("click", function () {
            history();
            var newTab = window.open();
            newTab.opener = null;
            newTab.location = "https://adnmb2.com/m/t/" + id;
            //window.location.href = "https://adnmb1.com/m/t/" + id;
        }, false);

        document.getElementById("nmb-btn-jump").addEventListener("click", function () {
            page_selector(id);
        }, false);
    };
    //跳页选择器
    var page_selector = function (id) {
        if (!doc_init) return;
        var html = "";
        if (doc_size < 20) {
            for (var i = 0; i < doc_size; i++) {
                var p = i + 1;
                if (p === m_page)
                    html += "<i style='background-color:#eee;'>" + p + "</i>";
                else
                    html += "<i>" + p + "</i>";
            }
        }
        else {
            html = template("temp_jump", { "size": doc_size, "page": m_page });
        }
        nmbstyleJS.msg(html);
        var v_jump = (x) => {
            m_page = x;
            var target = document.getElementById("dynamic_view");
            target.innerHTML = null;
            doc_init = false;
            doc_hash = {};
            nmbstyleJS.msg_off();
            on_refresh(id);
        };
        var v_short = () => {
            var _array = document.getElementsByClassName("nmb-msg-content")[0].getElementsByTagName("i");
            for (var i = 0; i < _array.length; i++)
                _array[i].addEventListener("click", function (e) {
                    m_page = parseInt(this.innerHTML);
                    v_jump(m_page);
                }, false);
        };
        var v_long = () => {
            var target = document.getElementById("nmb-jump-for");
            target.getElementsByTagName("button")[0].addEventListener("click", function (e) {
                m_page = parseInt(target.getElementsByTagName("input")[0].value);
                v_jump(m_page);
            }, false);
        };
        if (doc_size < 20) v_short(); else v_long();
    };
    /*-- 串方法结束 --*/

    /*-- 引用方法开始 --*/
    var ref = function (data) {
        if (data.status !== 0) return;
        var item = data.item;
        if (data.topic_id !== 0 && topic_id !== data.topic_id) item["topic_id"] = data.topic_id;
        ref_hash[item.thread_id] = item;
        var target = document.getElementById("ref_" + item.thread_id);
        if (!target || target === undefined) return;
        target.appendChild(temp_ref(item));
    };//end ref
    var ref_hash = {};
    var ref_regex = /(\d+)/;
    /*-- 展开单个ref --*/
    var on_expansion = function (focus) {
        var t = focus.innerText.match(ref_regex);
        if (t === null || t.length !== 2) return;
        var target = t[0];
        var item = ref_hash[target];
        if (item !== undefined) { focus.appendChild(temp_ref(item)); return; }
        focus.addEventListener("click", function (e) {
            var ref_target = this.getElementsByClassName("nmb-ref");
            if (ref_target.length !== 0) return;
            var t = this.innerText.match(ref_regex);
            var target = t[0];
            item = ref_hash[target];
            if (item === undefined) {
                var id = this.getAttribute("id");
                if (id !== undefined && id) return;
                this.setAttribute("id", "ref_" + target);
                jsonp(m_host + "/adnmb/ref/" + target);
            } else {
                this.appendChild(temp_ref(item));
            }
        }, false);

    };
    var on_ref = function (_array) {
        var max = _array.length;
        for (var i = 0; i < _array.length; i++)
            on_expansion(_array[i]);
    };
    /*-- 引用方法结束 --*/

    /*-- 列表方法开始 --*/
    var m_page = 1;
    var m_moded = false;
    var m_nomore = false;
    var on_lst = function () {
        var loading = document.getElementsByClassName("nmb-content-loading")[0];
        loading.innerHTML = loadingText();
        loading.style.setProperty("display", "block");
        var request = Request();
        var value = request["value"] || "2F662F254536253937254236254539253937254234254537254241254246";
        jsonp(m_host + "/adnmb/lst/" + value);
        nmbstyleJS.next(() => {
            var loading = document.getElementsByClassName("nmb-content-loading")[0];
            if (m_nomore) {
                loading.style.setProperty("display", "block");
                loading.innerHTML = "没有更多内容了";
                nmbstyleJS.finish();
                return;
            }
            //console.log(m_page);
            m_page++;
            loading.innerHTML = loadingText();
            loading.style.setProperty("display", "block");
            jsonp(m_host + "/adnmb/lst/" + value + "/" + m_page);
        });
    };
    var lst_hash = {};
    var add_module = function (lst) {
        if (m_moded) return;
        m_moded = true;
        var html = "";
        for (var i = 0; i < lst.length; i++) {
            var item = lst[i];
            html += "<li><a href='/adnmb/list.html?value=" + item.value + "'>" + item.name + "</a></li>";
        }
        document.getElementById("dynamic_lst").innerHTML = html;
    };
    var lst = function (data) {
        nmbstyleJS.finish();
        var loading = document.getElementsByClassName("nmb-content-loading")[0];
        loading.style.setProperty("display", "none");

        if (data.status !== 0) {
            if (data.status === 6) { m_nomore = true; return; }
            nmbstyleJS.msg("错误：" + data.msg); m_page--; return;
        }
        add_module(data.modules);
        var target = document.getElementById("dynamic_view");

        var v_template = (x) => {
            var dd = temp_lst(x);
            var href = dd.getElementsByClassName("nmb-thread-content")[0];
            href.addEventListener("click", lst_click, false);
            target.appendChild(dd);
        };
        for (var i = 0; i < data.docments.length; i++) {
            var item = data.docments[i];
            if (lst_hash[item.thread_id]) continue;
            lst_hash[item.thread_id] = true;
            v_template(item);
        }
    };//end lst
    var lst_click = function (e) {
        if (e.target.tagName !== "DIV") return;
        var newTab = window.open();
        newTab.opener = null;
        newTab.location = "/adnmb/docment.html?id=" + this.getElementsByTagName("input")[0].value;
    };
    /*-- 列表方法结束 --*/

    return {
        "lst": lst,
        "on_lst": on_lst,
        "ref": ref,
        "doc": doc,
        "on_doc": on_doc,
        "refresh": on_refresh,
        "debug": debug
    };
})(nmbstyleJS);