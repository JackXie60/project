
<template>
	<view>
		<uni-swiper-action>
			<uni-swiper-action-item :right-options="options" @click="onClick($event,index)" v-for="(item ,index) in list" :key="index">
				<uni-list-item showArrow clickable hover-class="main-bg-hover-color" @click="handleClick(index)">
					<template #body>
						<view class="text-light-muted font animated fadeIn faster">
							<view class="d-flex a-center">
								<text class="main-text-color font-weight ml-1">{{ item.name }}</text>
								{{ item.phone }}
								<text class="main-text-color mr-1" v-if="item.isDefault">[默认]</text>
							</view>
							<view>
								{{ item.province+item.city+item.district }}
							</view>
							<view>
								{{ item.detailPath }}
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-swiper-action-item>		
		</uni-swiper-action>
		<!-- 上拉加载 -->
		<view class="d-flex j-center a-center text-muted p-2">
			{{ loadText }}
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import uniListItem from '../../components/comm/uni-list-item.vue'
	import uniSwiperAction from '../../components/uni-ui/uni-swipe-action/uni-swipe-action.vue'
	import uniSwiperActionItem from '../../components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		components: {
			uniListItem,
			uniSwiperAction,
			uniSwiperActionItem,
		},
		data() {
			return {
				loadText:'上拉加载更多',
				options: [{
					text: '修改',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				isChooes:false,
				page:1,
			}
		},
		computed:{
			...mapState({
				list:state=>state.path.list
			})
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.navigateTo({
					url: '/pages/user-path-edit/user-path-edit'
				})
			}
		},
		onLoad(e) {
			if(e.type === 'choose'){
				this.isChooes = true
			}
		},
		onShow(){
			this.getData(true)
		},
		onPullDownRefresh() {
			this.page=1;
			this.getData(true,()=>{
				uni.stopPullDownRefresh()
				uni.showToast({
					title:"刷新成功",
					icon:'none'
				})
			})
		},
		onReachBottom() {
			this.page++;
			this.loadText='加载中...';
			this.getData()
		},
		methods: {
			...mapMutations(['delAddress','updatePath','clearPath']),
			//初始化收货地址数据
			getData(isrefresh=false,callback){
				this.$H.get('/useraddresses/'+this.page,{},{
					token:true,
				}).then(res=>{
					let list = res.map((v,index)=>{
						return {
							province:v.province,
							city:v.city,
							district:v.district,
							zip:v.zip,
							id:v.id,
							name:v.name,
							phone:v.phone,
							detailPath:v.address,
							isDefault:index===0&&v.last_used_time!==null?true:false
						}
					})
					list.length<10 ? this.loadText='没有更多了':'上拉加载更多'
					list = isrefresh ? list : [...this.list,...list]
					this.updatePath(list);
					callback && callback();
				})
			},
			onClick(e,index) {
				if(e.index===0){
					//修改
					let obj  = JSON.stringify({
						index:index,
						item:this.list[index]
					})
					uni.navigateTo({
						url:"/pages/user-path-edit/user-path-edit?data="+obj
					})
				}else if(e.index===1){
					// 删除
					const id = this.list[index].id
					this.$H.del('/useraddresses/'+this.list[index].id,{},{
						token:true,
						toast:false,
					}).then(res=>{
						if(res){
							this.delAddress(id);
							uni.showToast({
								title:"删除成功",
								icon:'none'
							})
						};
					})
				}
			},
			// change(e, index) {
			// 	console.log('当前状态：下标：' + index)
			// },
			//如果从确认结算页面跳转过来，将其作为收货地址
			handleClick(index){
				if(this.isChooes){
					console.log('pathlist',this.list[index])
					uni.$emit('confirmPath',this.list[index])
					uni.navigateBack({
						delta:1
					})
				}
			}
			
		}
	}
</script>

<style>

</style>
