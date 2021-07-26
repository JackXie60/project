<template>
	<view>
		<uniStatusBar></uniStatusBar>
		<view class="d-flex a-center text-secondary py-1 px-3">
			<view class="iconfont icon-shanchu1" @click="goBack"></view>
			<view class="ml-auto" @click="forget">
				忘记密码
			</view>
		</view>
		<view class="p-5">
			<view class="font-big font-weight mb-5">
				密码登录
			</view>
			<view class="d-flex a-center" style="height: 160rpx;">
				<input v-model="username" class="border-bottom py-2 w-100 text-light-muted" type="text" value=""
					placeholder="请输入手机号/邮箱/账号" />
			</view>
			<view class="d-flex a-center" style="height: 160rpx;">
				<input v-model="password" class="border-bottom py-2 w-100" type="text" value="" placeholder="请输入密码" />
			</view>
			<view style="height: 100rpx;" type="default" @click="submit"
				class="mb-3 rounded font-md d-flex a-center j-center main-bg-color text-white"
				hover-class="main-bg-hover-color">登录</view>
			<view class="d-flex a-center text-light-muted">
				<label @click="checked = !checked">
					<checkbox :checked="checked" /><text></text>
				</label>
				<view>
					已阅读并同意***协议
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	import uniStatusBar from '../../components/uni-status-bar/uni-status-bar.vue'
	export default {
		components: {
			uniStatusBar,
		},
		data() {
			return {
				username: "",
				password: "",
				checked: false,
				// 验证规则
				rules: {
					username: [
						// {
						// 	rule:/^[a-zA-Z]\w{5,17}$/,
						// 	msg:"账号必须字母开头，长度在6~18之间，只能包含字母、数字和下划线"
						// }
					],
					password: [
						// {
						// 	rule:/^.{5,20}$/,
						// 	msg:"密码长度必须为5-20个字符"
						// }
					],
					repassword: []
				},
			}
		},
		methods: {
			...mapMutations(['login','loginOut']),
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			forget() {

			},
			validate(name){
				let check = true;
				this.rules[name].forEach(v=>{
					if(!(v.rule).test(this[name])){
						uni.showToast({
							title:v.msg,
							icon:'none',
						})
						check = false;
						return false;
					}
				})
				return check;
			},
			submit(){
				if(this.validate('username')&&(this.validate('password'))){
					if(!this.checked){
						uni.showToast({
							title:"请先同意***协议",
						})
						return
					}else{
						uni.showLoading({
							title:'登录中...'
						})
						this.login({
							username:this.username,
							password:this.password,
							success(res){
								uni.hideLoading()
								uni.navigateBack({
									delta:1
								})
							}
						})
					}
					
				}
			}
		}
	}
</script>

<style>

</style>
