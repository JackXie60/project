<template>
	<view>
		<view class="p-2">
			<view style="height: 100rpx;" class="d-flex a-center border-bottom">
				<text class="text-muted">用户评论({{ total }})</text>
				<text class="main-text-color ml-auto mr-1">{{ (goodsRate*100).toFixed(2) }}%</text>
				<text class="text-muted">满意</text>
			</view>
			<view class="row mt-2" style="margin-right: -20rpx;">
				<text @click="changeCate(index)" :class="cateIndex===index?'active':''"
					class="py-1 px-2 cate-item mr-2 mb-1" v-for="(item,index) in cateList" :key="index">
					{{ item.name }}
				</text>
			</view>
		</view>
		<divider></divider>
		<view class="py-2">
			<view class="row" v-for="(item,index) in commentList">
				<image :src="item.user.avatar" style="width: 90rpx;height: 90rpx;" class="rounded">
				</image>
				<view class="pl-2 flex-1">
					<view class="d-flex a-center">
						<text class="font-md text-primary font-weight">{{ item.user.nickname }}</text>
						<view class="iconfont icon-service main-text-color ml-auto">
							<text class="pl-1 font mr-2">{{ item.rating | rating }}</text>
						</view>
					</view>
					<view class="line-h-md font-md">
						{{ item.review.data }}
					</view>
					<view>
						<image :src="item.review.image" mode="widthFix" class="span24-8"></image>
					</view>
					<view class="d-flex">
						<text class="text-light-muted">{{ item.review_time }}</text>
						<view class="d-flex a-center text-muted mr-2 ml-auto line-h">
							{{ item.goods_num }}
							<text class="iconfont icon-dianzan"></text>
						</view>
						<view class="d-flex a-center text-muted mr-2 line-h">
							{{ item.extra.length }}
							<text class="iconfont icon-pinglun1"></text>
						</view>
					</view>
					<view class="bg-light-secondary rounded p-2 flex-wrap d-flex a-center mt-1">
						<text class="main-text-color mr-1">官方回复:</text>
						{{ item.extra[0].data }}
						<view class="iconfont icon-dianzan text-light-muted line-h-md font ml-2">
							<text class="text-muted pl-1">赞客服 {{ item.extra[0].good_num }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 上拉加载 -->
		<view class="d-flex j-center a-center text-muted p-2">
			{{ loadText }}
		</view>
	</view>
</template>

<script>
	import divider from '@/components/comm/divider.vue'
	export default {
		components: {
			divider,
		},
		data() {
			return {
				cateIndex: 0,
				cateList: [{
						name: "全部",
						value:""
					},
					{
						name: "好评",
						value:"/good"
					},
					{
						name: "中评",
						value:"/middle"
					},
					{
						name: "差评",
						value:"/bad"
					},
				],
				commentList:[],
				goodsRate:0,
				total:0,
				page:1,
				loadText:'上拉加载更多'//1，上拉加载更多，2.加载中，3.没有更多哦了
			}
		},
		onReachBottom() {
			if(this.loadText!=='上拉加载更多'){
				return ;
			}
			this.page++;
			this.loadText = '加载中'
			getData();
		},
		methods: {
			changeCate(index) {
				this.cateIndex = index;
				this.getData(true);
			},
			getData(refresh = false,callback){
				const cateVal = this.cateList[this.cateIndex].value
				this.$H.get('/goods/'+this.goodsid+'/comments' + cateVal + '?page='+this.page).then(res=>{
					this.total = res.total;
					this.goodsRate = res.good_rate;
					this.commentList = refresh ? res.list :[...this.commentList,...res.list];
					callback && callback();
					this.loadText = res.list.length<10 ? '没有更多数据' :'上拉加载更多'
				})
			}
		},
		filters:{
			rating(rate){
				console.log(rate)
				if(rate<3){
					return '差评'
				}else if(rate===3){
					return '中评'
				}else{
					return '好评'
				}
			}
		},
		onPullDownRefresh() {
			this.getData(true,()=>{
				uni.showToast({
					title:'刷新成功',
					icon:'none'
				})
				uni.stopPullDownRefresh()
			})
		},
		onLoad(e) {
			this.goodsid = e.goodsid;
			this.$H.get('/goods/'+this.goodsid+'/comments/good?page=1').then(res=>{
				this.commentList = res.list;
				this.total = res.total;
				this.goodsRate = res.good_rate;
			})
		}
	}
</script>

<style>
	.cate-item {
		background-color: #FFEBEC;
		color: #7B6D6C;
		border-color: #DE7232;
	}

	.cate-item.active {
		background-color: #FF6B01;
		color: #FFF;
		border-color: #DE7232;
	}
</style>
