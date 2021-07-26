<template>
	<view style="background-color: #F5F5F5;height: 100%;">
		<view class="d-flex a-center main-bg-color text-white px-3" style="height: 250rpx;"
			hover-class="main-bg-hover-color" @click="openPathList">
			<template v-if="path.name">
				<view class="d-flex flex-column">
					<view class="d-flex mb-1 a-center">
						<text class="font-weight font-lg mr-2">
							{{ path.name }}
						</text>
						<text v-if="path.isDefault" class="border border-white px-1 font">默认</text>
					</view>
					<view class="font">
						{{ path.province+path.city+path.district+path.detailPath}}
					</view>
				</view>
			</template>
			<template v-else>
				<view class="d-flex a-center font-lg text-white">
					请选择收货地址 
				</view>
			</template>
			<view class="iconfont icon-you ml-auto"></view>
		</view>
		<view
			style="overflow: hidden; border-top-left-radius: 25rpx ;border-top-right-radius: 25rpx;margin-top: -25rpx;">
			<view class="bg-white" style="height: 520rpx;">
				<uni-list-item showArrow clickable style="height: 120rpx;">
					<template #body>
						<view class="d-flex a-center">
							<image v-for="item in dataList" :key="item.id" :src="item.cover"
								style="height: 100rpx;width: 100rpx;">
							</image>
						</view>
					</template>
					<template #footer>
						<view class="d-flex a-center ml-auto">共{{ dataList.length!==undefined?dataList.length:0 }}件</view>
					</template>
				</uni-list-item>
				<uni-list-item style="height: 100rpx;">
					<template #header>
						商品总价
					</template>
					<template #footer>
						<view class="d-flex a-center">
							<price>{{ totalPrice }}</price>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item style="height: 100rpx;">
					<template #header>
						运费
					</template>
					<template #footer>
						<view class="d-flex a-center">
							包邮
						</view>
					</template>
				</uni-list-item>
				<uni-list-item showArrow style="height: 100rpx;" clickable @click="openOrderCoupon">
					<template #header>
						优惠券
					</template>
					<template #footer>
						<view class="d-flex a-center ml-auto" :class="couponNum===0?'text-light-muted':'main-text-color'">
							{{coupon.id===0?( couponNum===0? '无可用':couponNum+'张可用'):(coupon.type===1?coupon.value+'折':coupon.value+'元')}}
						</view>
					</template>
				</uni-list-item>
				<uni-list-item style="height: 100rpx;">
					<template #header>
						<text class="main-text-color">小计</text>
					</template>
					<template #footer>
						<view class="d-flex a-center">
							<price>{{ price}}</price>
						</view>
					</template>
				</uni-list-item>
			</view>
			<divider></divider>
			<uni-list-item showArrow="" clickable @click="openInvoice">
				<template #header>
					发票
				</template>
				<template #footer>
					<view class="d-flex a-center">
						电子发票-个人
					</view>
				</template>
			</uni-list-item>
		</view>
		<view class="position-fixed row a-center j-end bottom-0 w-100 bg-white px-3" style="height: 120rpx;">
			<text class="mr-2">合计:</text>
			<price>{{ price }}</price>
			<view class="ml-2 px-1 main-bg-color btnBorder py-1 px-2 text-white font-md" @click="openPayMethod">
				{{ loading ? '加载中': '去付款'}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from 'vuex'
	import uniListItem from '../../components/comm/uni-list-item.vue'
	import price from '../../components/comm/price.vue'
	import divider from '../../components/comm/divider.vue'
	export default {
		components: {
			uniListItem,
			price,
			divider
		},
		data() {
			return {
				loading:false,
				path: false,
				selectList: [],
				couponNum:0,
				coupon:{
					value:0,
					type:0,
					id:0,
				}
			}
		},
		computed: {
			...mapGetters(['defaultPath','totalPrice']),
			...mapState({
				list: state => state.car.list
			}),
			dataList() {
				return this.selectList.map(v => {
					return this.list.find(item => item.id == v)
				})
			},
			price(){
				if(this.coupon.type===1){
					return this.totalPrice*(this.coupon.value/10)
				}else{
					return this.totalPrice - this.coupon.value
				}
			}
		},
		onLoad(e) {
			if (e.detail) {
				this.selectList = JSON.parse(e.detail);
			}
			if (this.defaultPath.length > 0) {
				this.path = this.defaultPath[0];
			};
			uni.$on("confirmPath", (res) => {
				this.path = res
			})
			uni.$on("couponUse",res=>{
				this.coupon = res
			})
			this.getCouponCount()
		},
		onShow() {
		},
		onUnload() {
			uni.$off("confirmPath")
			uni.$off("couponUse")
		},
		methods: {
			openPathList() {
				uni.navigateTo({
					url: '/pages/user-path-list/user-path-list?type=choose'
				})
			},
			openInvoice() {
				uni.navigateTo({
					url: '/pages/order-invoice/order-invoice'
				})
			},
			openPayMethod() {
				this.loading = true;
				if(!this.path){
					uni.showToast({
						title:'请选择收货地址',
						icon:'none'
					})
					this.loading = false
					return;
				}
				const options = {
					user_addresses_id:this.path.id,
					items:this.selectList.join(','),
				}
				if(this.coupon.id>0){
					options['coupon_user_id']=this.coupon.id;
				}
				this.$H.post('/order',options,{
					token:true,
				}).then(res=>{
					this.loading = false;
					uni.redirectTo({
						url: '/pages/pay-method/pay-method?detail='+JSON.stringify({
							id:res.id,
							price:res.total_price
						})
					})
					this.loading = false; 
				}).catch(err=>{
					this.loading = false;
					uni.showToast({
						title:'支付失败啦',
						icon:'none'
					})
				})
			},
			openOrderCoupon() {
				uni.navigateTo({
					url: '/pages/order-coupon/order-coupon?from=order'
				})
			},
			getCouponCount(){
				this.$H.post('/coupon_count',{
					price:this.totalPrice,
				},{
					token:true,
				}).then(res=>{
					this.couponNum = res;
				}).catch(res=>{
					uni.showToast({
						title:'获取优惠券失败',
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style>
	.btnBorder {
		border-radius: 40rpx;
	}
</style>
