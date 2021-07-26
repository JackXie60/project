<template>
	<!-- 弹出框 -->
	<view class="_popup" :class="popupClass">
		<view class="_mask" @tap.stop="hide" @touchmove.stop.prevent="moveHandle">
			
		</view>
		<view class="_body">
			<slot/>
		</view>
	</view>
</template>

<script>
	export default{
		props:['popupClass'],
		methods:{
			hide(){
				console.log(2333)
				this.$emit('hide');
			},
			moveHandle(){
				
			}
		}
	}
</script>

<style>
	._popup,._mask{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
	}
	._popup{
		z-index: 1000;
		display: none;
	}
	._popup ._mask{
		background-color: rgba(0,0,0,0.3);
		z-index: 1002;
	}
	._popup ._body{
		z-index: 1004;
		position: fixed;
		bottom: -1135rpx;
		width: 92%;
		padding: 4%;
		height: 1135rpx;
		display: flex;
		background-color: #fff;
		flex-direction: column;
	}
	._popup.show{
		display: block;
	}
	.show ._mask{
		animation: showPopupMask 0.2s linear both;
	}
	.show ._body{
		animation: showPopupBody 0.2s linear both;
	}
	._popup.hide{
		display: block;
	}
	.hide ._mask{
		animation: hidePopupMask 0.2s linear both;
	}
	.hide ._body{
		animation: hidePopupBody 0.2s linear both;
	}
	._popup.none{
		display: none;
	}
	@keyframes showPopupBody{
		0%{
			transform: translateY(0);
		}
		100%{
			transform: translateY(-1135rpx);
		}
	}
	@keyframes hidePopupBody{
		0%{
			transform: translateY(-1135rpx);
		}
		100%{
			transform: translateY(0);
		}
	}
	@keyframes showPopupMask{
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	}
	@keyframes hidePopupMask{
		0%{
			opacity: 1;
		}
		100%{
			opacity: 0;
		}
	}
</style>
