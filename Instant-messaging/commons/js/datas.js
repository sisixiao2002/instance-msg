export default{
	friends(){
		let friendarr = [
			{
				id:1,
				imgurl:'k.png',
				tip:2,
				name:'阿力',
				email:'ali@163.com',
				time: new Date(),
				message: '2022 年卡塔尔世界杯小组赛英格兰 6:2 大胜伊朗'
			},
			{
				id:2,
				imgurl:'l.png',
				tip:35,
				name:'王老五',
				email:'wanglaowu@163.com',
				time: new Date(),
				message: '为什么生蚝能生吃，而其他的贝类吃完会有寄生虫或导致死亡'
			},
			{
				id:3,
				imgurl:'m.png',
				tip:9,
				name:'杨老二',
				email:'yanglaoer@163.com',
				time: new Date(),
				message: '文件上传漏洞是指由于程序员在对用户文件上传部分的控制不足或者处理缺陷，而导致的用户可以越过其本身权限向服务器上上传可执行的动态脚本文件。'
			},
			{
				id:4,
				imgurl:'n.png',
				tip:124,
				name:'鱼家林',
				email:'yujialin@163.com',
				time: new Date(),
				message: '状态中的数据某一些组件使用，放在共同的父组件中（状态提升）'
			},
			{
				id:5,
				imgurl:'o.png',
				tip:5,
				name:'路漫漫',
				email:'lumanman@163.com',
				time: new Date(),
				message: '如何让你遇见我，在我最美的时刻'
			},
			{
				id:6,
				imgurl:'k.png',
				tip:2,
				name:'马小跳',
				email:'maxiaotiao@163.com',
				time: new Date(),
				message: '2022 年卡塔尔世界杯小组赛英格兰 6:2 大胜伊朗'
			},
			{
				id:7,
				imgurl:'l.png',
				tip:35,
				name:'夏林果',
				email:'xialinguo@163.com',
				time: new Date(),
				message: '为什么生蚝能生吃，而其他的贝类吃完会有寄生虫或导致死亡'
			},
			{
				id:8,
				imgurl:'m.png',
				tip:9,
				name:'安琪儿',
				email:'anqier@163.com',
				time: new Date(),
				message: '文件上传漏洞是指由于程序员在对用户文件上传部分的控制不足或者处理缺陷，而导致的用户可以越过其本身权限向服务器上上传可执行的动态脚本文件。'
			},
			{
				id:9,
				imgurl:'n.png',
				tip:0,
				name:'唐飞',
				email:'tangfei@163.com',
				time: new Date(),
				message: '状态中的数据某一些组件使用，放在共同的父组件中（状态提升）'
			},
			{
				id:10,
				imgurl:'o.png',
				tip:5,
				name:'杨玉环',
				email:'yangyuhuan@163.com',
				time: new Date(),
				message: '如何让你遇见我，在我最美的时刻'
			},
		];
		return friendarr;
	},
	//好友关系
	isFriend(){
		let isfriend=[
			{
				userid:1,
				friend:2,
			},
			{
				userid:1,
				friend:5,
			},
			{
				userid:1,
				friend:6,
			},
			{
				userid:1,
				friend:8,
			},
		]
		return isfriend;
	}
	
}