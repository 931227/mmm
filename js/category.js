$(function(){
  // 渲染标题
  $.ajax({
    // url: 'http://mmb.ittun.com/api/getcategorytitle',
    url: 'http://139.199.157.195:9090/api/getcategorytitle',
    success : function( data ) {
      var html = template('titleTmp',data );
      $('#category .wrap').html( html );
    }
  })

  // 点击标题 渲染子界面分类商品
  $('#category .wrap').delegate('.item a', 'click', function(event) {
    // 首先获取标题id 用于参数传递
    var code = this.dataset.id ;
    var that = this;
    $.ajax({
      // url: 'http://mmb.ittun.com/api/getcategory',
      url: 'http://139.199.157.195:9090/api/getcategory',
      data: {titleid: code },
      success : function( data ){
        var html = template('cateTmp',data)
        $(that).siblings('ul').html(html);       
      }
    })   
  });
  
  // 点击标题展开相应分类商品
  $('#category ').on('click','.item a',function(){
    $(this).parent().siblings().find('ul').hide().end().end().end().siblings('ul').slideToggle();
  })

  // 点击分类列表中的项目 实现跳转 (事件委托)
  $('#category .wrap').delegate('.item .sub-wrap a','click',function(){
        // 获取 categoryid 的值
        var code = this.dataset.id;
        location.href = 'categorypagelist.html?productid='+code;
  }) 

})