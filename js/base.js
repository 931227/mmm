/*
* @Author: Administrator
* @Date:   2017-04-02 11:36:18
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-02 11:53:13
*/

'use strict';
// 定义统一的渲染引擎
var tools = {};
$(function(){
  // a 表示url地址 obj 表示参数对象 b模板id c 需要渲染的容器
  tools.ajax = function(a,obj,b,c){
    $.ajax({
      url: a,
      data: obj,
      success : function(data){
          var html = template(b,data);
          $(c).html(html);
      }
    })
  }
})