//1.模拟数据
//2.使用数据生成页面
//3.完成效果
    //加减 改变购买数目---改变小计
    //删除----删除当前项目
    //选中----计算总价
    //全选----全选（计算总价）-----全取消
$(function(){
	//使用数据生成页面
	var goods=data.goods;//获取数组数据
	for(var i=0;i<goods.length;i++){  //for循环遍历数据，生成页面结构---拼接字符串
//		console.log(goods[i].id)
$('<div class="cart-list" title='
+goods[i].id+
'><div class="cart-hd"><input type="checkbox" /><em>'
+goods[i].title+
'</em></div><div class="cart-items"><dl><dt><img src='
+goods[i].imgUrl+
'/></dt><dd>名称：'
+goods[i].title+
'</dd><dd>编著：武汉格莱科技有限公司</dd><dd>出版：中国地质大学出版社</dd><dd>简介：当你第一次见到C#，不要傻傻的读成“C井号”...</dd><dd >定价：￥<span class="price">'
+goods[i].price+
'</span></dd></dl><div class="icon-del del-item"><a href="#"></a></div></div><div class="subtotal"><span class="total-price">小计：<em>'
+goods[i].price+
'</em></span><span class="count"><a href="#" class="icon-minus minus"></a><input type="number" name="" id="num" step="1" min="0" value="1" /><a href="#" class="icon-add add"></a></span></div></div>').appendTo(".container")
	}	
	
	
	
	//事件处理---加---减
	//找到要点击的标签---绑定事件---给input重新赋值---val()
	$(".add").click(function(){//点击+
		var countN=$(this).siblings("input");//找到兄弟标签 input
		var valO=parseInt(countN.val())//获取input原来的值
		var valN=valO+1;//值加1
		countN.val(valN);//把新值赋值回去
		
		//获取单价---通过jq对象的遍历找到标签
		var price=parseFloat($(this).parent().parent().siblings(".cart-items").find(".price").text());
		console.log(price)
		//计算小计
		var subprice=price * valN;
		//小计赋值
		$(this).parent().prev().children("em").text(subprice)
		add();
		return false;//既可以阻止事件传播，也可以阻止默认行为
//		countN.val(parseInt(countN.val())+1)
	})
	
	
	//事件处理---减
	$(".minus").click(function(){//点击+
		var countN=$(this).siblings("input");//找到兄弟标签 input
		var valO=parseInt(countN.val())//获取input原来的值
		if(valO>0){//加点条件
			var valN=valO-1;//值加1
		    countN.val(valN);//把新值赋值回去
		    
		    
		//获取单价
		var price=parseFloat($(this).parent().parent().siblings(".cart-items").find(".price").text());
		//计算小计
		var subprice=price * valN;
		//小计赋值
		$(this).parent().prev().children("em").text(subprice)
		add();
		    return false;//既可以阻止事件传播，也可以阻止默认行为
		}
   })
	
	
	
	
	//事件处理---删除
	$('.del-item').click(function(){
		var boo=confirm("确定删除吗？");
		if(boo){
			$(this).parents(".cart-list").remove();
			add();
			return false;
		}
		
	})
	
	
	
	
	//事件处理---全选
	$("#allCheck").click(function(){
		//点击全选---找到所有多选框---设置属性（获取被点击的状态--直接赋值给多选框）
		//prop和attr作用和用法是一样的，但是是专门用来设置特殊属性的
		$(".container input:checkbox").prop("checked",this.checked)
		add();
		//prop('checkbox',true)
	})
	
	
	
	//jq为所有的表单类型提供了专用的选择器
	//1.input  匹配所有的input select textarea 标签
	//2.text  匹配单行文本框与input[type="input"] 作用一样
	//3.password  匹配密码框与input[type="password"]
	//4.其它都有...
	
	//jq还提供按照表单的状态来匹配
	//1.:checked  多选与单选选中状态
	//2.:selected 下拉菜单选中状态
	//3.:disabled 被禁止的状态
	//4.:enabled 可以使用，正常的表单控件
	
	
	
	//事件处理---反向全选--每一个input在被点击的时候
	//给所有的多选框绑定事件
	//表单专用的选择器input:checkbox判断类型  input:checked判断状态，找到被选中的input
	$(".container input:checkbox").click(function(){//找到所有的多选框绑定事件处理函数
		var allL=$(".container input:checkbox").length;//获取多选框长度
		var cheL=$(".container input:checked").length;//获取所有被选中的多选框长度
		if(allL==cheL){
			$("#allCheck").prop("checked",true)//如果长度一样，就说明已经全选
		}else{
			$("#allCheck").prop("checked",false)
		}
		add();
	}).trigger("click")//页面打开时，手动触发一次这个事件
	//$("input")---所有的
	//$("input:checked")---被选中的
	//长度一样---设置选中下边那个选中
	//长度不一样---设置不选中
	
	
	
	//封装函数，实现小计累加
	function add(){
		//找到所有备选中的多选框---取出和他相关的小计值---小计值累加
		var allTotle=0;
		//使用for循环取值
//		for(var i=0;i<$(".container input:checked").length;i++){
//			var a=$(".container input:checked").eq(index);
//			var aN=parseInt(a.parent().siblings(".subtotal").children(".total-price").children("em").text())
//			allTotle=allTotle + aN;
//		})
//		$("#allCheck").text(allTotle)
//		}
		
		//使用each()---循环取值---根据jq对象的长度实现循环，会执行时会自动传入索引值
		$(".container input:checked").each(function(index){
			var a=$(".container input:checked").eq(index);
			var aN=parseInt(a.parent().siblings(".subtotal").children(".total-price").children("em").text());
			allTotle=allTotle + aN;
		})
		//把累计结果放在总计处
		$("#totprice").text(allTotle)
	}
})	
