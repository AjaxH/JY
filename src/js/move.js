(function() {

    // let box = $('#box');
    // let lis = $(box).find('.imglist li');

    //图片放到右侧
    let iw = $('.bd li img').eq(0).outerWidth();//一个图片的宽度
    $('.bd li').css('left' , iw);//图片放到右侧
    $('.bd li').eq(0).css('left' , 0);//第一张在可视区

    //生成焦点
    let html = '';
    $('.hd li').each((i,item) => {
        html += `<span>${i + 1}</span>`;
    });
    $('.light').html(html);//数据渲染
    $('.hd li').find('span:first').addClass('on_hove');

    //1.自动轮播：定时器
    let timer = null;
    let now = 0;//可视区图片的下标
    

    function next() {
        //下一张
        //旧图挪走
        $('.bd li').eq(now).animate({'left' : -iw},1000,'linear');
        //新图进场
        now++;
        if(now >= $('.bd li').size()) {
            now = 0;
        }
        $('.bd li').eq(now).css({'left' : iw});//快速放在右侧
        $('.bd li').eq(now).animate({'left' : 0},1000,'linear');
        light();
    }

    timer = setInterval(next,2000);//每隔两秒钟切换一个图片

    function prev() {
        //上一张
        $('.bd li').eq(now).animate({'left' : iw},1000,'linear');
        now--;
        if(now < 0) {
            now = $('.bd li').size() - 1;
        }
        $('.bd li').eq(now).css({'left' : -iw});//快速放在右侧
        $('.bd li').eq(now).animate({'left' : 0},1000,'linear');
        light();
    }

    //焦点跟随
    function light() {
        $('.light').find('span').eq(now).addClass('active').siblings().removeClass('active');
    }

    //2.鼠标移入停止移出继续运动
    $('#box').hover(() => {
        clearInterval(timer);
    },() => {
        timer = setInterval(next,2000);
    });

    //3.点击上下按钮可以切换上下张图片

    $('#box .prev').click(() => {
        //上一张
        prev();
    });

    $('#box .next').click(() => {
        //上一张
        next();
    });

    //4.点击焦点能够跳转到对应图片
    $('.light').on('click','span',function() {
        let index = $(this).index();
        // console.log(index);
        if(index > now) {
            //新图从右边切入
            $('.bd li').eq(now).animate({'left' : -iw},1000,'linear');
            $('.bd li').eq(index).css({'left' : iw});
            $('.bd li').eq(index).animate({'left' : 0},1000,'linear');
        }
        if(index < now) {
            //新图从左边切入
            $('.bd li').eq(now).animate({'left' : iw},1000,'linear');
            $('.bd li').eq(index).css({'left' : -iw});
            $('.bd li').eq(index).animate({'left' : 0},1000,'linear');
        }
        now = index;
        light();
    });

})();