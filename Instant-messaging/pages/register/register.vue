<template>
	<view class="content">
		<!-- 顶部栏 -->
		<view class="top-bar">
			<view class="top-bar-left" @click="backOne">
				<img src="../../static/images/common/返回.png" class="back" >
			</view>
		</view>
		<!-- 主视图 -->
		<!-- 图片 -->
		<view class="topicon">
			<img src="../../static/images/login/火.png" class="icon">
		</view>
		<!-- 填表区 -->
		<view class="main">
			<view class="title">注册</view>
			<!-- 输入区 -->
			<view class="inputs">
				<view class="inputs-div">
					<input type="text" placeholder="请取个名字" class="user" placeholder-class="color:#aaa;font-weight:400" @input="getUser">
					<view class="employ" v-if="nameEmploy">用户名已存在</view>
					<img src="../../static/images/register/Group.png" class="ok" v-if="isuser">
				</view>
				<view class="inputs-div">
					<input type="text" placeholder="请输入邮箱" class="email" placeholder-class="color:#aaa;font-weight:400" @input="getEmail" >
					<view class="employ" v-if="emailEmploy">邮箱已注册</view>
					<view class="invalid" v-if="invaild">无效邮箱</view>
					<img src="../../static/images/register/Group.png" class="ok" v-if="isemail">
				</view>
				<view class="inputs-div">
					<input :type="type" placeholder="请输入密码" class="pwd" placeholder-class="color:#aaa;font-weight:400" @input="getPsw">
					<img :src="lookUrl" class="look"  @click="handleLook">
				</view>
			</view>
		</view>
		<view :class="[{submit:isok},{submit1:!isok}]">注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'password', 		//控制input框type是密码还是文本
				isuser: true,    			//用户名是否合法，控制勾这个图片
				isemail: true, 				//邮箱是否合法，控制勾这个图片
				nameEmploy: false,    	//名字是否被占用
				emailEmploy: false,    //邮箱是否被占用
				invaild: false,				//邮箱是否合法，如果不合法则显示该邮箱无效
				look: false, 					//控制是否显示密码，睁眼图还是闭眼图
				lookUrl: '../../static/images/register/open.png',//睁眼闭眼图
				email:'',					//邮箱
				user:'',					//用户名
				psw:'',						//密码
				isok: false,      //注册按钮是否可提交
			}
		},
		methods: {
			//密码显示隐藏
			handleLook(){
				if(this.look){
					this.type = 'password'
					this.look = !this.look
					this.lookUrl = '../../static/images/register/close.png'
				}else{
					this.type = 'text'
					this.look = !this.look
					this.lookUrl = '../../static/images/register/open.png'
				}
			},
			//获取username
			getUser(e){
				this.user = e.detail.value;
				this.isOK();
			},
			//获取email判断输入邮箱格式是否正确
			getEmail(e){
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				this.email = e.detail.value
				if(this.email.length > 0){
					if(reg.test(this.email)){
						this.invaild = false
					}else{
						this.invaild = true
					}
				}
				this.isOK();
			},
			//获取密码
			getPsw(e){
				this.psw = e.detail.value;
				this.isOK();
			},
			isOK(){
				if(this.isuser && this.isemail && this.psw.length>5){
					this.isok = true;
				}else{
					this.isok = false;
				}
			},
			//返回上一页面
			backOne(){
				uni.navigateBack({
					delta: 1
				});
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
		justify-content: space-between;
		height: 88rpx;
		width: 100%;
		background: $uni-bg-color;
		padding-top: var(--status-bar-height);
		border-bottom: 1px solid $uni-border-color;

		.top-bar-left {
			height: 100%;
			width: 88rpx;
			display: flex;
			align-items: center;

			.back {
				margin-left: 32rpx;
				width: 36rpx;
				height: 36rpx;
			}
		}
	}

	.topicon {
		width: 100%;
		height: 150rpx;
		margin-top: 80rpx;
		margin-bottom: 68rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.icon {
			width: 200rpx;
			height: 100rpx;
		}
	}

	.main {
		margin-left: 80rpx;
		width: 100%;

		.title {
			height: 80rpx;
			font-family: PingFangSC-Medium;
			font-size: 56rpx;
			color: $uni-text-color;
			font-weight: 500;
		}

		.inputs {
			padding-top: 8rpx;
			.inputs-div {
				border-bottom: 1px solid $uni-border-color;
				width: calc(100vw - 120rpx);
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 80rpx;
				input {
					height: 48rpx;
					font-size: $uni-font-size-lg;
					color: $uni-text-color;
					line-height: 88rpx;
					font-weight: 500;
				}
				.employ ,.invalid{
					font-family: PingFangSC-Medium;
					font-size: 28rpx;
					color: #FF5D5B;
					font-weight: 500;
				}
				.ok {
					width: 42rpx;
					height: 32rpx;
				}
				.look {
					width: 40rpx;
					height: 20rpx;
				}
			}
		}

	}

	.submit {
		margin: 0 auto;
		margin-top: 120rpx;
		width: 520rpx;
		height: 96rpx;
		background: #FFE431;
		box-shadow: 0rpx 50rpx 32rpx -36rpx rgba(255, 228, 49, 0.4);
		border-radius: 48rpx;
		text-align: center;
		line-height: 96rpx;
		line-height: 96rpx;
		font-size: 32rpx;
		color: #272832;
		font-weight: 500;
	}
	.submit1 {
		margin: 0 auto;
		margin-top: 120rpx;
		width: 520rpx;
		height: 96rpx;
		background: rgba(39,40,50,0.20);
		border-radius: 48rpx;
		text-align: center;
		line-height: 96rpx;
		line-height: 96rpx;
		font-size: 32rpx;
		color: #fff;
		font-weight: 500;
	}
</style>
