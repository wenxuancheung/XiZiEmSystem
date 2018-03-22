<template onload="RefreshOnce()">
	<div>
		<div class="time">
			<h2>剩余点餐时间</h2><br />
			<span id="hour"></span>
			<span id="min"></span>
		</div>
		<div class="book clearfix">
			<div id="lunch"><p>午餐</p></div>
			<div id="menu" class="clearfix">
				<form action="" id="Book_form">
				</form>
				<input type="button"  id="booking" value="下单" class="btn" />
			    <input type="button"  id="delete"  value="删除" class="btn"/>
			</div>
		</div>
		<div class="show">
			<div id="showMenu">
				<p>下单列表</p>	
			</div>
			<div id="showItems"></div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Book',
  data () {
    return {
     // msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted : function (){
  	$(function(){
		var $min = $("#min")
		var $hour = $("#hour")
		var $booking = $("#booking")
		var $delete = $("#delete")
		var $show_items = $("#showItems")
		var $Book_form = $("#Book_form")
		var ajax_hour									//用于保存ajax返回的订餐小时数
		var ajax_min									//用于保存ajax返回的订餐分钟数
		var time
		var my_date = new Date()
		var my_hour = my_date.getHours()	    		//获取当前小时数用于判断
		var my_minutes = my_date.getMinutes() 		    //获取当前分钟数用于判断
		var year
		var month
		var day
		var food = []							       //用来存储餐品名字
		var name = []  							   //保存名字
		var food_today
		var result 								   //保存AJAX传来的菜单，并把它拼串成HTML
		var lunch_name
		//定时器
		setInterval(function(){
			my_date = new Date()
			my_hour = my_date.getHours()
			my_minutes = my_date.getMinutes()
			year = my_date.getFullYear()
			month = my_date.getMonth()+1
			day = my_date.getDate()
			if(my_hour < ajax_hour+1 && my_minutes < ajax_min){
				time = new Date(year+'/'+month+'/'+day+ ' '+ajax_hour+':'+ajax_min+':00')		
			}else{
				day += 1;
				time = new Date(year+'/'+month+'/'+day+ ' '+ajax_hour+':'+ajax_min+':00') 
			}
			var i = time.getTime() - my_date.getTime()
			var hour_time =numTime((i-i%(1000*60*60))/(60*1000*60)%24)		//计算剩余小时
			var min_time = numTime((i-i%(1000*60))/(60*1000)%60)			//计算剩余分钟
			if(hour_time > ajax_hour ){
				$(".time:first-child").html("<h2 style='font-size:22px;line-height: 45px;'>已过点餐时间</h2>")
				$(".time").css("background-color","red")
			}else if(hour_time ==ajax_hour && min_time >=ajax_min){
				$(".time:first-child").html("<h2 style='font-size:22px;line-height: 45px;'>已过点餐时间</h2>")
				$(".time").css("background-color","red")
			}else{
				$hour.html(hour_time+"时")									//剩余小时
				$min.html(min_time+"分")		     							//剩余分钟						
			}
		},1);
		
		//Ajax
		$.ajax({
			type : "Get",
			async : false,//重要，设为异步，否则全局环境无法获取AJAX中传出的值
			url : "../static/index.json",  
			dataType : "json",
			success :function(data){
				//获取json中设定的点餐时间
				$.each(data.times,function(name,val){
					ajax_hour = parseInt(val.hour)
					ajax_min = parseInt(val.min)
				})
				//获取食品名称保存在数组中
				$.each(data.foods,function(i,items){
					food[i]=items
				})
				$.each(data.names,function(i,items){
					name[i] = items
				})
				//生成两个随机数
				var x = food.length-1
				var y = 0
				var rand = parseInt(Math.random() * (x - y + 1) + y)
				var rand2 = parseInt(Math.random() * (x - y + 1) + y)
				if(rand==rand2 && rand==y){
					rand2 = rand + 1
				}
				else if(rand==rand2 && rand==x){
					rand2 = rand - 1
				}
				else if(rand==rand2){
					rand = rand - 1
				}
				//将随机数导入到ajax传来的数组中，随机生成菜单
				result ='<input type="radio" name="foods" value="'+data.foods[rand]+'"checked="checked">'
					   +data.foods[rand]	
					   +'<br /><br />'
					   +'<input type="radio" name="foods" value="'+data.foods[rand2]+'">'
					   +data.foods[rand2]
			},
			error : function(XMLHttpRequest, textStatus){
	            // 状态码
	     		console.log(XMLHttpRequest.status)
	        	// 状态
	     	    console.log(XMLHttpRequest.readyState)
			}
		});
		
		//刷新更新菜单
		$Book_form.html(result)
	
		
		//判断时间将下单按钮设置为disabled ！bug:要点击刷新才会更新my_hour数值，从而在9点29分一直不刷新页面直到9点31分也可下单，解决方案：当点击下单时再获取一遍当前时间
		if(my_hour>ajax_hour){
			$booking.prop("disabled","true")
			$delete.prop("disabled","true")
		}else if(my_hour == ajax_hour && my_minutes > ajax_min-1){
			$booking.prop("disabled","true")
			$delete.prop("disabled","true")
		}
		
		//booking功能
		$booking.bind("touchstart",function(){
			//获取点击booking时的时间
			my_date = new Date();
			my_hour = my_date.getHours()	    //获取当前小时数用于判断
			my_minutes = my_date.getMinutes() //获取当前分钟数用于判断
			if(my_hour > ajax_hour){
				$booking.prop("disabled","true")
			}else if(my_hour == ajax_hour && my_minutes > ajax_min-1){
				$booking.prop("disabled","true")
			}
			if($booking.prop("disabled")){
				alert("已过点餐时间")
			}else{
				//点击下单
				var name_num = name.length-1
				var random = parseInt(Math.random() * name_num)
	       		$.each($("input[type='radio']:checked"),function(){
	   				lunch_name = $(this).val()
		   	   		//原生confirm
					var confirm_msg = confirm("你确定要点"+lunch_name+"吗?")
					if(confirm_msg){
						$show_items.append("<p>"+name[random]+" "+lunch_name+"</p>")
					}
	   			});
			}
		})
		
		//delete功能
		$delete.bind("touchstart",function(){
			//获取点击delete时的时间
			my_date = new Date()
			my_hour = my_date.getHours()	    //获取当前小时数用于判断
			my_minutes = my_date.getMinutes() //获取当前分钟数用于判断
			if(my_hour > ajax_hour){
				$delete.prop("disabled","true")
			}else if(my_hour == ajax_hour && my_minutes > ajax_min-1){
				$delete.prop("disabled","true")
			}
			if($delete.prop("disabled")){
				alert("点餐时间已过，你不可以删除订单")
			}else{
				//点击删除订单
				if($("#showItems :last-child").html() ==null){
				    alert("没有可删除的订单")
				}
				else{
				    //原生confirm
					var confirm_msg = confirm("你确定要删除吗?")
					if(confirm_msg){
						$("#showItems :last-child").remove()							
					}		
				}
			}
		})
		//小于10的分钟小时数，给其加个0，用于美观
		function numTime(obj){
			if(obj < 10){
				obj = '0'+ obj
			}
			return obj
		}
	});
  }
}
</script>

