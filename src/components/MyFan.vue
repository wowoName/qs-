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
			<tab-item :selected="tabIndex===0" @on-item-click="onItemClick" :badge-label="fansDataTotal" badge-background="transparent"
			 badge-color="#FE1969">粉丝</tab-item>
			<tab-item :selected="tabIndex===1" @on-item-click="onItemClick" :badge-label="superBuyDataTotal" badge-background="transparent"
			 badge-color="#FE1969">超级买手</tab-item>
			<tab-item :selected="tabIndex===2" @on-item-click="onItemClick" :badge-label="operatorDataTotal" badge-background="transparent"
			 badge-color="#FE1969">运营商</tab-item>
		</tab>
		<div class="myfanCon">
			<swiper :show-dots="false" v-model="tabIndex" :threshold="80">
				<swiper-item>
					<scroller :on-refresh="onRefreshF" :on-infinite="onInfiniteLoadF" ref="fansData">
						<div slot="refresh-spinner" class="scrollerSolt">
							<img src="../../static/images/dropLoading.gif" alt="">
						</div>
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
				</swiper-item>
				<swiper-item>
					<scroller :on-refresh="onRefreshB" :on-infinite="onInfiniteLoadB" ref="superBuyData">
						<div slot="refresh-spinner" class="scrollerSolt">
							<img src="../../static/images/dropLoading.gif" alt="">
						</div>
						<div class="myfanItem-superBuys" v-for="(item,index) in superBuyData" :key="Number(item.uid)*212">
							<div class="fansImg">
								<img v-lazy="item.fans.user_avatar" alt="">
							</div>
							<div class="fansName">
								<span>{{item.fans.user_name}}</span><span>{{item.fans.binded_time}}</span>
							</div>
							<div class="fansAmount">粉丝数<span>{{item.cout}}</span>
							</div>
							<div class="upgrade"><span>￥{{item.yuejie}}</span></div>
						</div>
					</scroller>
				</swiper-item>
				<swiper-item>
					<scroller :on-refresh="onRefreshS" :on-infinite="onInfiniteLoadS" ref="operatorData">
						<div slot="refresh-spinner" class="scrollerSolt">
							<img src="../../static/images/dropLoading.gif" alt="">
						</div>
						<div class="myfanItem-superBuys" v-for="(item,index) in operatorData" :key="Number(item.uid)*333">
							<div class="fansImg">
								<img v-lazy="item.fans.user_avatar" alt="">
							</div>
							<div class="fansName">
								<span>{{item.fans.user_name}}</span><span>{{item.fans.binded_time}}</span>
							</div>
							<div class="fansAmount">粉丝数<span>{{item.cout}}</span>
							</div>
							<div class="upgrade"><span>￥{{item.yuejie}}</span></div>
						</div>
					</scroller>
				</swiper-item>
			</swiper>
		</div>
		<div class="vue-popup">
			<div class="mask" @click="showUpGrade=false" v-show="showUpGrade"></div>
			<transition name="slide-fade">
				<div class="popup-content" v-show="showUpGrade">
					<div class="title">粉丝升级</div>
					<div class="toGrade">
						<div class="gradeItem"><span>粉丝</span></div>
						<div class="gradeCenter">
							<img src="../../static/images/upGrade.png" alt="">
							<img src="../../static/images/upGrade.png" alt="">
						</div>
						<div class="gradeItem"><span>超级买手</span></div>
					</div>
					<div class="fansInfo">
						<div class="fansInfo-item">
							<span calss="superio">他的上级</span>
							<img v-lazy="upGreadeInfos.is_binded.user_avatar" alt="">
							<span class="userName">{{upGreadeInfos.is_binded.user_name}}</span>
							<span class="userId">ID:{{upGreadeInfos.is_binded.uid}}</span>
							<span class="grade">{{upGreadeInfos.is_binded.level_cn}}</span>
						</div>
						<div class="fansInfo-item">
							<span calss="superio">当前用户</span>
							<img v-lazy="upGreadeInfos.user.user_avatar" alt="">
							<span class="userName">{{upGreadeInfos.user.user_name}}</span>
							<span class="userId">ID:{{upGreadeInfos.user.uid}}</span>
							<span class="grade">粉丝</span>
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
				isLoading: false,
				showUpGrade: false, //显示粉丝升级
				tabIndex: 0,
				fansData: [], //粉丝数据
				fansPage: 1, //粉丝页数
				fansDataFin: false, //无跟多数据
				fansDataTotal: '0',
				superBuyData: [], //超级买手数据
				superBuyPage: 1, //超级买手页数
				superBuyDataFin: false, //无跟多数据
				superBuyDataTotal: '0',
				operatorData: [], //运营商数据
				operatorPage: 1, //运营商页数
				operatorDataFin: false, //无跟多数据
				operatorDataTotal: '0',
				curUid: "", //当前升级用户的uid
				upGreadeInfos: { //设计超级买手上级用户信息
					is_binded: {
						user_name: "",
						user_avatar: "",
						uid: ""
					},
					user: {
						user_name: "",
						user_avatar: "",
						uid: ""
					}
				},
				topFans: 0,
				topSuper: 0,
				topOpera: 0,

			}
		},
		watch: {},
		methods: {
			//粉丝下拉刷新
			onRefreshF(done) {
				this.processData(0, "fansData", "fansPage", done, true);
			},
			//粉丝上拉加载
			onInfiniteLoadF(done) {
				this.processData(0, "fansData", "fansPage", done);
			},
			//超级买手下拉刷新
			onRefreshB(done) {
				this.processData(1, "superBuyData", "superBuyPage", done, true);
			},
			//超级买上拉加载
			onInfiniteLoadB(done) {
				this.processData(1, "superBuyData", "superBuyPage", done);
			},
			//运营商下拉刷新
			onRefreshS(done) {
				this.processData(2, "operatorData", "operatorPage", done, true);
			},
			//运营商上拉加载
			onInfiniteLoadS(done) {
				this.processData(2, "operatorData", "operatorPage", done);
			},
			getFansData(type, entriy, pageNum, done, reset) {
				return new Promise((resolve, reject) => {
					//如果是下拉刷新页数置为1;上拉加载可用
					if (reset)
						this[pageNum] = 1, this[entriy + "Fin"] = false;
					this.ajax.get("/agent/User/User/myFans?state=" + type + "&k=&p=" + this[pageNum], {}, data => {
						if (reset)
							this[entriy] = data.data.datas;
						else
							this[entriy] = this[entriy].concat(data.data.datas);
						//保存总数
						this[entriy + "Total"] = data.data.total.toString();
						//页数递加
						this[pageNum]++;
						this.$nextTick(() => {
							if (data.data.datas.length == 0) {
								this[entriy + "Fin"] = true; //上拉加载不可用
								done(true);
							} else {
								setTimeout(() => {
									done();
								}, 1500);
							}
							resolve(data.data.datas.length);
						});

					}, data => {
						resolve(0);
					});
				})
			},
			//数据分发处理
			processData(type, entriy, pageNum, done, reset = false) {
				//如果是下拉加载
				if (this[entriy + "Fin"] && !reset)
					done(true);
				else
					this.getFansData(type, entriy, pageNum, done, reset).then((data) => {});
			},
			//tab进行切换
			onItemClick(index) {
				this.tabIndex = Number(index);
			},
			hasUpGreade(uid) {
				//保存当前的uid
				this.curUid = uid;
				//获取上级信息
				this.getUpGradeUser();
			},
			//升级超级买手获取上级的信息
			getUpGradeUser() {
				this.ajax.get("/agent/User/User/upgrade?uid=" + this.curUid, {}, data => {
					//保存上级用户的信息
					this.upGreadeInfos = data.data.datas;
					this.showUpGrade = true;
				}, data => {});
			},
			//进行升级
			toUpgrade() {
				this.ajax.post("/agent/User/User/upgrade", {
					uid: this.curUid
				}, data => {
					this.$vux.toast.text(data.data.datas, 'middle');
					if (data.data.info == "1") {
						//关闭model
						this.showUpGrade = false;
						//如果升级成功进行列表刷新
						//this.$refs.fansData.triggerPullToRefresh();
						//this.$refs.superBuyData.triggerPullToRefresh();
					}
				}, data => {});
			}
		},
		computed: {},
		created() {},
		mounted() {},
		activated() {
			setTimeout(() => {
				this.$refs.fansData.scrollTo(0, this.topFans, true);
				this.$refs.superBuyData.scrollTo(0, this.topSuper, true);
				this.$refs.operatorData.scrollTo(0, this.topOpera, true);
			})
		},
		beforeRouteLeave(to, from, next) {
			//保存滚动条的位置
			this.topFans = this.$refs.fansData.getPosition().top;
			this.topSuper = this.$refs.superBuyData.getPosition().top;
			this.topOpera = this.$refs.operatorData.getPosition().top;
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
