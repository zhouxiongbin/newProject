$("#serMar").click(function() {
	if($("#serMar").is(':checked')) {
		$("#serBtn").removeAttr("disabled");
	}
	if(!$("#serMar").is(':checked')) {
		$('#serBtn').attr("disabled", "disabled");
	}
})

$("#exampleInputEmail1").blur(function() {
	var username = $("#exampleInputEmail1").val();

	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_user.php",
		"type": "POST",
		"dataType": "json",
		"data": {
			"status": "check",
			"username": username
		},
		"success": function(response) {
			console.log(response.message);

			if(response.code === 0) {
				$("#regNameOK").text(response.message);
			} else {
				$("#regNameOK").text(response.message);
			}
		}
	});
})

$("#serBtn").click(function() {

			var username = $('#exampleInputEmail1').val();
			var password = $('#exampleInputPassword1').val();

			if(password.length < 6 || password.length > 20) {

				alert("密码长度应该是6-20位之内！");
				return;
			}

			$.ajax({
				"url": "http://h6.duchengjiu.top/shop/api_user.php",
				"type": "POST",
				"dataType": "json",
				"data": {
					"status": "register",
					"username": username,
					"password": password
				},
				"success": function(response) {
					console.log(response);

					if(response.code === 0) {
						alert(response.message);
						window.location.href = "login.html";
					}
				}
			}
			);
		})
var o=2;
setInterval(function() {
	if (o==6) {
		o=1;
	}
	//url(../images/1.1.jpg)
	$("body").css({"background-image" : 'url("images/1.'+ o +'.jpg")'});
	o++;
},3000)
