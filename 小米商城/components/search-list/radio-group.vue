<template>
	<view class="row">
		<view class="span24-8 px mb-2" v-for="(item,index) in labels.list" :ley="index">
			<view @tap="changeSelected(index)" :class="labels.selected===index?'radio-active':'text-muted'" class="rounded px-2 py-1 bg-light-secondary font-md text-center">
				{{ item.name }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['labels'],
		methods:{
			changeSelected(index){
				this.$emit('update:selected',index)
			}
		}
	}
</script>

<style>
	.radio-active{
		background-color: #FCE0D5!important;
		color: #EB7320!important;
		border: 1rpx solid #EB7320!important;
	}
</style>
