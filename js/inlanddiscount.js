$(function(){

  tools.ajax('http://139.199.157.195:9090/api/getinlanddiscount',{},'showTmp','#showprou ul');
  
  // $.ajax({
  //   // url: 'http://mmb.ittun.com/api/getinlanddiscount',
  //   url: 'http://139.199.157.195:9090/api/getinlanddiscount',
  //   success : function( data ){
  //       var html = template('showTmp',data);
  //       $('#showprou ul').html( html );
  //   }
  // })

  // 点击商品跳转详情
  // 点击商品推荐里的项目 实现跳转 (事件委托)
  $('#showprou ul').delegate('li a','click',function(){
        var code = this.dataset.id;
        location.href = 'inlanddiscountlist.html?productid='+code+'&';
        
  }) 
  
})