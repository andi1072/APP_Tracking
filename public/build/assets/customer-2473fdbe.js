import{s as l}from"./sweetalert.min-9dab74b7.js";import"./_commonjsHelpers-725317a4.js";const n=window.burl;$("#formCustomer").submit(function(s){s.preventDefault();var o=$("input[name=_backurl]").val(),a=$("input[name=_id]").val(),i=$("input[name=_isEdit]").val(),t=new FormData;t.append("_id",a),t.append("_token",$("input[name=_token]").val()),t.append("selstatus",$("select[name=selstatus]").val()),t.append("txtemail",$("input[name=txtemail]").val()),t.append("txtfirstname",$("input[name=txtfirstname]").val()),t.append("txtlastname",$("input[name=txtlastname]").val()),t.append("txttelephone",$("input[name=txttelephone]").val()),t.append("txtaddress",$("textarea[name=txtaddress]").val()),t.append("txtpassword",$("input[name=txtpassword]").val()),t.append("_isEdit",i),$.ajax({type:"POST",url:n+"/customer/js/addedit",data:t,dataType:"json",contentType:!1,cache:!1,processData:!1,beforeSend:function(){$("#formCustomer").css("opacity",".5")},success:function(e){console.log(e),$("#formCustomer").css("opacity","");var p=e.msg;p.code===200?l({title:"Success",text:"Continue editing?",icon:"success",buttons:["No, take me back!","Yes, continue editing!!"]}).then(r=>{r?window.location.href=n+"/customer/d/"+a:window.location.href=o}):toastr.error(e.msg.obj,"Error")}})});
