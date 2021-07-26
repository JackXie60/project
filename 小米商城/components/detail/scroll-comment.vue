<template>
	<view class="p-2">
		<scroll-view scroll-x="true" class="scroll-row">
			<view class="scroll-row-item rounded bg-light-secondary mr-2 p-2" style="width: 620rpx;height: 380rpx;" v-for="(item,index) in comments" :key="index">
				<view class="d-flex a-center mb-2" style="height: 70rpx;">
					<image :src="item.userpic" mode="widthFix" style="height: 70rpx;width: 70rpx;" class="rounded-circle"></image>
					<view class="ml-2">
						<text class="font-md line-h">{{ item.username }}</text>
						<text class="d-block font text-light-muted line-h">{{ item.create_time }}</text>
					</view>
					<view class="iconfont icon-dianzan text-light-muted font ml-auto">
						{{ item.goods_num }}
					</view>
				</view>
				<text class="d-block">
					{{ item.context }}
				</text>
				<view class="row">
					<view class="span24-8 px-2" v-for="(img ,index) in item.goods_list">
						<image :src="img" mode="widthFix" style="height: 115rpx;" class="rounded"></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<view @click="openDetailComment(comments.id)" class="d-flex j-center a-center text-primary font-md bg-white py-2" hover-class="bg-light-secondary">
			更多评论<text class="iconfont icon-you"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props:['comments','id'],
		methods:{
			openDetailComment(){
				uni.navigateTo({
					url:'/pages/detail-comment/detail-comment?goodsid='+this.id
				})
			}
		}
	}
</script>

<style>
</style>
