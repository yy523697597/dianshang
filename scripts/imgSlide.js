/* 品牌活动模块横向滚动 */
$(function(){
    $("#snBrandTab li a").click(function(){
		$(this).parent().addClass("choosen").siblings().removeClass("choosen");
		var index = $("#snBrandTab li a").index(this);
        //index() 方法返回指定元素相对于其他指定元素的 index 位置。
		showBrandList(index);
		return false;
   }).eq(0).click();//通过eq选择器初始化第一个版面为选中状态
});
//显示不同的模块
function showBrandList(index){
	var $rollobj = $("#snBrandList");
    var rollWidth = $rollobj.find("li").outerWidth();//通过outerWidth来获取外宽度
	rollWidth = rollWidth * 4; //一个版面的宽度
	$rollobj.stop(true,false).animate({ left : -rollWidth*index},1500);
}