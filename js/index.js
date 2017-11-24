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


//获取商品分类名称
$.ajax({
	type: "get",
	url: "http://h6.duchengjiu.top/shop/api_cat.php",
	success: function(response) {
//		console.log(response);
		for(var i = 0; i < response.data.length; i++) {

			$("#navUl").append('<li><a href="#">' + response.data[i].cat_name + '</a></li>');

		}
	}
});

//nav吸顶效果
var mainNav =document.querySelector('.navOut');
var prevObj =document.querySelector('.header');
var prevObjTop=prevObj.offsetHeight;
var topDis = getAllTop(mainNav);
window.onscroll = function(e) {
  var nowTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(nowTop >= prevObjTop) {
	    mainNav.style.position = 'fixed';
	    mainNav.style.marginTop = 0;//-parseInt(prevObjTop)+"px";
	    mainNav.style.opacity="0.9";
	   $(".header").css("display","none")
	}else {
	    mainNav.style.position = 'relative';
	    mainNav.style.marginTop = topDis + 'px';
	    mainNav.style.opacity="1";
	    $(".header").css("display","block")
	}
};

function getAllTop(obj) {
  var allTop = obj.offsetTop;
  while(obj = obj.offsetParent) {
    allTop = obj.offsetTop;
  }
  return allTop;
}


//获取时间并显示到页面上
	getTime()
	setInterval(getTime,1000);
	function getTime(){
		var hour=new Date().getHours();
		var min=new Date().getMinutes();
		var sec=new Date().getSeconds();
		$(".clockUl").html(`<li>
						<p class="time">${ hour }</p>
						<p>——</p>
						<p>HOUR</p>
					</li>
					<li>
						<p class="time">${ min }</p>
						<p>——</p>
						<p>MIN</p>
					</li>
					<li>
						<p class="time">${ sec }</p>
						<p>——</p>
						<p>SEC</p>
					</li>`)
	}



//获取热门商品
$.ajax({
	type:"GET",
	url:"http://h6.duchengjiu.top/shop/api_goods.php",
	data:{
		"page":1,
		"pagesize":20
	},
	success:function(response){
		console.log(response);
		var html="";
		for (var i=0;i< response.data.length;i++) {
			html+=`<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 no">
			      <img src="${ response.data[i].goods_thumb }" alt="...">
			      <div class="caption">
			        <h4><a href="#">${ response.data[i].goods_name }</a></h3>
			        <p>${ response.data[i].goods_desc }</p>
			        <p><span>惊喜价</span>￥<span>${ response.data[i].price }</span>元</p>
			        <p><a href="javascript:;" class="btn btn-default" role="button">加入购物车</a></p>
			      </div>
			    </div>`;
		}
		$("#goodsList").html(html);
	}
})



//分分页显示

var oLi=document.querySelectorAll(".pageUl li");
	//获取移动每个a的高度
var oLiWidth=document.querySelector(".pageUl li a").offsetWidth;

allClick(self)
//批量绑定事件函数
function allClick(self){
	oLi=document.querySelectorAll(".pageUl li");
	//获取移动每个a的高度
	oLiWidth=document.querySelector(".pageUl li a").offsetWidth;
	//console.log(oLiWidth);
	//闭包
	for(var i = 0; i < oLi.length; i++) {
		(function() {
			var self = i;
			oLi[self].onclick = function() {
				console.log(oLi[self].className);
				if(oLi[self].className=="present"){
	//				获取当前页码，即用于传入ajax请求
					var page = oLi[self].querySelector("a").innerHTML;
	//				调用函数请求数据
					ajaxGoods(page);
				}else if(oLi[self].className=="prevPage"){
					//ul右移
					movePlace(oLi[self],-11);
				}else if(oLi[self].className=="nextPage"){
					//ul左移
	//				console.log("右按钮")
					movePlace(oLi[self],11);
				}
					
			}
		})();
	}
	
};
//分页栏移动函数
function movePlace(obj,number){
	console.log(obj.className);
//	console.log(obj.previousElementSibling.querySelector("a").innerHTML);
	//判断范围
	if( (obj.className=="prevPage" && obj.nextElementSibling.querySelector("a").innerHTML==1) || (obj.className=="nextPage" && obj.previousElementSibling.querySelector("a").innerHTML >=83 )){
		allClick(self);		
		return;
	}else{
//		console.log("左移")
//		console.log(oLi.length-1)
		var str=[];
		for (var i = 1; i < oLi.length-1; i++) {
			str.push(parseInt( oLi[i].querySelector("a").innerHTML));
		}
		console.log(str)
		var str1=[];
		for (var i = 0; i < str.length; i++) {
			str1.push(str[i]+number);
		}
		console.log(str1)
		
		$(".pageUl").html(`<li class="prevPage">
				      <a href="javascript:;" aria-label="Previous">
				        <span aria-hidden="true">&laquo;</span>
				      </a>
				    </li>
				    <li class="present"><a href="javascript:;">${ str1[0]}</a></li>
				    <li class="present"><a href="javascript:;">${ str1[1]}</a></li>
				    <li class="present"><a href="javascript:;">${ str1[2]}</a></li>
				    <li class="present"><a href="javascript:;">${ str1[3]}</a></li>
				    <li class="present"><a href="javascript:;">${ str1[4]}</a></li>
				    <li class="present"><a href="javascript:;">${ str1[5]}</a></li>
				    <li class="present"><a href="javascript:;">${ str1[6]}</a></li>
				    <li class="present"><a href="javascript:;">${ str1[7]}</a></li>
				    <li class="present"><a href="javascript:;">${ str1[8]}</a></li>
				    <li class="present"><a href="javascript:;">${ str1[9]}</a></li>
				    <li class="present"><a href="javascript:;">${ str1[10]}</a></li>
				    <li class="nextPage">
				      <a  href="javascript:;" aria-label="Next">
				        <span aria-hidden="true">&raquo;</span>
				      </a>
				    </li>`);
		allClick(self)
	}
	allClick(self)
	
	
}


function ajaxGoods(page){
	//判断输入页码是否有商品
	if(page > 83){
		return;
	}
	$.ajax({
		type:"GET",
		url:"http://h6.duchengjiu.top/shop/api_goods.php",
		data:{
			"page":page,
			"pagesize":20
		},
		success:function(response){
//			console.log(response);
			var html="";
			for (var i=0;i< response.data.length;i++) {
				html+=`<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 no">
				      <img src="${ response.data[i].goods_thumb }" alt="...">
				      <div class="caption">
				        <h4><a href="#">${ response.data[i].goods_name }</a></h3>
				        <p>${ response.data[i].goods_desc }</p>
				        <p><span>惊喜价</span>￥<span>${ response.data[i].price }</span>元</p>
				        <p><a href="javascript:;" class="btn btn-default" role="button">加入购物车</a></p>
				      </div>
				    </div>`;
			}
			$("#goodsList").html(html);
		}
	})
};


//商品搜索
$(".search span").click(function(){
	
	var searchInput=$("#searchInput").val();
//	console.log(searchInput);
	location.href="search.html?search_text="+searchInput;
})
