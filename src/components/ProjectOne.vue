<template>
<div id="projectRouter">
	<p class="w">项目进度</p>
	<div class="round">
	    <div id="J_bg2_1" class="roundBg"></div>
	    <div id="J_bg2_2" class="roundBg2"></div>
	    <div class="num">{{getChecked()}}</div>  
	</div>

	<div id="bottomMid">
		<ul v-for="item in list_num">
			<li>
				 <input type="checkbox" :value="item.value" v-model="item.checked"/> {{ item.value }}
			</li>
		</ul>
	</div>
	<div id="bottomBot" class="w">
		<button @click="checkIn">打卡</button>
		<button>详情</button>
	</div>
</div>
</template>

<script>
	export default {
		name : 'ProjectOne',
		data () {
			return {
				list_num: [
		        	{ checked : false, value : '需求1'},
		            { checked : false, value : '需求2'},
		            { checked : false, value : '需求3'}
	       		]
			}
		},
		methods: {
	    	getChecked: function() {
	      		var listNum = []
	        	listNum = this.list_num.filter(item => item.checked)
	          	return (100*listNum.length/3.00).toFixed(0) +"%"
	        },
	        checkIn : function(){
	        	var listNum = []
	        	var percent
	        	var bg1 = document.querySelector("#J_bg2_1");
				var bg2 = document.querySelector("#J_bg2_2");
	        	listNum = this.list_num.filter(item => item.checked)
	          	percent = (100*listNum.length/3.00).toFixed(0)
			    if (percent <= 50){
			        bg2.style.transform = "rotate(" + 180 * percent * 2 / 100 + "deg)";
			        bg2.style.borderColor = "rgb(221,221,221) rgb(221,221,221) rgb(221,221,221) transparent";
			        bg1.style.transform = "rotate(0deg)";
			    }else{
			       bg2.style.transform = "rotate(0deg)";
			       bg2.style.borderColor = "rgb(65,199,219) rgb(65,199,219) rgb(65,199,219) transparent";
				   bg1.style.transform = "rotate(" + 180 * (percent - 50) * 2 / 100 + "deg)";
			    }
		    }
	    }
	}
</script>

<style scoped>
/*
 * 圆环
 */
.w{
	margin: 0 auto;
	text-align: center;
}
p{
	font-size: 1.6rem;
	padding: 2rem 0;
}
.round{
	position: relative;
    width: 20rem;
    height: 20rem;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    margin: 1rem auto;
    background: fff;
    border-radius: 50%;
    box-shadow: 0 0 0 5px rgb(65,199,219) inset;
}
.roundBg,.roundBg2{
    position: relative;
    margin: 0;
    padding: 0;
    -webkit-box-flex: 1;
    height: 19.1rem;
    background: #fff;
    border: 0.455rem solid grey;
}
.roundBg{
    border-radius: 10rem 0 0 10rem;
    border-color: rgb(221,221,221) transparent rgb(221,221,221) rgb(221,221,221);
    transform-origin: 100% 50%;
    z-index: 1;
}
.roundBg2{
    border-radius: 0 10rem 10rem 0;
    border-color: rgb(221,221,221) rgb(221,221,221) rgb(221,221,221) transparent;
    transform-origin: 0 50%;
    z-index: 2;
}
.num{  
    position: absolute;  
    box-sizing: border-box;  
    width: 16rem;  
    height: 16rem;  
    line-height: 16rem;  
    text-align: center;  
    font-size: 4rem;  
	left: 2rem;
    top: 2rem;
    border-radius: 50%;  
    background-color: #fff;  
    z-index: 3;  
}  
/*
 * middle
 */
#bottomMid{
	font-size: 2rem;
	margin: 2rem 0;
}
#bottomMid input{
	width: 1.5rem;
	height: 1.5rem;
	margin: 1rem 0.5rem 0.5rem 1.5rem;
}
/*
 * bottom
 */
#bottomBot{
	width: 100%;
}
#bottomBot button{
    width: 49%;
	height: 7rem;
	font-size: 2rem;
	padding: 0;
	border: solid 1px;
}
</style>