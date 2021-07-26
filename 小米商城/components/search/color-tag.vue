<template>
	<view class="p-2 mt-1">
		<view @click="handleClick(item.name)" class="border px-2 py-1 d-inline-block m-1" :style="randomColor()" v-for="(item,index) in items" :key="index">
			{{ item.name }}
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			items:Array,
			haveColor:{
				type:Boolean,
				default:true,
			}
		},
		methods: {
			randomColor() {
				if(!this.haveColor){
					return `border:0;background:#F5F5F5;`;
				}
				let color = {
					borderColor: ['#EEA6AA', '#DD6A4B', '#98D5D8', '#9DBE93', '#BCCD99'],
					background: ['#F8EAE9', '#FFBEC6', '#E8F6F6', '#E4F5E2', '#F2F6E8']
				};
				return `background-color:${ color.background[Math.floor(Math.random()*5)]};
				border-color:${ color.borderColor[Math.floor(Math.random()*5)]}`
			},
			handleClick(name){
				this.$emit('click',name)
			}
		}
	}
</script>

<style>
</style>
