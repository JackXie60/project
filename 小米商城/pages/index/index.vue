<template>
	<view class="content">
		<!-- //顶部选项卡 -->
		<scroll-view scroll-x class="scroll-row" style="height: 80rpx;" :scroll-into-view="scrollinto"
			:scroll-with-animation="true">
			<view :id="'tab'+index" @tap="changeTableIndex(index)"
				:class="{'main-text-color selectScroll': index===scrollIndex}" class="scroll-row-item m-2 line-h pb-1"
				v-for="(tab,index) in tabBar" :key="index">
				{{ tab.name }}
			</view>
		</scroll-view>
		<swiper :duration="1000" :current="scrollIndex" :style="{height:swiperHeight+'px'}" @change="swiperChange">
			<swiper-item v-for="(item ,index) in scrollItems" :key="index">
				<scroll-view scroll-y="true" :style="{height:swiperHeight+'px'}" @scrolltolower="loadMore">
					<block v-for="(list,index) in item.list" :key="list.type">
						<!-- 轮播图 -->
						<SwiperImage v-if="list.type==='swiperImg'" :swiperImg="list.data"></SwiperImage>
						<template v-else-if="list.type==='icons'">
							<!-- 分类图标 -->
							<IconType :icons="list.data"></IconType>
							<!-- 分割线 -->
							<Divider />
						</template>
						<template v-else-if="list.type==='threeAdv'">
							<!-- 三图广告位区域 -->
							<ThreeAdv :threeAdv="list.data" />
							<!-- 分割线 -->
							<Divider />
						</template>
						<!-- 卡片区域 -->
						<Card :titleHead="list.data.titleHead" :bodyCover="list.data.bodyCover"
							v-else-if="list.type==='commTitle'"></Card>
						<!-- 公共列表 -->
						<CommList :listData="list.data" v-else-if="list.type==='list'" />
						<!-- 上拉刷新 -->
					</block>
					<!-- 上拉加载 -->
					<view class="d-flex j-center a-center text-muted p-2">
						{{ item.loadText }}
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 加入购物车 -->
		<view class="d-flex bg-white position-fixed bottom-0 left-0 right-0 border-top" style="height: 90rpx;">
			<view class="flex-1 d-flex j-center a-center flex-column line-h">
				<view class="iconfont icon-xihuan">

				</view>
				收藏
			</view>
			<view class="flex-1 d-flex j-center a-center flex-column line-h">
				<view class="iconfont icon-gouwuche">

				</view>
				购物车
			</view>
			<view style="flex:2.5" class="text-white main-bg-color d-flex j-center a-center">
				<view class="">
					加入购物车
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SwiperImage from '../../components/index/swiper-image.vue'
	import IconType from '../../components/index/icon-type.vue'
	import ThreeAdv from '../../components/index/three-adv.vue'
	import Card from 'components/comm/card.vue'
	import Price from 'components/comm/price.vue'
	import CommList from '../../components/comm/comm-list.vue'
	export default {
		components: {
			SwiperImage,
			IconType,
			ThreeAdv,
			Card,
			Price,
			CommList
		},
		data() {
			return {
				tabBar: [],
				scrollItems: [],
				scrollinto: "tab0",
				scrollIndex: 0,
				swiperHeight: 400,
			}
		},
		onLoad() {
			//获取可视区高度
			const self = this;
			uni.getSystemInfo({
				success: (res) => {
					this.swiperHeight = res.windowHeight - uni.upx2px(80);
				}
			})

			//获取数据
			this.__init();
		},
		methods: {
			changeTableIndex(i) {
				if (this.scrollIndex === i) {
					return;
				}
				this.scrollIndex = i;
				this.scrollinto = "tab" + i
			},
			swiperChange(e) {
				this.changeTableIndex(e.detail.current)
			},
			__init() {
				this.tabBar = tabBar;
				let list;
				for (let i = 0; i < this.tabBar.length; i++) {
					list = {
						name: this.tabBar[i].name,
						list: [],
						loadText:'上拉加载更多'
					}
					if(i===0){
						list.list = demo1
					}
					this.scrollItems = [
						...this.scrollItems,
						list,
					]
				}
			},
			loadMore() {
				console.log(1)
				if(this.scrollItems[this.scrollIndex].loadText!=='上拉加载更多'){
					return ;
				}
				console.log(1)
				const scrollItem = this.scrollItems[this.scrollIndex];
				this.scrollItems[this.scrollIndex] = {
					...scrollItem,
					loadText:'加载中',
					list:[
						...(scrollItem.list.filter(item=>{return item.type!=='list'})),	
						{
							type:'list',
							data:[
								...(scrollItem.list.filter(item=>{return item.type==='list'})[0].data),
								{
									cover: "../../static/images/demo/cate_04.png",
									name: "米家空调",
									desc: "1.5匹变频",
									oprice: 2699,
									pprice: 1399,
								}
							]
						}
					]
				}
				this.scrollItems[this.scrollIndex].loadText = '上拉加载更多'
				this.$forceUpdate()
			},
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.selectScroll {
		border-bottom: 5rpx solid #fd6801;
	}
</style>
