
$(function() { 
    $('#submit').bind('click', function() { 
  
        //var formData = $('#ajaxForm').serialize(); 
        //.serialize() ���������Ա�׼ URL �����ʾ���ı��ַ��� 
        
        var username_js=$("#username").val();
        var password_js=$("#password").val();    
        if(username_js==""){
            alert("�û�������Ϊ��");
            return false;
        }
        if(password_js==""){
            alert("���벻��Ϊ��");
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
    //data = $.trim(data); //ȥ��ǰ��ո� 
   // $('#notification').text(json.username); 
    
   if(data.username=='true_u'&&data.password=='true_p'){
          //alert(json.username+"|"+username+'...1');
           window.location="pageone.html";
    }
     if(data.username=='error_u'||data.password=='error_p'){
           alert("�û����������������������������µ�½!");
           window.location="index.html";
    }
    //window.location = "pageone.html";
} 
  
function onError(XMLHttpRequest, textStatus, errorThrown){ 
    //���д����� 
    alert(XMLHttpRequest.status);
    alert(XMLHttpRequest.readyState);
    alert(textStatus);
}