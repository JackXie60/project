<template>
	<view>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				收货人:
			</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.name"/>
		</view>
		<view class="p-2 d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				手机号码:
			</view>
			<input class="px-1 font-md flex-1" type="text"  v-model="form.phone" />
		</view>
		<view class="p-2 d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				邮编:
			</view>
			<input class="px-1 font-md flex-1" type="text"  v-model="form.zip" />
		</view>
		<divider></divider>
		<view class="p-2  border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				所在地区:
			</view>
			<input :value="pickerText" class="px-1 font-md flex-1" type="text" disabled @click="showMulLinkageThreePicker" placeholder="请选择所在地区"/>
			<city-picker ref="mpvueCityPicker" :themeColor="themeColor" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm"></city-picker>
		</view>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				详细地址:
			</view>
			<input class="px-1 font-md flex-1" type="text" value=""  v-model="form.detailPath"/>
		</view>
		<divider></divider>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				设为默认地址:
			</view>
			<switch :checked="form.isDefault" @change="form.isDefault=$event.target.value" class="ml-auto" color="#FD6801"/>
		</view>
		<view class="py-2 d-flex j-center a-center main-bg-color text-white mt-3 mx-2" @click="submit">
			保存
		</view>
	</view>
</template>

<script>
	import { mapMutations,mapActions } from 'vuex'
	import cityPicker from '../../components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components:{
			cityPicker,
		},
		data() {
			return {
				isedit:false,
				themeColor:'#007AFF',
				pickerValueDefault:[0,0,1],
				form:{
					id:0,
					province:"",
					city:"",
					district:"",
					detailPath:"",
					zip:"",
					name: "",
					phone: "",
					isDefault: false,
				},
				index:-1,
				item:null,
			}
		},
		
		computed:{
			pickerText(){
				return this.form.province+'-'+this.form.city+'-'+this.form.district;
			}
		},
		
		methods: {
			...mapActions(['updateAddress','createAddress']),
			//三级联动确认
			onConfirm(e){
				let picker = e.label.split('-');
				this.form.province = picker[0]
				this.form.city = picker[1]
				this.form.district = picker[2]
			},
			//三级联动选择
			showMulLinkageThreePicker(){
				this.$refs.mpvueCityPicker.show();
			},
			submit(){
				//验证
				if(this.item!==null){
					this.isedit = true
				}
				if(this.isedit){
					//修改
					this.$H.post('/useraddresses/'+this.form.id,{
						province:this.form.province,
						city:this.form.city,
						district:this.form.district,
						address:this.form.detailPath,
						zip:this.form.zip,
						name:this.form.name,
						phone:this.form.phone,
						default:this.form.isDefault?1:0
					},{
						token:true,
					}).then(res=>{
						if(res){
							uni.showToast({
								title:"修改成功",
								success:()=>{
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},400)
								}
							})
						}
					})
				}else{
					//添加
					this.$H.post('/useraddresses',{
						province:this.form.province,
						city:this.form.city,
						district:this.form.district,
						address:this.form.detailPath,
						zip:this.form.zip,
						name:this.form.name,
						phone:this.form.phone,
						default:this.form.isDefault?1:0
					},{
						token:true,
					}).then(res=>{
						uni.showToast({
							title:"添加成功",
							success: ()=>{
								uni.navigateBack({
									delta:1
								})
							}
						})
					})
				}
			}
		},
		onLoad(e) {	
			console.log(e)
			let result = e.data;
			if(result){
				console.log('result',result)
				result = JSON.parse(result)
				this.index = result.index;
				this.item = result.item;
				this.form = this.item;
				uni.setNavigationBarTitle({
					title:"修改收货地址"
				})
			}
		},
		// 返回
		onBackPress(){
			if(this.$refs.mpvueCityPicker.showPicker){
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		// 页面卸载
		onUnload() {
			if(this.$refs.mpvueCityPicker.showPicker){
				this.$refs.mpvueCityPicker.pickerCancel();
			}
		}
	}
</script>

<style>
page{
	background-color: #EEE;
}
</style>
