<template>
	<view class="position-absolute flex-column d-flex j-center a-center" :class="stylePosition?stylePosition:'top-0 bottom-0 right-0 left-0'" style="background-color: #F5F5F5;">
		<image :src="getSrc" mode="widthFix" style="width: 250rpx;"></image>
		<view style="color: #B2B2B2;">
			{{ msg }}
		</view>
	</view>
</template>

<script>
	export default {
		props:["icon","msg","stylePosition"],
		computed:{
			getSrc(){
				return `/static/images/nothing/${this.icon}.png`
			}
		}
	}
</script>

<style>
</style>
