<template>
	<view class="row">
		<view style="width: 372.5rpx;" v-for="(item,index) in listData" :key="index" @click="openDetail(item)">
			<image :src="item.cover" lazy-load mode="widthFix"></image>
			<view class="p-2 pt-1">
				<view class="font-weight font-md">{{ item.title }}</view>
				<view class="text-muted">
					{{ item.desc }}
				</view>
				<view class="d-flex">
					<Price>{{ item.pprice }}</Price>
					<view class="text-muted font-sm line-through font-sm a-self-end">
						￥{{ item.oprice }}
					</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import Price from './price.vue'
	export default{
		components:{
			Price,
		},
		props:{
			listData:{
				type:Array,
				default:[],
			},
			type:{
				type:String,
				default:'navigateTo'
			}
		},
		methods:{
			openDetail(item){
				uni[this.type]({
					url:'/pages/detail/detail?detail='+JSON.stringify(item)
				})
			}
		}
	}
</script>


<style>
</style>
