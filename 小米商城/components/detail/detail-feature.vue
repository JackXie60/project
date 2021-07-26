<template>
	<!-- 滚动商品特性 -->
	<scroll-view scroll-x="true" class="scroll-row">
		<view class="scroll-row-item" style="width: 170rpx;height: 110rpx;" v-for="(item,index) in baseAttrs" :key="index">
			<view class="d-flex flex-column j-center a-center line-h-sm">
				<view class="iconfont font-lg" :class="item.icon">
				</view>
				<view class="line-h-sm">
					{{ item.title }}
				</view>
				<view class="text-light-muted font-sm line-h-sm">
					{{ item.desc }}
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default{
		props:['baseAttrs'],
	}
</script>

<style>
</style>
