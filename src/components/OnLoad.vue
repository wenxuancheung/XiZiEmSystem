
<template>
    <div id="index_div" class="w">
      <h1>XiZi员工系统</h1>
      <form id="index_form">
        <p>用户名<input type="text" class="userText" v-model="username"></p>
        <p>密码<input type="password" class="passwordText" v-model="password"></p>
        <button value="登录" id="onLoad" class="userBtn" @click="toIndex">登录</button>
        <button value="注册" id="register" class="userBtn">注册</button>
      </form>
    </div>

</template>

<script type="text/javascript">

  export default {
    name : 'index',
    data(){
      return {
		username : "",
		password : ""
      }
    },
   	methods: {
   		//点击后获取遍历json文件的账号密码和v-model的输入内容判断是否正确
	    toIndex : function(){
	    	var _this = this;
	    	this.$http.get('static/index.json').then(function(result){
	    		//获取json中保存账号密码的字符串
	    		var userList = result.body.user
	    		//遍历字符串
         		for(var i = 0;i<userList.length;i++){
         			//如果页面中用户输入的账号密码和json文件中的匹配泽进行主页
         			if(_this.username == userList[i].username && _this.password == userList[i].password){
         				_this.$router.push('/index')
         				//如果输入正确则退出循环，否则alert账号密码错误
         				return
         			}
         		}
	    		alert("账号或密码错误")	
	    	})
	    }
  	}
  }
</script>

<style type="text/css" scoped>
/*
 * 登陆界面
 */
/*
 * 居中
 */
#index_div{
  /*
    * 登录框垂直水平居中
    */
  width: 85%;
  height: 40%;
  border: solid 1px; 
  margin-top: 18vh;
  padding: 3rem 0 3rem;
}
h1{
  font-size: 2.4rem;
}
.userBtn{
  width: 40%;
  height: 4.8rem;
  border-radius: 0.8rem;
  margin: 35px 1rem 0 1rem;
  font-size: 1.4rem;
}

#index_form p{
  margin-top: 3rem;
  font-size: 1.4rem;
}
.passwordText{
  width: 65%;
  height: 3.4rem;
  margin-left: 3rem;
}
.userText{
  width: 65%;
  height: 3.4rem;
  margin-left: 2rem;
}
#register{
	background : url(../img/注册.png);
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
</style>