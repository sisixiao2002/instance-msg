<template>
	<view class="content">
		<!-- 顶部栏 -->
		<view class="top-bar">
			<view class="top-bar-left" @click="backOne">
				<img src="../../static/images/common/返回.png" class="back" >
			</view>
			<view class="top-bar-right">
				<img src="../../static/images/userhome/more.png" class="share" >
			</view>
		</view>
		<!-- 背景层 -->
		<view class="bg">
			<view class="bg-bai" :animation="animationData4"></view>
			<image src="../../static/images/userhome/three.png" class="bg-img" mode="aspectFill"></image>
		</view>
		<!-- 用户信息 -->
		<view class="info">
			<view class="head-portrait" :animation="animationData2">
				<img src="../../static/images/userhome/three.png" class="head-img" mode="aspectFill" >
				<view class="sex-box" :style="{background:sexbg}" :animation="animationData3">
					<img src="../../static/images/userhome/female.png" class="sex-img">
				</view>
			</view>
			<view class="username">{{user.username}}</view>
			<view class="nickname">昵称：{{user.nickname}}</view>
			<view class="tag">{{user.tag}}</view>
		</view>
		<!-- 底部按钮 -->
		<view class="bottom-bar">
			<view class="btn" @tap="addFriendAnimate">加为好友</view>
		</view>
		<!-- 点击添加为好友动效 -->
		<view class="add-misg" 
					:style="{height:addHeight + 'px',bottom:'-'+addHeight + 'px'}"
					:animation="animationData">
			<view class="name">{{myname}}</view>
			<textarea :value="myname+'请求加为好友~'" maxlength="120" class="add-main"></textarea>
			<view class="add-btn" :animation="animationData1">
				<view class="cancle" @tap="addFriendAnimate">取消</view>
				<view class="send">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addHeight:'',									//add板块高度
				sexbg:'rgba(255,93,91,1)',		//性别图标bgc
				animationData:{},							//动画1
				animationData1:{},							//动画2
				animationData2:{},							//动画3
				animationData3:{},						//动画4	
				animationData4:{},						//动画5	
				isAdd:false,									
				myname:'coco',							
				user:{
					username:'鱼家林',
					nickname:'耐克船长',
					tag:'夜，结束了一天的喧嚣后安静下来，伴随着远处路灯那微弱的光。风，毫无预兆地席卷整片旷野，撩动人的思绪万千。'
				}
			}
		},
		onReady() {
			this.getElementStyle();
		},
		methods: {
			//返回上一页面
			backOne(){
				uni.navigateBack({
					delta: 1
				});
			},
			//获取屏幕高度
			getElementStyle(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg').boundingClientRect(data => {
				 /* console.log("得到布局位置信息" + JSON.stringify(data));
				  console.log("节点离页面顶部的距离为" + data.top); */
					this.addHeight = data.height - 186;
				}).exec();
			},
			//添加好友动画
			addFriendAnimate(){
				this.isAdd = !this.isAdd
				//点击添加好友弹出add板块
				var animation = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				//点击添加好友弹出底部按钮
				var animation1 = uni.createAnimation({
				  duration: 400,
				  timingFunction: "ease",
				})
				//点击添加好友，头像缩小向右移动
				var animation2 = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				//性别图标是否显示
				var animation3 = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				//背景颜色变成黄色
				var animation4 = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				if(this.isAdd){
					animation.bottom(0).step()
					animation1.bottom(0).step()
					animation2.right(80).scale(0.6).step()
					animation3.opacity(0).step()
					animation4.backgroundColor('rgba(255,228,49,0.8)').step()
				}else{
					animation.bottom(-this.addHeight).step()
					animation1.bottom(-100).step()
					animation2.right(0).step()
					animation3.opacity(1).step()
					animation4.backgroundColor('rgba(255,228,49,0)').step()
				}
				
				this.animationData = animation.export()
				this.animationData1 = animation1.export()
				this.animationData2 = animation2.export()
				this.animationData3 = animation3.export()
				this.animationData4 = animation4.export()
			},
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100%;
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
		padding-top: var(--status-bar-height);
		.top-bar-left {
			height: 100%;
			width: 88rpx;
			display: flex;
			align-items: center;
			.back {
				margin-left: 24rpx;
				width: 48rpx;
				height: 48rpx;
			}
		}
		.top-bar-right {
			height: 100%;
			width: 88rpx;
			display: flex;
			align-items: center;
			.share {
				margin-rigth: 24rpx;
				width: 52rpx;
				height: 12rpx;
			}
		}
	}
	
	.bg {
		position: fixed;
		z-index: -2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.bg-bai {
			width: 100%;
			height: 100%;
			//background-color: #eee;
		}
		.bg-img{
			position: absolute;
			left: -10rpx;
			top: -10rpx;
			z-index: -1;
			width: 110%;
			height: 110%;
			opacity: 0.4;
			filter: blur(16px);
		}
	}
	
	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.head-portrait{
			box-shadow: 0px 36px 40px 0px rgba(39,40,50,0.1);
			z-index: 10;
			margin-top: 60rpx;
			position: relative;
			.head-img {
				width: 400rpx;
				height: 400rpx;
				border: 6rpx solid #FFFFFF;
				border-radius: 48rpx;
			}
			.sex-box {
				z-index: 11;
				position: absolute;
				top: 320rpx;
				left: 320rpx;
				width: 64rpx;
				height: 64rpx;
				border-radius: 56rpx;
				.sex-img { 
					margin: 16rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
		.username {
			margin-top: 80rpx;
			font-size: 52rpx;
			color: #272832;
			font-weight: 400;
		}
		.nickname {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: #272832;
			font-weight: 400;
		}
		.tag {
			margin-top: 20rpx;
			padding: 20rpx 100rpx;
			font-size: 28rpx;
			color: #272832;
			line-height: 48rpx;
			font-weight: 200;
		}
	}
	.bottom-bar {
		position: fixed;
		padding-bottom: var(--status-bar-height);
		bottom: 0rpx;
		width: 100%;
		height: 100rpx;
		//background-color: #eee;
		.btn {
			margin: 10rpx auto;
			width: 684rpx;
			height: 80rpx;
			background: #FFE431;
			border-radius: 10rpx;
			text-align: center;
			line-height: 80rpx;
			font-size: 32rpx;
			color: #272832;
			font-weight: 400;
		}
	}
	.add-misg {
		position: fixed;
		padding: 0 56rpx;
		box-sizing: border-box;
		/* bottom: 0; */
		width: 100% ;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0 0;
		.name {
			margin-top: 180rpx;
			margin-left: 60rpx;
			font-size: 52rpx;
			color: #272832;
			font-weight: 400;
			line-height: 74rpx;
		}
		.add-main {
			box-sizing: border-box;
			padding: 18rpx 22rpx;
			margin: 40rpx auto 0;
			height: 420rpx;
			background: #F3F4F6;
			border-radius: 20rpx;
		}
		.add-btn {
			position: fixed;
			bottom: -100rpx;
			z-index: 100;
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			padding-bottom: var(--status-bar-height);
			.cancle {
				width: 180rpx;
				height: 80rpx;
				background: rgba(39,40,50,0.10);
				border-radius: 10px;
				text-align: center;
				line-height: 80rpx;
				font-size: 32rpx;
				color: #272832;
				font-weight: 400;
			}
			.send {
				margin-right: 80rpx;
				width: 480rpx;
				height: 80rpx;
				background: #FFE431;
				border-radius: 10rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 32rpx;
				color: #272832;
				font-weight: 400;
			}
		}
	}
	
</style>
