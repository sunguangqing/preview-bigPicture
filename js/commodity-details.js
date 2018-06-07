$(function () {
    //图片轮播
    var swiper = new Swiper('.showImg-swiper', {
        paginationClickable: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        }
    });
    var swiper = new Swiper('.hot-swiper', {
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
        loop : true,
        paginationClickable: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        }
    });
    // 切换图片
    $(".showImg-swiper .pic").on("click", function () {
        var $url = $(this).find("img").prop("src");
        $(".showImg-swiper .pic").removeClass("active");
        $(this).addClass("active").parents(".shop-img").find(".img-box img").attr("src", $url);
    });

    // 店铺收藏
    $(".shop-collect").on("click", function () {
        console.log("!233")
        $(this).find("i").toggleClass("active");
    });

    // 选择商品规格
    $(".shop-detail .detail-item .list").on("click", function () {
        var className = $(this).attr("class");
        if(className.indexOf("none") !== -1){
            return false;
        }else {
            $(this).addClass("active").siblings().removeClass("active");
        }
    });

    // 数量
    (function () {
        var $stock = parseInt($(".stock i").text());
        $(".number-box .text").on("keyup", function () {
            var $thisVal = parseInt($(this).val());
            if($thisVal > $stock){
                $(this).val($stock);
            }else if($thisVal < 1){
                $(this).val(1);
            }
        });
        $(".add-btn").on("click", function () {
            var $value = parseInt($(".number-box .text").val());
            if($value < 1){
                $value = 1;
            }else if($value > 1){
                $value -= 1;
                $(this).siblings("input").val($value);
            }
        });
        $(".reduce-btn").on("click", function () {
            var $value = parseInt($(".number-box .text").val());
            if($value > $stock){
                $value = $stock;
            }else if($stock > $value){
                $value += 1;
                $(this).siblings("input").val($value);
            }
        });
    })();

   // 商品分类
    var leftA = $(".shop-introduce-left .good-nav p");
    leftA.each(function () {
        if($(this).siblings("ul").length === 0){
            $(this).css("background", "none");
        }else{
            var className = $(this).prop("class");
            if(className.indexOf("open") !== -1){
                $(this).siblings().show();
            }else{
                $(this).siblings().hide();
            }
        }
    });
    leftA.on("click", function(){
        if($(this).siblings("ul").length !== 0){
            $(this).parent().siblings().find("p").removeClass("open").siblings().slideUp();
            $(this).toggleClass("open").siblings().slideToggle();
        }
    });

    // 商品详情切换
    $(".shop-introduce-right span").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

    // 图片放大
    (function () {
        var box = document.getElementsByClassName("img-box")[0];
        var small = box.firstElementChild || box.firstChild;
        var big = box.children[1];
        var mask = small.children[1];
        var bigImg = big.children[0];

        // 1.鼠标放上去显示盒子，移开隐藏盒子（为小盒子绑定事件）
        // 调用封装好的方法，显示元素
        small.onmouseenter = function () {
            show(mask);
            show(big);
        };
        // 调用封装好的方法，隐藏元素
        small.onmouseleave = function () {
            hide(mask);
            hide(big);
        };

        // 2. mask跟随鼠标移动
        // 绑定事件是onmousemove，事件源是small，只要在小盒子上移动1px，mask也要跟随移动
        small.onmousemove = function (event) {
            // 想移动mask，需要知道鼠标在small中的位置，x作为mask的left值，y作为mask的top值
            event = event || window.event;
            // 获取鼠标在整个页面的位置
            var pagex = event.pageX || scroll().left + event.clientX;
            var pagey = event.pageY || scroll().top + event.clientY;
            // 让鼠标在mask的最中间，减去mask宽高的一半，x、y为mask的坐标
            // console.log(pagex + " " + pagey);
            var x = pagex - box.offsetLeft - mask.offsetWidth / 2;
            var y = pagey - box.offsetTop - mask.offsetHeight / 2;
            // 限制mask的范围，left取值大于0，小于小盒子的宽减mask的宽
            if (x < 0) {
                x = 0;
            }
            if (x > small.offsetWidth - mask.offsetWidth) {
                x = small.offsetWidth - mask.offsetWidth;
            }
            if (y < 0) {
                y = 0;
            }
            if (y > small.offsetHeight - mask.offsetHeight) {
                y = small.offsetHeight - mask.offsetHeight;
            }
            // 移动mask
            // console.log("x:" + x + " y:" + y);
            mask.style.left = x + "px";
            mask.style.top = y + "px";

            //3.右侧的大图片，等比例移动
            // 大图片/大盒子 = 小图片/mask盒子
            // 大图片走的距离/mask走的距离 = （大图片-大盒子）/（小图片-mask）
            //比例var times = (bigImg.offsetWidth-big.offsetWidth)/(small.offsetWidth-mask.offsetWidth);
            //大图片走的距离/mask盒子走的距离 = 大图片/小图片
            var times = bigImg.offsetWidth / small.offsetWidth;
            var _x = x * times;
            var _y = y * times;

            bigImg.style.marginLeft = -_x + "px";
            bigImg.style.marginTop = -_y + "px";
        };

        // 显示隐藏元素
        function show(element) {
            element.style.display = "block";
        }
        function hide(element) {
            element.style.display = "none";
        }
    })();
});
