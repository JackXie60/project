<template>
	<view class="">
		<!-- 卡片部分 -->
		<card :titleHead="card.title" :bodyCover="card.cover"/>
		<!-- 随机颜色按钮 -->
		<ColorTag :items="hot" @click="quickSearch"/>
		<!-- 常用分类 -->
		<card titleHead="常用分类" :BottomBorder="false">
			<ColorTag :items="cate" :haveColor="false" @click="quickSearch"></ColorTag>
		</card>
		<!-- 分割线 -->
		<divider></divider>
		<!-- 搜索记录 -->
		<card titleHead="搜索记录">
			<uni-list v-if="histoySearch.length>0">
				<uniListItem clickable @click="quickSearch(item)" :title="item" v-for="(item,index) in histoySearch" :key="index"></uniListItem>
			</uni-list>
		</card>
	</view>
</template>

<script>
	import card from '@/components/comm/card.vue'
	import ColorTag from '@/components/search/color-tag.vue'
	import uniListItem from '@/components/comm/uni-list-item.vue'
	import uniList from '@/components/uni-ui/uni-list/uni-list.vue'
	export default {
		components: {
			card,
			ColorTag,
			uniListItem,
			uniList,
		},
		data() {
			return {
				histoySearch:[],
				keyWord:'',
				card: {
					title: "热门搜索",
					cover: "../../static/images/demo/search-banner.png"
				},
				hot: [{
						name: '领券中心'
					},
					{
						name: 'Redmi K20'
					},
					{
						name: 'RedmiBook 14'
					},
					{
						name: '智能积木 越野四驱车'
					},
					{
						name: '手环 腕带'
					},
				],
				cate: [{
						name: '耳机'
					},
					{
						name: '手机'
					},
					{
						name: '音箱'
					},
					{
						name: '手表'
					},
					{
						name: '配件'
					},
					{
						name: '网关/传感器'
					},
					{
						name: '健康'
					},
					{
						name: '酷玩'
					},
				],
			}
		},
		onNavigationBarButtonTap(e) {	
			this.search()
		},
		onNavigationBarSearchInputChanged(e) {
			this.keyWord = e.text;
		},
		onNavigationBarSearchInputConfirmed() {
			this.search()
		},
		onShow(){
			console.log('show')
			const searchHistory = uni.getStorageSync('searchHistory')
			if(searchHistory){
				this.histoySearch = JSON.parse(searchHistory);
			}
		},
		methods: {
			quickSearch(name){
				this.keyWord = name
				this.search();
			},
			search(){
				if(this.keyWord===''){
					uni.showToast({
						title:"请输入内容",
						icon:'none'
					})
					return 
				}
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
				// #ifndef APP-PLUS
				uni.hideKeyboard()
				// #endif
				uni.navigateTo({
					url:"/pages/search-list/search-list?keyword="+this.keyWord
				})
				setTimeout(()=>{
					this.addHistory()
				},500)
			},
			addHistory(){
				let index = this.histoySearch.indexOf(this.keyWord);
				if(index===-1){
					this.histoySearch.unshift(this.keyWord);
				}else{
					this.histoySearch.unshift(this.histoySearch.splice(index,1)[0]);
				}
				if(this.histoySearch.length>6){
					this.histoySearch.splice(this.histoySearch.length-1,1)
				}
				uni.setStorageSync('searchHistory',JSON.stringify(this.histoySearch))
			}
		}
	}
</script>

<style>
</style>
