<template>
	<!-- 基础详情 -->
	<view class="p-2">
		<view class="font-lg">
			{{ detailInfo.title }}
		</view>
		<view class="font text-light-muted mb-3 line-h-sm">
			{{ detailInfo.desc }}
		</view>
		<price priceSize="font-lg" unitSize="font">{{ showPrice || detailInfo.min_price }}</price>
	</view>
</template>

<script>
	import price from '@/components/comm/price.vue'
	export default {
		props:{
			detailInfo:{
				type:Object,
				default:{},
			},
			showPrice:{
				type:Number || String || Boolean,
				default:false
			},
			
		},
		components:{
			price,
		}
	}
</script>

<style>
</style>
