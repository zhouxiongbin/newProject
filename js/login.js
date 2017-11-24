if(localStorage.getItem("token")) {
	alert(localStorage.getItem("username") + "您已经登录成功了！")

	setTimeout(function() {
		location.href = "../index.html";
	}, 2000);
}


$("#lonBtn").click(function(){
				
				
				
				var username = $('#exampleInputEmail1').val();
				var password = $('#exampleInputPassword1').val();
				
				console.log(username,password);
				
				$.ajax({
					"url":"http://h6.duchengjiu.top/shop/api_user.php",
					"type":"POST",
					"dataType": "json",
					"data": {
						"status": "login",
						"username": username,
						"password": password
					},
					"success": function(response){
						console.log(response);
						
						
						if(response.code === 0){
							
							var data = response.data;
							
							for( property in data){
								
								if(data.hasOwnProperty(property)){
									localStorage.setItem(property,data[property]);
								}
								
								
							}
							
							alert(response.message);
							
							var callbackURL = location.hash.substr(10);
							
							
							if( callbackURL ){
								window.location.href = callbackURL;
							}else{
								window.location.href = "../index.html";
							}
							
						}
					}
				});
			})
