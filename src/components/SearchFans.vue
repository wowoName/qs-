<template>
	<div class="bDeMain">
		<x-header :left-options="{backText:''}" class="indexHeader">我的粉丝</x-header>
		<div class="searchFan">
			<div class="searchCon">
				<img src="../../static/images/search.png" alt="" class="serachImg">
				<div class="inputcon">
					<input type="text" placeholder="请输入粉丝手机号或微信昵称" v-model="fansName" @input="setClear">
					<img src="../../static/images/clear.png" alt="" v-show="showClear" @click="clearSeaVal">
				</div>
				<input type="button" value="搜索" @click.stop="doSearch">
			</div>
		</div>
		<div class="myfanCon">
			<view-box>
				<div class="myfanItem" v-for="(item,index) in fansData" :key="index">
					<div class="userInfo">
						<div class="fansImg">
							<img v-lazy="item.fans.user_avatar" alt="">
						</div>
						<div class="fansName">
							<span>{{item.fans.user_name}}</span><span>{{item.fans.binded_time}}</span>
						</div>
					</div>
					<div class="fansAmount" :style="{'text-align':(curlevel=='2'?'center':'left')}">粉丝数<span>{{item.cout}}</span>
					</div>
					<div v-if="curlevel=='2'" class="upgrade" @click="hasUpGreade(item.uid)">
						<span>升级</span>
					</div>
				</div>
			</view-box>
		</div>
		<div class="emptyInfo" v-if="fansData.length==0">
			暂无数据
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
		ViewBox
	} from 'vux'
	export default {
		name: 'SearchFans',
		components: {
			XHeader,
			ViewBox
		},
		data() {
			return {
				fansName: "", //搜索粉丝的内容
				showClear: false,
				fansData: [],
				showUpGrade: false, //粉丝升级model
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
			}
		},
		watch: {},
		methods: {
			doSearch() {
				this.ajax.get("/agent/index/myFans?state=1&k=" + this.fansName + "&p=1", {}, data => {
					this.fansData = data.data.datas;
				}, data => {});
			},
			//设置是否显示clear图标
			setClear(e) {
				let value = e.target.value;
				this.fansName = value;
				this.showClear = !(value == "");
			},
			clearSeaVal() {
				this.fansName = "";
			},
			hasUpGreade(uid) {
				//保存当前的uid
				this.curUid = uid;
				//获取上级信息
				this.getUpGradeUser();
			},
			//升级超级买手获取上级的信息
			getUpGradeUser() {
				this.ajax.get("/agent/index/upgrade?uid=" + this.curUid, {}, data => {
					//保存上级用户的信息
					this.upGreadeInfos = data.data.datas;
					this.showUpGrade = true;
				}, data => {});
			},
			//进行升级
			toUpgrade() {
				this.ajax.post("/agent/index/upgrade", {
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
		computed: {
			curlevel() {
				return this.$store.state.level;
			}
		},
		created() {},
		mounted() {

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

		.userInfo {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}

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

		.indexHeader {
			background-color: #f9dc3b;
		}

		.emptyInfo {
			position: fixed;
			top: 40%;
			left: 50%;
			transform: translate(-40%, -50%);
			font-size: 26px;
			color: #C0C0C0;
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
				height: 100%;
				margin: 0 auto;
				@include flexCom(space-between);
				padding: 0 0 0 24px;
				background: rgba(255, 255, 255, .5);
				border-radius: 30px;
				font-size: 24px;
				color: #7B7B7B;

				.serachImg {
					width: 30px;
					margin-right: 20px;
				}

				.inputcon {
					width: 496px;
					position: relative;

					input[type='text'] {
						border: none;
						outline: none;
						width: 100%;
						padding-right: 40px;
						font-size: 24px;
						box-sizing: border-box;
						background: transparent;
					}

					img {
						width: 36px;
						position: absolute;
						top: 50%;
						right: 0px;
						z-index: 1;
						transform: translateY(-50%);
					}
				}


				input[type='button'] {
					border: none;
					outline: none;
					width: 114px;
					height: 100%;
					border-radius: 50px;
					font-size: 28px;
					color: #FE1969;
					background: #ffffff;
				}
			}
		}

		.myfanCon {
			position: absolute;
			top: 160px;
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
