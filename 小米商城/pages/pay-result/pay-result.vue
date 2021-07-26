<template>
	<view>
		<view class="d-flex flex-column a-center j-center" style="height: 400rpx;">
			<view class="iconfont icon-iconfontxuanzhong4 main-text-color line-h" style="font-size: 180rpx;"></view>
			<text class="text-dark font-weight font-lg">支付成功</text>
		</view>
		<view @click="toOrderDetail" class="d-flex j-center a-center main-bg-color text-white font-md mx-4 rounded my-5" style="height: 100rpx;">
			查看订单
		</view>
		<view @click="backToHome" class="d-flex j-center a-center bg-white border font-md mx-4 rounded" style="height: 100rpx;">
			返回首页
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:0,
			}
		},
		onLoad(e){
			if(e.detail){
				const detail = JSON.parse(e.detail)
				this.orderId = detail.id;
			}
		},
		methods: {
			backToHome(){
				console.log('回到首页')
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			toOrderDetail(){
				uni.navigateTo({
					url:'/pages/order-detail/order-detail?orderId='+this.orderId
				})
			}
		}
	}
</script>

<style>

</style>
