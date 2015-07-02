
$(function() { 
    $('#submit').bind('click', function() { 
  
        //var formData = $('#ajaxForm').serialize(); 
        //.serialize() 方法创建以标准 URL 编码表示的文本字符串 
        
        var username_js=$("#username").val();
        var password_js=$("#password").val();    
        if(username_js==""){
            alert("用户名不能为空");
            return false;
        }
        if(password_js==""){
            alert("密码不能为空");
            return false;
        }
       
        var DAT="&username="+username_js+"&password="+password_js;
            
       
        $.ajax({ 
            type : "POST", 
           // url  : "https://192.16.200.109/form.php?",  
            url  : "https://localhost/form.php?",  
            cache : false, 
            data : DAT,
            dataType: "json", 
            success : onSuccess, 
            error : onError 
        }); 
        return false; 
    }); 
}); 
  
function onSuccess(data,status){ 
    //data = $.trim(data); //去掉前后空格 
   // $('#notification').text(json.username); 
    
   if(data.username=='true_u'&&data.password=='true_p'){
          //alert(json.username+"|"+username+'...1');
           window.location="pageone.html";
    }
     if(data.username=='error_u'||data.password=='error_p'){
           alert("用户名输入或密码输入有误，请检查后重新登陆!");
           window.location="index.html";
    }
    //window.location = "pageone.html";
} 
  
function onError(XMLHttpRequest, textStatus, errorThrown){ 
    //进行错误处理 
    alert(XMLHttpRequest.status);
    alert(XMLHttpRequest.readyState);
    alert(textStatus);
}