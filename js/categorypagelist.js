$(function(){
  var code2 = 1,
      flag = true;
  // 获取通过url地址传递的参数
  var url = window.location.href;
  var code1 = parseInt(url.slice(url.indexOf('=')+1));

  // 从外部获取categoryid 初始渲染页面
  renderpage(code1);   


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
      code2 = index;
    renderpage(code1,code2);
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
    code2 = index;
    renderpage(code1,code2);
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
    var code2 = str.slice(0,str.indexOf('/'));
    renderpage(code1,code2);
    // 3.3 隐藏弹出框
    $(this).parent().hide();
  })


  function renderpage( code1,code2 ) {
      $.ajax({
            // url: 'http://mmb.ittun.com/api/getproductlist',
            url: 'http://139.199.157.195:9090/api/getproductlist',
            type: 'GET',
            dataType: 'json',
            data : {categoryid : code1 ,pageid : code2 },
            success : function( data ) {
                var html = template('catepageTmp',data);
                $('#catepage').html( html );
                // 动态生成页签
                pages = Math.ceil( data.totalCount / data.pagesize );
                var html1 = '';
                for( var i = 0 ; i < pages ; i++ ) {
                  html1 += '<li>'+(i+1)+'/'+pages+'</li>';
                }
                $('#paging .selector').html( html1 );
                // 初始化页签
                if( flag ) {
                  $('#paging .page').html( '1/'+pages+'');
                  flag = false;
                }
            }
          })
        } 

        // 渲染面包屑
        $.ajax({
          // url: 'http://mmb.ittun.com/api/getcategorybyid',
          url: 'http://139.199.157.195:9090/api/getcategorybyid',
          data: {categoryid: code1},
          success : function( data ){
            var str = template('breadTmp',data);
            $('#nav .breadcrumb').append( str ); 
          }
        })

        // 点击指定图片跳转对应详情页
        $('#catepage').on('click','.media',function(){
            var code = this.dataset.id;
            $.ajax({
              // url: 'http://mmb.ittun.com/api/getproduct',
              url: 'http://139.199.157.195:9090/api/getproduct',
              data: {productid: code},
              success:function( data ) {
                var html = template('overviewTmp',data);
                // 渲染之前要将其父元素即分类列表页面以及页签元素隐藏
                $('#catepage').hide();
                $('#paging').hide();
                // 执行渲染
                $('#productdetail').prepend(html);
                // 面包屑中增加条目
                // var info = data.result[0].productName.slice(0,10);
                var info = data.result[0].productName.replace(/[ ][\s\S]*/i,'');
                var str = '<li><a href="#">'+info+'</a></li>';
                $('#nav .breadcrumb').append( str );
                // 渲染比价购买部分
                $.ajax({
                  // url: 'http://mmb.ittun.com/api/getsitenav',
                  url: 'http://139.199.157.195:9090/api/getsitenav',
                  success : function( data ) {
                    var html = template('mallTmp',data);
                    $('#productdetail .showdetail').html( html );
                  }
                })
                // 渲染评论部分 
                $.ajax({
                  // url: 'http://mmb.ittun.com/api/getproductcom',
                  url: 'http://139.199.157.195:9090/api/getproductcom',
                  data: {productid:code},
                  success : function( data ) {
                    // $('#productdetail .comment').css('display',none);
                    $('#productdetail .comment').toggle();
                    var html = template('commentTmp',data);
                    $('#productdetail .comment').html( html );
                  }
                })
              }
            })  
        })

        // parameter模块点击切换
        $('#productdetail').on('click','.parameter li a',function(){
          $(this).parent().siblings('li').find('a').removeClass('on').end().end().end().toggleClass('on');
        })

        //  比价购买  产品参数  优选评论 模块切换


        // 点击比价购买切换显示隐藏
        $('#productdetail').on('click','.parameter li:nth-child(1) a',function(){
          $('#productdetail .showdetail').slideDown();
          $('#productdetail .comment').hide();
          $('#productdetail .brief').hide();
        })


        // 点击产品参数 隐藏其余两个部分
        $('#productdetail').on('click','.parameter li:nth-child(2) a',function(){
          $('#productdetail .showdetail').hide();
          $('#productdetail .comment').hide();
          $('#productdetail .brief').slideDown();
        })


        // 点击评论 渲染评论模板 并隐藏比价购买部分
        $('#productdetail').on('click','.parameter li:nth-child(3) a',function(){
          $('#productdetail .showdetail').hide();
          $('#productdetail .comment').slideDown();
          $('#productdetail .brief').hide(); 
        })

        

        

        
        
})