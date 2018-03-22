<template>
	<div id="project">
		<div id="projectTop">
			<ul>
				<li><router-link to="/projectOne">项目一</router-link></li>
				<li><router-link to="/projectTwo">项目二</router-link></li>
			</ul>	
		</div>
		
		<div id="projectBottom">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
#projectTop{
	width: 90%;
	height : 20.3rem;
	border: double 1px;
	margin: 2.5rem auto;
	font-size: 1.4rem;
	text-indent: 1em;
}	
#projectTop li{
	height: 5rem;
	width: 100%;
}
#projectTop li :active{
	background-color: rgb(65,199,219);
}
#projectTop a {
	display: block;
	color : black;
	line-height: 5rem;
	text-decoration: none;
}
</style>