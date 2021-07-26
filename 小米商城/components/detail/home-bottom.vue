<template>
	<!-- 购物车 -->
	<view>
		<view style="height: 90rpx;"></view>
		<view class="d-flex bg-white position-fixed bottom-0 left-0 right-0 border-top" style="height: 90rpx;">
			<view class="flex-1 d-flex j-center a-center flex-column line-h" hover-class="bg-light-secondary">
				<view class="iconfont icon-xihuan">
				</view>
				收藏
			</view>
			<view @tap.stop="handleNav" class="position-relative flex-1 d-flex j-center a-center flex-column line-h" hover-class="bg-light-secondary">
				<uni-badge style="position: absolute;left: 85rpx;top: 0rpx;" v-if="showBadge" :text="badgeText" size="small" type="warning"></uni-badge>
				<view class="iconfont icon-gouwuche">
				</view>
				购物车
			</view>
			<view @tap.stop="$emit('show')" style="flex:2.5" class="text-white main-bg-color d-flex j-center a-center" hover-class="main-bg-hover-color">
				<view class="">
					加入购物车
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '../uni-ui/uni-badge/uni-badge.vue'
	export default {
		props:{
			showBadge:{
				type:Boolean,
				default:false,
			},
			badgeText:{
				type:Number,
				default:100
			}
		},
		components:{
			uniBadge,
		},
		methods:{
			handleNav(){
				uni.switchTab({
					url:'/pages/car/car'
				})
			}
		}
	}
</script>

<style>
</style>
