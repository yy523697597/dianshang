/* 点击左侧产品小图片切换大图 */
$(function(){
	$("#snProitem ul.imgList li a").bind("click",function(){
		  var imgSrc = $(this).find("img").attr("src");
          //从后往前查询图片文件名中最后一个"."的位置
		  var i = imgSrc.lastIndexOf(".");
          //用substring方法根据得到的位置分割图片名
		  var unit = imgSrc.substring(i);
		  imgSrc = imgSrc.substring(0,i);
          //为图片文件名添加_big
		  var imgSrc_big = imgSrc + "_big"+ unit;
		  $("#thickImg").attr("href" , imgSrc_big);
	});

});