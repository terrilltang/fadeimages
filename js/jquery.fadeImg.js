(function($) {
  $.fn.fadeImages = function(options) {
    var opt = $.extend({
      time: 2000, //动画间隔时间
      fade: 1000, //淡入淡出的动画时间
      dots: true, //是否启用图片按钮
      arrows: false, //上一张，下一张
      complete: function() {} //淡入完成后的回调函数
    }, options);
    var t = parseInt(opt.time),
      f = parseInt(opt.fade),
      d = opt.dots,
      i = 0,
      j = 0,
      l, m, set, me, cb = opt.complete,
      a = opt.arrows;
    m = $(this).find("ul li");
    me = $(this);
    m.hide();
    l = m.length;

    // 如果没有一张图片
    if (l <= 0) {
      return false;
    }
    // 如果开启底部按钮
    if (d) {
      $(this).append("<div id='dots'></div>");
      for (j = 0; j < l; j++) {
        $(this).find("#dots").append("<a>" + (j + 1) + "</a>");
      }
      $(this).find("#dots a").eq(0).addClass("active");
      // 底部按钮点击切换
      $(this).on("click", "#dots a", function(event) {
        event.preventDefault();
        clearTimeout(set);
        i = $(this).index();
        dots(i);
        show(i);
      });
    }
    // 如果开启ARROW
    if (a) {
      $(this).append("<a href='#' class='arrow prev'>PREV</a><a href='#' class='arrow next'>NEXT</a>");
      $(this).on("click", ".arrow.prev", function(event) {
        event.preventDefault();
        clearTimeout(set);
        i = me.find(".curr").index() - 1;
        if (i <= -1) {
          i = l - 1;
        }
        dots(i);
        show(i);

      });
      $(this).on("click", ".arrow.next", function(event) {
        event.preventDefault();
        clearTimeout(set);
        i = me.find(".curr").index() + 1;
        if (i >= l) {
          i = 0;
        }
        dots(i);
        show(i);
      });
    }
    // 初始化
    show(0);
    play(0);
    // 图片切换
    function show(i) {
      m.eq(i).addClass("curr").css("z-index", 2).stop(true, true).fadeIn(f, cb);
      m.eq(i).siblings().css("z-index", 1).removeClass("curr").stop(true, true).fadeOut(f);
    }

    //逗点切换
    function dots(i) {
      me.find("#dots a").eq(i).addClass("active").siblings().removeClass();
    }

    //图片自动播放函数
    function play(i) {
      if (i >= l - 1) {
        i = -1;
      }
      set = setTimeout(function() {
        show(i);
        dots(i);
        play(i)
      }, t + f);
      i++;
      return i;
    }


    //鼠标经过停止与播放
    me.hover(function() {
      i = me.find(".curr").index();
      clearTimeout(set);
    }, function() {
      i = me.find(".curr").index();
      play(i);
    });

    return this;
  }
}(jQuery));
