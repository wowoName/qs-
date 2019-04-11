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
				<input type="button" value="搜索" @click="doSearch">
			</div>
		</div>
		<div class="myfanCon">
			<view-box>
				<div class="myfanItem" v-for="(item,index) in fansData" :key="index">
					<div class="fansImg">
						<img v-lazy="item.fans.user_avatar" alt="">
					</div>
					<div class="fansName">
						<span>{{item.fans.user_name}}</span><span>{{item.fans.binded_time}}</span>
					</div>
					<div class="fansAmount">粉丝数<span>{{item.cout}}</span>
					</div>
					<div class="upgrade" @click="showUpGrade=true">
						<span>升级</span>
					</div>
				</div>
			</view-box>
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
				fansData: []
			}
		},
		watch: {},
		methods: {
			doSearch() {
				this.ajax.get("/agent/index/myFans?state=1&k="+this.fansName+"&p=1", {}, data => {
					this.fansData= data.data.datas;
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
			}
		},
		computed: {

		},
		created() {

		},
		mounted() {

		}
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

	.bDeMain {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #F1F2F7;

		.indexHeader {
			background-color: #f9dc3b;
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
