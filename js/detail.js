//判断是否应登录,登录则显示用户头像 用户名
if(window.localStorage.token){
	$(".login").html(`<a class="navbar-brand hidden-sm login" href="index.html"><span class='glyphicon glyphicon-user'></span></a>
					<a class="navbar-brand hidden-sm login" href="index.html" >${window.localStorage.username}</a>
			        <a class="navbar-brand hidden-sm ">|</a>
			        <a class="navbar-brand hidden-sm exit" href="javascript:;">退出登录</a>`)
}
//退出登录则还原并清空本地存储
$(".exit").click(function(){
	$(".login").html(`<a class="navbar-brand hidden-sm login" href="login.html">登录</a>
			        <a class="navbar-brand hidden-sm ">|</a>
			        <a class="navbar-brand hidden-sm register" href="register.html">注册</a>
			    `)
	//清空本地存储
	window.localStorage.clear();
})

//获取商品详情
var reception=location.search.substr(1);
var str=reception.split("=");
var goods_id=str[1];
console.log(goods_id);
getDetail(goods_id)
//获取商品详情函数
function getDetail(goods_id){
	$.ajax({
		type:"GET",
		url:"http://h6.duchengjiu.top/shop/api_goods.php",
		data:{
			"goods_id":goods_id,
		},
		success:function(response){
			console.log(response)
			var html="";
			for (var i=0;i< response.data.length;i++) {
				//只显示一件商品
				html=`<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 no">
				      <img src="${ response.data[i].goods_thumb }" alt="...">
				      <div class="caption">
				        <h4><a href="detail.html?goods_id=${response.data[i].goods_id}">${ response.data[i].goods_name }</a></h3>
				        <p>${ response.data[i].goods_desc }</p>
				        <p><span>惊喜价</span>￥<span>${ response.data[i].price }</span>元</p>
				        <p><a href="javascript:;" class="btn btn-default" role="button">加入购物车</a></p>
				      </div>
				    </div>`;
			}
			$("#goodsList").html(html)
		}
	})
	
}
