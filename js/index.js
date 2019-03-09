
$(function () {
    //轮播图
    var mainBanner = 0;   //声明一个变量控制轮播图
    var bannerltn = $('#main_banner .fs_col2_item').length; //拿到轮播图图片的个数
    $('#mb_redi .radius_item:first').addClass('radius_item_on'); //控制轮播图走向的小圆点第一个加上on
    $('#mb_redi .radius_item').on('mouseover', function () {
        mainBanner = $(this).index();
        move(); //鼠标每次滑动小圆点执行这个函数
    })
    // 设置一个定时器每3秒执行一次这个函数
    function firstBnr() {
        auto = setInterval(function () {
            mainBanner++;
            if (mainBanner == bannerltn) {
                mainBanner = 0;
            }
            move();
        }, 3000);
    }
    firstBnr();
    function move() {
        $('#mb_redi .radius_item').eq(mainBanner).addClass('radius_item_on').siblings().removeClass('radius_item_on');
        $('#main_banner .fs_col2_item').eq(mainBanner).css({ 'opacity': '1', 'z-index': '1' }).siblings().css({ 'opacity': '0', 'z-index': '0' });
    }
    // 鼠标放上轮播图停止 放下来继续
    $('#mb_redi .radius_item,#main_banner .fs_col2_item').mouseover(function () {
        clearInterval(auto);
    }).mouseout(function () {
        firstBnr();
    })
    // 点击左边切换
    $('#mb_prev').click(function () {
        clearInterval(auto);  //点击停止
        mainBanner--;
        if (mainBanner == - 1) {  //如果最后一张了
            mainBanner = bannerltn - 1; //就等于最后一张
        }
        move();     //然后继续运行
        firstBnr();
    })
    //点击右边切换
    $('#mb_next').click(function () {
        clearInterval(auto); //点击停止
        mainBanner++;
        if (mainBanner >= bannerltn) { //大于了就等于第一张
            mainBanner = 0;
        }
        move(); //然后运行
        firstBnr();
    })
    
    
    //首页位置选择
    $('#shortcut_location').mouseover(function () {
        $(this).addClass('hover');
        $('#sht_wrap').show();
    }).mouseout(function () {
        $(this).removeClass('hover');
        $('#sht_wrap').hide();
    })

    //导航条下拉

    $('.rf_listsnav_i').mouseover(function () {
        $(this).addClass('hover');
        $(this).children(".wrap_hide").show();
    }).mouseout(function () {
        $(this).removeClass('hover');
        $(this).children(".wrap_hide").hide();
    })

    //手机京东二维码
    $('#phone_jd').mouseover(function () {
        $(".jd_moddle").show();
    }).mouseout(function () {
        $(".jd_moddle").hide();
    })


    //顶部左侧选择卡
    $('#fs_tabNav .top_nav_wrap').mouseover(function () {
        $('.fs_tab_body').show();
        $(this).addClass('wrap_hover');
        var index = $(this).index();
        $('.cate_part').eq(index).show();
    }).mouseout(function () {
        $('.fs_tab_body').hide();
        $(this).removeClass('wrap_hover');
        var index = $(this).index();
        $('.cate_part').hide();
    })
    $('.cate_part').mouseover(function () {
        $('.fs_tab_body').show();
        $(this).show();
    }).mouseout(function () {
        $('.fs_tab_body').hide();
        $(this).hide();
    })
    //跟随底部
    $('.pt_fxied_close').click(function () {
        $('#pt_fxied').fadeOut();
    })

    //京东秒杀无缝切换
    // var firstList = $('#jdms_list .ms_item').first().clone();
    $('#jdms_list').width($('.ms_item').length * $('.ms_item').width());
    var i = 0;
    var timer;

    function moveList() {

        if (i == $('.ms_active1').length) {
            i = 0;
            $('#jdms_list').stop().animate({ left: 0 },500);
        }   
          
        if (i == -1) { 
            i = $('.ms_active1').length-1;
            $('#jdms_list').stop().animate({ left: i * -800 },500);
        }
        $('#jdms_list').stop().animate({left: i * -800},500);
    }
    
      $('#ms_prev').click(function () {
          i++;
          moveList();
      })
    
    $('#ms_next').click(function () {
        i--;
        moveList();
    });


    // // 京东秒杀倒计时
    var setTimer = null;
    var chazhi = 0;
    //差值计算
    //例子(模拟)
    chazhi = 1 * 86400000;
    //真实时间(注意月份需减掉1，否则时间会计算错误)
    //chazhi = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数
    //chazhi = (new Date(2018,8-1,6,6,6,6)) - (new Date());
  
    //执行函数部分
    countFunc(chazhi);
    setTimer = setInterval(function () {
        chazhi = chazhi - 1000;
        countFunc(chazhi);
    }, 1000);
  
    function countFunc(leftTime) {
        if (leftTime >= 0) {
            var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
            var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
            var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟 
            var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数 
            days = checkTime(days);
            hours = checkTime(hours);
            minutes = checkTime(minutes);
            seconds = checkTime(seconds);
            $(".joind").html(days);
            $(".joinh").html(hours);
            $(".joinm").html(minutes);
            $(".joins").html(seconds);
        } else {
            clearInterval(setTimer);
            $(".joind").html("00");
            $(".joinh").html("00");
            $(".joinm").html("00");
            $(".joins").html("00");
        }
    }
  
    function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    // 秒杀旁边轮播
    var msBanner = $('#ms_banner .ms_item').first().clone();
    $('#ms_banner').append(msBanner).width($('#ms_banner .ms_item').length * $('#ms_banner .ms_item').width());

    var msCount = 0;
    var msAutoPlay;
    var msWidth = $('#ms_banner .ms_item').width();
    ms_automatic();

    function ms_automatic() {
        msAutoPlay = setInterval(function () {
            msCount++;
            msFeat(msCount);
        }, 3000);   
    }
    function msFeat(num) {

        if (msCount == $('#ms_banner .ms_item').length) {
            msCount = 1;
            $('#ms_banner').css({ left: 0 });
        }
        $('#ms_banner').stop().animate({ left: msCount * -msWidth }, 400);
        
        if (msCount == ($('#ms_banner .ms_item').length-1)) {
            $('.ms_indica a').eq(0).addClass('ms_hover').siblings().removeClass('ms_hover');
        } else { 
            $('.ms_indica a').eq(msCount).addClass('ms_hover').siblings().removeClass('ms_hover');
        }
    }
    $('.ms_indica .ms_dotItem').mouseover(function () { 
        clearInterval(msAutoPlay);
        msCount = $(this).index();
        msFeat(msCount);
    }).mouseout(function () {
        ms_automatic();
    })

    //排行榜
    $('.loder_item').mouseover(function () { 
        $(this).addClass('active').siblings().removeClass('active');
        var slider = $(this).index();
        $('.tab_body_item').eq(slider).show().siblings().hide();
    
    })
    // var loaderConst = 0;
    // var loderItem = $('.loder_item').length;
    // function sliderWrap() { 
    //     loaderConst++;
    //     var a = $('.slider_content .slider_item').eq(loaderConst).width();
    //     console.log(a);

    // }
    // sliderWrap();

    // 会买专辑

    var Album = $('#willbuy_zj .hmzj_item').first().clone();
    $('#willbuy_zj').append(Album).width($('#willbuy_zj .hmzj_item').length * $('#willbuy_zj .hmzj_item').width());

    var Album_const = 0;
    var Album_time;
    Album_auto();
    

    $('.leftslide').click(function () { 
        clearInterval(Album_time);
        Album_const--;
        Album_wrap(Album_const);
        Album_auto();
    })

    $('.rightslide').click(function () { 
        clearInterval(Album_time);
        Album_const++
        Album_wrap(Album_const);
        Album_auto();
    }) 

    function Album_auto() { 
        Album_time = setInterval(function () { 
            Album_const++;
            Album_wrap(Album_const);
        },5000)
    }
        
    function Album_wrap(i) {
        if (Album_const == $('#willbuy_zj .hmzj_item').length) { 
            Album_const = 1;
            $('#willbuy_zj').css({ left: 0 });
        }
        if (Album_const == -1) { 
            Album_const = $('#willbuy_zj .hmzj_item').length - 2;
            $('#willbuy_zj').css({ left: ($('#willbuy_zj .hmzj_item').length - 1) * -350});
        }
        $('#willbuy_zj').stop().animate({ left: Album_const * -350 }, 400);
        if (Album_const == $('#willbuy_zj .hmzj_item').length - 1) {
            $('#Album_dot .slider_indicators_btn').eq(0).addClass('on').siblings().removeClass('on');
        } else { 
            $('#Album_dot .slider_indicators_btn').eq(Album_const).addClass('on').siblings().removeClass('on');
        }
     }

    $('#Album_dot .slider_indicators_btn').mouseover(function () { 
        clearInterval(Album_time);
        Album_const = $(this).index();
        Album_wrap();
    }).mouseout(function () {
        Album_auto();
    })

    // 优惠券
    var CouponItem = $('#CouponWrap .Coupon_item').first().clone();
    $('#CouponWrap').append(CouponItem).width($('#CouponWrap .Coupon_item').length * $('#CouponWrap .Coupon_item').width());
    
    var couponConst = 0;
    var couponTime;
    couponAuto();

    function couponAuto() { 
        couponTime = setInterval(function () { 
            couponConst++;
            couponWrap(couponConst);
        },3000)
    }

    function couponWrap(coupon) { 
        if (couponConst == $('#CouponWrap .Coupon_item').length) { 
            couponConst = 1;
            $('#CouponWrap').css({ left: 0 });
        }
        $('#CouponWrap').stop().animate({ left: couponConst * -350 },400);
        
        if (couponConst == $('#CouponWrap .Coupon_item').length - 1) {
            $('#coupon_dot .slider_indicators_btn').eq(0).addClass('on').siblings().removeClass('on');
        } else { 
            $('#coupon_dot .slider_indicators_btn').eq(couponConst).addClass('on').siblings().removeClass('on');
        }
    }

    $('#coupon_dot .slider_indicators_btn').mouseover(function () { 
        clearInterval(couponTime);
        couponConst = $(this).index();
        couponWrap();
    }).mouseout(function () { 
        couponAuto();
    })



    
    // 寻me

    var  xunMe = $('#xunMe .hmzj_item').first().clone();
    $('#xunMe').append(xunMe).width($('#xunMe .hmzj_item').length * $('#xunMe .hmzj_item').width());

    var xunMe_const = 0;
    var xunMe_time;
    xunMe_auto();
    

    $('#xun_next').click(function () { 
        clearInterval(xunMe_time);
        xunMe_const--;
        xunMe_wrap(xunMe_const);
        xunMe_auto();
    })

    $('#xun_prev').click(function () { 
        clearInterval(xunMe_time);
        xunMe_const++
        xunMe_wrap(xunMe_const);
        xunMe_auto();
    }) 

    function xunMe_auto() { 
        xunMe_time = setInterval(function () { 
            xunMe_const++;
            xunMe_wrap(xunMe_const);
        },5000)
    }
    
    function xunMe_wrap(i) {
        if ( xunMe_const == $('#xunMe .hmzj_item').length) { 
            xunMe_const = 1;
            $('#xunMe').css({ left: 0 });
        }
        if (xunMe_const == -1) { 
            xunMe_const = $('#xunMe .hmzj_item').length - 2;
            $('#xunMe').css({ left: ($('#xunMe .hmzj_item').length - 1) * -350});
        }
        $('#xunMe').stop().animate({ left: xunMe_const * -350 }, 400);
        if (xunMe_const == $('#xunMe .hmzj_item').length - 1) {
            $('#xunMe_dot .slider_indicators_btn').eq(0).addClass('on').siblings().removeClass('on');
        } else { 
            $('#xunMe_dot .slider_indicators_btn').eq(xunMe_const).addClass('on').siblings().removeClass('on');
        }   
     }

    $('#xunMe_dot .slider_indicators_btn').mouseover(function () { 
        clearInterval(xunMe_time);
        xunMe_const = $(this).index();
        xunMe_wrap();
    }).mouseout(function () {
        xunMe_auto();
    })

});

