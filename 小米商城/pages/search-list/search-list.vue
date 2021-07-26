<template>
	<view>
		<!-- 排序|筛选 -->
		<view class="position-fixed top-0 left-0 right-0 row border-top border-bottom animated fadeIn faster bg-white" style="height: 100rpx;z-index: 900;">
			<view @click="changeCondition(index)" class="flex-1 d-flex j-center a-center" v-for="(item,index) in screen.list" :key="index">
				<text :class="{'main-text-color':screen.currentIndex===index,'text-muted':screen.currentIndex!==index}">{{ item.name }}</text>
				<view>
					<view  :class="{'main-text-color':item.status===1,'text-muted':item.status!==1}" class="iconfont icon-paixu-shengxu line-h0"></view>
					<view  :class="{'main-text-color':item.status===2,'text-muted':item.status!==2}"  class="iconfont icon-paixu-jiangxu line-h0"></view>
				</view>
			</view>
			<view class="flex-1 d-flex a-center j-center main-text-color" @tap="showDrawer">
				筛选
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<!-- 右侧滑出 -->
		<uni-drawer ref="showRight" mode="right" :width="270" maskClick @change="changeDrawer">
			
			<card titleHead="服务" :BottomBorder="false" :headTitleWeight="false">
				<my-radio-group :labels="labels" :selected.sync='labels.selected'></my-radio-group>
			</card>
			
			<!-- 按钮 -->
			<view class="d-flex position-fixed bottom-0 right-0 w-100" style="z-index: 1000;">
				<view @click="confirm" class="flex-1 main-bg-color font-md text-white py-2 text-center" hover-class="main-bg-hover-color">
					确定
				</view>
				<view @click="closeDrawer" class="flex-1 font-md py-2 text-center bg-light-secondary" hover-class="main-bg-hover-color">
					重置
				</view>
			</view>
		</uni-drawer>
		
		<!-- 列表 -->
		<block v-for="(item,index) in list" :key="index">
			<goods-list :item="item" @click='openDetail(item)'></goods-list>
		</block>
		
		<nothing icon='no_comment' msg="空空如也" v-if="list.length===0" ></nothing>
		<!-- 上拉加载 -->
		<view class="d-flex j-center a-center text-muted p-2">
			{{ loadText }}
		</view>
	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue'
	import card from '@/components/comm/card.vue'
	import myRadioGroup from '@/components/search-list/radio-group.vue'
	import goodsList from'@/components/search-list/goods_list.vue'
	import nothing from '../../components/order/nothing.vue'
	export default {
		components:{
			uniDrawer,
			card,
			myRadioGroup,
			goodsList,
			nothing,
		},
		data() {
			return {
				lists:[],
				loadText:'上拉加载更多',
				showRight:false,
				screen:{
					currentIndex:0,
					list:[
						{name:'综合',status:1,key:'all'},
						{name:'销量',status:0,key:'sale_count'},
						{name:'价格',status:0,key:'min_price'},
					]
				},
				title:'',
				page:1,
				labels:{
					selected:0,
					list:[
						{name:"不限",rule:false,value:false},
						{name:"0-50",rule:"between",value:"0,50"},
						{name:"50-100",rule:"between",value:"50,100"},
						{name:"100-500",rule:"between",value:"100,500"},
						{name:"500-1000",rule:"between",value:"500,1000"},
						{name:"大于1000",rule:">",value:"1000"},
					]
				},
				list:[],
				condition:{},
				showRight:false,
				histoySearch:[],
			}
		},
		computed:{
			options(){
				let item = this.screen.list[this.screen.currentIndex];
				return {
					[item.key]:item.status===1?'asc':'desc'
				}
			}
		},
		onLoad(e) {
			console.log('beforechange',this.title);
			if(e.keyword){
				console.log('titlechange');
				this.title = e.keyword;
			}
			console.log(this.title)
			this.getData();
		},
		onReachBottom() {
			if(this.loadText!=='上拉加载更多') return;
			this.loadText = '加载中...'
			this.page++;
			this.getData();
		},
		onPullDownRefresh() {
			this.getData(true,()=>{
				uni.showToast({
					title:'刷新成功',
					icon:'none'
				})
				uni.stopPullDownRefresh();
			})
		},
		onNavigationBarSearchInputChanged(e) {
			this.title = e.text;
		},
		onNavigationBarSearchInputConfirmed() {
			this.initSearch()
			this.getData(true)
			this.addHistory()
		},
		onNavigationBarButtonTap() {
			this.initSearch()
			this.getData(true)
			this.addHistory()
		},
		onShow(){
			const searchHistory = uni.getStorageSync('searchHistory')
			if(searchHistory){
				this.histoySearch = JSON.parse(searchHistory);
			}
		},
		methods: {
			openDetail(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/detail/detail?detail='+JSON.stringify(item)
				})
			},
			addHistory(){
				console.log(this.histoySearch)
				let index = this.histoySearch.indexOf(this.title);
				if(index===-1){
					this.histoySearch.unshift(this.title);
				}else{
					this.histoySearch.unshift(this.histoySearch.splice(index,1)[0]);
				}
				uni.setStorageSync('searchHistory',JSON.stringify(this.histoySearch))
			},
			getChooseCondition(){
				const obj = this.labels.list[this.labels.selected]
				this.condition = {
					price: `${obj.rule},${obj.value}`
				}
			},
			initSearch(){
				this.labels.selected = 0;
				this.condition = {}
			},
			getData(isrefresh=false,callBack){
				// {
				// 	title:'真无线蓝牙耳机',
				// 	titlepic:'../../static/images/demo/demo5.jpg',
				// 	desc:'雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作',
				// 	price:'1399',
				// 	comment_num:1300,
				// 	good_num:97
				// }
				console.log('获取数据',this.condition)
				this.$H.post('/goods/search',{
					title:this.title,
					page:this.page,
					...this.options,
					...this.condition,
				}).then(res=>{
					let list = res.map(v=>{
						const goodnum = v.comments_count===0?0:(v.comments_good_count/v.comments_count)*100
						return {
							id:v.id,
							title:v.title,
							titlepic:v.cover,
							desc:v.desc,
							price:v.min_price,
							comment_num:v.comments_count,
							good_num:goodnum + "%",
						}
					})
					this.list = isrefresh ? [...list] : [...this.list,...list];				
					this.loadText = list.length<10 ? '没有更多了' : '上拉加载更多';
					callBack && callBack();
				})
			},
			changeCondition(index){
				const oldIndex = this.screen.currentIndex;
				const oldItem = this.screen.list[oldIndex];
				//如果点击的还是同一个部分，改变排序方式
				if(oldIndex===index){
					oldItem.status = oldItem.status === 1 ? 2 : 1;
					this.getData(true);
					return ;
				}
				//改变不同部分
				const newItem = this.screen.list[index];
				oldItem.status = 0;
				this.screen.currentIndex = index;
				newItem.status = 1;
				console.log(this.options)
				this.getData()
			},
			showDrawer(){
				this.$refs.showRight.open()
				//打开抽屉，保存初始状态
				this.oldSelected = this.labels.selected
			},
			closeDrawer(){
				this.labels.selected = this.oldSelected
				this.$refs.showRight.close()
				this.oldSelected = 0
			},
			confirm(){
				//点击确认后改变条件
				this.getChooseCondition();
				this.getData(true);
				this.$refs.showRight.close()
			},
			changeDrawer(status){
				// if(status===false){
				// 	this.closeDrawer()
				// }
			}
		}
	}
</script>

<style>
.top-10{
	top:100rpx
}
</style>
