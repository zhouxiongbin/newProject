
//获取搜索框传来的数据（从首页）
var reception=location.search.substr(1);
var str=reception.split("=");

var goodsText=str[1];
console.log(goodsText);

searchGoods(goodsText)
//获取搜索商品函数
function searchGoods(goodsText){
	$.ajax({
		type:"GET",
		url:"http://h6.duchengjiu.top/shop/api_goods.php?search_text="+goodsText,
		data:{
			"page":1,
			"pagesize":40
		},
		success:function(response){
//			console.log(response.message);
			//判断是否有与输入相匹配的商品
			if(response.message=="商品搜索数据为空"){
				$("#goodsList").html(`<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 no"><h4><a href="javascript:;">${ response.message },请重新输入~</a></h3></div>`);
				return;
			}
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
}

//获取搜索页输入内容并调用ajax请求
$(".searchBtn").click(function(){
	
	var search_Text=$("#searchInput").val();
	console.log(search_Text);
	searchGoods(search_Text);
})
