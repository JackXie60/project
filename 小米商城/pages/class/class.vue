<template>

	<view class="d-flex" style="height: 100%;box-sizing: border-box;">
		<loading-plus :beforeReady="beforeReady"></loading-plus>
		<scroll-view :scroll-top="leftScrollTop" id="leftScroll" scroll-y style="flex:1;height: 100%;"
			class="border-right border-light-secondarys">
			<view class="border-bottom border-light-secondary scroll-left-item" @tap="changeCate(index)"
				v-for="(item,index) in cate" :key="index">
				<view class="py-1 font-md text-muted text-center" :class="activeIndex===index?'scroll-active':''">
					{{ item.name }}
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" style="flex:3.5;height: 100%;" :scroll-top="rightScrollTop"
			:scroll-with-animation="true" @scroll="onRightScroll">
			<view class="row scroll-right-item" v-for="(item,index) in list" :key="index">
				<view @click="openDetail(item2)" style="height: 250rpx;" class="span24-8 d-flex flex-column a-center j-center test"
					v-for="(item2,index2) in item.list" :key="index2">
					<image :src="item2.cover"  style="width: 150rpx;height: 200rpx;"></image>
					<text>{{ item2.name }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import loading from '../../common/mixin/loading.js'
	export default {
		mixins: [loading],
		data() {
			return {
				cate: [],
				activeIndex: 0,
				list: [],
				leftDomsTop: [],
				rightDomsTop: [],
				rightScrollTop: 0,
				timer: null,
				lock: false,
				cateItemHeight: 0,
				leftScrollTop: 0,
				showLoading: true,
			}
		},
		watch: {
			activeIndex(newVal, oldVal) {
				const query = uni.createSelectorQuery().in(this);
				query.select("#leftScroll").fields({
					size: true,
					scrollOffset: true
				}, data => {
					let H = data.height;
					let ST = data.scrollTop;
					if ((this.leftDomsTop[newVal] + this.cateItemHeight) > (H + ST)) {
						this.leftScrollTop = this.leftDomsTop[newVal] + this.cateItemHeight - H;
					}
					if (ST > this.cateItemHeight) {
						this.leftScrollTop = this.leftDomsTop[newVal]
					}
				}).exec();
			}
		},
		onReady() {

		},
		onLoad() {
			this.getData()
		},
		methods: {
			openDetail(item){
				uni.navigateTo({
					url:'/pages/detail/detail?detail='+JSON.stringify({
						id:item.goods_id,
						title:item.name
					})
				})
			},
			changeCate(index) {
				console.log(index)
				this.activeIndex = index;
				this.rightScrollTop = this.rightDomsTop[index]
			},
			async onRightScroll(e) {
				console.log(this.rightDomsTop)
				this.rightDomsTop.forEach((v, k) => {
					if (v < e.detail.scrollTop + 3) {
						this.activeIndex = k;
						return false;
					}
				})
			},
			getData() {
				let cate = []
				let list = []
				this.$H.get('/category/app_category').then(res=>{
					res.map(item=>{
						cate.push({
							name:item.name,
						})
						list.push({
							list:item.app_category_items
						})
					})
					this.cate = cate;
					this.list = list
					this.$nextTick(()=>{
						const query = uni.createSelectorQuery().in(this);
						query.selectAll('.scroll-left-item').fields({
							size: true,
							rect: true,
						}, data => {
							this.leftDomsTop = data.map(v => {
								this.cateItemHeight = v.height;
								return v.top;
							})
						}).exec();
						query.selectAll('.scroll-right-item').boundingClientRect(data => {
							this.rightDomsTop = data.map(v => {
								return v.top
							})
						}).exec();
					})
				})
			}
		}
	}
</script>

<style>
	.scroll-active {
		border-left: 8rpx solid #FD6801;
		color: #FD6801 !important;
	}
</style>
