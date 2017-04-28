/**
 * Created by Seattle on 2017/4/27.
 */
(function(){
    var _width=document.body.offsetWidth,_height=180;
    var slideItem=document.querySelectorAll('.ui-slide-item');
    var slideItemNum=slideItem.length;
    for(var i=0;i<slideItemNum;i++){
        slideItem[i].style.width=_width+'px';
        slideItem[i].style.height=_height+'px';
    }
    var slideList=document.querySelector('.ui-slide');
    slideList.style.width=_width*slideItemNum+'px';
    slideList.style.height=_height+'px';

    var vx=0;
    var transZRegex = /\.*translateX\((.*)px\)/i;
    var maxLeft=_width*(slideItemNum-1);
    var middleLine=2/3*_width;
    slideList.addEventListener('touchstart',function(e){
        vx=event.targetTouches[0].pageX;
    },false);
    slideList.addEventListener('touchmove',function(e){
        var dx=(event.targetTouches[0].pageX-vx)/23;
        var vwidth=parseFloat(transZRegex.exec(slideList.style.transform||'transform: translateX(0px)')[1]);
        dx=dx+vwidth;
        dx=dx>middleLine?middleLine:dx;
        dx=Math.abs(dx)>(maxLeft+middleLine)?-maxLeft:dx;
        slideList.style.transform='translateX('+dx+'px)';
    },false);
    slideList.addEventListener('touchend',function(){
        var vwidth=parseFloat(transZRegex.exec(slideList.style.transform||'transform: translateX(0px)')[1]);
        var _mo=vwidth%_width;
        var _left=Math.floor(vwidth/_width)*_width;
        var _maxleft=Math.ceil(vwidth/_width)*_width;
        var dx=Math.abs(_mo)>middleLine? vwidth>0?0:_maxleft:_left;
        dx=dx>0?0:dx;
        dx=Math.abs(dx)>maxLeft?-maxLeft:dx;
        slideList.style.transform='translateX('+dx+'px)';
    },false);
})();