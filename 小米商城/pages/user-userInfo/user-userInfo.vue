<template>
	<view>
		<divider></divider>
		<uni-list-item showArrow>
			<template #header>
				头像
			</template>
			<template #footer>
				<image class="border-secondary rounded-circle border" src="../../static/images/demo/demo5.jpg" style="height: 90rpx;width: 90rpx;"></image>
			</template>
		</uni-list-item>
		<uni-list-item showArrow>
			<template #header>
				姓名
			</template>
			<template #footer>
				旭哥
			</template>
		</uni-list-item>
		<uni-list-item showArrow>
			<template #header>
				性别
			</template>
		</uni-list-item>
		<uni-list-item showArrow>
			<template #header>
				生日
			</template>
		</uni-list-item>
		<divider></divider>
		<uni-list-item showArrow>
			<template #header>
				修改密码
			</template>
		</uni-list-item>
		<uni-list-item showArrow>
			<template #header>
				密保手机
			</template>
		</uni-list-item>
	</view>
</template>

<script>
	import uniListItem from '@/components/comm/uni-list-item.vue'
	import divider from '@/components/comm/divider.vue'
	export default {
		components:{
			uniListItem,
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
