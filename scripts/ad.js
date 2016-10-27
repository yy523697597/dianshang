/* 首页大屏广告效果 */
$(function(){
	var $imgrolls = $("#snImageroll div a");
	$imgrolls.css("opacity","0.7");
    var len  = $imgrolls.length;
	var index = 0;
	var adTimer = null;
	$imgrolls.mouseover(function(){
		index = $imgrolls.index(this);
		showImg(index);
	}).eq(0).mouseover();
	//通过eq来选择初始化显示的广告
	//鼠标滑入停止动画，鼠标滑出开始动画.
	$('#snImageroll').hover(function(){
			if(adTimer){ 
				clearInterval(adTimer);
			}
		 },function(){
			adTimer = setInterval(function(){
			    showImg(index);
				index++;
				if(index==len){index=0;}
			} , 2000);
	}).trigger("mouseleave");
//	通过trigger来自动触发鼠标滑出事件
})
//显示不同的幻灯片
function showImg(index){
	var $rollobj = $("#snImageroll");
	var $rolllist = $rollobj.find("div a");
	var newhref = $rolllist.eq(index).attr("href");
	//将鼠标滑过链接的href值设置给大图外面的href
	//获取所有大图，并根据传入的index来显示相应图片，并且隐藏其他图片
	//使用stop(true,true)将未执行完的动画队列清空，同时将正在执行的动画跳转到末状态，
	// 为了使图片平滑过渡，使用fadeIn和fadeOut
	$("#SN_imgWrap").attr("href",newhref)
			 .find("img").eq(index).stop(true,true).fadeIn().siblings().fadeOut();
	//移除所有的choosen，并且设置不透明度。为选中的广告框添加choosen并设置不透明度
	$rolllist.removeClass("choosen").css("opacity","0.7")
			 .eq(index).addClass("choosen").css("opacity","1");
}