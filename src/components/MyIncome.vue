<template>
	<div class="indexMain">
		<x-header :left-options="{backText:''}" class="indexHeader">我的收益</x-header>
		<div class="userInfos">
			<div>余额（元）</div>
			<div>{{incomeDetails.user_money}}</div>
			<div>提现</div>
		</div>
		<div class="balance">
			<div class="title">日收入</div>
			<div class="incomeInfos vux-balance-border">
				<div>今日</div>
				<income-item title="佣金" txt-color="#FE1969" :value="incomeDetails.today.cost" :is-loading="loading"></income-item>
				<income-item title="付款笔数" txt-color="#FE1969" :value="incomeDetails.today.count" :is-loading="loading"></income-item>
				<income-item title="计算收入" txt-color="#FE1969" :value="incomeDetails.today.balance_cost" :is-loading="loading"></income-item>
			</div>
			<div class="incomeInfos vux-balance-border">
				<div>昨日</div>
				<income-item title="佣金"  :value="incomeDetails.yesterday.cost" :is-loading="loading"></income-item>
				<income-item title="付款笔数"  :value="incomeDetails.yesterday.count" :is-loading="loading"></income-item>
				<income-item title="计算收入"  :value="incomeDetails.yesterday.balance_cost" :is-loading="loading"></income-item>
			</div>
		</div>


		<div class="balance-month">
			<div class="title">月收入</div>
			<div class="incomeInfos vux-balance-border">
				<div>本月</div>
				<income-item title="佣金" :value="incomeDetails.month.cost" :is-loading="loading"></income-item>
				<income-item title="付款笔数" :value="incomeDetails.month.count" :is-loading="loading"></income-item>
				<income-item title="计算收入" :value="incomeDetails.month.balance_cost" :is-loading="loading"></income-item>
			</div>
			<div class="incomeInfos vux-balance-border">
				<div>上月</div>
				<income-item title="佣金" :value="incomeDetails.last_month.cost" :is-loading="loading"></income-item>
				<income-item title="付款笔数" :value="incomeDetails.last_month.count" :is-loading="loading"></income-item>
				<income-item title="计算收入" :value="incomeDetails.last_month.balance_cost" :is-loading="loading"></income-item>
			</div>
		</div>
	</div>
</template>

<script>
	import IncomeItem from "@/components/incometemplate";
	import {
		XHeader
	} from 'vux'
	export default {
		name: 'MyIncome',
		components: {
			XHeader,
			IncomeItem
		},
		data() {
			return {
				loading: true,
				incomeDetails: {
					today: {
						cost: 0,
						count: 0,
						balance_cost: 0
					},
					yesterday: {
						cost: 0,
						count: 0,
						balance_cost: 0
					},
					month: {
						cost: 0,
						count: 0,
						balance_cost: 0
					},
					last_month: {
						cost: 0,
						count: 0,
						balance_cost: 0
					},
				}
			}
		},
		watch: {

		},
		methods: {
			getIncomeData() {
				this.ajax.get("/agent/User/User/myProfit", {}, data => {
					this.incomeDetails = data.data.datas;
					this.$nextTick(() => {
						this.loading = false;
					})
				}, data => {
					this.loading = false;
				});
			}
		},
		computed: {},
		created() {
			this.getIncomeData();
		},
		mounted() {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@mixin indexFlex($aitem:center, $jconten:space-between) {
		display: flex;
		align-items: $aitem;
		justify-content: $jconten;
	}

	@mixin textOver {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	@mixin balanceCom ($top:388px) {
		position: absolute;
		top: $top;
		left: 50%;
		transform: translateX(-50%);
		width: 702px;
		height: 380px;
		@include indexFlex(center, space-between);
		flex-direction: column;
		padding: 50px 38px;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);
		border-radius: 10px;
		text-align: center;
		color: rgba(0, 0, 0, 1);
		font-size: 24px;

		.title {
			width: 100%;
			text-align: left;
		}

		.vux-balance-border {
			&::after {
				height: 1px;
			}
		}

		.incomeInfos {
			width: 100%;
			@include indexFlex(center, space-between);
			position: relative;

			&::after {
				content: "";
				position: absolute;
				bottom: -16px;
				left: 0;
				width: 100%;
				background-color: #F1F2F7;
			}

			.is-loading {
				width: 46px;
				height: 46px;
				display: inline-block;
				vertical-align: middle;
				-webkit-animation: weuiLoading 1s steps(12, end) infinite;
				animation: weuiLoading 1s steps(12, end) infinite;
				background: transparent url(../../static/images/loading-inner.png) no-repeat;
				background-size: 100%;
			}

			>div:nth-child(1) {
				width: 80px;
				text-align: left;
			}

		}
	}

	.indexMain {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #F1F2F7;

		.indexHeader {
			background-color: #f9dc3b;
		}

		.test {
			height: 60px;
			font-size: 34px;
		}

		.userInfos {
			width: 100%;
			height: 400px;
			padding: 0 48px;
			@include indexFlex(center, center);
			flex-direction: column;
			box-sizing: border-box;
			background: url(../../static/images/indexBg.png) no-repeat center center/100% 100%;
			text-align: center;

			div:nth-child(1) {
				font-size: 28px;
				color: rgba(0, 0, 0, 1);
			}

			div:nth-child(2) {
				max-width: 100%;
				@include textOver;
				margin-bottom: 30px;
				font-size: 82px;
				color: rgba(0, 0, 0, 1);
				font-weight: 600;
			}

			div:nth-child(3) {
				width: 112px;
				padding: 8px 52px;
				background: #000000;
				border-radius: 25px;
				font-size: 28px;
				color: #ffffff;
			}
		}

		.balance {
			@include balanceCom;
		}

		.balance-month {
			@include balanceCom(784px);


		}
	}
</style>
