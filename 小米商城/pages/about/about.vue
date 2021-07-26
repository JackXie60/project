<template>
	<view style="background-color: #F5F5F5;height:100%">
		<view class="d-flex a-center j-center flex-column" style="padding: 70rpx 0rpx 30rpx 0rpx;">
			<image src="../../static/logo.png" mode="widthFix" style="width: 150rpx;"></image>
			<view class="text-light-muted">
				小米商城4.5.3
			</view>
		</view>
		<uni-list-item showArrow>
			<template #header>
				版本更新
			</template>
		</uni-list-item>
		<uni-list-item showArrow>
			<template #header>
				了解小米
			</template>
		</uni-list-item>
		<uni-list-item showArrow>
			<template #header>
				官方微博
			</template>
		</uni-list-item>
		<uni-list-item showArrow>
			<template #header>
				廉洁小米
			</template>
		</uni-list-item>
		<uni-list-item showArrow>
			<template #header>
				APP分享
			</template>
		</uni-list-item>
	</view>
</template>

<script>
	import uniListItem from '../../components/comm/uni-list-item.vue'
	export default {
		components:{
			uniListItem,
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
