//网站换肤
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