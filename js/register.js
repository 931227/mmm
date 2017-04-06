$(function(){
  // 点击图片验证码切换
  var url = $('#register form .security-code img').attr('src');
  $('#register form .security-code img').on('click',function(){
    var num = Math.random()*10;
    $(this).attr('src',url+'?'+num+'');  
  })

  // 用户名判断
  $('#register form .username').on('blur',function(){
    isNull('#register form .username','#register form .user-tips');
  });
  

  // 密码判断
  $('#register form .password').on('blur',function(){
        isNull('#register form .password','#register form .pw1-tips');
        isIegal();
  });

  // 密码确认
   $('#register form .comfirm').on('blur',function(){
        confirm();
        isNull('#register form .password','#register form .pw2-tips');
   })




  //  判断是否为空
  function isNull(el,target){    
      var str = $(el).val().trim();   
      if(str.length==0){ 
          $(target).css('color','rgb(204,51,0)');   
          $(target).html('输入不能为空或是空格！');
      }    
  }
  // 密码规则判断
  function isIegal() {
     var password = $('#register form .password').val();
     var regs = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
     if( password.length < 6 || password.length > 20 || regs.test(password) ) {
        $('#register form .pw1-tips').css('color','rgb(204,51,0)');
        $('#register form .pw1-tips').html('密码不符合要求，请重新输入');
     }else {
        $('#register form .pw1-tips').css('color','green');
        $('#register form .pw1-tips').html('输入符合要求，在下方确认密码');
     }
  }

  // 密码确认
  function confirm() {
     var password1 = $('#register form .password').val();
     var password2 = $('#register form .comfirm').val();
     if( password1 != password2 ) {
        $('#register form .pw2-tips').css('color','rgb(204,51,0)');
        $('#register form .pw2-tips').html('密码不一致，请重新输入');
        $('#register form .comfirm').val('');
     } else {
        $('#register form .pw2-tips').css('color','green');
        $('#register form .pw2-tips').html('输入正确');
     }

  }
})