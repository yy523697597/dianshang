//导航效果
$(function(){
   $("#nav li").hover(function(){
		$(this).find(".snNav").show();
	},function(){
		$(this).find(".snNav").hide();
	});
})