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