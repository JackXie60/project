<template>
	<view>
		<divider></divider>
		<view class="px-2">
			<card titleHead="申请售后的产品" :headTitleWeight="false" titleStyle="color:#9e9e9e" cardStyle="background-color:white">
				<view class="d-flex a-center">
					<view class="d-flex a-center j-center" style="height: 130rpx;">
						<image class="mx-2" src="../../static/images/demo/cate_02.png" style="width: 100rpx;" mode="widthFix"></image>
					</view>
					<view class="d-flex flex-column">
						<text class="font-md font-weight">小米8 青春版 6GB+128GB 梦幻蓝</text>
						<text class="text-light-muted">维修服务：剩余111天</text>
					</view>
				</view>
			</card>
		</view>
		<divider></divider>
		<view class="px-2" >
			<card titleHead="服务类型" :headTitleWeight="false" titleStyle="color:#9e9e9e" cardStyle="background-color:white">
				<view class="py-5">
					<my-radio-group :labels="labels"></my-radio-group>
				</view>
			</card>
		</view>
		<divider></divider>
		<view class="px-2">
			<card titleHead="问题描述" :BottomBorder="false" :headTitleWeight="false" titleStyle="color:#9e9e9e" cardStyle="background-color:white;" :bodyPadding="20">
				<textarea class="border w-100 p-1" :maxlength="200" style="height: 300rpx;box-sizing: border-box;"  placeholder="详细描述下你遇到的问题"></textarea>
			</card>
		</view>
		<divider></divider>
		<view class="d-flex a-center j-center main-bg-color mt-5 rounded mx-3 text-white font-md" style="height: 100rpx;">
			下一步
		</view>
	</view>
</template>

<script>
	import card from '../../components/comm/card.vue'
	import myRadioGroup from '../../components/search-list/radio-group.vue'
	import divider from '../../components/comm/divider.vue'
	export default {
		components:{
			card,
			myRadioGroup,
			divider
		},
		data() {
			return {
				labels:{
					selected:0,
					list:[
						{name:"维修"},
					]
				},
			}
		},
		methods: {
			
		}
	}
</script>

<style>
page{
	background-color: #F5F5F5;
}
</style>
