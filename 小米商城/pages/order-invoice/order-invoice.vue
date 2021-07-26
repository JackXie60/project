<template>
	<view>
		<divider></divider>
		<card titleHead="电子发票" :BottomBorder="false" cardStyle="background-color:#FFF">
			<view class="p-2">
				<my-radio-group :labels="label1" :selected.sync="label1.selected"></my-radio-group>
				<view class="text-muted mt-3">
					电子发票与纸质发票具有相同的法律效力，可作为报销，售后，维权凭证，推荐使用电子发票，不怕丢失，更方便，环保。
				</view>
			</view>
		</card>
		<divider></divider>
		<card titleHead="发票抬头" :BottomBorder="false" cardStyle="background-color:#FFF">
			<view class="p-2">
				<my-radio-group :labels="label2" :selected.sync="label2.selected"></my-radio-group>
			</view>
		</card>
		<divider></divider>
		<view class="p-2 border-bottom d-flex a-center font-md bg-white">
			<text>个人姓名:</text>
			<text class="ml-2">个人</text>
		</view>
		<view class="p-2 border-bottom d-flex a-center font-md bg-white">
			<text>发票内容:</text>
			<text class="ml-2">商品明细</text>
		</view>
		<divider></divider>
		<view class="p-2 border-bottom d-flex a-center font-md bg-white">
			<text class="text-muted">收票人手机:</text>
			<text class="ml-2">156***123</text>
		</view>
		<view class="text-light-muted font-md p-2">
			<text>发票须知:</text>
			<view>
				1.发票为实际支付金额，不包括优惠券等
			</view>
			<view>
				2.电子发票可以在订单完成后，在订单详情中查看
			</view>
		</view>
	</view>
</template>

<script>
	import divider from '@/components/comm/divider.vue'
	import card from '@/components/comm/card.vue'
	import myRadioGroup from '../../components/search-list/radio-group.vue'
	export default {
		components:{
			divider,
			card,
			myRadioGroup,
		},
		data() {
			return {
				label1:{
					selected:0,
					list:[
						{name:"电子发票"}
					]
				},
				label2:{
					selected:0,
					list:[
						{name:"个人"},
						{name:"单位"}
					]
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>
page{
	background-color: #EEEEEE;
}
</style>
