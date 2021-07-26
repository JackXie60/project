<template>
	<view>
		<card titleHead="账号管理">
			<uni-list-item showArrow title="个人资料"></uni-list-item>
			<uni-list-item clickable showArrow title="收货地址" @click="navigateTo({url:'/pages/user-path-list/user-path-list'})"></uni-list-item>
		</card>
		<card titleHead="关于">
			<uni-list-item clickable @click="toAbout" showArrow title="关于商城"></uni-list-item>
			<uni-list-item showArrow title="意见反馈"></uni-list-item>
			<uni-list-item showArrow title="协议规则"></uni-list-item>
			<uni-list-item showArrow title="资质证件"></uni-list-item>
			<uni-list-item showArrow title="用户协议"></uni-list-item>
			<uni-list-item showArrow title="隐私政策"></uni-list-item>
		</card>
		<view class="p-3">
			<button type="default" class="bg-white" @click="handleLoginOut">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	import card from '@/components/comm/card.vue'
	import uniListItem from '@/components/comm/uni-list-item.vue'
	export default {
		components:{
			card,
			uniListItem,
		},
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['loginOut']),
			toAbout(){
				uni.navigateTo({
					url:'/pages/about/about'
				})
			},
			handleLoginOut(){
				this.loginOut({
					success(){
						uni.showToast({
							title:"退出成功",
							icon:'none'
						})
						uni.navigateBack({
							delta:1
						})
					}
				})
			}
		}
	}
</script>

<style>
page{
	background-color: #EEEEEE;
}
</style>
