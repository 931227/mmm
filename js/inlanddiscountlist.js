$(function(){
  // 获取通过url地址传递的参数
  var url = window.location.href;
  var code = parseInt(url.slice(url.indexOf('=')+1));
  if( url.indexOf('&')!= -1 ){
    $.ajax({
      // url: 'http://mmb.ittun.com/api/getdiscountproduct',
      url: 'http://139.199.157.195:9090/api/getdiscountproduct',
      type: 'GET',
      dataType: 'json',
      data : {productid : code},
      success : function( data ) {
          var html1 = template('mainTmp',data);
          var html2 = template('comTmp',data);
          $('#discount').html( html1 );
          $('#comment').html( html2 );
          // 将内容标题赋值给浏览器
          document.title = $('#discount .title h2').text();
      }
    })
  } else{
    $.ajax({
      // url: 'http://mmb.ittun.com/api/getmoneyctrlproduct',
      url: 'http://139.199.157.195:9090/api/getmoneyctrlproduct',
      type: 'GET',
      dataType: 'json',
      data : {productid : code},
      success : function( data ) {
          var html1 = template('mainTmp',data);
          var html2 = template('comTmp',data);
          $('#discount').html( html1 );
          $('#comment').html( html2 );
          // 将内容标题赋值给浏览器
          document.title = $('#discount .title h2').text();
      }
    })
  }
  
  // 将左上角返回按钮设置为返回上一级
  $('#header  a').attr('href','inlanddiscount.html');

  // 点击发表评论
  $('#comment').delegate('.reply .form .ctrl .tjdp', 'click', function(event) {
    // 获取评论区内容
    var comment =  $(this).parent().siblings('textarea').val();
    // 获取现在时间
    var timenum = new Date().getTime();
    var time = formatDateTime(timenum);
    // 随机生成游客编号
    var serial  = timenum + parseInt(Math.random()*100);
    // 拼接评论结构到list里
    var str =
    '<li class="ui-border-b">' +
        '<div class="userimg"><img src="images/头像.png"></div>' +
        '<div class="con">' +
            '<div class="name clearfix">' +
                '<div class="username">游客'+serial+'</div>' +
                '<div class="time">'+time+'</div>' +
            '</div>' +
            '<div class="content">'+comment+'</div>' +
        '</div>' +
    '</li>' ;

    $(this).parent().parent().parent().siblings('.list').find('ul').prepend(str);


    //  将时间戳转换为可视时间
    function formatDateTime(inputTime) {    
        var date = new Date(inputTime);  
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    
        m = m < 10 ? ('0' + m) : m;    
        var d = date.getDate();    
        d = d < 10 ? ('0' + d) : d;    
        var h = date.getHours();  
        h = h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        var second = date.getSeconds();  
        minute = minute < 10 ? ('0' + minute) : minute;    
        second = second < 10 ? ('0' + second) : second;   
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
    };  

  });
})