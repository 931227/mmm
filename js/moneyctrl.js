$(function(){

  // 页面初始渲染 
  var pageid = 1;
  render(pageid);
  // 优惠商品动态渲染引擎
  function render( pageid ){
    // pageid = pageid || 0;
     $.ajax({  
      url: 'http://139.199.157.195:9090/api/getmoneyctrl',
      // url: 'http://mmb.ittun.com/api/getmoneyctrl',
      data : {pageid:pageid},
      success : function( data ){
          var html = template('privilegeTmp',data);
          $('#privilege').html( html );
          // 动态生成页签
          pages = Math.ceil( data.totalCount / data.pagesize );
          var html1 = '';
          for( var i = 0 ; i < pages ; i++ ) {
            html1 += '<li>'+(i+1)+'/'+pages+'</li>';
          }
          $('#paging .selector').html( html1 );
      }
    })
  }
     // 模板调用外部函数
     // 注意 不能放在success回调函数里执行 会报错
      template.helper('getNum1',getNum);
      function getNum(str) {
            return str.replace(/[^0-9]/ig,'')
    }

    // 底部切换效果实现
    // 1 左右键点击切换
    $('#paging .up').on('click',function(){
      // 获取中间按钮值
      var str = $('#paging .page').html().trim();
      var index = str.slice(0,str.indexOf('/'));
       index--;
       index = index <= 1 ?  1 : index ; 
      // 将改变的值赋值给中间框
      $('#paging .page').html(index+'/'+pages+'');
        pageid = index;
        render(pageid);
        //  改变按钮颜色
      if( index == 1 ) {
        $('#paging .up').addClass('forbit');
      } else {
         $('#paging .down').removeClass('forbit');
      }
    })


    $('#paging .down').on('click',function(){
      var str = $('#paging .page').html().trim();
      var index = str.slice(0,str.indexOf('/'));
      index++;
      index = index >= pages ? pages : index;
      // 将改变的值赋值给中间框
      $('#paging .page').html(index+'/'+pages+'');
      pageid = index;
      render(pageid);
      //  改变按钮颜色
      if( index == pages ) {
        $('#paging .down').addClass('forbit');
      } else {
         $('#paging .up').removeClass('forbit');
      }
    })

    // 2 中间按钮点击弹出隐藏
    $('#paging .page').on('click',function(){
        $('#paging .selector').toggle();
    })

    // 3 中间筛选切换
    $('#paging .selector').on('click','li',function(){
      // 3.1 选中li给中间框赋值
      $('#paging .page').html( $(this).text() );
      // 3.2 给渲染引擎传递参数并跳转
      var str = $(this).text().trim();
      var index = str.slice(0,str.indexOf('/'));
      pageid = index;
      render(pageid);
      // 3.3 隐藏弹出框
      $(this).parent().hide();
    })

     // 点击商品推荐里的项目 实现跳转 (事件委托)
     $('#privilege').delegate('.media','click',function(){
           var code = this.dataset.id;
           location.href = 'inlanddiscountlist.html?productid='+code;
     }) 

})