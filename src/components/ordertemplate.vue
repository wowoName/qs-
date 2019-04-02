<template>
	<div>
		<div class="orderItems"  v-for="(item,index) in data" :key="item.id">
			<div class="goodsInfos">
				<div class="goodsImg"><img v-lazy="'../../static/images/userImg.jpg'" alt=""></div>
				<div class="goddsDesc">
					<div class="goodsFun">都是范德萨发的发多少发大水发的说法都是撒的发的说法阿达是否达大师傅大师傅打发大水发多少发的说法</div>
					<div class="goodsOrderNo">订单号：000000</div>
					<div class="goodsPrice">
						<span>￥200</span><span>佣金10元</span>
					</div>
				</div>
			</div>
			<div class="orderInfos-bottom vux-order-border">
				<span class="orderCreTime">创建于2019-01-01 12:12:12</span>
				<span class="orderState order-hasPay">已付款</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'OrderTemplate',
		components: {},
		props: {
			data: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {}
		},
		watch: {},
		methods: {},
		computed: {},
		created() {},
		mounted() {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@mixin flexCom($jc:space-between) {
		display: flex;
		align-items: center;
		justify-content: $jc;
	}

	@mixin textOverflows {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	@mixin orderStatus($fontsize:24px) {
		display: inline-block;
		@include textOverflows;
		width: 351px;
		font-size: $fontsize;
	}

	.orderItems {
		width: 100%;
		margin-bottom: 30px;
		padding: 20px 24px 0;
		box-sizing: border-box;
		background-color: #ffffff;

		.goodsInfos {
			width: 100%;
			@include flexCom;
			margin-bottom: 10px;

			.goodsImg {
				width: 142px;
				height: 139px;

				img {
					width: 100%;
					height: 100%;
					border-radius: 5px;
				}
			}

			.goddsDesc {
				width: 504px;

				>div {
					margin-bottom: 6px;
				}

				.goodsFun {
					max-width: 100%;
					height: 80px;
					line-height: 40px;
					@include textOverflows;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					word-wrap: break-word;
					white-space: normal !important;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 28px;
					color: #111111;
				}

				.goodsOrderNo {
					width: 100%;
					@include textOverflows;
					font-size: 24px;
					color: rgba(123, 123, 123, 1);
				}

				.goodsPrice {
					width: 100%;
					@include flexCom;

					span:nth-child(1) {
						display: inline-block;
						max-width: 300px;
						@include textOverflows;
						font-size: 32px;
						font-weight: 600;
						color: rgba(254, 25, 105, 1);
					}

					span:nth-child(2) {
						display: inline-block;
						min-width: 162px;
						max-width: 200px;
						padding: 4px 10px;
						box-sizing: border-box;
						border-radius: 10px;
						@include textOverflows;
						text-align: center;
						background-color: #F9DC3B;
						font-size: 24px;
						color: #111111;
					}
				}
			}
		}

		.vux-order-border {
			&::after {
				height: 1px;
			}
		}

		.orderInfos-bottom {
			width: 100%;
			height: 76px;
			@include flexCom;
			position: relative;

			&::after {
				content: "";
				position: absolute;
				top: 0;
				left: -24px;
				right: -24px;
				background-color: #EEEEEE;
			}

			.orderCreTime {
				@include orderStatus;
				color: rgba(103, 103, 103, 1);
			}

			.orderState {
				@include orderStatus(26px);
				text-align: right;
			}

			.order-hasPay {
				color: #FE015B;
			}

			.order-hasSettled {
				color: #FE015B;
			}

			.order-hasFailure {
				color: #7B7B7B;
			}
		}
	}
</style>
