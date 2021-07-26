<template>
	<view>
		<!-- 头部 -->
		<loading-plus :beforeReady="beforeReady"></loading-plus>
		<template v-if="!beforeReady">
			<view class="position-relative d-flex a-center" style="height: 320rpx;">
				<view @click="navigate('msg-list')" class="position-absolute iconfont icon-xiaoxi text-white" style="font-size: 50rpx;z-index: 100;top: 75rpx;right: 20rpx;"></view>
				<image src="../../static/images/bg.jpg" style="height: 320rpx;width: 100%;"></image>
				<view class="d-flex a-center position-absolute j-sb w-100" style="bottom: 50rpx;">
						<image :src="userInfo.avatar ? userInfo.avatar : '../../static/images/demo/demo5.jpg'" class="rounded-circle border-light ml-4" style="height: 145rpx;width: 145rpx;border: 5rpx solid"></image>
						<view class="ml-2 text-white font-md" @click="navigate('login')">
							{{ userInfo.nickname ? userInfo.nickname : '登录/注册'  }}
						</view>
						<view class="d-flex a-center j-center a-self-end px-2 ml-auto" style="height: 70rpx;background-color: #FFD43F;color: #CC4A00;border-top-left-radius: 40rpx;border-bottom-left-radius: 40rpx;">
							<view class="iconfont line-h icon-huangguan mr-1">
							</view>
							会员积分0.00
						</view>
				</view>
			</view>
			<!-- 卡片部分 -->
			<card>
				<template #title>
					<view class="d-flex a-center j-sb">
						<view class="font-md font-weight">
							我的订单
						</view>
						<view class="text-light-muted" @click="openOrder">
							<text>全部订单</text>
							<text class="iconfont icon-you"></text>
						</view>
					</view>
				</template>
				<view class="row a-center">
					<view class="flex-1 d-flex flex-column j-center a-center py-3" hover-class="bg-light-secondary">
						<view class="iconfont icon-fabu font-lg line-h"></view>
						<view class="">
							待付款
						</view>
					</view>
					<view class="flex-1 d-flex flex-column j-center a-center py-3" hover-class="bg-light-secondary">
						<view class="iconfont icon-daishouhuo font-lg line-h"></view>
						<view class="">
							待收货
						</view>
					</view>
					<view class="flex-1 d-flex flex-column j-center a-center py-3" hover-class="bg-light-secondary">
						<view class="iconfont icon-pinglun font-lg line-h"></view>
						<view class="">
							待评价
						</view>
					</view>
					<view class="flex-1 d-flex flex-column j-center a-center py-3" hover-class="bg-light-secondary">
						<view class="iconfont icon-xihuan font-lg line-h"></view>
						<view class="">
							待换修
						</view>
					</view>
				</view>
			</card>
			<divider></divider>
			<uni-list-item showArrow title="小米会员" showExtraIcon leftIcon="icon-VIP" leftIconStyle="color:#FDBF2E;" hover-class="main-bg-hover-color"></uni-list-item>
			<uni-list-item showArrow title="会员中心" showExtraIcon leftIcon="icon-huangguan" leftIconStyle="color:#FCBE2D;"></uni-list-item>
			<uni-list-item showArrow title="服务中心" showExtraIcon leftIcon="icon-service" leftIconStyle="color:#FA6C5E;"></uni-list-item>
			<uni-list-item showArrow title="小米之家" showExtraIcon leftIcon="icon-home" leftIconStyle="color:#FE8B42;"></uni-list-item>
			<uni-list-item showArrow title="更多功能" showExtraIcon leftIcon="icon-gengduo" leftIconStyle="color:#9ED45A;"></uni-list-item>
			<divider></divider>
			<uni-list-item clickable @click="navigate('user-set')" showArrow title="更多设置" showExtraIcon leftIcon="icon-icon_set_up" leftIconStyle="color:#808C98;" hover-class="main-bg-hover-color"></uni-list-item>
		</template>
	</view>
	</template>

<script>
	import {mapState} from 'vuex'
	import card from '@/components/comm/card.vue'
	import divider from '@/components/comm/divider.vue'
	import uniListItem from '@/components/comm/uni-list-item.vue'
	import loading from '@/common/mixin/loading.js'
	export default {
		mixins:[loading],
		components:{
			card,
			divider,
			uniListItem,
		},
		data() {
			return {
			}
		},
		computed:{
			...mapState({
				userInfo:state=>state.login.userInfo,
				token:state=>state.login.token,
				loginStatus:state=>state.login.loginStatus
			})
		},
		methods: {
			navigate(path){
				console.log(`/pages/${path}/${path}`)
				if(!path){
					return;
				}
				uni.navigateTo({
					url:`/pages/${path}/${path}`
				})
			},
			openOrder(){
				this.navigateTo({
					url:'/pages/order/order'
				})
			}
		}
	}
</script>

<style>

</style>
