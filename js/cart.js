
//判断是否应登录,登录则显示用户头像 用户名
if(window.localStorage.token){
	$(".login").html(`<a class="navbar-brand hidden-sm login" href="index.html"><span class='glyphicon glyphicon-user'></span></a>
					<a class="navbar-brand hidden-sm login" href="index.html" >${window.localStorage.username}</a>
			        <a class="navbar-brand hidden-sm ">|</a>
			        <a class="navbar-brand hidden-sm exit" href="javascript:;">退出登录</a>`)
}else{
	alert("亲还没有登录，请先登录再来哟~");
//	setTimeout(location.href="login.html",2000)
	location.href="login.html"
}
//退出登录则还原并清空本地存储
$(".exit").click(function(){
	$(".login").html(`<a class="navbar-brand hidden-sm login" href="login.html">登录</a>
			        <a class="navbar-brand hidden-sm ">|</a>
			        <a class="navbar-brand hidden-sm register" href="register.html">注册</a>
			    `)
	//清空本地存储
	window.localStorage.clear();
});

//点击用户名或头像跳回首页
//$(".login").click(function(){
//	console.log(11)
//})

//ajax请求页面中购物车数据并添加到页面
$.ajax({
	type: "GET",
	url: "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
	success: function(response) {
		console.log(response); 
		var html="";
		var price;
		for (var i = 0; i < response.data.length; i++) {
			var price=response.data[i].goods_price;
//			console.log(price);
			html+=`<ul>
						<li><input type="checkbox" goods_id="${response.data[i].goods_id}" name="" class="" value="" /></li>
						<li><img src="${response.data[i].goods_thumb}"/></li>
						<li><span>${response.data[i].goods_name}</span></li>
						<li><em >${response.data[i].goods_price}</em></li>
						<li><input type="number" min="1" name=""  goods_id="${response.data[i].goods_id}" class="inputNumber" value="${response.data[i].goods_number}" /></li>
						<li><em class="sum" goods_price="${response.data[i].goods_price}">${response.data[i].goods_price*response.data[i].goods_number}</em></li>
						<li><input type="button" name="" goods_id="${response.data[i].goods_id}" class="delete" value="删除" /></li>
					</ul>`;
		}
		$(".goods_List").html(html);
		
		//购物车删除操作==>ajax删除物品(批量绑定事件  闭包)
		$(".delete").click(function(){
			var goods_id=$(this).attr("goods_id");
			console.log(goods_id);
			
			//ajax删除
			changeCart(goods_id,0,localStorage.token,localStorage.user_id);
			//dom删除
			var selfParent=$(this).parent().parent();
//			console.log(selfParent);
			selfParent.css("display","none");
		})
		
		//数量失去焦点事件
		$(".inputNumber").blur(function(){
			//更新小计
			var price=$(this).parent().next().children().attr("goods_price");
//			console.log(price)
//			console.log($(this).val())
//			console.log(price*$(this).val())
			var $a=$(".inputNumber").parent().next().children().html($(this).val()*price);
//			console.log($a)
			//ajax更新购物车
			var goods_id=$(this).attr("goods_id");
			changeCart(goods_id,$(this).val(),localStorage.token,localStorage.user_id);
			
		})
		
		//
	}
});

//ajax更新购物车  number=0 即为删除 
function changeCart(goods_id,number,token,user_id){
//	console.log(goods_id);
	console.log(token);
	$.ajax({
				type:"POST",
				url:"http://h6.duchengjiu.top/shop/api_cart.php?token="+token,
				data:{
					"goods_id":goods_id,
					"number":number,
				},
				success:function(response){
					console.log(response);
				}
	});
}




//选择删除选择的商品
$(".remove").click(function(){
//	获取所有勾选的商品
	var goodsInput=$(".goods_List ul li input:checked");
	console.log(goodsInput)
	var goods_id=goodsInput.attr("goods_id");
//	console.log(goods_id);
	for (var i = 0; i < goodsInput.length; i++) {
		goods_id=goodsInput.eq(i).attr("goods_id") ;
		console.log(goods_id);//报错
		//ajax删除
		changeCart(goods_id,0,localStorage.token,localStorage.user_id);
	}
	
	//dom删除
	var $chooseUl=$(".goods_List ul li input:checked").parent().parent();
//	console.log(chooseUl)
    $chooseUl.css("display","none")
})

//全选按钮事件
$(".goodsUl li input").blur(function(){
	if($(".goodsUl li input:checked")){
		console.log(66)
	}
})
	
