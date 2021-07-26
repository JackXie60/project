<template>
	<view class="cart" :style="cardStyle">
		<!-- head -->
		<view class="p-2" :class="{ 'border-bottom main-border-color':BottomBorder===true}">
			<slot name="title">
				<text class="font-md" v-if="showhead" :class="{'font-weight':headTitleWeight===true}" :style="titleStyle">{{ titleHead }}</text>
			</slot>
		</view>
		<!-- body -->
		<view class="content" :style="'padding:'+bodyPadding+'rpx'">
			<image v-if="bodyCover" :src="bodyCover" mode="widthFix"></image>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			'titleHead': String,
			'bodyCover': String,
			'BottomBorder': {
				type: Boolean,
				default: true,
			},
			'showhead': {
				type: Boolean,
				default: true
			},
			// 标题是否加粗
			'headTitleWeight': {
				type: Boolean,
				default: true
			},
			'cardStyle':{
				type:String,
				default:''
			},
			'titleStyle':{
				type:String,
				default:''
			},
			bodyPadding:{
				type:Number,
				default:0,
			}
		}
	}
</script>

<style>
</style>
