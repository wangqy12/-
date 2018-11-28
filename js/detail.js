$(function(){
	//详情页选项卡
	$('.detail-content').eq(0).show()//默认展开第1个
	$('.detail-hd li').click(function(){	
		$(this).addClass('active').siblings().removeClass('active')
		var i=$('.detail-hd li').index(this);//让li当前索引等于i
		$('.detail-content').eq(i).show().siblings('.detail-content').hide()//eq()表示获取第几个元素
	})
		//点击收藏
	var e=true;
	$('.sc').click(function(){
		if (e) {
			$(this).css('background-position-x','-340px');
			e=false;
		} else{
			$(this).css('background-position-x','-307px');
			e=true;
		}
	})
	//点击添加购物车
	var v=true;
	$('.gw').click(function(){
		if (v) {
			$(this).css('background-position-x','-270px');
			v=false;
		} else{
			$(this).css('background-position-x','-234px');
			v=true;
		}
	})
})
