$(function(){
  // 初始内容渲染
  var shopid = 0;
  var areaid = 0;
  render(shopid,areaid);

  // 店铺模块渲染
  var flag1 = true; // 只在第一次点击时渲染
  var flag2 = true;
  $('#filter .left .shop').on('click',function(){
    if( flag1 ){
        $.ajax({
        // url: 'http://mmb.ittun.com/api/getgsshop',
        url: 'http://139.199.157.195:9090/api/getgsshop',
        success : function( data ){
            var html = template('rendTmp1',data);
            $('#rend-area .one').html( html );
            flag1 = false;
        }
      })
    } 
     // 控制下方区域展开
     $('#rend-area .one').siblings().hide().end().slideToggle();
     // 控制箭头指向
     $(this).find('i').parent().siblings().find('i').removeClass('icon-xia').end().end().end().toggleClass('icon-xia');
     // 点击子菜单 所选条目处于选中状态 且同步到头部
    $('#rend-area .one').on('click','li',function(){
        // 控制右边对号的显示 排他原则
        $(this).find('i').parent().siblings().find('i').hide().end().end().end().show();
        // 获取选中项的id 并执行渲染
        shopid = $(this).find('a')[0].dataset.id;
        console.log(shopid);
        render(shopid,areaid);
        // 隐藏筛选区域
        $(this).parents('ul').hide();
        // 将选中元素的值给头部
        var str = $(this).find('a').text();
        $('#filter .left .shop span').text(str);
    })
   })


  // 区域模块渲染
    $('#filter .left .area').on('click',function(){
        if( flag2 ){
          $.ajax({
            // url: 'http://mmb.ittun.com/api/getgsshoparea',
            url: 'http://139.199.157.195:9090/api/getgsshoparea',
            success : function( data ){
                var html = template('rendTmp2',data);
                $('#rend-area .two').html( html );
                flag2 = false;
            }
          })
        }
        // 控制下方区域展开
        $('#rend-area .two').siblings().hide().end().slideToggle();
        // 控制箭头指向
        $(this).find('i').parent().siblings().find('i').removeClass('icon-xia').end().end().end().toggleClass('icon-xia');
         // 点击子菜单 所选条目处于选中状态 且同步到头部
        $('#rend-area .two').on('click','li',function(){
              // 控制右边对号的显示 排他原则
              $(this).find('i').parent().siblings().find('i').hide().end().end().end().show();
              // 获取选中项的id 并执行渲染
              areaid = $(this).find('a')[0].dataset.id;

              render(shopid,areaid);
              // 隐藏筛选区域
              $(this).parents('ul').hide();
              // 将选中元素的值给头部
              var str = $(this).find('a').text();
              str = str.slice(0,2);
              $('#filter .left .area span').text(str);
        })
  })



    // 价格模块渲染
    $('#filter .left .price').on('click',function(){
      // 控制下方区域展开
      $('#rend-area .three').siblings().hide().end().slideToggle();
      // 控制箭头指向
      $(this).find('i').parent().siblings().find('i').removeClass('icon-xia').end().end().end().toggleClass('icon-xia');
       // 点击子菜单 所选条目处于选中状态 且同步到头部
      $('#rend-area .three').on('click','li',function(){
        // 控制右边对号的显示 排他原则
        $(this).find('i').parent().siblings().find('i').hide().end().end().end().show();
        // 将选中元素的值给头部
        var str = $(this).find('a').text();
        $('#filter .left .price span').text(str);
        // 隐藏筛选区域
        $(this).parents('ul').hide();
      })
    })

    // 渲染引擎
   function render(shopid,areaid){
    shopid = shopid || 0;
    areaid = areaid || 0;
    $.ajax({
      // url: 'http://mmb.ittun.com/api/getgsproduct?',
      url: 'http://139.199.157.195:9090/api/getgsproduct',
      data: {shopid: shopid,areaid :areaid},
      success : function( data ){
          var html = template('productTmp',data );
          $('#showproducts ul').html( html );
      }
    })
   }

   // 点击搜索弹出隐藏筛选器
   $('#filter .search').on('click',function(){
    $('#search-filter').slideToggle();
   })

   // 点击筛选器按钮切换选中状态
  $('#search-filter .sort span').on('click',function(){
    $(this).siblings().removeClass('on').end().toggleClass('on');
  })


})