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

/*使用jqzoom*/
$(function(){
    $('.jqzoom').jqzoom({
        zoomType: 'standard',
        lens:true,
        preloadImages: false,
        alwaysOn:false,
        zoomWidth: 340,
        zoomHeight: 340,
        xOffset:10,
        yOffset:0,
        position:'right'
    });
});

/*衣服颜色切换*/
$(function(){
    $(".color_change ul li img").click(function(){
        $(this).addClass("hover").parent().siblings().find("img").removeClass("hover");
        var imgSrc = $(this).attr("src");
        var i = imgSrc.lastIndexOf(".");
        var unit = imgSrc.substring(i);
        imgSrc = imgSrc.substring(0,i);
        var imgSrc_small = imgSrc + "_one_small"+ unit;
        var imgSrc_big = imgSrc + "_one_big"+ unit;
        $("#bigImg").attr({"src": imgSrc_small });
        $("#thickImg").attr("href", imgSrc_big);
        var alt = $(this).attr("alt");
        $(".color_change strong").text(alt);
        var newImgSrc = imgSrc.replace("images/pro_img/","");
        $("#snProitem .imgList li").hide();
        $("#snProitem .imgList").find(".imgList_"+newImgSrc).show();
        //解决问题：切换颜色后，放大图片还是显示原来的图片。
        $("#snProitem .imgList").find(".imgList_"+newImgSrc).eq(0).find("a").click();
    });
});

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

/*Tab 选项卡 标签*/
$(function () {
    var $div_li = $("div.tab_menu ul li");
    $div_li.click(function () {
        $(this).addClass("selected")            //当前<li>元素高亮
            .siblings().removeClass("selected");  //去掉其他同辈<li>元素的高亮
        var index = $div_li.index(this);  // 获取当前点击的<li>元素 在 全部li元素中的索引。
        $("div.tab_box > div")   	//选取子节点。不选取子节点的话，会引起错误。如果里面还有div
            .eq(index).show()   //显示 <li>元素对应的<div>元素
            .siblings().hide(); //隐藏其他几个同辈的<div>元素
    }).hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    })
})

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

/*商品评分效果*/
$(function(){
    //通过修改样式来显示不同的星级
    $("ul.rating li a").click(function(){
        var title = $(this).attr("title");
        alert("您给此商品的评分是："+title);
        var cl = $(this).parent().attr("class");
        $(this).parent().parent().removeClass().addClass("rating "+cl+"star");
        $(this).blur();//去掉超链接的虚线框
        return false;
    })
})

/*最终购买输出*/
$(function(){
    var $product = $(".snProDetail");
    $("#cart a").click(function (e) {
        var pro_name = $product.find("h4:first").text();
        var pro_size = $product.find(".pro_size strong").text();
        var pro_color =  $(".color_change strong").text();
        var pro_num = $product.find("#num_sort").val();
        var pro_price = $product.find(".pro_price strong").text();
        var dialog = "感谢您的购买。<div style='font-size:12px;font-weight:400;'>您购买的产品是："+pro_name+"；"+
            "尺寸是："+pro_size+"；"+
            "颜色是："+pro_color+"；"+
            "数量是："+pro_num+"；"+
            "总价是："+pro_price +"元。</div>";
        $("#snDialogContent").html(dialog);
        $('#basic-dialog-ok').modal();
        return false;//避免页面跳转
    });
})
