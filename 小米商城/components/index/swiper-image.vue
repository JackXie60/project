<template>
	<view class="swiper-area">
		<swiper :indicator-dots="true" :autoplay="true" circular :interval="3000" :duration="1000" :style="style">
			<swiper-item v-for="(img,index) in swiperImg" :key="index" @click="event">
				<view class="swiper-item">
					<image :src="img" lazy-load :style="style"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			swiperImg:Array,
			height:{
				type:Number,
				default:350,
			}
		},
		computed:{
			style(){
				return `height:${this.height}rpx`
			}
		},
		methods:{
			event(){
				uni.previewImage({
					urls:this.swiperImg,
					indicator:"default"
				})
			}
		}
	}
</script>

<style>
</style>
