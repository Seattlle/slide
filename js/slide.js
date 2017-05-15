/**
 * Created by Seattle on 2017/5/15.
 */
;(function () {
    var transform=getTransform();

    function Slide(config) {
        this.slide=getElement(config.id);
        this.slideList=null;
        this.width=window.innerWidth+'px';
        this.isLoop=config.loop||false;
        this.minWidth=0;
        this.maxWidth=0;
        this.preBtn=null;
        this.nextBtn=null;
        this.loopTime=config.loopTime||3000;
        this.auto=config.auto||false;
        this.init();
    }

    Slide.prototype={
        constructor:Slide,
        init:function () {
            var _this=this;
            this.draw();

            this.preBtn.addEventListener('click',preClick,false);
            this.nextBtn.addEventListener('click',nextClick,false);
            function preClick() {
                var pos=_this.getCurrent();
                pos.x=pos.x+parseFloat(_this.width);
                pos.x=pos.x>_this.minWidth?_this.isLoop?-_this.maxWidth:0:pos.x;
                _this.setStyle(pos);
            }
            function nextClick() {
                var pos=_this.getCurrent();
                pos.x=pos.x-parseFloat(_this.width);
                pos.x=Math.abs(pos.x)<=_this.maxWidth?pos.x:_this.isLoop?0:_this.maxWidth*Math.abs(pos.x)/pos.x;
                _this.setStyle(pos);
            }

            if(_this.auto){
                setInterval(nextClick,this.loopTime);
            }
        },
        draw:function () {
            this.slideList=getElement('.ui-slide',this.slide)[0];
            var uiSlideItem=getElement('.ui-slide-item',this.slide);
            var slideItemNum=uiSlideItem.length;
            this.maxWidth=parseFloat(this.width)*(slideItemNum-1);
            this.slideList.style.width= parseFloat(this.width)*slideItemNum+'px';
            for(var i=0;i<slideItemNum;i++){
                uiSlideItem[i].style.width=this.width;
            }
            this.preBtn=getElement('.prebtn',this.slide)[0];
            this.nextBtn=getElement('.nextbtn',this.slide)[0];
        },
        //获取当前值
        getCurrent:function () {
            var pos={x:0,y:0};
            if(transform){
                var transformValue=getStyle(this.slideList,transform);
                if(transformValue=='none'){
                    this.slideList.style[transform]='translate(0,0)';
                }else{
                    var temp=transformValue.match(/-?\d+/g);
                    pos={
                        x:parseInt(temp[4].trim()),
                        y:0
                    }
                }
            }else{
                if(getStyle(this.slideList,'position')=='static'){
                    this.slideList.style.position='relative';
                }else{
                    pos={
                        x:parseFloat(getStyle(this.slideList,'left')?getStyle(this.slideList,'left'):0),
                        y:0,
                    }
                }
            }
            return pos;
        },
        //设置值
        setStyle:function (pos) {
            if(transform){
                this.slideList.style[transform]='translate('+pos.x+'px,'+pos.y+'px)';
            }else{
                this.slideList.style.left=pos.x+'px';
                this.slideList.style.top=pos.y+'px';
            }
        }
    }
    //获取元素样式值
    function getStyle(elem,property) {
        var value=document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(elem,false)[property]:elem.currentStyle[property];
        return value;
    }
    // 获取元素
    function getElement(item,parents){
        parents=parents||document;
        if(typeof item=='object'){
            return item;
        }else if(item.match(/^#\w{1,}/g)){
            item=item.split('#')[1];
            return parents.getElementById(item);
        }else if(item.match(/^\.\w{1,}/g)){
            item=item.split('.')[1];
            return parents.getElementsByClassName(item);
        }else{
            return parents.getElementsByName(item);
        }
    }
    //获取页面样式中的transform
    function getTransform() {
        var transform="",
            style=document.documentElement.style,
            transformArr=['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
            i=0,
            length=transformArr.length;
        for(;i<length;i++){
            if(transformArr[i] in style){
                transform=transformArr[i];
                return transform;
            }
        }
        return transform;
    }
    window.Slide=function (config) {
        return new Slide(config);
    }
})();