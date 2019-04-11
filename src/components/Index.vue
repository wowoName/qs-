<template>
	<div class="indexMain">
		<!-- 	<x-header :left-options="{backText:''}" class="indexHeader"></x-header> -->
		<div class="userInfos">
			<div class="userImg">
				<img v-lazy="usrInfos.user.user_avatar" />
			</div>
			<div class="userNames">
				<div class="userName">
					<span>{{usrInfos.user.user_name}}</span>
					<div>{{usrInfos.user.level_cn}}</div>
				</div>
				<div class="userPhone">{{usrInfos.user.user_mobile}}</div>
			</div>
		</div>
		<div class="balance">
			<div>{{usrInfos.user.user_money}}</div>
			<div>余额（元）</div>
			<div>提现</div>
		</div>
		<div class="incomeDetails">
			<div class="commission">
				<div class="commission-item">
					<span>{{usrInfos.today.balance_cost}}</span>
					<span>今日佣金</span>
				</div>
				<div class="commission-item">
					<span>{{usrInfos.today.balance_cost}}</span>
					<span>本月佣金</span>
				</div>
			</div>
			<div class="entrance">
				<div class="entrance-item" @click="$router.push('myIncome')"> <img src="../../static/images/earnings.png" alt="">
					<span>我的收益</span> </div>
				<div class="entrance-item" @click="$router.push('order')"> <img src="../../static/images/order.png" alt=""> <span>订单明细</span>
				</div>
				<div class="entrance-item" @click="$router.push('myFan')"> <img src="../../static/images/myfan.png" alt=""> <span>我的粉丝</span>
				</div>
				<div class="entrance-item" @click="$router.push('billDetail')"> <img src="../../static/images/bill.png" alt="">
					<span>账单明细</span> </div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		XHeader
	} from 'vux'
	export default {
		name: 'Index',
		components: {
			XHeader
		},
		data() {
			return {
				usrInfos: {
					user: {
						user_avatar: "",
						province_name: "",
						user_mobile: "",
						level_cn: "",
						user_money: 0
					},
					today: {
						balance_cost: 0
					},
					month: {
						balance_cost: 0
					}
				}
			}
		},
		watch: {},
		methods: {
			changeRouter(index) {
				let _router = index === 1 ? "/home" : "/myCenter";
				this.$router.push({
					path: _router
				})
			},
			getUserInfo() {
				this.ajax.get("/agent/index/login", {}, data => {
					this.usrInfos = Object.assign(thisusrInfos,data.data.datas);
				}, data => {});
			}
		},
		computed: {},
		created() {
			this.getUserInfo();
		},
		mounted() {},
		activated() {
			this.getUserInfo();
		}
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
			@include indexFlex;
			box-sizing: border-box;
			background: url(../../static/images/indexBg.png) no-repeat center center/100% 100%;

			.userImg {
				width: 164px;
				height: 164px;
				margin-right: 30px;

				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.userNames {
				width: 460px;
				height: 164px;
				@include indexFlex(flex-start, center);
				flex-direction: column;

				.userName {
					margin-bottom: 14px;

					span {
						display: inline-block;
						max-width: 304px;
						margin-right: 16px;
						@include textOver;
						font-size: 38px;
						color: rgba(0, 0, 0, 1);
					}

					div {
						display: inline-block;
						max-width: 140px;
						@include textOver;
						border-radius: 23px;
						padding: 4px 14px;
						background-color: #FE1969;
						color: #ffffff;
						font-size: 22px;
					}

				}

				.userPhone {
					font-size: 38px;
					color: rgba(99, 88, 23, 1);
				}
			}
		}

		.balance {
			position: absolute;
			top: 304px;
			left: 50%;
			transform: translateX(-50%);
			width: 436px;
			height: 236px;
			@include indexFlex(center, center);
			flex-direction: column;
			background: rgba(255, 255, 255, 1);
			border-radius: 10px;
			text-align: center;

			div:nth-child(1) {
				width: 100%;
				@include textOver;
				font-size: 60px;
				font-weight: 600;
				color: rgba(0, 0, 0, 1);
			}

			div:nth-child(2) {
				margin-bottom: 13px;
				font-size: 26px;
				color: rgba(0, 0, 0, 1);
			}

			div:nth-child(3) {
				width: 112px;
				padding: 2px 28px;
				background: rgba(249, 225, 153, 1);
				border-radius: 25px;
				font-size: 28px;
			}
		}

		.incomeDetails {
			width: 702px;
			height: 304px;
			@include indexFlex(center, space-between);
			flex-direction: column;
			margin: 180px auto 0 auto;
			padding: 30px 16px;
			border-radius: 10px;
			box-sizing: border-box;
			background-color: #ffffff;

			.commission {
				width: 100%;
				padding: 0 120px;
				box-sizing: border-box;
				@include indexFlex(center, space-between);

				.commission-item {
					@include indexFlex;
					flex-direction: column;
					color: rgba(0, 0, 0, 1);

					span:nth-child(1) {
						font-size: 46px;
						font-weight: 600;
					}

					span:nth-child(2) {
						font-size: 28px;
					}
				}
			}

			.entrance {
				width: 100%;
				@include indexFlex(center, space-between);
				font-size: 28px;
				color: rgba(0, 0, 0, 1);

				.entrance-item {
					width: 112px;
					@include indexFlex(center, space-between);
					flex-direction: column;

					img {
						width: 42px;
						height: 54px;
						margin-bottom: 20px;
					}
				}


			}
		}
	}
</style>
