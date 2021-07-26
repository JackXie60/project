<template>
	<view class="d-flex">
		<image :src="threeAdv.big.src" lazy-load style="width: 373rpx;height: 530rpx;border-right: 2rpx solid #F5F5F5;"></image>
		<view class="d-flex flex-column">
			<image :src="threeAdv.smallTop.src" lazy-load style="width: 375rpx; height:264rpx;border-bottom: 2rpx solid #F5F5F5;"></image>
			<image :src="threeAdv.smallBottom.src" lazy-load style="width: 375rpx; height:264rpx;border-bottom: 2rpx solid #F5F5F5;"></image>
		</view>
	</view>
</template>

<script>
	export default{
		props:['threeAdv']
	}
</script>

<style>
</style>
