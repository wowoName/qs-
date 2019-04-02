<template>
	<div class="bDeMain">
		<x-header :left-options="{backText:''}" class="indexHeader">订单明细</x-header>
		<tab active-color="#111111" default-color="#111111" bar-active-color="#FE1969" line-width="0.125rem" custom-bar-width="2.0625rem">
			<tab-item :selected="tabIndex===0" @on-item-click="onItemClick">全部</tab-item>
			<tab-item :selected="tabIndex===1" @on-item-click="onItemClick">已付款</tab-item>
			<tab-item :selected="tabIndex===2" @on-item-click="onItemClick">已结算</tab-item>
			<tab-item :selected="tabIndex===3" @on-item-click="onItemClick">已失效</tab-item>
		</tab>
		<div class="orderCom">
			<swiper :show-dots="false" v-model="tabIndex" :threshold="80">
				<swiper-item>
					<view-box ref="viewboxs0">
						<scroller :on-refresh="onRefreshA" :on-infinite="onInfiniteLoadA" ref="">
							<order-template :data="allOrderData"></order-template>
						</scroller>
					</view-box>
				</swiper-item>
				<swiper-item>
					<view-box ref="viewboxs1">
						<scroller :on-refresh="onRefreshF" :on-infinite="onInfiniteLoadF" ref="">
							<order-template :data="payOrderData"></order-template>
						</scroller>
					</view-box>
				</swiper-item>
				<swiper-item>
					<view-box ref="viewboxs2">
						<scroller :on-refresh="onRefreshJ" :on-infinite="onInfiniteLoadJ" ref="">
							<order-template :data="beenSettled"></order-template>
						</scroller>
					</view-box>
				</swiper-item>
				<swiper-item>
					<view-box ref="viewboxs3">
						<scroller :on-refresh="onRefreshS" :on-infinite="onInfiniteLoadS" ref="">
							<order-template :data="failureData"></order-template>
						</scroller>
					</view-box>
				</swiper-item>
			</swiper>
		</div>


	</div>
</template>

<script>
	import {
		XHeader,
		ViewBox,
		Tab,
		TabItem,
		Swiper,
		SwiperItem
	} from 'vux';
	import OrderTemplate from "@/components/ordertemplate";
	export default {
		name: 'MyFan',
		components: {
			XHeader,
			ViewBox,
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			OrderTemplate
		},
		data() {
			return {
				tabIndex: 0,		
				allOrderData: [], //全部订单数据
				allOrderP: 1, //全部订单页数
				payOrderData: [], //付款数据
				payOrderP: 1, //付款订单页数
				beenSettled: [], //已结算数据
				setOrderP: 1, //已结算订单页数
				failureData: [], //已失效订单数据
				failureP: 1 //已失效订单页数
			}
		},
		watch: {},
		methods: {
			//tab切换事件
			onItemClick(index) {
				this.tabIndex = Number(index);
			},
			// 全部订单下拉刷新
			onRefreshA(done) {
				this.allOrderData = [];
				this.allOrderP = 1;
				this.getOrdersData("allOrderP", "allOrderData", done);
			},
			// 全部订单上拉加载
			onInfiniteLoadA(done) {
				this.getOrdersData("allOrderP", "allOrderData", done);
			},
			// 付款订单下拉刷新
			onRefreshF(done) {
				this.payOrderData = [];
				this.payOrderP = 1;
				this.getOrdersData("payOrderP", "payOrderData", done);
			},
			// 付款订单上拉加载
			onInfiniteLoadF(done) {
				this.getOrdersData("payOrderP", "payOrderData", done);
			},
			// 结算订单下拉刷新
			onRefreshJ(done) {
				this.beenSettled = [];
				this.setOrderP = 1;
				this.getOrdersData("setOrderP", "beenSettled", done);
			},
			// 结算订单上拉加载
			onInfiniteLoadJ(done) {
				this.getOrdersData("setOrderP", "beenSettled", done);
			},
			// 失效订单下拉刷新
			onRefreshS(done) {
				this.failureData = [];
				this.failureP = 1;
				this.getOrdersData("failureP", "failureData", done);
			},
			// 失效订单上拉加载
			onInfiniteLoadS(done) {
				this.getOrdersData("failureP", "failureData", done);
			},
			getOrdersData(pageSize, dataKey, done) {
				this.getData(pageSize, dataKey).then((data) => {
					if (data == "0")
						done(true);
					else done();
				});
			},
			//获取订单数据
			getData(pageSize, dataKey) {
				return new Promise((resolve, rejcet) => {
					let length = this[dataKey].length;
					for (let i = length; i < length + 3; i++) {
						this[dataKey].push({
							img: require("../../static/images/userImg.jpg"),
							name: "蜗蜗",
							time: "2019-02-08",
							amount: 12548
						})
					}
					this[pageSize]++;
					setTimeout(() => {
						if (this[pageSize] > 3)
							resolve(0);
						else resolve(1);
					}, 2000)
				})
			}
		},
		computed: {},
		created() {},
		mounted() {},
		activated() {
			//设置滚动条的位置
			this.$refs["viewboxs0"].scrollTo(this.$route.meta.savedPosition["top0"] || 0);
			this.$refs["viewboxs1"].scrollTo(this.$route.meta.savedPosition["top1"] || 0);
			this.$refs["viewboxs2"].scrollTo(this.$route.meta.savedPosition["top2"] || 0);
			this.$refs["viewboxs3"].scrollTo(this.$route.meta.savedPosition["top3"] || 0);
		},
		beforeRouteLeave(to, from, next) {
			//保存滚动条的位置
			from.meta.savedPosition = {
				top0: this.$refs["viewboxs0"].getScrollTop(),
				top1: this.$refs["viewboxs1"].getScrollTop(),
				top2: this.$refs["viewboxs2"].getScrollTop(),
				top3: this.$refs["viewboxs3"].getScrollTop()
			};
			next();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.indexHeader {
		background-color: #f9dc3b;
	}

	.bDeMain {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #F1F2F7;

		.orderCom {
			position: absolute;
			top: 126px;
			bottom: 0;
			width: 100%;
		}


	}
</style>
