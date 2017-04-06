/*
* @Author: Administrator
* @Date:   2017-03-30 10:47:30
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-02 15:51:31
*/

'use strict';
// 优惠券区域渲染
$(function(){
  $.ajax({
    url: 'http://139.199.157.195:9090/api/getcoupon',
    // url: 'http://mmb.ittun.com/api/getcoupon',
    type: 'GET',
    dataType: 'json',
    success : function( data ) {
      var html = template('couponTmp',data );
      $('#coupon').html( html );
      $('#coupon .row .col-xs-4 .thumbnail').on('click',getCoupon);
    }
  })

  function getCoupon() {
        // 渲染二级页面
      // 拿到自定义属性
      var $couponid = this.dataset.id;
      $.ajax({
        url: 'http://139.199.157.195:9090/api/getcouponproduct',
        // url: 'http://mmb.ittun.com/api/getcouponproduct',
        type: 'GET',
        dataType: 'json',
        data : {couponid:$couponid},
        success : function( data ){
            var html = template('subTmp',data );
            $('#coupon').html( html );
            $('#coupon .subPage .media').on('click',function(){
              // 禁止拖动
              $(document.body).css('overflow','hidden');
              var that = this;
              // 遮罩区域展开以及图片渲染
              var src = $(this).children().children().attr('src');
              $('#mask img').attr('src',src);
              $('#mask').fadeIn('slow');

              // 获取此页面所有图片
              var imgs = [];
              $.each($('#coupon .subPage .media'),function(index, el) {
                 var src = $(el).find("img").attr('src');
                  imgs.push( src );
              });

              // 获取点击时对应的index值
              var index ;
              for( var i = 0; i < imgs.length ;i++ ) {
                if( imgs[i] === src ){
                  index = i ;
                }
              }

              // 点击箭头切换图片
              $('#mask .icon-zuo').on('click',function(){
                  index--;
                 $('#mask img').attr('src',imgs[index]);
                 return false;
              })   

              $('#mask .icon-xiangyou').on('click',function(){
                  index++;
                  $('#mask img').attr('src',imgs[index]);
                 return false;
              })   


            
            })
        }  
      })
        // 导航头部更新 以及 面包屑导航更新
      var str = $('#header h1').html();
      str = this.children[0].getAttribute('alt') + str;
      $('#header  a').attr('href','coupon.html');
      $('#header h1').html( str );
      $('#nav .breadcrumb').append('<li><a href="#">'+ str +'</a></li>')
  }
      // 点击空白区域隐藏遮罩
      $('#mask').on('click',function(){
        this.style.display = 'none';
        $(document.body).css('overflow','auto');
      })

      

})