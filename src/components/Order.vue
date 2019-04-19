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
					<order-template ref="allOrderData"></order-template>
				</swiper-item>
				<swiper-item>
					<order-template suc="10" ref="payOrderData"></order-template>
				</swiper-item>
				<swiper-item>
					<order-template suc="30" ref="beenSettled"></order-template>
				</swiper-item>
				<swiper-item>
					<order-template suc="41" ref="failureData"></order-template>
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
	} from 'qsvux';
	import OrderTemplate from "@/components/ordertemplateNew";
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
				tabIndex: 0
			}
		},
		watch: {},
		methods: {
			//tab切换事件
			onItemClick(index) {
				this.tabIndex = Number(index);
			}
		},
		computed: {},
		created() {},
		mounted() {},
		activated() {
			//设置滚动条的位置
			this.$refs.allOrderData.gotoScroller();
			this.$refs.payOrderData.gotoScroller();
			this.$refs.beenSettled.gotoScroller();
			this.$refs.failureData.gotoScroller();
		},
		beforeRouteLeave(to, from, next) {
			this.$refs.allOrderData.getScroller();
			this.$refs.payOrderData.getScroller();
			this.$refs.beenSettled.getScroller();
			this.$refs.failureData.getScroller();
			next();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.indexHeader {
		background-color: #f9dc3b;
	}

	.scrollerSolt {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			max-height: 100%;
			max-width: 100%;
		}
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
