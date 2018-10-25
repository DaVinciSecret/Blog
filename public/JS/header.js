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