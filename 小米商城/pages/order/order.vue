<template>
	<view>
		<!-- 选项卡 -->
		<view class="d-flex bg-white a-center font-md text-muted border-top border-bottom border-light-secondary">
			<view @tap.stop="tabIndex=index" :class="tabIndex===index?'tabActive':''"
				class="flex-1 d-flex a-center j-center py-2" v-for="(item,index) in tabBars" :key="index">
				{{ item.name }}
			</view>
		</view>
		<!-- 订单列表 -->
		<loading-plus :beforeReady="beforeReady"></loading-plus>
		<template v-show="!beforeReady">
			<block v-for="(tab,tabI) in tabBars" :key="tabI">
				<view class="position-relative" style="min-height: 400rpx;" v-show="tabI===tabIndex">
					<template v-if="tab.list.length>0">
						<block v-for="(item,index) in tab.list" :key="index">
							<order-list :item="item" @update="updateOrderList"></order-list>
							<divider></divider>
						</block>
					</template>
					<template v-else>
						<view class="position-relative border" style="height: 400rpx;">
							<nothing :icon="tab.nothing" :msg="tab.msg"></nothing>
						</view>
					</template>
				</view>
			</block>
		</template>
		<view class="text-center main-text-color font-md font-weight mt-5">
			为你推荐
		</view>
		<view class="position-relative d-flex a-center j-center text-secondary mb-3 pt-3">
			<view style="background: #F5F5F5;z-index: 2;" class="px-2 position-absolute">
				买的人还买了</view>
			<view class="position-absolute" style="height: 1upx;left: 0;right: 0;background-color: #DDDDDD;"></view>
		</view>
		<!-- 为你推荐 -->
		<view class="row j-sb bg-white">
			<comm-list :listData="hotList"></comm-list>
		</view>
	</view>
</template>

<script>
	import commList from '@/components/comm/comm-list.vue'
	import nothing from '@/components/order/nothing.vue'
	import orderList from '@/components/order/order-list.vue'
	import divider from '../../components/comm/divider.vue'
	import loading from '../../common/mixin/loading.js'
	export default {
		mixins: [loading],
		components: {
			commList,
			nothing,
			orderList,
			divider
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: '全部',
						id: 0,
						key: "all",
						nothing: "no-pay",
						list: [],
						msg: "你当前没有订单"
					},
					{
						name: '待付款',
						id: 0,
						key: "paying",
						nothing: "no_pay",
						list: [],
						msg: "你没有待付款订单"
					},
					{
						name: '待收货',
						id: 0,
						nothing: "no_receiving",
						key: "receiving",
						list: [],
						msg: "你没有待收货订单"
					},
					{
						name: '待评价',
						id: 0,
						nothing: "no_comment",
						key: "reviewing",
						list: [],
						msg: "你没有待评价订单"
					}
				],
				hotList: [],
			}
		},
		onLoad() {
			this.getHotList()
			let type = this.tabBars[this.tabIndex].key;
			console.log(type)
			this.getOrderList(this.tabIndex, type)
		},
		watch: {
			tabIndex(newVal) {
				this.beforeReady = true
				let item = this.tabBars[newVal];
				const type = item.key;
				this.getOrderList(newVal, type)
			}
		},
		methods: {
			//获取热门推荐
			getHotList() {
				this.$H.get('/goods/hotlist').then(res => {
					const hotlist = res.map(v => {
						return {
							id: v.id,
							cover: v.cover,
							name: v.title,
							desc: v.desc,
							oprice: v.min_oprice,
							pprice: v.min_price
						}
					})
					this.hotList = hotlist;
				})
			},
			updateOrderList() {
				let type = this.tabBars[this.tabIndex].key;
				this.getOrderList(this.tabIndex, type)
			},
			//获取订单列表信息
			getOrderList(tabIndex, type) {
				this.$H.post('/order/' + type, {}, {
					token: true
				}).then(res => {

					this.tabBars[tabIndex].list = res.map(item => {
						let order_items = item.order_items.map(v => {
							let attrs = []
							if (v.skus_type === 1 && v.goods_skus && v.goods_skus.skus) {
								let skus = v.goods_skus.skus
								for (let k in skus) {
									attrs.push(skus[k].value)
								}
							}
							return {
								id: v.goods_id,
								cover: v.goods_item.cover,
								title: v.goods_item.title,
								pprice: v.price,
								attrs: attrs.join(','),
								num: v.num,
								order_item_id: v.id,
								reviewed: v.reviewed,
								ship_status: v.ship_status,
								refund_status: v.refund_status
							}
						})
						this.beforeReady = false
						return {
							id: item.id,
							create_time: item.create_time,
							status: this.$U.formatStatus(item),
							order_items: order_items,
							total_price: item.total_price,
						}
					})
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}

	.tabActive {
		border-bottom: 5rpx solid #FD6801;
		color: #FD6801;
		margin-bottom: -5rpx;
	}
</style>
