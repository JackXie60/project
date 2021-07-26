<template>
	<view class="animated fadeIn faster">
		<loading-plus :beforeReady="beforeReady"></loading-plus>
		<template v-if="!beforeReady">
			<uni-nav-bar :fixed="true" @clickRight="isedit=!isedit" title="购物车" :right-text="isedit?'完成':'编辑'" statusBar
				:shadow="false"></uni-nav-bar>
			<!-- 购物车为空 -->
			<view class="d-flex py-5 j-center a-center border-bottom" v-if="disableSelectAll">
				<text class="iconfont icon-gouwuche font-lg text-light-muted mr-2"></text>
				<text class="text-light-muted font-md mr-2">购物车为空</text>
				<text class="border py-1 px-2">去逛逛</text>
			</view>
			<!-- 购物车商品列表 -->
			<view class="px-2 bg-white" v-else>
				<!-- 列表 -->
				<view class="d-flex a-center py-3 border-bottom border-light-secondary" v-for="(item,index) in list"
					:key="index">
					<label @click="selectItem(index)" class="radio d-flex a-center j-center flex-shrink"
						style="height: 80rpx;width: 80rpx;">
						<radio :value="item.id" color="#FD6801" :checked="item.checked" /><text></text>
					</label>
					<image :src="item.cover" class="border border-light-secondary flex-shrink"
						style="height: 150rpx;width:150rpx;"></image>
					<view class="flex-1 d-flex flex-column ml-2">
						<view class="text-dark font-weight" style="font-size: 35rpx;">
							{{ item.title }}
						</view>
						<view v-if="item.skus_type===1" @click="handlePopup($event,index)"
							class="d-flex a-center text-light-muted mb-1"
							:class="isedit?'bg-light-secondary py-1 mb-2 px-1':''">
							<!-- <text class="mr-1" v-for="(attr,attrIndex) in item.attrs"
								:key="attrIndex">{{ attr.list[attr.selected].name }}</text> -->
							<text>{{ item.skusText }}</text>
							<template v-if="isedit">
								<text class="iconfont icon-bottom font ml-auto"></text>
							</template>
						</view>
						<view class="d-flex j-sb mt-auto">
							<price>{{ item.pprice }}</price>
							<uni-number-box :min="item.minnum" :value="item.num" :max="item.maxnum"
								@change="changeNum($event,item)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
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
			<!-- 合计 -->
			<view class="d-flex w-100 a-center position-relative bottom-0" style="height: 100rpx;"></view>
			<template v-if="!isedit">
				<view class="d-flex w-100 a-center position-fixed bottom-0 bg-white" style="height: 100rpx;z-index: 2000;">
					<label @click="setSelected" class="radio d-flex a-center j-center flex-shrink ml-1"
						style="height: 100rpx;width: 100rpx;">
						<radio :checked="checkedAll" color="#FD6801" :disabled="disableSelectAll" /><text></text>
					</label>
					<view class="flex-1 d-flex a-center j-center bg-white" style="height: 100%;">
						合计<price>{{ totalPrice }}</price>
					</view>
					<view @tap="computeTotal" class="flex-1 d-flex a-center j-center main-bg-color text-white"
						style="height: 100%;">
						结算
					</view>
				</view>
			</template>
			<template v-else>
				<view class="d-flex w-100 a-center position-fixed bottom-0" style="height: 100rpx;z-index: 2000;">
					<label @click="setSelected" class="radio d-flex a-center j-center flex-shrink ml-1 bg-white"
						style="height: 100rpx;width: 100rpx;">
						<radio :checked="checkedAll" color="#FD6801" :disabled="disableSelectAll" /><text></text>
					</label>
					<view class="flex-1 d-flex a-center j-center main-bg-color text-white" style="height: 100%;">
						移入收藏
					</view>
					<view @click="doDelGoods" class="flex-1 d-flex a-center j-center bg-danger text-white"
						style="height: 100%;">
						删除
					</view>
				</view>
			</template>
			<!-- 商品弹出框 -->
			<goods-popup :popupData="popupData" :popupShow="popupShow"></goods-popup>
		</template>
	</view>

