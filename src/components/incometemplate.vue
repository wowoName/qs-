<template>
	<div class="inItem"><span>{{title}}</span><span  :style="{color:txtColor}" v-if="!isLoading">{{value}}</span> <i class="is-loading" v-if="isLoading"></i></div>
</template>

<script>
	export default {
		name: 'IncomeItem',
		components: {},
		props: {
			value: "",
			title: "",
			isLoading: false,
			txtColor:{
				 type:String,
				 default:"#111111"
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
	@mixin indexFlex($aitem:center, $jconten:space-between) {
		display: flex;
		align-items: $aitem;
		justify-content: $jconten;
	}

	@mixin incomesCom ($textColo:#FE1969) {
		width: 180px;
		height: 85px;
		@include indexFlex(center, space-between);
		flex-direction: column;
		span:nth-child(1) {
			color: #7B7B7B;
		}

		span:nth-child(2) {
			display: inline-block;
			width: 100%;
			height: 46px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-top: 10px;
			color: $textColo;
			font-size: 30px;
		}

		.is-loading {
			width: 40px;
			height: 40px;
			margin-top: 10px;
			display: inline-block;
			vertical-align: middle;
			-webkit-animation: weuiLoading 1s steps(12, end) infinite;
			animation: weuiLoading 1s steps(12, end) infinite;
			background: transparent url(../../static/images/loading-inner.png) no-repeat;
			background-size: 100%;
		}

	}

	.inItem {
		@include incomesCom;
	}

</style>
