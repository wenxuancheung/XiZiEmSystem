<template>
	<div id="contain">
		<div id="top">
			<div id="left">
				<ul>
					<li class="active"><router-link to="/notice">公告</router-link></li>
					<li class="url"><router-link to="/book">点餐</router-link></li>
					<li class="url"><router-link to="/project">项目</router-link></li>
					<li>流程</li>
					<li>个人中心</li>
				</ul>
				
			</div>
			<div id="right"></div>
		</div>
		<div id="show"><router-view></router-view></div>
	</div>
</template>

<script>

</script>

<style>
	/*
 * 首页
 */
#top{
	height: 25rem;
	margin: 3.5rem 0 3.5rem 1.2rem;
}
#left{
	font-size: 1.4rem;
	float: left;
	text-indent: 0.5em;
	line-height: 4.9rem;
	border: double 1px;
}
#left li{
	width: 12.8rem;
	height: 4.9rem;
	margin-bottom: 0.1rem;
}
.active{
	background: rgb(65,199,219);
}
.url{
	background: rgb(255,223,223);
}
#right{
	float: right;
	width: 11.4rem;
	height: 11.4rem;
	background: url(../img/人物.png);
	margin-right: 0.5rem;
	/*
	 * 背景图片铺满
	 */
	background-size: cover;
	/*
	 * 兼容性
	 */
	-webkit-background-size: cover;
	-o-background-size: cover;
}

/*
 * 路由显示区
 */
#show{
	text-align: center;
	height: 25rem;
	margin: 3.5rem 2rem;
}
</style>