<template>
	<view class="content">
		<!-- topbar -->
		<view class="top-bar">
			<navigator url="../userhome/userhome?id=aaa" class="top-bar-left" hover-class="none">
				<img src="../../static/images/index/head-portrait.png" />
			</navigator>
			<view class="top-bar-center">
				Instant-Message
			</view>
			<view class="top-bar-right">
				<view class="search"><img src="../../static/images/index/搜索.png" class="search" @tap="goSearch"></view>
				<view class="add"><img src="../../static/images/index/add.png" class="add"></view>
			</view>
		</view>
		<!-- 主视角 -->
		<view class="main">
			<!-- 新增好友申请 -->
			<view class="apply">
				<view class="friend">
					<!-- 左边 -->
					<view class="friend-left">
						<!-- 头像 -->
						<view class="friend-head">
							<img src="../../static/images/index/好友认证.png" class="friend-picture">
							<view class="message-count">1</view>
						</view>
						<!-- 内容 -->
						<view class="friend-content">
							<view class="friend-name">好友请求</view>
							<view class="friend-message">相逢便是一种缘分</view>
						</view>
					</view>
					<!-- 右边 -->
					<view class="message-time">20:00</view>
				</view>
			</view>
			<!-- 好友消息 -->
			<view class="friends-list">
				<view class="friend" v-for="(item,index) in friends" :key="item.id">
					<!-- 左边 -->
					<view class="friend-left">
						<!-- 头像 -->
						<view class="friend-head">
							<img :src="item.imgurl" class="friend-picture">
							<view class="message-count">{{item.tip}}</view>
						</view>
						<!-- 内容 -->
						<view class="friend-content">
							<view class="friend-name">{{item.name}}</view>
							<view class="friend-message">{{item.message}}</view>
						</view>
					</view>
					<!-- 右边 -->
					<view class="message-time">{{changeTime(item.time)}}</view>
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
				friends: []
			}
		},
		onLoad() {
			this.getFriends()
		},
		methods: {
			changeTime(date) {
				return myFunction.dateTime(date)
			},
			getFriends() {
				this.friends = datas.friends();
				for (let i = 0; i < this.friends.length; i++) {
					this.friends[i].imgurl = '../../static/images/index/' + this.friends[i].imgurl;
				}
				//console.log(this.friends)
			},
			goSearch(){
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
		}
	}
</script>


<style lang="scss">
	@import '../../commons/css/mycss.scss';

	.main {
		margin-top: 100rpx;
		margin-bottom: $uni-spacing-col-lg;
		width: 100%;

		.friend {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 140rpx;
			width: 100%;
			box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);

			&:active {
				background-color: $uni-bg-color-grey;
			}

			.friend-left {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-left: $uni-spacing-col-base;

				.friend-head {
					position: relative;

					.friend-picture {
						width: 96rpx;
						height: 96rpx;
						border-radius: $uni-border-radius-base;
						background-color: $uni-color-primary;
					}

					.message-count {
						position: absolute;
						top: -18rpx;
						right: -20rpx;
						min-width: 24rpx;
						padding: 0 6rpx;
						height: 36rpx;
						border-radius: 18rpx;
						font-size: $uni-font-size-sm;
						text-align: center;
						line-height: 36rpx;
						color: $uni-text-color-inverse;
						background: $uni-color-warning;
					}
				}

				.friend-content {
					margin-left: $uni-spacing-col-base;

					.friend-name {
						margin-bottom: 10rpx;
						font-family: PingFangSC-Regular;
						font-size: 36rpx;
						color: #272832;
						letter-spacing: -0.62rpx;
						font-weight: 400;
					}

					.friend-message {
						font-family: PingFangSC-Regular;
						font-size: $uni-font-size-base;
						color: rgba(39, 40, 50, 0.60);
						width: 400rpx;
						overflow: hidden; //超出部分隐藏
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}

			}

			.message-time {
				height: 140rpx;
				margin-top: 60rpx;
				margin-left: 20rpx;
				margin-right: $uni-spacing-col-base;
				font-family: PingFangSC-Regular;
				font-size: $uni-font-size-sm;
				color: rgba(39, 40, 50, 0.40);
			}
		}
	}
</style>