</template>

<script>
	import price from '@/components/comm/price.vue'
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	import card from '@/components/comm/card.vue'
	import popup from '@/components/comm/popup.vue'
	import myRadioGroup from '@/components/search-list/radio-group.vue'
	import commList from '@/components/comm/comm-list.vue'
	import loading from '@/common/mixin/loading.js'
	import goodsPopup from '../../components/car/goodsPopup.vue'
	export default {
		mixins: [loading],
		components: {
			price,
			card,
			popup,
			myRadioGroup,
			commList,
			goodsPopup
		},
		computed: {
			...mapState({
				popupShow: state => state.car.popupShow,
				list: state => state.car.list,
				popupData: state => state.car.popupData,
				selectList:state=>state.car.selectList
			}),
			...mapGetters(['checkedAll', 'totalPrice', 'disableSelectAll','selectNum']),
		},
		data() {
			return {
				isedit: false,
				hotList: [],
				carList:[],
			}
		},
		onLoad() {
			this.getData()
			uni.$on('updateCart',()=>{
				this.getData()
			})
		},
		onShow() {
			
		},
		onPullDownRefresh() {
			this.getData(()=>{
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				}) 
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			...mapActions(['setSelected', 'doDelGoods', 'showPopup', 'hidePopup']),
			...mapMutations(['selectItem', 'setList']),
			handleClick() {
				console.log(this.list)
			},
			//更改购物车中商品数量
			changeNum($event, item) {
				item.num = $event
				this.$H.post('/cart/updatenumber/'+item.id,{
					num:item.num
				},{
					token:true,
				})
			},
			//弹出弹框，并且根据id获取规格数据
			handlePopup($event, index) {
				if (this.isedit) {
					//获取到商品的详细信息，包括属性
					console.log(index)
					console.log(this.list)
					this.$H.get('/cart/' + this.list[index].id + '/sku', {}, {
						token: true,
					}).then(res => {
						let check = this.list[index].skusText.split(',');
						let selected = 0;
						//拼接selectes数据，radio-graup框使用
						res.selects = res.goods_skus_card.map((v, i) => {
							let list = v.goods_skus_card_value.map((item, index) => {
								if (check[i] === item.value) {
									selected = index;
								}
								return {
									id: item.id,
									name: item.value
								}
							})
							return {
								id: v.id,
								title: v.name,
								selected: selected,
								list,
							}
						})
						//对商品属性进行处理，添加skusText
						res.goods_skus.forEach(item => {
							let skusText = []
							const skus = item.skus;
							for (let key in skus) {
								skusText.push(skus[key].value);
							}
							item.skusText = skusText.join(',');
						})
						//组装数据完成，弹出弹出框
						this.showPopup({
							index,
							data: res
						})
					})

				} else {
					return;
				}
			},
			//跳转到结算页面
			computeTotal() {
				if(this.selectNum>0){
					uni.navigateTo({
						url: "../order-confirm/order-confirm?detail="+JSON.stringify(this.selectList)
					})
				}else{
					uni.showToast({
						title:'请选择商品',
						icon:'none'
					})
				}
			},
			//获取购物车数据
			async getData(callback) {
				//获取购物车数据
				// checked:true,
				// 	id:11,
				// 	title:'小米手机',
				// 	cover:'/static/images/demo/cate_06.png',
				// 	pprice:3366,
				// 	num:1,
				// 	minnum:1,
				// 	maxnum:10
				// },
				await this.$H.get('/cart', {}, {
					token: true
				}).then(res => {
					console.log(res)
					const carData = res.map(v => {
						return {
							...v
						}
					})
					this.setList(carData)
				})
				//获取热门推荐
				await this.$H.get('/goods/hotlist').then(res => {
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
				callback && callback();
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
</style>