<style scoped>
/*
 * 点餐时间
 */
.time{
	text-align: center;
	margin : 1rem auto 0;
	font : bold;
	height: 9rem;
	width: 80vw;
	border : solid 1px;
}
.time span{
	font-size: 3rem;
}
.time h2{
	margin-top: 2rem;
}
/*
 * 选项
 */
.book{
	margin: 2rem auto 0;
	height: 25rem;
	width: 90vw;
	border: solid 0.1rem;
}
#lunch{
	width: 100%;
	height: 25%;
	background-color: rgb(65,199,219);
}
#lunch p{
	line-height: 6rem;
	text-indent: 0.5em;
	font-size: 1.6rem;
}
#menu{
	text-align: center;
	margin-top: 2rem;
	font-size: 2.5rem;
}
.btn{
	width: 35%;
	height: 5rem;
	border-radius: 0.8rem;
	font-size: 1.6rem;
}
#booking{
	margin :4.5rem 0 0px 0.8rem ;
	float: left;
}
#delete{
	margin :4.5rem 0.8rem 0px 0px ;
	float: right;
	color:red;
	border-color: red;
}

/*
 * 下单列表
 */
.show{
	
	margin: 2rem auto 0;
	height: 20rem;
	width: 90vw;
	border: solid 1px;
}
#showMenu{
	width: 100%;
	height: 5rem;
	background-color: rgb(65,199,219);
}
#showMenu p{
	font-size: 1.6rem;
	line-height: 5rem;
	text-indent: 0.5em;
}
#showItems{
    height: 65%;
	overflow: auto;
	margin-top: 1.5rem;
	font-size: 1.6rem;
	text-align: center;
}

</style>