import $H from '../../common/lib/request.js'
export default {
	state:{
		loginStatus:false,
		token:'',
		userInfo:{}
	},
	mutations:{
		initLoginInfo(state){
			let loginInfo = uni.getStorageSync('loginInfo')
			if(loginInfo){
				loginInfo = JSON.parse(loginInfo)
				state.userInfo = loginInfo;
				state.loginStatus = true;
				state.token = loginInfo.token;
			}
		},
		login(state,{username,password,success,fail}){
			$H.post('/login',{
				username,
				password,
			}).then(res=>{
				if(res.id){
					state.userInfo = res;
					state.loginStatus = true;
					state.token = res.token;
					success && success(res);
					uni.setStorageSync('loginInfo',JSON.stringify(state.userInfo))
				}
			})
		},
		loginOut(state,{success}){
			console.log(state)
			$H.post('/logout',{},{
				header:{
					token:state.token
				}
			}).then(res=>{
				state.userInfo = {}
				state.loginStatus = false
				state.token = ''
				success && success();
			})
		}
	},
	actions:{
		
	}
}