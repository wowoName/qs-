<template>
	<div class="bDeMain">
		<x-header :left-options="{backText:''}" class="indexHeader">账单明细</x-header>
		<div class="billDeAmount">
			<datetime format="YYYY-M" @on-change="getBillData" :max-month="new Date().getMonth()" :min-year="new Date().getFullYear()-10"
			 :max-year="new Date().getFullYear()" v-model="month">
				<div class="screenTime"> <span>{{relayTime}}</span> <img src="../../static/images/dropDown.png" alt=""></div>
			</datetime>
			<div class="amountDetail">
				<span>收益￥{{billInfos.cashback}}</span>
				<span>提现￥{{billInfos.withdraw}}</span>
			</div>
		</div>
		<div class="billDeCom">
			<view-box>
				<div class="billDeItem" v-for="(item,index) in bdData" :key="index">
					<span>{{item.time}}</span>
					<span>{{item.type_sn}}</span>
					<span :style="{color: item.amount>0?'#009E03':'#FE1969'}">{{item.cost}}</span>
				</div>

			</view-box>
		</div>

		<div class="nodata" v-if="bdData.length==0">暂无数据</div>

	</div>
</template>

<script>
	import {
		XHeader,
		ViewBox,
		Datetime,
		PopupPicker,
		XButton
	} from 'vux'
	export default {
		name: 'BillDetail',
		components: {
			XHeader,
			ViewBox,
			Datetime,
			PopupPicker,
			XButton
		},
		data() {
			return {
				month: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
				bdData: [],
				billInfos: {
					withdraw: 0,
					cashback: 0
				}
			}
		},
		watch: {},
		methods: {
			//这里应该请求数据
			getBillData() {
				this.$vux.loading.show({
					text: '加载中...'
				});
				this.ajax.get("/agent/User/User/billDetails?k=" + this.month.split("-")[1], {}, data => {
					this.bdData = data.data.datas;
					this.billInfos = {
						withdraw: data.data.info.withdraw,
						cashback: data.data.info.cashback
					};
					this.$vux.loading.hide()

				}, data => {
					this.$vux.loading.hide()
				});
			}
		},
		computed: {
			relayTime() {
				let times = this.month.split("-");
				return times[0].substr(2) + "年" + times[1] + "月"
			}
		},
		created() {
			this.getBillData();
		},
		mounted() {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@mixin bdFlex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.bDeMain {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #F1F2F7;

		.nodata {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			font-size: 28px;
			color: rgba(44, 62, 80, .8);
			z-index: 100;
			text-align: center;
		}

		.indexHeader {
			background-color: #f9dc3b;
		}

		.billDeAmount {
			width: 100%;
			height: 100px;
			@include bdFlex;
			padding: 16px 22px 16px 34px;
			box-sizing: border-box;

			.screenTime {
				width: 200px;
				height: 50px;
				@include bdFlex;
				border-radius: 25px;
				padding: 8px 24px;
				box-sizing: border-box;
				background: rgba(255, 255, 255, 1);
				font-size: 26px;
				color: #111111;

				span {
					font-size: 26px;

				}

				img {
					width: 30px;
				}
			}

			.amountDetail {
				@include bdFlex;
				flex-direction: column;
				font-size: 28px;
				color: #7B7B7B;
			}
		}

		.billDeCom {
			position: absolute;
			top: 160px;
			bottom: 0;
			width: 100%;

			.billDeItem {
				padding: 24px;
				margin-bottom: 20px;
				@include bdFlex;
				background-color: #ffffff;

				span:nth-child(1) {
					display: inline-block;
					width: 180px;
					font-size: 28px;
					color: rgba(123, 123, 123, 1);
				}

				span:nth-child(2) {
					display: inline-block;
					max-width: 360px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 28px;
					color: rgba(17, 17, 17, 1);
				}

				span:nth-child(3) {
					display: inline-block;
					width: 160px;
					font-size: 32px;
					font-weight: 600;
					color: #009E03;
					text-align: right;
				}
			}
		}


	}
</style>
