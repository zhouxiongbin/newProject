
//获取商品分类名称
$.ajax({
	type: "get",
	url: "http://h6.duchengjiu.top/shop/api_cat.php",
	success: function(response) {
		console.log(response);
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