<template>
	<view  class="content">
		<!-- 顶部栏 -->
		<view class="top-bar">
			<view class="top-bar-right">
				<view class="register" @click="toRegister">注册</view>
			</view>
		</view>
		<!-- 主视图 -->
		<view class="topicon" >
			<img src="../../static/images/login/火.png" class="icon" @click="testFunction">
		</view>
	  <view class="main">
			<view class="title">登录</view>
			<view class="slogan">你好欢迎来到 liunian !</view>
			<view class="inputs">
				<input type="text" placeholder="用户名/邮箱" class="user" placeholder-class="color:#aaa;font-weight:400" @blur="getUser"><br/>
				<input type="password" placeholder="密码" class="pwd" placeholder-class="color:#aaa;font-weight:400" @blur="getPsw">
			</view>
			<view class="tips">输入用户或密码错误!</view>
		</view>
		<view class="submit" @click="testFunction1">登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:'',
				psw:'',
				token:''
			} 
		},
		methods: {
			//后台链接测试
			testFunction(){
				uni.request({
					url:'http://127.0.0.1:3000/search/user',
					data:{
						data:'小'
					},
					method:'POST',
					success:(data) => {
						console.log(data);
					}
				})
			},
			testFunction1(){
				uni.request({
					url:'http://127.0.0.1:3000/friend/applyfriend',
					data:{
						fid:'63b3c4e5d1096fec5648a013',//小花
						uid:'63b42508fe400d48110698fc',//小红
						//msg:'好友请求',
					},
					method:'POST',
					success:(data) => {
						console.log(data);
					}
				})
			},
			//token测试
			testFunction2(){
				uni.request({
					url:'http://127.0.0.1:3000/login/test',
					data:{
						token:'this.token'
					},
					method:'POST',
					success:(data) => {
						console.log(data);
					}
				})
			},
			

			//跳转到注册界面
			toRegister(){
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
			//失焦后获取用户名/邮箱
			getUser(e){
				this.user = e.detail.value
			},
			//失焦后获取密码
			getPsw(e){
				this.psw = e.detail.value
			},
			//登录提交
			login(){
				//非空
				if(this.user  && this.psw){
					console.log('提交');
				}
			},
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: var(--status-bar-height);
	}
	.top-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		z-index: 1001;
		justify-content: flex-end;
		height: 88rpx;
		width: 100%;
		background: uni-bg-color;
		padding-top: var(--status-bar-height);
		border-bottom: 1px solid $uni-border-color;
		.top-bar-right {
			margin-right: 56rpx;
			font-family: PingFangSC-Medium;
			font-size: 36rpx;
			color: #333333;
			letter-spacing: 0;
			font-weight: 500;
		}
	}
	.topicon {
		width: 100%;
		height: 150rpx;
		margin-top: 80rpx;
		margin-bottom: 55rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.icon {
			width: 200rpx;
			height: 100rpx;
		}
	}
	.main{
		margin-left: 58rpx;
		width: 100%;
		.title{
			height: 80rpx;
			font-family: PingFangSC-Medium;
			font-size: 56rpx;
			color: $uni-text-color;
			letter-spacing: 0;
			font-weight: 500;
			margin-bottom: 14rpx;
		}
		.slogan {
			font-size: 40rpx;
			color: $uni-text-color-grey;
			font-weight: 400;
		}
		.inputs {
			padding-top: 8rpx;
			input {
				padding-top: 40rpx;
				height: 48rpx;
				width: 636rpx;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 88rpx;
				font-weight: 500;
				border-bottom: 1px solid $uni-border-color ; 
			}
		}
		.tips {
			font-size: $uni-font-size-lg;
			color: $uni-color-warning;
			line-height: 56rpx;
		} 
	}
	.submit{
		margin: 0 auto;
		margin-top: 120rpx;
		width: 520rpx;
		height: 96rpx;
		background: #FFE431;
		box-shadow: 0rpx 50rpx 32rpx -36rpx rgba(255,228,49,0.4);
		border-radius: 48rpx;
		text-align: center;
		line-height: 96rpx;
		line-height: 96rpx;
		font-size: 32rpx;
		color: #272832;
		font-weight: 500;
	}
</style>
