// 品牌排行内容渲染
$.ajax({
  url: 'http://139.199.157.195:9090/api/getbrandtitle',
  // url: 'http://mmb.ittun.com/api/getbrandtitle',
  type: 'GET',
  dataType: 'json',
  success : function( data ){
    var html = template('rankTmp',data);
    $('#rank').html( html );
    $('#rank .list-group .list-group-item').on('click',getResourse)
  }
})


function getResourse(){
  // 获取当前点击的具体条目
    var result = getName($(this).find('a').html());

  // 二级页面第一部分渲染
    var $index = this.children[0].dataset.id;
    $.ajax({
      url: 'http://139.199.157.195:9090/api/getbrand',
      // url: 'http://mmb.ittun.com/api/getbrand',
      type: 'GET',
      dataType: 'json',
      data: {brandtitleid: $index},
      success : function( data ){
           html = template('oneTmp',data);          
      }
    })
    
    // 二级页面第二部分渲染
    $.ajax({
      url: 'http://139.199.157.195:9090/api/getbrandproductlist',
      // url: 'http://mmb.ittun.com/api/getbrandproductlist',
      type: 'GET',
      dataType: 'json',
      data: {brandtitleid: $index},
      success : function( data ){
          html += template('twoTmp',data);
      }
    })
    // 二级页面第三部分渲染
    $.ajax({
      url: 'http://139.199.157.195:9090/api/getproductcom',
      // url: 'http://mmb.ittun.com/api/getproductcom',
      type: 'GET',
      dataType: 'json',
      data: {productid : 1},
      success : function( data ){
          html += template('threeTmp',data);
          $('#rank').html( html );

          // 增加每部分标题
          $('#rank .one h3').html(result+'那个牌子好');
          $('#rank .two h3').html(result+'产品销量排行');
          $('#rank .three h3').html(result+'最新评论');


          // 增加面包屑导航条目
          $('#nav .breadcrumb').append('<li><a href="#">'+$('#rank .one h3').html() +'</a></li>');
          
      }
    })
    
    // 定义方法  截取字符串
    function getName( str ) {
      return str.slice(0,str.indexOf('十'));
    }

    // 点击第一部分每个条目跳转到对应分类页面
    $('#rank').on('click','.one ul li',function(){
      var code = this.dataset.id;
      location.href = 'categorypagelist.html?productid='+code;
    })

    // 点击第二部分每个条目跳转到对应商品详情页面
     $('#rank').on('click','.two .media',function(){
      var code = this.dataset.id;
      location.href = 'categorypagelist.html?productid='+code;
    })
    
}


