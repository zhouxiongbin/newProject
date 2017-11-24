$.ajax({
	"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.getItem("token"),
	"type": "get",
	"dataType": "json",
	"success": function(response) {

		if(response.data.length > 0) {
		var html = '';
			for(var i = 0; i < response.data.length; i++) {
				var obj = response.data[i];

				//ex6的反引符 部分浏览器不支持，查看兼容，这里没有做任何的兼容处理
				 html = `<tr class = "orbTd">
										<td><img src="${obj.goods_thumb}"/></td>
										<td>${obj.goods_name}</td>
										<td>${obj.goods_price}</td>
										<td>${obj.goods_number}</td>
										<td>${obj.goods_price * obj.goods_number}</td>
									</tr>`;

				$("#ordT").append(html);

			}
		}

	}

})

$.ajax({
	"url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token,
	"type": "GET",
	"dataType": "json",
	"success": function(response) {
		//请求成功
		console.log(response);
		if(response.code === 0) {

			var htmlData = '';
			for(var i = 0; i < response.data.length; i++) {
				var obj = response.data[i];

				htmlData += '<tr class="orbItem" data-id="' + obj.address_id + '"><td>' +
					obj.address_name +
					'</td><td>' + obj.province +
					'</td><td>' + obj.city +
					'</td><td>' + obj.district +
					'</td><td>' + obj.address +
					'</td><td>' + obj.mobile +
					'</td><td><span class="remove">删除</span></td></tr>'
			}
			$("#ordTr").append(htmlData);

			$(".orbItem").click(function(event) {
				$(this).addClass("active").siblings().removeClass("active");
				if(event.target) {
					address_id = this.getAttribute("data-id");
					console.log(address_id);
					//					console.log()
					$("#orbRmb").html($(this).find("td:first-child")[0].innerText + "; ");
					$("#orbRmb").append("电话：" + $(this).find("td:nth-child(6)")[0].innerText);

					$("#orbChe").html($(this).find("td:nth-child(2)")[0].innerText + '-');
					$("#orbChe").append($(this).find("td:nth-child(3)")[0].innerText + '-');
					$("#orbChe").append($(this).find("td:nth-child(4)")[0].innerText + '-');
					$("#orbChe").append($(this).find("td:nth-child(5)")[0].innerText);

				}
			})

			$(".remove").click(function(event) {

				console.log(this.parentNode.parentNode);
				var remmoveLi = this.parentNode.parentNode;
				remmoveLi.parentNode.removeChild(remmoveLi);

				var obj = remmoveLi
				console.log($(obj).attr("data-id"));
				var address_id = $(obj).attr("data-id");

				$.ajax({
					"url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token + "&status=delete&address_id=" + address_id,
					"type": "GET",
					"dataType": "json",
					//					"success": function(response){
					////						console.log(response);
					//					}
				});

			})

		}
	}
})

setTimeout(function() {
	var aa = 0;
	for(var i = 0; i < $(".orbTd td:last-child").length; i++) {
		//		console.log( $(".orbTd td:last-child").eq(i))
		var a = parseFloat($(".orbTd td:last-child").eq(i)[0].textContent)
		aa += a;
		//		console.log(a)
	}
	$("#orbM").html(aa)
}, 500)

$("#orbNewBtnBtn").click(function() {
	//这是往地址里加入
//	console.log(1)
	var data = {
		"address_name":$(".ipt").eq(0).val(),
		"mobile":$(".ipt").eq(1).val(),
		"province":$(".ipt").eq(2).val(),
		"city":$(".ipt").eq(3).val(),
		"district":$(".ipt").eq(4).val(),
		"address":$(".ipt").eq(5).val()
	}
	$.ajax({

		"url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token + "&status=add",
		"type": "POST",
		"dataType": "json",
		"data": data,
		"success": function(response) {

			if(response.code === 0) {
				window.location.href="order.html"
//				addressAjax();
			}

		}

	})

})

$("#orbBtnD").click(function() {
	//这是往订单里注入信息
	$.ajax({

	})
})