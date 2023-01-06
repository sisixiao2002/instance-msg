<template>
	<view class="content">
		<!-- 顶部栏 -->
		<view class="top-bar">
			<!-- 搜索框 -->
			<view class="search-box">
				<input confirm-type="search" placeholder="搜索用户名/群" class="search-input"
					placeholder-class="color:#aaa;font-weight:400" @input="search">
				<img src="../../static/images/search/search.png" class="search-icon">
			</view>
			<view class="cancle" @tap="back">取消</view>
		</view>
		<!-- 主视图 -->
		<view class="main">
			<!-- 搜索出来的用户 -->
			<view class="search-user">
				<!-- 标题 -->
				<view class="title" v-if="userarr.length>0">用户</view>
				<!-- 列表呈现 -->
				<view class="list" v-for="(item,index) in userarr " :key="item.id">
					<view class="user-box">
						<navigator url="../userhome/userhome?id=aaa" hover-class="none">
							<img :src="item.imgurl" class="usericon">
						</navigator>
						
						<view class="names">
							<view class="user-name" v-html="item.name"></view>
							<view class="email" v-html="item.email"></view>
						</view>
					</view>
					<view class="send msg" v-if="item.tip == 1">发消息</view>
					<view class="send addfriend" v-if="item.tip == 0">加好友</view>
				</view>

			<!-- 搜索出来的group -->
			<view class="search-group">
				<!-- 标题 -->
				<view class="title">群组</view>
				<!-- 列表呈现 -->
				<view class="list">
					<view class="group-box">
						<img src="../../static/images/index/m.png" class="groupicon">
						<view class="group-name">力争上游</view>
					</view>
					<view class="sendmsg">发消息</view>
				</view>
			</view>
		</view>

	</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	export default {
		data() {
			return {
				userarr:[],
			};
		},
		methods:{
			//获取搜索框关键字
			search(e){
				this.userarr = [];
				let searchval = e.detail.value;
				if(searchval.length>0){
					this.searchUser(searchval)
				}
			},
			//寻找关键词匹配的用户
			//搜索用户/邮箱,search()如果没有找到任何匹配的子串，则返回 -1。
			searchUser(e){
				let arr = datas.friends();
				let exp = eval('/'+e+'/g');
				/* let exp =new RegExp(e,"g") */
				for(let i=0;i<arr.length;i++){
					if(arr[i].name.search(e) !=-1 || arr[i].email.search(e) !=-1){
						this.isFriend(arr[i])
						//处理图片地址
						arr[i].imgurl = '../../static/images/index/' + arr[i].imgurl;
						//关键字高亮处理
						arr[i].name = arr[i].name.replace(exp,"<span style='color:#4AAAFF;'>"+e+"</span>")
						arr[i].email  =arr[i].email.replace(exp,"<span style='color:#4AAAFF;'>"+e+"</span>")
						//数据插入列表
						this.userarr.push(arr[i]);
					}
				}
			},
			//判断是否为好友
			isFriend(e){
				let tip = 0;
				//获取用户的好友表
				let arr = datas.isFriend()
				for(let i=0;i<arr.length;i++){
					if(arr[i].friend == e.id){
						tip = 1;
					}
				}
				e.tip = tip;
			},
			//返回
			back(){
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
		width: 750rpx;
		height: 88rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(0, 1, 0, 0.11);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		padding-top: var(--status-bar-height);

		.search-box {
			width: 600rpx;
			height: 60rpx;
			background: #F3F4F6;
			border-radius: 10rpx;
			margin-left: 32rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.search-input {
				margin-left: 30rpx;
				width: 500rpx;
			}

			.search-icon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 12rpx;
			}
		}

		.cancle {
			width: 56rpx;
			height: 40rpx;
			text-align: center;
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			color: #272832;
			font-weight: 400;
			margin-right: 32rpx;
		}
	}

	.main {
		width: 686rpx;
		margin: 0 auto;

		.search-user {
			.title {
				width: 86rpx;
				height: 60rpx;
				font-family: PingFangSC-Semibold;
				font-size: 40rpx;
				color: #272832;
				font-weight: 600;
				margin-top: 34rpx;
				margin-bottom: 20rpx;
			}

			.list {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				/* border: 1px solid green; */
				margin-bottom: 40rpx;

				.user-box {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.usericon {
						width: 80rpx;
						height: 80rpx;
						border-radius: 20rpx;
					}

					.names {
						margin-left: 32rpx;

						.user-name {
							height: 50rpx;
							font-family: PingFangSC-Regular;
							font-size: 36rpx;
							color: #272832;
							line-height: 50rpx;
							font-weight: 400;
						}

						.email {
							font-family: PingFangSC-Regular;
							font-size: $uni-font-size-sm;
							color: $uni-text-color;
							width: 400rpx;
							margin-top: 15rpx;
						}

					}

				}

				.send {
					width: 120rpx;
					height: 48rpx;
					border-radius: 24rpx;
					font-family: PingFangSC-Regular;
					text-align: center;
					font-size: 24rpx;
					line-height: 48rpx;
					font-weight: 400;
				}
				.msg {
					background: #FFE431;
					color: #272832;
				}
				
				.addfriend {
					background: rgba(74, 170, 255, 0.10);
					color: #4AAAFF;
				}
			}
		}

		.search-group {
			.title {
				width: 86rpx;
				height: 60rpx;
				font-family: PingFangSC-Semibold;
				font-size: 40rpx;
				color: #272832;
				font-weight: 600;
				margin-top: 34rpx;
				margin-bottom: 20rpx;
			}

			.list {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 40rpx;

				.group-box {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.groupicon {
						width: 80rpx;
						height: 80rpx;
						border-radius: 20rpx;
					}

					.group-name {
						height: 50rpx;
						font-family: PingFangSC-Regular;
						font-size: 36rpx;
						color: #272832;
						line-height: 50rpx;
						font-weight: 400;
						margin-left: 32rpx;
					}
				}

				.sendmsg {
					width: 120rpx;
					height: 48rpx;
					background: #FFE431;
					border-radius: 24rpx;
					font-family: PingFangSC-Regular;
					text-align: center;
					font-size: 24rpx;
					line-height: 48rpx;
					color: #272832;
					font-weight: 400;
				}
			}
		}


	}
</style>
-->
