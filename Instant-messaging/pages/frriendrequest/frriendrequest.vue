<template>
	<view class="content">
		<!-- 顶部栏 -->
		<view class="top-bar">
			<!-- 返回键 -->
			<view class="top-bar-left" @click="backOne" >
				<img src="../../static/images/common/返回.png" class="back">
			</view>
			<view class="top-bar-center">好友请求</view>
		</view>
		<!-- 主视角 -->
		<view class="main">
			<view class="apply" v-for="(item,index) in requestres" :key="item.id">
				<!-- 信息 -->
				<view class="info">
					<!-- 头像 -->
					<view class="head-portrait">
						<img :src="item.imgurl" class="head-img" mode="aspectFill">
					</view>
					<!-- 申请人名字 -->
					<view class="applyname">{{item.name}}</view>
					<!-- 申请时间 -->
					<view class="apply-time">{{changeTime(item.time)}}</view>
					<!-- 申请词 -->
					<!-- <textarea value="对方留言：你好我是周深" maxlength="50" class="tag"></textarea> -->
					<view class="tag">对方留言：{{item.message}}</view>
					<!-- 底部按钮 -->
					<view class="bottom-bar">
						<view class="no">拒绝</view>
						<view class="yes">同意</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	import myFunction from '../../commons/js/myFunction.js'
	export default {
		data() {
			return {
				requestres: []
			};
		},
		onLoad() {
			this.getRequest()
		},
		methods:{
			//获取时间修改
			changeTime(date) {
				return myFunction.dateTime(date)
			},
			getRequest() {
				this.requestres = datas.friends();
				for (let i = 0; i < this.requestres.length; i++) {
					this.requestres[i].imgurl = '../../static/images/index/' + this.requestres[i].imgurl;
				}
				//console.log(this.friends)
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
		justify-content: space-between;
		height: 88rpx;
		width: 100%;
		padding-top: var(--status-bar-height);
		background: #FFFFFF;
		box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);

		.top-bar-left {
			margin-left: 24rpx;
			.back {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.top-bar-center {
			margin-right: 336rpx;
			text-align: center;
			font-size: 40rpx;
			color: #272832;
		}
	}

	.main {
		margin-top: 20rpx;
		margin-bottom: $uni-spacing-col-lg;
		width: 100%;
	}
	.apply {
		margin-top: 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.info{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
			padding: 20rpx 40rpx;
			.head-img{
				top: -100rpx;
				width: 200rpx;
				height: 200rpx;
				border-radius: 200rpx;
				background-color: $uni-color-primary;
			}
			.applyname{
				text-align: center;
				margin-top: 20rpx;
				font-size: 52rpx;
				color: #272832;
				font-weight: 400;
			}
			.apply-time{
				text-align: center;
				margin-top: 10rpx;
				font-size: 28rpx;
				color: #272832;
				font-weight: 400;
			}
			.tag{
				box-sizing: border-box;
				padding: 18rpx 25rpx;
				margin: 20rpx auto 0;
				width: 600rpx;
				background: #F3F4F6;
				color: #90908a;
				border-radius: 20rpx;
				
			}
		}
		.bottom-bar {
			margin-top: 30rpx;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding-bottom: var(--status-bar-height);
		
			.no {
				width: 180rpx;
				height: 80rpx;
				background: rgba(39, 40, 50, 0.10);
				border-radius: 40rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 32rpx;
				color: #272832;
				font-weight: 400;
			}
		
			.yes {
				margin-left: 50rpx;
				width: 180rpx;
				height: 80rpx;
				background: #FFE431;
				border-radius: 40rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 32rpx;
				color: #272832;
				font-weight: 400;
			}
		}
	}

</style>
