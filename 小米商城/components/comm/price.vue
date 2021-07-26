<template>
	<view class="d-flex line-h main-text-color" :class="priceSize+' '+priceStyle">
		<text class="a-self-start " :class="unitSize">￥</text>
		<text><slot></slot></text>
	</view>
</template>

<script>
	export default{
		props:{
			priceSize:{
				type:String,
				default:'font-md',
			},
			unitSize:{
				type:String,
				default:'font-sm'
			},
			priceStyle:{
				type:String,
				default:'main-text-color'
			}
		}
	}
</script>

<style>
</style>
