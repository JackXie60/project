<template>
	<view>
		<view class="d-flex j-center a-center flex-column" style="height:250rpx">
			<text class="text-muted mb-1 font-md">支付金额</text>
			<price>{{ detail.price }}</price>
		</view>
		<view class="px-3 mb-4">
			<radio-group name="payMethod">
				<uni-list-item v-for="(item,index) in options" :key="index">
					<template #body>
						<label class="radio d-flex a-center w-100">
							<text class="iconfont d-flex a-center j-center font-big mr-1" :class="item.icon"></text>
							<view class="d-flex flex-column">
								<view class="text-dark font-weight">
									{{ item.title }}
								</view>
								<view class="text-muted">
									{{ item.note }}
								</view>
							</view>
							<radio :value="item.value" class="ml-auto" :checked="payMethod === item.value" />
							<text></text>
						</label>
					</template>
				</uni-list-item>
			</radio-group>
		</view>
		<view @click="submit" hover-class="main-bg-hover-color"
			class="rounded main-bg-color d-flex a-center j-center text-white mx-3 font-md" style="height: 100rpx;">
			确认支付
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import price from '../../components/comm/price.vue'
	import uniListItem from '../../components/comm/uni-list-item.vue'
	export default {
		components: {
			price,
			uniListItem,
		},
		data() {
			return {
				options: [],
				payMethod: 'alipay',
				detail: {
					id: 0,
					price: 0,
				},
				loading: false,
			}
		},
		onLoad(e) {
			//获取热门推荐
			uni.$emit('updateCart')
			if (!e.detail) {
				return uni.showToast({
					title: '支付失败',
					icon: 'none'
				});
			}
			this.detail = JSON.parse(e.detail)
			this.options = [{
				title: "支付宝支付",
				note: "推荐使用支付宝支付",
				icon: "icon-zhifubao text-primary",
				value: "alipay"
			}, {
				title: "微信支付",
				note: "",
				icon: "icon-weixinzhifu text-success",
				value: "wxpay"
			}]
		},
		methods: {
			...mapMutations(['setList']),
			submit() {
				if (this.loading) {
					return;
				}
				this.loading = true;
				this.appPay()
				// uni.navigateTo({
				// 	url: '/pages/pay-result/pay-result'
				// })
			},
			appPay() {
				this.$H.get('/payment/' + this.detail.id + '/' + this.payMethod, {}, {
					token: true,
					native: true
				}).then(res => {
					console.log(res);
					uni.requestPayment({
						provider: this.payMethod,
						orderInfo: res.data, //微信、支付宝订单数据
						success: (res2) => {
							console.log('requestPayment', res2);
							// 重定向/防止重复支付
							uni.redirectTo({
								url: '../pay-result/pay-result?detail='+JSON.stringify({
									id:this.detail.id,
								})
							});
							console.log('success:' + JSON.stringify(res2));
						},
						fail: (err) => {
							uni.showModal({
								title: '提示',
								content: '支付失败',
								showCancel: false
							});
							console.log('fail:' + JSON.stringify(err));
						},
						complete: () => {
							this.loading = false
						}
					});
				}).catch(err => {
					this.loading = false
					console.log(err);
					uni.showToast({
						title: '支付失败',
						icon: 'none'
					});
				})
			},
		}
	}
</script>

<style>

</style>
