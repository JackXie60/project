<template>
	<popup :popupClass="popupShow" @hide="hidePopup">
		<!-- 商品信息 -->
		<view class="d-flex a-center" style="height: 275rpx;">
			<image :src="popupData.cover" style="width: 180rpx;height: 180rpx;"></image>
			<view>
				<price unitSize="font" priceSize="font-lg">{{ showPrice }}</price>
				<view class="line-h-md">
					{{checkedSkusText}}
				</view>
			</view>
		</view>
		<card :titleHead="item.title" :BottomBorder="false" :headTitleWeight="false"
			v-for="(item,index) in popupData.selects" :key="index">
			<my-radio-group :labels="item" :selected.sync='item.selected'></my-radio-group>
		</card>
		<view class="d-flex a-center border-top" style="line-height: 140rpx;">
			<text>购买数量</text>
			<uni-number-box :min="popupData.minnum" :max="popupData.maxnum" :value="popupData.item.num"
				@change="popupData.item.num=$event" style="margin-left:auto!important ;" />
		</view>
		<!-- 按钮 -->
		<view @click="syncGoodsNum($event,popupData)"
			class="position-fixed bottom-0 w-100 row main-bg-color text-white font-md a-center j-center"
			style="height: 100rpx;margin-left:-30rpx ;">
			确定
		</view>
	</popup>
</template>

<script>
	import {mapActions} from 'vuex'
	import price from '../comm/price.vue'
	import myRadioGroup from '../search-list/radio-group.vue'
	import popup from '../comm/popup.vue'
	import card from '../comm/card.vue'
	export default {
		components:{
			price,
			myRadioGroup,
			popup,
			card,
		},
		props:['popupData','popupShow'],
		computed:{
			checkedSkusText(){
				let str = []
				if(Array.isArray(this.popupData.selects)){
					this.popupData.selects.forEach((v,i)=>{
						str.push(v.list[v.selected].name)
					})
					return str.join(',')
				}else{
					return ''
				}
			},
			showPrice() {
				if (this.popupData.item.skus_type=== 0) {
					return +this.popupData.item.pprice || 0.00;
				}
				if (!Array.isArray(this.popupData.goods_skus)) {
					return -1
				}
				return +this.popupData.goods_skus[this.checkedSkusIndex].pprice
			},
			checkedSkusIndex() {
				if (!Array.isArray(this.popupData.goods_skus)) {
					return -1
				}
				let index = -1;
				this.popupData.goods_skus.forEach((item, i) => {
					if (item.skusText === this.checkedSkusText) {
						index = i;
					}
				})
				return index;
			},
		},
		methods:{
			...mapActions(['hidePopup']),
			syncGoodsNum(e,popupData){
				this.$H.post('/cart/updatenumber/'+ popupData.id,{
					num:popupData.num
				},{
					token:true,
				}).then(res=>{
					if(res){
						this.hidePopup()
					}
				})
			},
		}
	}
</script>

<style>
</style>
