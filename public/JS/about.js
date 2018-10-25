$(function(){
    $("div.head-menu").css("top","0");
    $("header").css("top",0);
    $("section.main-Img").css(
        {
            "margin-top":"100px",
            "opacity":"1"
        }
    );

    //根据屏幕滚动距离加载
    $('body').on('mousewheel',function(e){
        var top = $(window).scrollTop();
        console.log(top);

        // if(top>140){
        //     $("section.main-body").css({
        //         "margin-top":"50px",
        //         "opacity":"1"
        //     })
        // }
        // if(top>200){
        //     //--------main------
        //     $("section.main-Img").css(
        //         {
        //             "margin-top":"100px",
        //             "opacity":"1"
        //         }
        //     );
        // }else{
        //     //--------main------
        //     $("section.main-Img").css(
        //         {
        //             "height":"600px",
        //             "opacity":"1"
        //         }
        //     );
        // }
        // if(top>300){
        //     $("section.main-Img").css(
        //         {
        //             "height":"400px",
        //             "opacity":"1"
        //         }
        //     );
        // }
        
    })

    //运动的下划线
    $("div.head-menu>ul>li:gt(0)").hover(
        function(){ 
            var $li = $(this);
            var $under = $('div.head-menu>div.underline');
            $under.css("width","100");
            var i = $li.parent().children().index($li);
            var left = i*100;
            $under.css({left}) 
        },
        function(){
            var $under = $('div.head-menu>div.underline');
            $under.css("width","0");
        }
    )

     //音乐控制
     $('button.head-player').on('click',function(){
        var $play = $(this);
        var $list = $play.next().next();
        var $audio = $('.head-audio>audio')[0];
        if($audio.paused !== false){
            $audio.volume = 0.5;
            $play.css({
                "border":"#cef",
                "animation-play-state":"running",
                "background":"radial-gradient(#fff 20%,#00ffff)"
            });
            $audio.play();
            $list.css({
                "box-shadow":"",
                "height":"0px"
            })
            console.log($audio.paused)
        }else{
            $audio.pause();
            $play.css({
                "background":"radial-gradient(#fff 20%,#AA0000)",
                "animation-play-state":"paused",
            });
            $list.css({
                "box-shadow":"0 0 5px 2px #500",
                "height":"120px"
            })
            console.log($audio.paused)
        }
    });




    //音乐列表
    $("div.music-list>ul").on('click','a',function(e){
        e.preventDefault();
        var $a = $(this);
        $(".music-input>input").val($a.html());
        $a.parent().parent().parent().css({
            "box-shadow":"",
            "height":"0px"
        })
        var $src = $a.attr('data-src');
        console.log($src);
        console.log(`${$src}`);
        var $audio = $('.head-audio>audio')[0];
        console.log($audio);
        $audio.setAttribute('src',`${$src}`)
    })
    $('body').click(function(){
        var $list = $('div.music-list');
        if($list.height() !== 0){
            $list.css({
                "box-shadow":"",
                "height":"0px"
            });
        }
    })



    //登录面板
    $(".login-spn").on('click',function(){
        $(".login-panel").removeClass("do-hide");
        $(".login-content").animate({
            // "top":"50%",
            "opacity":"1"
        },400);
    })
    //关闭登录窗口
    $(".login-close").on('click',function(){
        $(".login-content").animate({
            // "top":"50%",
            "opacity":"0"
        },400,function(){
            if( !$(".login-panel").hasClass("do-hide")){
                console.log("no")
                $(".login-panel").addClass("do-hide");
            }
        });
       /* if( !$(".login-panel").hasClass("do-hide")){
            console.log("no")
            $(".login-panel").addClass("do-hide");
        }*/
        // if($(".login-content"))
        /*if($(".login-content").style("opacity")==0){
            console.log('opacity')
            $(".login-panel").addClass("do-hide");
        }*/
    })

    //正则验证
    $('.username>input').on('blur',function(){
        var uname = $('.username>input').val();
        var rName = /^[\w\d]{6,8}/;
        if(! rName.test(uname)){
            $('.err-msg').removeClass('do-hide');
            $('.err-msg>span').html('用户名格式不正确');
        }
    })
    $('.password>input').on('blur',function(){
        var upwd = $('.password>input').val();
        var rPwd = /^\d{6,8}/;
        if(! rPwd.test(upwd)){
            $('.err-msg').removeClass('do-hide');
            $('.err-msg>span').html('密码格式不正确');
        }
    })
    //登录验证
    $('.login-btn>input').on('click',function(){
        var uname = $('.username>input').val();
        var upwd = $('.password>input').val();

        var rName = /^[\w\d]{6,8}/;
        var rPwd = /^\d{6,8}/;
        if(rName.test(uname) && rPwd.test(upwd)){
            $('.err-msg').addClass('do-hide');
            (async function(){
                var res = await $.ajax({
                    url:'http://127.0.0.1:3000/user/login',
                    method:'post',
                    data:{uname,upwd},
                    dataType:'json',  
                })
                if(res.code == 200){
                    alert('登录成功');
                    $(".login-content").animate({
                        // "top":"50%",
                        "opacity":"0"
                    },400,function(){
                        if( !$(".login-panel").hasClass("do-hide")){
                            console.log("no")
                            $(".login-panel").addClass("do-hide");
                        }
                    });

                }else{
                    alert('登录失败');
                }
            })()
        }else{
            alert('账号或密码有误！');
        }
    })














    //底部按钮
    //点赞
    $(".btn-like").on('click',function(){
        $btn = $(this);
        var $span = $btn.children().first();
        var num = $span.html();
        num ++;
        $span.html(123456);

    })
    //底部页码
    $("div.page-list>ul").children().first().css({
        "border-radius":"5px 0 0 5px",
        "width":"60px"
    }).parent().children().last().css({
        "border-radius":"0 5px 5px 0px",
        "border-left":"0",
        "width":"60px"
    }).parent().children(":not(:first-child):not(:last-child)").css({
        "border-left":"0"
    })

        
})