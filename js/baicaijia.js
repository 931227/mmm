$(function(){
  // 点击导航切换状态
  $('#baicainav .nav-left ul ').on('click','li a',function(){
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    // 渲染对应的产品列表
    var code = this.dataset.id;
    tools.ajax('http://139.199.157.195:9090/api/getbaicaijiaproduct',{titleid:code},'categoryTmp','#baicaicategory');
    return false;
  })
  // 点击搜索弹出搜索框
  $('#baicainav .nav-right').on('click',function(){
    $('#baicainav .search').toggle();
  })




  // 拖动导航栏
  // var startX,distanceX;
  // $('#baicainav .nav-left ul').on('touchstart',function(e){
  //   startX = e.originalEvent.touches[0].pageX;
  // })
  // $('#baicainav .nav-left ul').on('touchmove',function(e){
  //   distanceX = startX - e.originalEvent.changedTouches[0].pageX;
  //    $('#baicainav .nav-left ul').css('transition','all .5s');
  //    $('#baicainav .nav-left ul').css('transform','translateX('+-distanceX+'px)');
  // })
  // $('#baicainav .nav-left ul').on('touchend',function(e){
    
  // })

  
      /*插件的调用*/
      var swipe = new itcast.iScroll({
          swipeDom:$('#baicainav .nav-left ul')[0],
          swipeType:'x',
          swipeDistance:50
      });


  // 加载头部导航标题
  tools.ajax('http://139.199.157.195:9090/api/getbaicaijiatitle',{},'baicainavTmp','#baicainav .nav-left ul');


  // 渲染导航对应商品列表
  // 默认渲染列表
  tools.ajax('http://139.199.157.195:9090/api/getbaicaijiaproduct',{titleid:0},'categoryTmp','#baicaicategory');




})