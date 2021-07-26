<template>
	<view>
		<!-- 选项卡 -->
	<!-- 	<view class="d-flex bg-white a-center font-md text-muted border-top border-bottom border-light-secondary">
			<view @tap.stop="tabIndex=index" :class="tabIndex===index?'tabActive':''"
				class="flex-1 d-flex a-center j-center py-2" v-for="(item,index) in tabBars" :key="index">
				{{ item.name }}
			</view>
		</view> -->
		<!-- 订单列表 -->
		<view style="box-sizing: border-box;" class="p-3">
			<view class="position-relative" style="min-height: 400rpx;">
				<template v-if="list.length>0">
					<block v-for="(item,index) in list" :key="index">
						<coupon :item="item" :index="index" @click="getCoupon"></coupon>
					</block>
				</template>
				<template v-else>
					<!-- <view class="position-relative" style="height: 400rpx;">
						<nothing :icon="tab.nothing" :msg="tab.msg"></nothing>
					</view> -->
				</template>
			</view>
		</view>
		<!-- 上拉加载 -->
		<view class="d-flex j-center a-center text-muted p-2">
			{{ loadText }}
		</view>
	</view>
</template>

<script>
	import orderList from '@/components/order/order-list.vue'
	import nothing from '../../components/order/nothing.vue'
	import coupon from '../../components/order-coupon/coupon.vue'
	export default {
		components: {
			nothing,
			orderList,
			coupon,
		},
		data() {
			return {
				loadText:'上拉加载更多',
				page: 1,
				tabIndex: 0,
				list:[],
				from:null,
				tabBars: [
					{
						name: '可用',
						id: 0,
						nothing: "no_receiving",
						list: []
					},
					{
						name: '已失效',
						id: 0,
						nothing: "no_receiving",
						list: []
					}
				]
			}
		},
		onLoad(e) {
			if(e.from){
				this.from = e.from;
			}
			this.getData()
		},
		onReachBottom() {
			if(this.loadText!=='上拉加载更多') return;
			this.loadText = '加载中...';
			this.page++;
			this.getData()
		},
		onPullDownRefresh() {
			this.getData().then(res=>{
				uni.showToast({
					title:'刷新成功',
					icon:'none',
				})
				uni.stopPullDownRefresh()
			})
			
		},
		methods: {
			getCoupon(item){
				this.$H.post('/getcoupon/'+item.id,{},{
					token:true,
				}).then(res=>{
					uni.showToast({
						title:'领取成功',
						icon:'none'
					})
					if(this.from==='order'){
						uni.navigateBack({
							delta:1,
						})
						uni.$emit('couponUse',{
							id:item.id,
							value:item.price,
							type:item.type,
						})
					}
				})
			},
			getData() {
				return new Promise((resolve,reject)=>{
					this.$H.get("/coupon/" + this.page, {}, {
						token: true,
					}).then(res => {
						const couponList = res.map(v=>{
							const time = new Date().getTime()/1000;
							const status = (new Date(v.end_time).getTime()/1000 < time) || (v.status === 0)
							return {
								id:v.id,
								type:v.type,
								name:v.name,
								price:v.value,
								tota:v.total,
								desc:v.desc,
								start_time:v.start_time,
								end_time:v.end_time,
								status:!status,
								disabled:v.coupon_user.length>0?true:false
							}
						}) 
						this.list = couponList;
						this.loadText = this.list.length < 10 ? '没有更多了' : '上拉加载更多'
						resolve(res)
					}).catch(err=>{
						reject(err)
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
</style>
