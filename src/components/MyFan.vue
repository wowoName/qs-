<template>
	<div class="bDeMain">
		<x-header :left-options="{backText:''}" class="indexHeader">我的粉丝</x-header>
		<div class="searchFan" @click="$router.push('searchFans')">
			<div class="searchCon">
				<img src="../../static/images/search.png" alt="">
				<span>请输入粉丝手机号或微信昵称</span>
			</div>
		</div>
		<tab active-color="#111111" default-color="#111111" bar-active-color="#FE1969" line-width="0.125rem" custom-bar-width="2.0625rem">
			<tab-item :selected="tabIndex===0" @on-item-click="onItemClick" badge-label="88" badge-background="transparent"
			 badge-color="#FE1969">粉丝</tab-item>
			<tab-item :selected="tabIndex===1" @on-item-click="onItemClick" badge-label="152" badge-background="transparent"
			 badge-color="#FE1969">超级买手</tab-item>
			<tab-item :selected="tabIndex===2" @on-item-click="onItemClick" badge-label="268" badge-background="transparent"
			 badge-color="#FE1969">运营商</tab-item>
		</tab>
		<div class="myfanCon">
			<swiper :show-dots="false" v-model="tabIndex" :threshold="80">
				<swiper-item>
					<view-box ref="viewbox0">
						<scroller :on-refresh="onRefreshF" :on-infinite="onInfiniteLoadF" ref="my_scroller">
							<div class="myfanItem" v-for="(item,index) in fansData" :key="item.uid">
								<div class="fansImg">
									<img v-lazy="item.fans.user_avatar" alt="">
								</div>
								<div class="fansName">
									<span>{{item.fans.user_name}}</span><span>{{item.fans.binded_time}}</span>
								</div>
								<div class="fansAmount">粉丝数<span>{{item.cout}}</span>
								</div>
								<div class="upgrade" @click="hasUpGreade(item.uid)">
									<span>升级</span>
								</div>
							</div>
						</scroller>
					</view-box>
				</swiper-item>
				<swiper-item>
					<view-box ref="viewbox1">
						<scroller :on-refresh="onRefreshB" :on-infinite="onInfiniteLoadB" ref="my_scroller">
							<div class="myfanItem-superBuys" v-for="(item,index) in superBuyData" :key="index">
								<div class="fansImg">
									<img v-lazy="'../../static/images/userImg.jpg'" alt="">
								</div>
								<div class="fansName">
									<span>蜗蜗</span><span>2018-02-02</span>
								</div>
								<div class="fansAmount">粉丝数<span>1222225</span>
								</div>
								<div class="upgrade"><span>￥{{index*1000000}}</span></div>
							</div>
						</scroller>
					</view-box>
				</swiper-item>
				<swiper-item>
					<view-box ref="viewbox2">
						<scroller :on-refresh="onRefreshS" :on-infinite="onInfiniteLoadS" ref="my_scroller">
							<div class="myfanItem-superBuys" v-for="(item,index) in operatorData" :key="index">
								<div class="fansImg">
									<img v-lazy="'../../static/images/userImg.jpg'" alt="">
								</div>
								<div class="fansName">
									<span>蜗蜗</span><span>2018-02-02</span>
								</div>
								<div class="fansAmount">粉丝数<span>1222225</span>
								</div>
								<div class="upgrade"><span>￥{{index*1000000}}</span></div>
							</div>
						</scroller>
					</view-box>
				</swiper-item>
			</swiper>
		</div>
		<div class="vue-popup">
			<div class="mask" @click="showUpGrade=false" v-show="showUpGrade"></div>
			<transition name="slide-fade">
				<div class="popup-content" v-show="showUpGrade">
					<div class="title">粉丝升级</div>
					<div class="toGrade">
						<div class="gradeItem"><span>萌动</span></div>
						<div class="gradeCenter">
							<img src="../../static/images/upGrade.png" alt="">
							<img src="../../static/images/upGrade.png" alt="">
						</div>
						<div class="gradeItem"><span>超级无敌爱心守护使者</span></div>
					</div>
					<div class="fansInfo">
						<div class="fansInfo-item">
							<span calss="superio">他的上级</span>
							<img src="../../static/images/userImg.jpg" alt="">
							<span class="userName">蜗蜗</span>
							<span class="userId">ID:12345685</span>
							<span class="grade">超级无敌爱心守护使者</span>
						</div>
						<div class="fansInfo-item">
							<span calss="superio">当前用户</span>
							<img src="../../static/images/userImg.jpg" alt="">
							<span class="userName">蜗蜗</span>
							<span class="userId">ID:12345685</span>
							<span class="grade">萌动</span>
						</div>
					</div>
					<div class="popupBottom vux-popupBottom">
						<div class="popupBottom-item popupCancle vux-item-border" @click="showUpGrade=false">取消</div>
						<div class="popupBottom-item popupSure" @click="toUpgrade">确定</div>
					</div>
				</div>
			</transition>
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
		SwiperItem,
		Confirm
	} from 'vux'
	export default {
		name: 'MyFan',
		components: {
			XHeader,
			ViewBox,
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			Confirm
		},
		data() {
			return {
				showUpGrade: false, //显示粉丝升级
				tabIndex: 0,
				fansData: [], //粉丝数据
				fansPage: 1, //粉丝页数
				hasGetDataF:false,
				superBuyData: [], //超级买手数据
				superBuyPage: 1, //超级买手页数
				hasGetDataB:false,
				operatorData: [], //运营商数据
				operatorPage: 1, //运营商页数
				hasGetDataS:false,
				curUid: "" //当前升级用户的uid
			}
		},
		watch: {},
		methods: {
			//粉丝下拉刷新
			onRefreshF(done) {
				this.fansData = [];
				this.fansPage = 1;
				this.processData(1, "fansData", "fansPage",done);
			},
			//粉丝上拉加载
			onInfiniteLoadF(done) {
				this.processData(1, "fansData", "fansPage",done);
			},
			//超级买手下拉刷新
			onRefreshB(done) {
				this.superBuyData = [];
				this.superBuyPage = 1;
				this.processData(1, "superBuyData", "superBuyPage",done);
			},
			//超级买上拉加载
			onInfiniteLoadB(done) {
				this.processData(1, "superBuyData", "superBuyPage",done);
			},
			//运营商下拉刷新
			onRefreshS(done) {
				this.operatorData = [];
				this.operatorPage = 1;
				this.processData(3, "operatorData", "operatorPage",done);
			},
			//运营商上拉加载
			onInfiniteLoadS(done) {
				this.processData(3, "operatorData", "operatorPage",done);
			},
			getFansData(type, entriy, pageNum) {
				return new Promise((resolve, reject) => {
					this.ajax.get("/agent/User/User/myFans?state=" + type + "&k=''&p=" + this[pageNum], {}, data => {
						this[entriy] = this[entriy].concat(data.data.datas);
						//页数递加
						this[pageNum]++;
						resolve(data.data.datas.length)
					}, data => {
						resolve(0)
					});
				})
			},
			//数据分发处理
			processData(type, entriy, pageNum, done) {
				this.getFansData(type, entriy, pageNum).then((data) => {
					if (data == '0')
						done(true);
					else done();
				});
			},
			//tab进行切换
			onItemClick(index) {
				this.tabIndex = Number(index);
				
			},
			hasUpGreade(uid) {
				//保存当前的uid
				this.curUid = uid;
				this.showUpGrade = true;
			},
			toUpgrade() {
				this.ajax.get("/agent/User/User/myFans", {
					uid: this.curUid
				}, data => {
					//关闭model
					this.showUpGrade = false;
				}, data => {});
			}
		},
		computed: {},
		created() {
		},
		mounted() {},
		activated() {
			//设置滚动条的位置
			this.$refs["viewbox0"].scrollTo(this.$route.meta.savedPosition["top0"] || 0);
			this.$refs["viewbox1"].scrollTo(this.$route.meta.savedPosition["top1"] || 0);
			this.$refs["viewbox2"].scrollTo(this.$route.meta.savedPosition["top2"] || 0);
		},
		beforeRouteLeave(to, from, next) {
			//保存滚动条的位置
			from.meta.savedPosition = {
				top0: this.$refs["viewbox0"].getScrollTop(),
				top1: this.$refs["viewbox1"].getScrollTop(),
				top2: this.$refs["viewbox2"].getScrollTop()
			};
			next();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.slide-fade-enter-active {
		transition: all .5s ease;
	}

	.slide-fade-leave-active {
		transition: all 0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to {
		opacity: 0;
	}

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

	@mixin tabCom ($fnWidth:225px, $faWidth:225px, $ugWidth:112px) {
		padding: 20px 24px;
		margin-bottom: 20px;
		@include flexCom;
		background-color: #ffffff;

		.fansImg {
			width: 90px;
			height: 90px;
			margin-right: 28px;
			border-radius: 5px;
			background-color: #F1F2F7;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		.fansName {
			width: $fnWidth;
			@include flexCom;
			flex-direction: column;

			span {
				display: inline-block;
				width: 100%;
				@include textOverflows;
				font-size: 26px;
				text-align: left;
				color: #111111;
			}

			span:nth-child(2) {
				color: #7B7B7B;
			}
		}

		.fansAmount {
			width: $faWidth;
			@include textOverflows;
			font-size: 26px;
			color: #111111;

			span {
				color: #FE1969;
			}
		}

		.upgrade {
			width: $ugWidth;
			@include flexCom(flex-end);

			span {
				display: inline-block;
				width: 100%;
				@include textOverflows;
				border-radius: 24px;
				border: 2px solid rgba(254, 25, 105, 1);
				box-sizing: border-box;
				padding: 4px 18px;
				font-size: 24px;
				text-align: center;
				color: #FE1969;
			}

		}
	}

	@mixin fansGrade {
		display: inline-block;
		min-width: 140px;
		max-width: 180px;
		padding: 4px 20px;
		box-sizing: border-box;
		border-radius: 16px;
		font-size: 22px;
		text-align: center;
		background-color: #FE1969;
		color: #ffffff;
	}

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

		.vue-popup {
			.popup-content {
				position: fixed;
				width: 660px;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				padding: 10px 48px 0;
				box-sizing: border-box;
				border-radius: 14px;
				background-color: white;

				.title {
					margin-bottom: 20px;
					font-size: 36px;
					color: #111111;
					text-align: center;
				}

				.toGrade {
					width: 100%;
					@include flexCom(center);

					.gradeItem {
						width: 222px;
						@include flexCom(center);

						span {
							@include fansGrade;
							@include textOverflows;
						}
					}

					.gradeCenter {
						width: 120px;
						@include flexCom(center);

						img {
							width: 36px;
							margin: 0 20px;
						}
					}
				}

				.fansInfo {
					@include flexCom(space-between);
					flex-direction: row;
					margin-top: 20px;

					.fansInfo-item {
						@include flexCom(flex-start);
						width: 222px;
						height: 266px;
						flex-direction: column;

						span {
							display: inline-block;
							font-size: 24px;
						}

						.superio {
							color: #111111;
							font-weight: 600;
						}

						.userName {
							color: #111111;
						}

						.userId {
							color: #7B7B7B;
						}

						.grade {
							margin-top: 8px;
							@include fansGrade;
							@include textOverflows;
						}

						img {
							width: 80px;
							height: 80px;
							margin: 16px 0 8px 0;
							border-radius: 50%;
						}
					}
				}

				.vux-popupBottom {
					&::after {
						height: 1px;
					}
				}

				.popupBottom {
					width: 100%;
					height: 104px;
					@include flexCom;
					position: relative;

					&::after {
						content: "";
						position: absolute;
						top: 0;
						left: -48px;
						right: -48px;
						background-color: #EEEEEE;
					}

					.popupBottom-item {
						width: 50%;
						height: 100%;
						line-height: 104px;
						font-size: 36px;
						text-align: center;
					}

					.vux-item-border {
						border-right: 1px solid #EEEEEE;
					}

					.popupCancle {
						color: #7B7B7B;
					}

					.popupSure {
						color: #FE1969;
					}
				}
			}

			.mask {
				position: fixed;
				width: 100%;
				left: 0;
				top: 0;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.4);
			}
		}



		.searchFan {
			width: 100%;
			height: 100px;
			@include flexCom;
			padding: 16px 22px 16px 34px;
			box-sizing: border-box;
			background-color: #f9dc3b;

			.searchCon {
				width: 680px;
				margin: 0 auto;
				@include flexCom(flex-start);
				padding: 16px 24px;
				background: rgba(255, 255, 255, .5);
				border-radius: 30px;
				font-size: 24px;
				color: #7B7B7B;

				img {
					width: 30px;
					margin-right: 20px;
				}
			}
		}

		.myfanCon {
			position: absolute;
			top: 226px;
			bottom: 0;
			width: 100%;

			.myfanItem-superBuys {
				@include tabCom(190px, 212px, 172px);
			}

			.myfanItem {
				@include tabCom(190px, 242px, 142px);
			}
		}


	}
</style>
