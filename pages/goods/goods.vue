<template>
	<view class="goods_list">
		<goods-list 
			@goodsItemClick="goGoodsDetail" 
			:goods="goods"
		></goods-list>
		<view class="isOver" v-if="flag">-----没了没了，别拉了-----</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		data() {
			return {
				pageindex: 1,//页码
				goods: [],
				flag: false//下拉触底标志
			}
		},
		components: {"goods-list":goodsList},
		methods: {
			// 获取商品列表数据
			async getGoodsList(callBack) {
				const res = await this.$myRuquest({
					url: '/api/getgoods?pageindex='+this.pageindex
				})
				//累加商品列表
				this.goods = [...this.goods,...res.data.message]
				//停止下拉刷新回调
				callBack && callBack()
			},
			// 导航到商品详情页
			goGoodsDetail (id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id='+id
				})
			}
		},
		//
		onLoad () {
			//加载页面 获取商品列表
			this.getGoodsList()
		},
		//监听页面触底的回调
		onReachBottom() {
			//如果没有更多数据了
			if(this.goods.length<this.pageindex*10) 
				return this.flag = true
			this.pageindex++
			this.getGoodsList()
		},
		//监听页面上拉的回调
		onPullDownRefresh() {
			console.log('下拉刷新了')
			this.pageindex = 1//重置页码
			this.goods = []//清空商品列表
			this.flag = false
			//更新商品列表延迟
			setTimeout(()=>{
			  this.getGoodsList(()=>{//请求成功 停止下拉刷新
					uni.stopPullDownRefresh()
				})	
			},1000)
		}
	}
</script>

<style lang="scss">
	.goods_list {
		background: #eee;;
	}
	.isOver {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		// background: #fff;
		font-size: 28rpx;
	}
</style>
