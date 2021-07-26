<template>
	<view class="rounded bg-white d-flex a-center pl-2 shadow-sm mb-3" style="height: 200rpx;" @click="handleClick">
		<view class="d-flex j-center flex-column">
			<text class="font font-weight font-lg" :class="item.disabled || !item.status ? 'text-light-muted':''" >{{ item.name }}</text>
			<text class="text-light-muted">{{ item.start_time }}~{{ item.end_time }}</text>
		</view>
		<view :class="item.disabled || !item.status ? 'bg-secondary':'main-bg-color'" class="d-flex flex-column a-center j-center text-white ml-auto" style="height: 100%;width: 220rpx;">
			<text class="font-md line-h">{{ item.price }}{{ item.type===1?'折':'元' }}</text>
			<text class="font">{{ item.desc }}</text>
			<text class="d-flex px-2 py-1 bg-white mt-1 rounded" :class="item.disabled || !item.status? 'text-secondary':'main-text-color'">
				{{ item.disabled ? "已领取" : (item.status ? "去使用":"已失效") }}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:['item','index'],
		onLoad() {
			console.log(this.item)
		},
		methods:{
			handleClick(){
				this.$emit('click',this.item)
			}
		}
	}
</script>

<style>
</style>
