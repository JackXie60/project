<script>
	export default {
		onLaunch: function() {
			this.$store.commit('initLoginInfo');
			this.$store.dispatch('initCartList')
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style>
	@import "/common/uni.css";
	@import "/common/animate.css";
	@import "/common/icon.css";
	@import "/common/common.css";
	@import "/common/zcm-main.css";
	/*每个页面公共css */
</style>
