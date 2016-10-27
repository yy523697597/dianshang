/*衣服尺寸选择*/
$(function(){
	$(".pro_size li").click(function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		$(this).parents("ul").siblings("strong").text(  $(this).text() );
	})
})
/*数量和价格联动*/
$(function(){
    var $span = $(".pro_price strong");
	var price = $span.text();	
	$("#num_sort").change(function(){
	    var num = $(this).val();
		var amount = num * price;
		$span.text( amount );
	}).change();
//	为了防止表单元素刷新后依旧保持原来的值而引起价格没有变动
//	需要在页面加载完成后为元素绑定change事件，然后立即触发change事件
})
