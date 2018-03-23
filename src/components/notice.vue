<template>
	<div>
		<a @click="routerBack" class="backLast"></a>
		<p>{{notice}}</p>
	</div>

</template>

<script>
	export default {
		name : 'notice',
		data () {
			return {
				notice : '今天没有通知'
			}
		},
		methods : {
			routerBack : function(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
</style>