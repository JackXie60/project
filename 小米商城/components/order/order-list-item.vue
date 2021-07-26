<template>
	<view class="d-flex a-center p-2 border-bottom border-light-secondary">
		<image class="rounded mx-2 flex-shrink" :src="orderItem.cover" style="height: 150rpx;width: 150rpx;"></image>
		<view class="flex-1 d-flex flex-column">
			<view class="d-flex a-center">
				<text class="text-dark font-md">{{ orderItem.title }}</text>
				<text class="text-light-muted ml-auto">￥{{ orderItem.pprice }}</text>
			</view>
			<view class="d-flex a-center">
				<text class="text-light-muted font">{{ orderItem.attrs }}</text>
				<text class="text-light-muted ml-auto">x{{ orderItem.num }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['orderItem','orderIndex'],
	}
</script>

<style>
</style>
