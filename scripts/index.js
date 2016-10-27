/**
 * Created by yu on 2016/10/27 0027.
 */
/* 搜索文本框效果 */
$(function () {
    $("#inputSearch").focus(function () {
        $(this).addClass("focus");
        if ($(this).val() == this.defaultValue) {
            $(this).val("");
        }
    }).blur(function () {
        $(this).removeClass("focus");
        if ($(this).val() == '') {
            $(this).val(this.defaultValue);
        }
    }).keyup(function (e) {
        if (e.which == 13) {
            alert('回车提交表单!');
        }
    })
});
/*网站换肤*/
//通过将皮肤选择按钮li元素的id与网页皮肤的CSS文件名称设置相同来简化操作
$(function () {
    var $li = $("#skin li");
    $li.click(function () {
        switchSkin(this.id);
    });
    //读取MyCssSkin的值
    var cookie_skin = $.cookie("MyCssSkin");
    if (cookie_skin) {
        switchSkin(cookie_skin);
    }
});

function switchSkin(skinName) {
    $("#" + skinName).addClass("selected")                //当前<li>元素选中
        .siblings().removeClass("selected");  //去掉其他同辈<li>元素的选中
    $("#cssfile").attr("href", "styles/skin/" + skinName + ".css"); //设置不同皮肤
    $.cookie("MyCssSkin", skinName, {path: '/', expires: 7});
//将选择的皮肤id存到MyCssSkin中，expires为有效期,path为路径
}


/*导航效果*/
$(function(){
    $("#nav li").hover(function(){
        $(this).find(".snNav").show();
    },function(){
        $(this).find(".snNav").hide();
    });
})

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

/* 超链接文字提示 */
$(function(){
    var x = 10;
    var y = 20;
    $("a.tooltip").mouseover(function(e){
        this.myTitle = this.title;
        this.title = "";
        var tooltip = "<div id='tooltip'>"+ this.myTitle +"</div>"; //创建 div 元素
        $("body").append(tooltip);	//把它追加到文档中
        $("#tooltip")
            .css({
                "top": (e.pageY+y) + "px",//通过pageX和pageY来获取鼠标位置
                "left": (e.pageX+x)  + "px"
            }).show("fast");	  //设置x坐标和y坐标，并且显示
    }).mouseout(function(){
        this.title = this.myTitle;
        $("#tooltip").remove();   //移除前面创建的div元素
    }).mousemove(function(e){
        $("#tooltip")
            .css({
                "top": (e.pageY+y) + "px",
                "left": (e.pageX+x)  + "px"
            });
    });
})

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

/* 滑过图片出现放大镜效果 */
$(function () {
    $("#snBrandList li").each(function (index) {
        var $img = $(this).find("img");
        var img_w = $img.width();
        var img_h = $img.height();
        var spanHtml = '<span style="position:absolute;top:0;left:5px;width:' + img_w + 'px;height:' + img_h + 'px;" class="imageMask"></span>';
        $(spanHtml).appendTo(this);
    })
    $("#snBrandList").delegate(".imageMask", "hover", function () {
        $(this).toggleClass("imageOver");
    });
    // $(selector).delegate(childSelector,event,function)
    //	delegate() 方法为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，
    // 并规定当这些事件发生时运行的函数。
})