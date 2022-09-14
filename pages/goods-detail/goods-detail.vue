<template>
	<view class="goods_detail">
		<!-- 轮播图 -->
		<swiper indicator-dots>
			<swiper-item v-for="(item,index) in swipers" :key="index">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="box1">
			<view class="price">
				<text>￥{{info.sell_price}}</text>
				<text>￥{{info.market_price}}</text>
			</view>
			<view class="goods_name">{{info.title}}</view>
		</view>
		
		<view class="line"></view>
		<!-- 商品库存 -->
		<view class="box2">
			<view>货号：{{info.goods_no}}</view>
			<view>库存：{{info.stock_quantity}}</view>
		</view>
		
		<view class="line"></view>
		<!-- 商品详情 -->
		<view class="box3">
			<view class="tit">详情介绍</view>
			<view class="content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</view>
		<!-- 购物车导航组件 -->
		<view class="goods_nav">
			<uni-goods-nav 
				:fill="true"  
				:options="options" 
				:button-group="buttonGroup"  
				@click="onClick" 
				@buttonClick="buttonClick" 
			></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		data() {
			return {
				id: 0,
				swipers: [],
				info: {},
				content: '',
				options: [
					{
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/kefu.png',
						text: '客服'
					}, {
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
						text: '店铺'
					}, {
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
						text: '购物车',
						info: 12
					},
				],
				buttonGroup: [
					{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		methods: {
			//获取轮播图的回调
			async getSwipers () {
				const res = await this.$myRuquest({
					url: '/api/getthumimages/'+this.id
				})
				this.swipers = res.data.message
			},
			//获取商品信息的回调
			async getDetailInfo () {
				const res = await this.$myRuquest({
					url: '/api/goods/getinfo/'+this.id
				})
				this.info = res.data.message[0]
			},
			//获取商品详情的回调
			async getDetailContent () {
				const res = await this.$myRuquest({
					url: '/api/goods/getdesc/'+this.id
				})
				this.content = res.data.message[0].content
			},
			onClick (e) {
				// uni.showToast({
				// 	title: `点击${e.content.text}`,
				// 	icon: 'none'
				// })
				console.log(e)
			},
			buttonClick (e) {
				console.log(e)
				// this.options[2].info++
			}
		},
		
		onLoad (options) {
			this.id = options.id
			this.getSwipers()
			this.getDetailInfo()
			this.getDetailContent()
		},
		components: {uniGoodsNav}
	}
</script>

<style lang="scss">
.goods_detail{
	swiper{
		height: 700rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.box1 {
		padding: 10px;
		.price {
			font-size: 35rpx;
			color: $shop-color;
			line-height: 80rpx;
			text:nth-child(2){
				color: #ccc;
				font-size: 28rpx;
				text-decoration: line-through;
				margin-left: 20rpx;
			}
		}
		.goods_name{
			font-size: 32rpx;
			line-height: 60rpx;
		}
	}
	.box2 {
		padding: 0 10px;
		font-size: 32rpx;
		line-height: 70rpx;
	}
	.box3 {
		padding-bottom: 50px;
		.tit{
			font-size: 32rpx;
			padding-left: 10px;
			border-bottom: 1px solid #eee;
			line-height: 70rpx;
		}
		.content {
			padding: 10px;
			font-size: 28rpx;
			color: #333;
			line-height: 50rpx;
		}
	}
}

.goods_nav {
	position: fixed;
	bottom:0;
	width: 100%;
}

.line {
	height: 10rpx;
	width: 750rpx;
	background: #eee;
}
</style>
