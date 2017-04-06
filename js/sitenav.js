// 品牌缩略图加载
$(function(){
  $.ajax({
    // url: 'http://mmb.ittun.com/api/getsitenav',
    url: 'http://139.199.157.195:9090/api/getsitenav',
    type: 'GET',
    dataType: 'json',
    success : function( data ){
      var html = template('siteTmp',data );
      $('#site').html( html );
    }
  })
  
  
})