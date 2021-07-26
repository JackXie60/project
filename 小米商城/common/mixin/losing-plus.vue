<template>
	<view v-if="beforeReady" style="z-index: 2100;" class="position-fixed top-0 left-0 right-0 bottom-0 bg-white font-md d-flex a-center j-center text-light-muted">
		加载中...
	</view>
</template>

<script>
	export default{
		props:['beforeReady']
	}
</script>

<style>
</style>
