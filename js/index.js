
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
	    mainNav.style.marginTop = -parseInt(prevObjTop)+"px";
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
    allTop += obj.offsetTop;
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

//$.ajax({
//	type:"GET",
//	url:" http://h6.duchengjiu.top/shop/api_goods.php",
//	success:function(response){
//		console.log(response);
//
//		
//	}
//})

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
//console.log(oLi);

f1()

console.log(oLi[2].className)

function f1(){	
	for (var i = 0; i < oLi.length; i++) {
	//	console.log(oLi[i]);
		oLi[i].onclick=function(){
	//		console.log(0);
			if(oLi[i].className==""){
				console.log(222)
			}
		}
	}	
}
function paging(obj){
	var pageVal=obj.val();
	console.log(pageVal);
}
//分页条移动
//$(".prevPage").click(function(){
//	console.log(123)
//	//范围1-
//	var left=document.querySelector(".pageUl li:nth-child(2)");
//	console.log(left);
//})
