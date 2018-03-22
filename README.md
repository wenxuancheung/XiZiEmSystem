# 西子员工系统Vue+jQuery版
## 功能
### 登录
账号：admin密码admin
输入正确的账号密码点击登录按钮调用方法路由至首页
### Vue-Resource
点击登录会进行使用Vue-Resource获取Json中的数据判断账号密码是否正确
### 路由
在首页中点击公告，点餐，项目利用Vue路由功能跳转到其他组件。其中公告使用的路由嵌套
### 点餐
点餐页面使用的是jQuery编写的倒计时，显示菜单和点击下单显示在下单列表功能
### 项目
项目页面使用了路由嵌套功能和Vue的双向绑定功能。
<hr>

## BUG
1. 登录页面要输入两次才能正常进入主页
2. 使用jQuery写的订餐页面使用Ajax调取菜单信息更改登录页面原本为text输入框的form标签为checkbox（已解决，原因是订餐页面使用$(form).html()。更改了登录页面的form，解决办法是给订餐页面的form一个id使jQuery修改该id的form的html页面值$("#bookForm").html()）
3. 没有返回功能，用户体验不好
4. 进入订餐页面没有倒计时，显示菜单功能，要刷新才会显示（已解决，使用Vue的生命周期钩子，将jQuery代码放在mounted钩子下）
