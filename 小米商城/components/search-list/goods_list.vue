<template>
	<view class="row p-2 border-bottom border-light-secondary" @click="handleClick">
		<view class="span24-8">
			<image :src="item.titlepic" mode="widthFix" style="width: 100%;"></image>
		</view>
		<view class="span24-16 pl-3 d-flex flex-column">
			<view class="font-md font-weight mb-1">
				{{ item.title }}
			</view>
			<view class="font text-light-muted line-h-md mb-auto">
				{{ item.desc }}
			</view>
			<price>{{ item.price }}</price>
			<view class="font-sm text-light-muted">
				{{ item.comment_num }}条评论   {{ item.good_num }}%好评
			</view>
		</view>
	</view>
</template>

<script>
	import price from '@/components/comm/price.vue'
	export default {
		props:['item'],
		components:{
			price,
		},
		methods:{
			handleClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style>
</style>
