//定义全局变量用于返回时调用
//var catId;
//登录名有与否测试  在没有登录注册页面时使用
//putin();
function putin(){
	localStorage.token="ae769233dfd3f6816210788d9459e892";
	localStorage.username="wym123";
}


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


//判断是否应登录,登录则显示用户头像 用户名
if(window.localStorage.token){
	$(".login").html(`<a class="navbar-brand hidden-sm login" href="javascript:;" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'navbar-首页'])"><span class='glyphicon glyphicon-user'></span></a>
					<a class="navbar-brand hidden-sm login" href="javascript:;" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'navbar-首页'])">${window.localStorage.username}</a>
			        <a class="navbar-brand hidden-sm " onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'navbar-首页'])">|</a>
			        <a class="navbar-brand hidden-sm exit" href="javascript:;" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'navbar-首页'])">退出登录</a>`)
}
//退出登录则还原并清空本地存储
$(".exit").click(function(){
	$(".login").html(`<a class="navbar-brand hidden-sm login" href="login.html" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'navbar-首页'])">登录</a>
			        <a class="navbar-brand hidden-sm " onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'navbar-首页'])">|</a>
			        <a class="navbar-brand hidden-sm register" href="register.html" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'navbar-首页'])">注册</a>
			    `)
	//清空本地存储
	window.localStorage.clear();
})

//初始化展示文具
ajaxGetList(62);

//获取主页跳转过来并传递的cat_id值
var reception=location.search.substr(1);
var str=reception.split("=");
var cat_id=str[1];
//console.log(cat_id);

ajaxGetList(cat_id)



//获取商品分类名称
$.ajax({
	type: "get",
	url: "http://h6.duchengjiu.top/shop/api_cat.php",
	success: function(response) {
//		console.log(response);
		var html="";
		for(var i = 0; i < response.data.length; i++) {
			html+=`<li><a href="#"  class="listBtn" cat_id=" ${response.data[i].cat_id} ">${response.data[i].cat_name }</a></li>`;
//			console.log(response.data[i].cat_id)
		}
		$("#navUl").html(html);
		$(".listBtn").click(function(e){
//			console.log(111)
 			e.preventDefault();
 			var cat_id=$(this).attr("cat_id");
			console.log(cat_id)
			ajaxGetList(cat_id);
		})
	}
});

//获取商品函数
function ajaxGetList(cat_id){
	$.ajax({
		type:"GET",
		url:"http://h6.duchengjiu.top/shop/api_goods.php",
		data:{
			'cat_id':cat_id,
			'pagesize':100
		},
		success:function(response){
//			console.log(response)
			//获取商品并呈现在页面上
			var html="";
			for (var i=0;i< response.data.length;i++) {
				html+=`<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 no">
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
//			保存当前显示商品类别
//			catId=cat_id;
		}
	});
}

//跳转到搜索页面
$("#searchBtn").click(function(){
	var searchInput=$("#searchInput").val();
//	console.log(searchInput);
	location.href="search.html?search_text="+searchInput;
})
