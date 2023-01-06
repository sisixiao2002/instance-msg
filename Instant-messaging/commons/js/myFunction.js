export default{
	//首页时间转换
	dateTime(date){
		//将过去时间与现在时间进行比较
		let old = new Date(date);
		let now = new Date();
		//获取old具体时间
		let d = old.getTime();
		let h = old.getHours();
		let m = old.getMinutes();
		let Y = old.getFullYear();
		let M = old.getMonth()+1;
		let D = old.getDate();
		//获取now具体时间
		let nd = now.getTime();
		let nh = now.getHours();
		let nm = now.getMinutes(); 
		let nY = now.getFullYear();
		let nM = now.getMonth()+1;
		let nD = now.getDate();
		//如果消息是当天的只显示hh:mm
		if(D === nD && M === nM  && Y === nY){
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0' +m;
			}
			return h + ':' + m;
		}
		//如果消息是昨天的显示：昨天hh:mm
		if(D+1 === nD && M === nM  && Y === nY){
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0' +m;
			}
			return '昨天'+h + ':' + m;
		}
		//如果消息是前天的只显示：前天hh:mm
		if(D+2 === nD && M === nM  && Y === nY){
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0' +m;
			}
			return '前天'+h + ':' + m;
		}else{
			//大于两天显示：年月日
			return Y+'/'+M+'/'+D
		}
	},
	
	//用户详情页具体时间
	detailTime(date){
		//将过去时间与现在时间进行比较
		let old = new Date(date);
		let now = new Date();
		//获取old具体时间
		let d = old.getTime();
		let h = old.getHours();
		let m = old.getMinutes();
		let Y = old.getFullYear();
		let M = old.getMonth()+1;
		let D = old.getDate();
		//获取now具体时间
		let nd = now.getTime();
		let nh = now.getHours();
		let nm = now.getMinutes(); 
		let nY = now.getFullYear();
		let nM = now.getMonth()+1;
		let nD = now.getDate();
		
		//处理时间
		if(M<10){
			M = '0' + M;
		}
		if(D<10){
			D = '0'+D;
		}
		if(h<10){
			h = '0'+h;
		}
		if(m<10){
			m = '0' +m;
		}
		return Y+'/'+M+'/'+D+'----'+h+':'+m;
	}
}