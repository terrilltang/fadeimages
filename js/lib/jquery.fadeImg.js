/* *
 * 此插件仅限DIV>UL>LI结构，CSS样式定们也请严格按照例子中的思路
 * 作者：TERRILLTANG
 * 作者邮箱：549697621@qq.com
 * 2014-04-16
 * */
(function ($) {
    $.fn.fadeImages = function (options) {
        var opt = $.extend({
            time: 3000,                 //动画间隔时间
            fade: 1000,                 //淡入淡出的动画时间
            dots: true,                //是否启用图片按钮
            complete:function(){}     //淡入完成后的回调函数
        }, options);
        var t = parseInt(opt.time), f = parseInt(opt.fade), d = opt.dots, i = 0, j = 0, k, l, m, set,cb=opt.complete;
        m = $(this).find("ul li");
        m.hide();
        l = m.length;
        if(l<=0){
            return false;
        }
        if (d) {
            $(this).append("<ol id='dots'></ol>");
            for (j = 0; j < l; j++) {
                $(this).find("ol").append("<li>" + (j + 1) + "</li>");
            }
            $(this).find("ol li").eq(0).addClass("active");
        }
        //初始化
        show(0);
        //图片切换函数
        function show(i) {
            m.eq(i).addClass("curr").css("z-index",2).stop(true,true).fadeIn(f,cb);
            m.eq(i).siblings().css("z-index",1).removeClass("curr").stop(true,true).fadeOut(f);
        }

        //逗点切换函数
        function dots(i) {
            $("ol#dots li").eq(i).addClass("active").siblings().removeClass();
        }

        //图片自动播放函数
        function play() {
            if (i++ < l - 1) {
                set = setTimeout(function () {
                    show(i);
                    dots(i);
                    play();
                }, t + f)
            }
            else {
                i = -1;
                play();
            }
        }

        play();
        //鼠标经过停止与播放
        m.hover(function () {
            clearTimeout(set);
            k = i;
        }, function () {
            i = k - 1;
            play();
        });
        //点击下方逗点控制动画
        if (d) {
            $(this).on("click", "ol#dots li", function () {
                i = $(this).index();
                dots(i);
                show(i);
            })
        }
        return this;
    }
}(jQuery));