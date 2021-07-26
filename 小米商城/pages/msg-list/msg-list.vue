<template>
	<view class="p-2">
		<scroll-view scroll-y="true" >
			<view class="px-2 py-3 bg-white rounded" v-for="(item,index) in list" :key="index" @click="open(item)">
				<text class="text-dark font-weight font-lg">{{ item.title }}</text>
				<view class="text-light-muted">
					{{ item.desc }}
				</view>
				<view class="text-light-muted">
					{{ item.create_time }}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						title:"商城反馈",
						desc:"非常不错，很多商品",
						create_time:'5月28日'
					}
				]
			}
		},
		methods: {
			open(item){
				uni.navigateTo({
					url:`/pages/msg-detail/msg-detail?detail=${JSON.stringify(item)}`
				})
			}
		}
	}
</script>

<style>
page{
	background-color: #EEEEEE;
}
</style>
