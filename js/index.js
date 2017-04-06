
 $(function(){
    // 菜单栏动态渲染

    $.ajax({  
      url: 'http://139.199.157.195:9090/api/getindexmenu',
      // url: 'http://mmb.ittun.com/api/getindexmenu',
      type: 'GET',
      dataType: 'json',
      success : function( data ){
          var html = template('menuTmp',data);
          $('#menu .row').html( html );
          $('#menu .row .col-xs-3:nth-last-child(1)').attr('href','brands.html');
          // 点击更多加载剩余菜单
          $('#menu .row .col-xs-3:nth-child(8)').on('click',function(){
            $('#menu .row .col-xs-3:nth-last-child(-n+4)').slideToggle();
          })
      }
    })

  // 商品推荐动态渲染

     $.ajax({  
      url: 'http://139.199.157.195:9090/api/getmoneyctrl',
      // url: 'http://mmb.ittun.com/api/getmoneyctrl',
      type: 'GET',
      dataType: 'json',
      success : function( data ){
          var html = template('mainTmp',data);
          $('#recommend .main').html( html );
      }
    })
     // 调用外部函数
     // 注意 不能放在success回调函数里执行 会报错
      template.helper('getNum1',getNum);
      function getNum(str) {
            return str.replace(/[^0-9]/ig,'')
      }

      // 点击商品推荐里的项目 实现跳转 (事件委托)
      $('#recommend .main').delegate('.media','click',function(){
            var code = this.dataset.id;
            location.href = 'inlanddiscountlist.html?productid='+code;
      }) 

      // 点击查历史价跳转相应界面
      $('#menu .row').delegate('.col-xs-3:nth-child(7)', 'click', function(event) {
          location.href = 'history.html';
          // 禁止a链接跳转
          return false;
      });
 })




