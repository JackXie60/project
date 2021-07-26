<template>
	<view>
		<textarea :value="reason" placeholder="请描述退款原因" />
		<button type="default" :disabled="reason.length>0||loading?false:true" @click="submit">提交退款</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reason:"",
				refundId:0,
				loading:false,
			}
		},	
		onLoad(e){
			if(!e.detail){
				uni.showToast({
					title:"非法参数",
					icon:'none'
				})
				return;
			}
			const result = JSON.parse(e.detail);
			this.refundId = result.id;
		},
		methods: {
			submit(){
				this.loading = true;
				this.$H.post('/order/'+this.refundId+'/apply_refund',{
					reason:this.reason
				},{
					token:true,
				}).then(res=>{
					this.loading = false;
					uni.navigateBack({
						delta:1
					})
					uni.showToast({
						title:'申请成功，等待商家审核',
						icon:'none'
					})
				}).catch(err=>{
					this.loading = false;
				})
			}
		}
	}
</script>

<style>

</style>
