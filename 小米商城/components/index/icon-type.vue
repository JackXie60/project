<template>
	<view class="classList  d-flex flex-wrap m-2 font-sm">
		<view @tap="handleTap(icon)" class="span-4 d-flex j-center a-center flex-column py-2" v-for="icon in icons" :key="icon.text">
			<image :src="icon.icon" style="height: 560rpx;width: 60rpx;" mode="widthFix"></image>
			{{ icon.text }}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			icons:Array,
		},
		methods:{
			handleTap(item){
				console.log('点击了图标',item)
			}
		}
	}
</script>

<style>
</style>
