<template>
	<view>
		<view class="main-bg-color d-flex text-white a-end p-4"
			style="height: 400rpx;padding-bottom: 50rpx;box-sizing: border-box;">
			<view class="d-flex a-center w-100 j-sb">
				<view class="d-flex flex-column">
					<text class="font-lg">{{status}}</text>
					<text class="font">{{timeDownText}}</text>
				</view>
				<view class="iconfont icon-daishouhuo line-h" style="font-size: 100rpx;"></view>
			</view>
		</view>
		<view class="p-3">
			<view class="text-light-muted font-md">
				<text class="font-lg text-dark mr-2">{{ address.name }}</text>
				{{ address.phone }}
			</view>
			<text class="text-light-muted">
				{{ address.province + address.city + address.district + address.address }}
			</text>
		</view>
		<divider></divider>
		<view>
			<block v-for="(item,index) in order_items" :key="index">
				<order-list-item :orderItem="item" :orderIndex="index"></order-list-item>
			</block>
		</view>
		<uni-list-item>
			<template #header>
				<view class="text-light-muted">商品总价</view>
			</template>
			<template #footer>
				<view class="text-light-muted">
					<price priceStyle="text-light-muted">{{ price }}</price>
				</view>
			</template>
		</uni-list-item>
		<uni-list-item>
			<template #header>
				<view class="text-light-muted">快递</view>
			</template>
			<template #footer>
				<view class="text-light-muted">
					包邮
				</view>
			</template>
		</uni-list-item>
		<uni-list-item>
			<template #header>
				<view class="text-light-muted">优惠券</view>
			</template>
			<template #footer>
				<view>
					<price priceStyle="text-light-muted">{{ coupon }}</price>
				</view>
			</template>
		</uni-list-item>
		<uni-list-item>
			<template #header>
				<view>实际付款</view>
			</template>
			<template #footer>
				<view>
					<price>{{ total_price }}</price>
				</view>
			</template>
		</uni-list-item>
		<divider></divider>
		<card titleHead="订单信息">
			<uni-list-item>
				<template #header>
					订单编号
				</template>
				<template #footer>
					{{ no }}
				</template>
			</uni-list-item>
		</card>

	</view>
</template>

<script>
	import divider from '../../components/comm/divider.vue'
	import orderListItem from '../../components/order/order-list-item.vue'
	import uniListItem from '../../components/comm/uni-list-item.vue'
	import price from '../../components/comm/price.vue'
	import card from '../../components/comm/card.vue'
	export default {
		components: {
			divider,
			orderListItem,
			uniListItem,
			card,
			price
		},
		onLoad(e) {
			if (!e.id) {
				uni.showToast({
					title: "参数非法",
					icon: 'none'
				});
				return;
			}
			this.id = JSON.parse(e.id);
		},
		data() {
			return {
				id: 0,
				no: "",
				address: {
					province: "",
					city: "",
					district: "",
					address: "",
					zip: 0,
					name: "",
					phone: "",
				},
				total_price: 0,
				remark: "",
				paid_time: null,
				payment_method: "",
				payment_no: "",
				refund_status: "pending",
				ship_status: "",
				extra: null,
				create_time: "",
				update_time: "",
				order_items: [],
				couponUserItem: [],
				end_time: 0,
				timeDown: ''
			}
		},
		computed: {
			price() {
				let p = 0
				this.order_items.forEach(item => {
					p += item.pprice * item.num
				})
				return p.toFixed(2)
			},
			path() {
				let {
					province,
					city,
					district,
					address
				} = this.address
				return `${province} ${city} ${district} ${address}`
			},
			// 订单状态
			status() {
				return this.$U.formatStatus({
					paid_time: this.paid_time,
					refund_status: this.refund_status,
					ship_status: this.ship_status
				})
			},
			coupon() {
				if (Array.isArray(this.couponUserItem) && this.couponUserItem.length === 0) {
					return '未使用'
				}
				let {
					type,
					value
				} = this.couponUserItem.coupon
				if (type === 0) {
					return '-￥' + value
				} else {
					return '打' + value + '折'
				}
			},
			timeDownText() {
				let msg = ''
				switch (this.status) {
					case '待支付':
						msg = '取消'
						break;
					case '待收货':
						msg = '确认'
						break;
					case '待发货':
						return '等待商家发货'
						break;
					case '退款中':
						return '等待商家审核'
						break;
					case '已签收':
						return '订单已签收'
						break;
				}
				if (msg !== '' && this.timeDown !== '') {
					return `还差 ${this.timeDown} 自动${msg}`
				}
				return ''
			}
		},
		onLoad(e) {
			if (!e.id) {
				uni.showToast({
					title: '非法参数',
					icon: 'none'
				})
				return;
			}
			this.id = e.id;
			this.getData()
		},
		methods: {
			getData() {
				this.$H.get('/order/' + this.id, {}, {
					token: true
				}).then(res => {
					console.log("detail", res);
					this.end_time = res.end_time ? res.end_time : 0
					this.no = res.no
					this.address = res.address
					this.total_price = res.total_price
					this.remark = res.remark
					this.paid_time = res.paid_time
					this.payment_method = res.payment_method
					this.payment_no = res.payment_no
					this.refund_status = res.refund_status
					this.ship_status = res.ship_status
					this.extra = res.extra
					this.create_time = res.create_time
					this.update_time = res.update_time
					// 整理商品列表数据
					let order_items = res.orderItems.map(v => {
						let attrs = []
						if (v.skus_type === 1 && v.goodsSkus && v.goodsSkus.skus) {
							let skus = v.goodsSkus.skus
							for (let k in skus) {
								attrs.push(skus[k].value)
							}
						}
						return {
							id: v.goods_id,
							cover: v.goodsItem.cover,
							title: v.goodsItem.title,
							pprice: v.price,
							attrs: attrs.join(','),
							num: v.num
						}
					})
					// 开启定时器
					this.order_items = order_items
					this.couponUserItem = res.couponUserItem
				})
			},
		}
	}
</script>

<style>

</style>
