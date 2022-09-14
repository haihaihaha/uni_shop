<template>
	<view class="contact">
		<image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="info">
			<view @click="phone">联系电话：13554373560 ( 点击拨打 )</view>
			<view>地址：中华人民共和国</view>
		</view>
		<map class="map" :longitude="longitude" :scale="scale" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//地图数据
				longitude: 120.363172,
				latitude: 30.312212,
				scale: 13,
				markers:[
					{
						longitude: 120.363172,
						latitude: 30.312212,
						iconPath: '../../static/hmlogo.png',
						width: 30,
						height: 30
					}
				]
			}
		},
		methods: {
			phone() {
				//拨打电话
				uni.makePhoneCall({
					phoneNumber: '13554373560'
				})
			}
		}
	}
</script>

<style lang="scss">
.contact{
	.img{
		width: 750rpx;
		height: 320rpx;
	}
	.info{
		padding: 10rpx 20rpx;
		font-size: 30rpx;
		view{
			line-height: 80rpx;
			border-bottom: 1px solid #eee;
		}
	}
	
	.map{
		width: 750rpx;
		height: 750rpx;
	}
}
</style>
