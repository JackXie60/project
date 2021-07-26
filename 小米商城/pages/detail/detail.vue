<template>
	<view>
		<!-- 商品详情大图 -->
		<swiper-image :swiperImg="banners" :height="750"></swiper-image>
		<!-- 基础详情 -->
		<detail-info :detailInfo="detailInfo" :showPrice="showPrice"></detail-info>
		<!-- 滚动商品特性 -->
		<detail-feature :baseAttrs="baseAttrs"></detail-feature>
		<!-- 选中状态 -->
		<view class="rounded border bg-light-secondary">
			<uni-list-item v-if="detailInfo.sku_type===1" :showArrow="true" :clickable="true" @click="show('popupGoods')">
				<template #header>
					<view class="d-flex">
						<text class="text-muted mr-2">已选</text>
						{{ checkedSkusText }}
					</view>
				</template>
			</uni-list-item>
			<uni-list-item :showArrow="true" @click="openCoupon" :clickable="true">
				<template #header>
					<view class="d-flex">
						<text class="text-muted mr-2 flex-shrink">优惠卷</text>
						<!-- {{ checkedSkusText }} -->
						<!-- 地址 -->
						<view class="main-text-color ml-2 flex-shrink">
							马上领取
						</view>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item :showArrow="true" @click="show('popupAddr')" :clickable="true">
				<template #header>
					<view class="d-flex">
						<text class="text-muted mr-2 flex-shrink">配送</text>
						<!-- {{ checkedSkusText }} -->
						<!-- 地址 -->
						<text style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">四川省成都市双流区西航港街道</text>
						<view class="main-text-color ml-2 flex-shrink">
							有现货
						</view>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item :showArrow="true" :clickable="true" @click="show('popupService')">
				<template #header>
					<view class="d-flex a-center">
						<view class="d-flex mr-1">
							<view class="iconfont icon-finish main-text-color"></view>
							<text class="text-light-muted">小米自营</text>
						</view>
						<view class="d-flex mr-1">
							<view class="iconfont icon-finish main-text-color"></view>
							<text class="text-light-muted">小米发货</text>
						</view>
						<view class="d-flex">
							<view class="iconfont icon-finish main-text-color"></view>
							<text class="text-light-muted">七天无理由退款</text>
						</view>
					</view>
				</template>
			</uni-list-item>
		</view>
		<!-- 横向滚动评论 -->
		<scroll-comments :comments="comments" :id="detailInfo.id"></scroll-comments>
		<!-- 商品详情 -->
		<view class="py-4">
			<u-parse className="uparse" :content="context" @preview="preview" @navigate="navigate"></u-parse>
		</view>
		<!-- 热门推荐 -->
		<card headTitle="热门推荐" :headTitleWeight="false">
			<comm-list :listData="data" type="redirectTo"></comm-list>
		</card>
		<!-- 购物车 -->
		<home-bottom @show="show('popupGoods')" :showBadge="true" :badgeText="cartNum"/>
		<!-- 弹出框 -->
		<popup :popupClass="popup.popupGoods" @hide="hide('popupGoods')">
			<!-- 商品信息 -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="../../static/images/demo/cate_03.png" style="width: 180rpx;height: 180rpx;"></image>
				<view>
					<price unitSize="font" priceSize="font-lg">{{ showPrice }}</price>
					<view class="line-h-md">
						{{ checkedSkusText }}
					</view>
				</view>
			</view>
			<card :titleHead="item.title" :BottomBorder="false" :headTitleWeight="false" v-for="(item,index) in selects"
				:key="index">
				<my-radio-group :labels="item" :selected.sync='item.selected'></my-radio-group>
			</card>
			<view class="d-flex a-center border-top" style="line-height: 140rpx;">
				<text>购买数量</text>
				<uni-number-box :min="1" :max="maxStock" :value="detailInfo.num" @change="detailInfo.num=$event"
					style="margin-left:auto!important ;" />
			</view>
			<!-- 按钮 -->
			<view @click="addToCar"
				class="position-fixed bottom-0 w-100 row main-bg-color text-white font-md a-center j-center"
				style="height: 100rpx;margin-left:-30rpx ;">
				加入购物车
			</view>
		</popup>
		<!-- 收获地址 -->
		<popup :popupClass="popup.popupAddr" @hide="hide('popupAddr')">
			<!-- 商品信息 -->
			<view class="d-flex a-center j-center font-md" style="height: 100rpx;">
				收货地址
			</view>
			<scroll-view scroll-y="true" style="height: 835rpx;">
				<uni-list-item :showArrow="true" v-for="(item,index) in pathList" :key="index">
					<template #header>
						<view class="d-flex flex-column">
							<view class="font-weight">
								<text class="iconfont icon-dingwei"></text>
								<text>{{ item.name }}</text>
							</view>
							<view class="text-light-muted font">
								{{ item.path }}
								<text class="text-light-muted font ml-1">{{ item.detailPath }}</text>
							</view>
						</view>
					</template>
				</uni-list-item>
			</scroll-view>
			<!-- 按钮 -->
			<view @click="createPath"
				class="position-fixed bottom-0 w-100 row main-bg-color text-white font-md a-center j-center"
				style="height: 100rpx;margin-left:-30rpx ;">
				选择新地址
			</view>
		</popup>
		<!-- 服务说明 -->
		<!-- 收获地址 -->
		<popup :popupClass="popup.popupService" @hide="hide('popupService')">
			<!-- 商品信息 -->
			<view class="d-flex a-center j-center font-md" style="height: 100rpx;">
				服务说明
			</view>
			<scroll-view scroll-y="true" class="w-100" style="height: 835rpx;">
				<view class="py-1">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish main-text-color mr-2">
						</view>
						小米自营
					</view>
					<view class="text-light-muted font pl-4">
						不管满多少，就是不包邮
					</view>
				</view>
			</scroll-view>
			<!-- 按钮 -->
			<view @click="hide('popupService')"
				class="position-fixed bottom-0 w-100 row main-bg-color text-white font-md a-center j-center"
				style="height: 100rpx;margin-left:-30rpx ;">
				确定
			</view>
		</popup>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState,
		mapGetters
	} from 'vuex'
	import swiperImage from '@/components/index/swiper-image.vue'
	import detailInfo from '@/components/detail/base-info.vue'
	import detailFeature from '@/components/detail/detail-feature.vue'
	import uniListItem from '@/components/comm/uni-list-item.vue'
	import scrollComments from '@/components/detail/scroll-comment.vue'
	import uParse from '@/components/uni-ui/uParse/src/wxParse.vue'
	import card from '@/components/comm/card.vue'
	import commList from '@/components/comm/comm-list.vue'
	import homeBottom from '@/components/detail/home-bottom.vue'
	import popup from '@/components/comm/popup.vue'
	import price from '@/components/comm/price.vue'
	import myRadioGroup from '@/components/search-list/radio-group.vue'
	export default {
		components: {
			swiperImage,
			detailInfo,
			detailFeature,
			uniListItem,
			scrollComments,
			uParse,
			card,
			commList,
			homeBottom,
			popup,
			price,
			myRadioGroup,
		},
		data() {
			return {
				selects: [],
				popup: {
					popupGoods: 'none',
					popupAddr: 'none',
					popupService: 'none'
				},
				data: [],
				context: "",
				comments: [],
				banners: [],
				detailInfo: {},
				baseAttrs: [{
						icon: "icon-cpu",
						title: "CPU",
						desc: "绞龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "绞龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "绞龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "绞龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "绞龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "绞龙845八核"
					}
				]
			}
		},
		computed: {
			...mapState({
				pathList: state => state.path.list,
			}),
			...mapGetters(['cartNum']),
			showPrice() {
				if (this.checkedSkusIndex < 0) {
					return +this.detailInfo.min_price || 0.00;
				}
				if (!Array.isArray(this.detailInfo.goodsSkus)) {
					return -1
				}
				console.log(this.detailInfo.goodsSkus[this.checkedSkusIndex])
				return +this.detailInfo.goodsSkus[this.checkedSkusIndex].pprice
			},
			checkedSkusText() {
				let checkedSkus = this.selects.map(v => {
					return v.list[v.selected].name;
				})
				return checkedSkus.join(',')
			},
			checkedSkusIndex() {
				if (!Array.isArray(this.detailInfo.goodsSkus)) {
					return -1
				}
				let index = -1;
				this.detailInfo.goodsSkus.forEach((item, i) => {
					if (item.skusText === this.checkedSkusText) {
						index = i;
					}
				})
				return index;
			},
			maxStock(){
				if (!Array.isArray(this.detailInfo.goodsSkus)) {
					return 0
				}
				console.log('detailInfo',this.detailInfo)
				if(this.detailInfo.goodsSkus.length>0){
					return this.detailInfo.goodsSkus[this.checkedSkusIndex].stock
				}else{
					return this.detailInfo.stock
				}
			}
		},
		methods: {
			...mapMutations(['addCar']),
			openCoupon(){
				uni.navigateTo({
					url:'/pages/order-coupon/order-coupon'
				})
			},
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
			},
			show(name) {
				this.popup[name] = 'show'
			},
			hide(name) {
				this.popup[name] = 'hide'
				setTimeout(() => {
					this.popup[name] = 'none';
				}, 200)
			},
			createPath() {
				uni.navigateTo({
					url: "/pages/user-path-edit/user-path-edit"
				})
				this.hide('popupAddr')
			},
			//加入购物车;
			addToCar() {
				if(this.maxStock===0){
					uni.showToast({
						title:'暂无库存',
						icon:'none'
					})
					return ;
				}
				//加入购物车操作
				console.log('商品详细信息',this.detailInfo)
				this.$H.post('/cart',{
					shop_id:this.detailInfo.sku_type===0?this.detailInfo.id:this.detailInfo.goodsSkus[this.checkedSkusIndex].id,
					skus_type:this.detailInfo.sku_type,
					num:this.detailInfo.num
				},{
					token:true,
				}).then(res=>{
					this.hide('popupGoods')
					uni.showToast({
						title: "加入成功"
					})
					uni.$emit('updateCart')
				})
			}
		},
		onBackPress() {
			for (let key in this.popup) {
				if (this.popup[key] !== 'none') {
					this.hide(key);
					return true;
				}
			}
		},
		onLoad(e) {
			console.log(e)
			if (e.detail) {
				const result = JSON.parse(e.detail);
				this.$H.get('/goods/' + result.id).then(res => {
					console.log('res',res)
					this.banners = res.goodsBanner.map(item => {
						return item.url
					})
					uni.setNavigationBarTitle({
						title: res.title
					})
					this.detailInfo = res;
					this.detailInfo.num = 1;
					this.baseAttrs = res.goodsAttrs.map(v => {
						return {
							icon: 'icon-cpu',
							title: v.name,
							desc: v.value
						}
					})
					this.comments = res.hotComments.map(v => {
						let imgList = [...v.review.image];
						console.log(imgList)
						return {
							userpic: v.user.avatar,
							username: v.user.nickname,
							create_time: v.review_time,
							goods_num: v.goods_num,
							context: v.review.data,
							goods_list: imgList
						}
					})
					this.context = res.content;
					this.data = res.hotList.map(v => {
						return {
							id:v.id,
							cover: v.cover,
							title: v.title,
							desc: v.desc,
							oprice: v.min_oprice,
							pprice: v.min_price
						}
					})
					this.selects = res.goodsSkusCard.map(v => {
						let list = v.goodsSkusCardValue.map(item => {
							return {
								name: item.value
							}
						})
						return {
							title: v.name,
							selected: 0,
							list,
						}
					})
					this.detailInfo.goodsSkus.forEach(item => {
						let skusText = []
						const skus = item.skus;
						for (let key in skus) {
							skusText.push(skus[key].value);
						}
						item.skusText = skusText.join(',');
					})
				})
			}
		}
	}
</script>

<style>
	.uparse .p {
		padding: 0 !important;
	}

	.uparse view,
	.uparse uni-view {
		line-height: 0 !important;
	}
</style>
