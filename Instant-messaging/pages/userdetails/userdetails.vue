<template>
	<view class="content">
		<!-- 顶部栏 -->
		<view class="top-bar">
			<!-- 返回键 -->
			<view class="top-bar-left" @click="backOne">
				<img src="../../static/images/common/返回.png" class="back">
			</view>
			<view class="top-bar-center">详情</view>
		</view>
		<view class="main">
			<view class="box">
				<!-- 第一行 头像-->
				<view class=" column heads">
					<view class="left">
						<view class="title">头像</view>
						<view class="cont">
							<!-- 图片裁剪 -->
							<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>

							<image :src="cropFilePath" @tap="upload" class="user-img"></image>

						</view>
					</view>
					<view class="right">
						<!-- <image src="../../static/images/userdetail/more.png" class="more"></image> -->
					</view>
				</view>
				<!-- 第二行 签名-->
				<view class=" column" @tap="Modify('签名',dataarr.sign,false)">
					<view class="left">
						<view class="title">签名</view>
						<view class="cont">
							{{dataarr.sign}}
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/userdetail/more.png" class="more"></image>
					</view>
				</view>
				<!-- 第三行 注册时间-->
				<view class=" column">
					<view class="left">
						<view class="title">注册时间</view>
						<view class="cont">
							{{changeTime(dataarr.time)}}
						</view>
					</view>
					<view class="right"></view>
				</view>
			</view>
			<view class="box">
				<!-- 第4行 昵称-->
				<view class=" column" @tap="Modify('昵称',dataarr.name,false)">
					<view class="left">
						<view class="title">昵称</view>
						<view class="cont">
							{{dataarr.name}}
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/userdetail/more.png" class="more"></image>
					</view>
				</view>
				<!-- 第5行 性别-->
				<view class=" column">
					<view class="left">
						<view class="title">性别</view>
						<view class="cont">
							<picker @change="bindPickerChange" :value="index" :range="array">
								<view class="uni-input">{{array[index]}}</view>
							</picker>
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/userdetail/more.png" class="more"></image>
					</view>
				</view>
				<!-- 第6行 生日-->
				<view class=" column" >
					<view class="left">
						<view class="title">生日</view>
						<view class="cont">
							<picker mode="date" :value="date" :start="startDate" :end="endDate"
								@change="bindDateChange">
								<view class="uni-input">{{date}}</view>
							</picker>
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/userdetail/more.png" class="more"></image>
					</view>
				</view>
				<!-- 第7行 电话 -->
				<view class=" column" @tap="Modify('电话',dataarr.tell,false)">
					<view class="left">
						<view class="title">电话</view>
						<view class="cont">
							{{dataarr.tell}}
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/userdetail/more.png" class="more"></image>
					</view>
				</view>
				<!-- 第8行 邮箱-->
				<view class=" column" @tap="Modify('邮箱',dataarr.mail,false)">
					<view class="left">
						<view class="title">邮箱</view>
						<view class="cont">
							{{dataarr.mail}}
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/userdetail/more.png" class="more"></image>
					</view>
				</view>
			</view>
			<view class="box">
				<!-- 第9行 密码-->
				<view class=" column" @tap="Modify('密码','',true)" >
					<view class="left">
						<view class="title">密码</view>
						<view class="cont">
							**********
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/userdetail/more.png" class="more"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btn">退出应用</view>
		<!-- 弹出层 -->
		<view class="modify" :style="{bottom:-+widHeight+'px'}" :animation="animationData">
			<view class="modify-header">
				<view class="close" @tap="Modify()">取消</view>
				<view class="title">{{modifyTitle}}</view>
				<view class="define" @tap="modifyStbmit()">确定</view>
			</view>
			<view class="modify-main">
				<view class="modify-pwd" v-show="ispwd">
					<input type="text" placeholder="请输入原密码" placeholder-class="color:#aaa;font-weight:400">
				</view>

				<textarea v-model="data" class="modify-content" v-show="!ispwd"></textarea>
			</view>
		</view>
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	import myFunction from "@/commons/js/myFunction.js"
	
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				//模拟数据
				dataarr:{
					name:'唐飞',
					time: new Date(),
					sex: '男',
					birth:'1998-04-12',
					tell:'12312312312',
					mail:'tangfei@163.com',
					sign: '状态中的数据某一些组件使用，放在共同的父组件中（状态提升）'
				},
				cropFilePath: '../../static/images/index/m.png',
				array: ['男', '女', '未知'],		//性别
				index: 0,
				date: currentDate,
				tempFilePath: '',
				data: '', //修改内容 
				pwd: '', //原密码
				ispwd:false,//是否呈现密码框
				animationData: {}, //动画
				modifyTitle:'',		//弹出窗口标题
				isModify: false, //动画开关		
				widHeight: '', //窗口高度
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		components: {
			ImageCropper
		},
		onReady() {
			this.getElementStyle();
		},
		methods: {
			backOne() {
				uni.navigateBack({
					delta: 1
				});
			},
			//时间处理
			changeTime(date) {
				return myFunction.detailTime(date)
			},
			//性别选择器
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			//日期选择器
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//头像裁剪
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], //从相册选择
					success: (res) => {
						this.tempFilePath = res.tempFilePaths.shift();
					},
				});
			},
			confirm(e) {
				this.tempFilePath = "";
				this.cropFilePath = e.detail.tempFilePath;

				// #ifdef APP-PLUS||MP
				//除了H5端返回base64数据外，其他端都是返回临时地址，所以你要判断base64还是临时文件名，（用条件编译APP-PLUS||MP执行编译。）
				//按我这里是先上传裁剪得来的临时文件地址然后得到临时文件名，
				//待活你要判断是H5还是其他端传给后端类型参数让后端判断执行何种情况代码就OK了

				uni.uploadFile({
					url: "后端地址上传图片接口地址",
					filePath: this.cropFilePath,
					name: "file",
					fileType: "image",
					//formData:{},传递参数
					success: (uploadFileRes) => {
						var backstr = uploadFileRes.data;
						//自定义操作
					},

					fail(e) {
						console.log("this is errormes " + e.message);
					},
				});

				// #endif
			},
			cancel() {
				console.log("canceled");
				this.tempFilePath = "";
			},

			//获取屏幕高度
			getElementStyle() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.modify').boundingClientRect(data => {
					/* console.log("得到布局位置信息" + JSON.stringify(data));
					 console.log("节点离页面顶部的距离为" + data.top); */
					this.widHeight = data.height;
				}).exec();
			},

			// 修改项弹窗
			Modify(tpye,data,ispwd) {
				this.isModify = !this.isModify
				this.modifyTitle = tpye
				this.data = data
				this.ispwd = ispwd
				//弹出修改板块
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: "ease",
				})

				if (this.isModify) {
					animation.bottom(0).step()

				} else {
					animation.bottom(-this.widHeight).step()
				}

				this.animationData = animation.export()
			},
			//弹框修改点击确定
			modifyStbmit() {
				this.Modify()
			},
		},
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
		margin-top: 42rpx;
		width: 100%;
	}

	.box {
		border-bottom: 1rpx solid rgba(197, 197, 197, 1.0);
		margin-top: 10rpx;

		.column {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 120rpx;
			background: #FFFFFF;

			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;

				.title {
					margin-left: 32rpx;
					font-size: 32rpx;
					color: #272832;
				}

				.cont {
					width: 450rpx;
					margin-left: 32rpx;
					font-size: 32rpx;
					color: rgba(39, 40, 50, 0.60);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

					.user-img {
						width: 108rpx;
						height: 108rpx;
						border-radius: 20rpx;
					}
				}
			}

			.right {
				margin-right: 26rpx;

				.more {
					width: 28rpx;
					height: 28rpx;
				}
			}
		}

	}

	.heads {
		height: 135rpx;
	}

	.btn {
		margin-top: 178rpx;
		width: 124rpx;
		height: 44rpx;
		font-family: PingFangSC-Regular;
		font-size: 32rpx;
		color: #FF5D5B;
		letter-spacing: -0.55rpx;
		font-weight: 400;
	}

	/*修改弹出框*/
	.modify {
		position: fixed;
		z-index: 1002;

		left: 0;
		height: 100%;
		width: 100%;
		background-color: #fff;

		.modify-header {
			padding-top: var(--status-bar-height);
			width: 100%;
			height: 88rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(0, 0, 0, 0.1);
			margin-bottom: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.close {
				margin-left: 32rpx;
				font-size: 32rpx;
				color: #272832;
			}

			.title {
				font-size: 40rpx;
				color: #272832;
			}

			.define {
				margin-right: 32rpx;
				font-size: 32rpx;
				color: #4AAAFF;
			}
		}

		.modify-main {
			margin: 34rpx 0;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 400rpx;

			.modify-pwd {
				box-sizing: border-box;
				padding: 0 22rpx;
				width: 686rpx;
				height: 88rpx;
				background-color: $uni-bg-color-grey;
				border-radius: 20rpx;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 100rpx;

				input {
					height: 100%;
				}
			}

			.modify-content {
				box-sizing: border-box;
				margin: 22rpx auto;
				padding: 16rpx 22rpx;
				width: 686rpx;
				height: 386rpx;
				background: #F3F4F6;
				border-radius: 30rpx;
			}
		}
	}
</style>
