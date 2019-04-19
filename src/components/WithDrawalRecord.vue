<template>
	<div class="wdRecordCon">
		<x-header :left-options="{backText:''}" class="indexHeader">提现明细
		</x-header>
		<div class="wdRecordMain">
			<scroller :on-refresh="onRefresh" :on-infinite="onInfiniteLoad" ref="myScroller">
				<div slot="refresh-spinner" class="scrollerSolt">
					<img src="../../static/images/dropLoading.gif" alt="">
				</div>
				<div class="recordMain" v-for="(item,index) in listData" :key="item.order_id">
					<div class="recordItem">
						<div class="itemdesc">
							<span class="desc">{{item.cn}}</span>
							<span class="amount">{{item.cost}}</span>
						</div>
						<div class="itemBottom">
							<span class="time">{{item.time}}</span>
							<span class="state" :style="{color:item.state=='0'?'#FE1969':item.state=='1'?'#111111':'#7B7B7B' }">
								{{item.state=='0'?'审核中':item.state=='1'?'提现成功':'提现失败'}}
							</span>
						</div>
					</div>
				</div>
			</scroller>
		</div>
	</div>
</template>

<script>
	import {
		XHeader
	} from "qsvux";
	export default {
		name: 'WithDrawalRecord',
		components: {
			XHeader
		},
		data() {
			return {
				listData: [],
				pageSize: 1,
				top: 0,
				noData: false //无更多数据
			}
		},
		watch: {},
		methods: {
			// 全部订单下拉刷新
			onRefresh(done) {
				this.getData(done, true);
			},
			// 全部订单上拉加载
			onInfiniteLoad(done) {
				if (!this.noData)
					this.getData(done);
				else done(true);
			},
			getData(done, reset = false) {
				return new Promise((resolve, reject) => {
					//如果是下拉刷新页数置为1;上拉加载可用
					if (reset)
						this.pageSize = 1, this.noData = false;
					this.ajax.get("/agent/Home/index/withdraw?p="+this.pageSize, {}, data => {
						if (reset)
							this.listData = data.data.datas;
						else
							this.listData = this.listData.concat(data.data.datas);
						//页数递加
						this.pageSize++;
						this.$nextTick(() => {
							if (data.data.datas.length == 0) {
								this.noData = true;
								done(true);
							} else done(false);
							resolve(data.data.datas.length);
						});
					}, data => {
						resolve(0);
					});
				})
			},
			getScroller() {
				this.top = this.$refs.myScroller.getPosition().top;
			},
			gotoScroller() {
				setTimeout(() => {
					this.$refs.myScroller.scrollTo(0, this.top, true)
				})
			}
		},
		computed: {},
		created() {},
		mounted() {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@mixin wdRecordFlex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	@mixin fontSt($size:28px, $color:rgba(17, 17, 17, 1)) {
		font-size: $size;
		color: $color;
	}

	.wdRecordCon {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		.indexHeader {
			background-color: #f9dc3b;
		}

		.wdRecordMain {
			position: absolute;
			top: 60px;
			bottom: 0;
			left: 0;
			width: 100%;
			overflow: auto;
			background-color: #F1F2F7;

			.recordMain {
				.recordItem {
					margin-bottom: 20px;
					padding: 20px 24px;
					box-sizing: border-box;
					background-color: #ffffff;

					.itemdesc {
						@include wdRecordFlex;

						.desc {
							@include fontSt;
						}

						.amount {
							@include fontSt(36px, rgba(17, 17, 17, 1));
							font-weight: 600;
						}
					}

					.itemBottom {
						@include wdRecordFlex;
						.time {
							@include fontSt(24px, rgba(103, 103, 103, 1));
						}

						.state {
							@include fontSt(20px, #111111);
						}
					}
				}
			}
		}
	}
</style>
