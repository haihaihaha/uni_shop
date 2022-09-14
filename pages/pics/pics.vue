<template>
	<view class="pics">
		<!-- 左侧分类列表 -->
		<scroll-view class="left" scroll-y>
			<view 
				@click="leftClickHandle(index,item.id)"
				:class="active===index?'active':''" 
				v-for="(item,index) in cates" 
				:key="item.id">
				{{item.title}}
			</view>
		</scroll-view>
		<!-- 右侧展示列表 -->
		<scroll-view class="right" scroll-y>
			<view 
				class="item" 
				v-for="item in secondData" 
				:key="item.id">
				<image 
					@click="previewImg(item.img_url)" 
					:src="item.img_url"
				></image>
				<text>{{item.title}}</text>
			</view>
			<text v-if="secondData.length === 0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cates: [],//分类列表
				active: 0,//是否选中
				secondData: []//数据列表
			}
		},
		methods: {
			//获取分类列表的回调
			async getPicsCate () {
				const res = await this.$myRuquest({
					url: '/api/getimgcategory'
				})
				this.cates = res.data.message
				//获取右侧数据
				this.leftClickHandle(0,this.cates[0].id)
			},
			//获取右侧二级分类数据的回调
			async leftClickHandle (activeIndex,id) {
				this.active = activeIndex
				// 获取右侧的分类数据
				const res = await this.$myRuquest({
					url: '/api/getimages/'+id
				})
				this.secondData = res.data.message
			},
			//点击触发图片预览的回调
			previewImg (current) {
				//获取图片列表
				const urls = this.secondData.map(item=>{
					return item.img_url
				})
				//预览图片
				uni.previewImage({
					current,
					urls
				})
			}
		},
		
		onLoad () {
			this.getPicsCate()
		}
	}
</script>

<style lang="scss">
page{
	height: 100%;
}
.pics{
	height: 100%;
	display: flex;
	.left{
		width: 200rpx;
		height: 100%;
		border-right:1px solid #eee;
		view{
			height: 60px;
			line-height: 60px;
			color: #333;
			text-align: center;
			font-size: 30rpx;
			border-top:1px solid #eee;
		}
		.active{
			background: $shop-color;
			color: #fff;
		}
	}
	.right{
		height: 100%;
		width: 520rpx;
		margin: 10rpx auto;
		.item{
			image{
				width: 520rpx;
				height: 520rpx;
				border-radius: 5px;
			}
			text{
				font-size: 30rpx;
				line-height: 60rpx;
			}
		}
	}
}
</style>
