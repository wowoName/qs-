<template>
	<div class="container">
		<!-- <v-refresh :on-refresh="onRefresh">
			<v-reload :on-infinite-load="onInfiniteLoad">
				<div class="a"></div>
				<div class="scrollCon">
					<div class="card_list" v-for="(item,index) in pullUpList" :key="item.id">
						{{index}}
					</div>
				</div>
			</v-reload>
		</v-refresh> -->
		<scroller :on-refresh="onRefresh" :on-infinite="onInfiniteLoad" ref="my_scroller">

			<div class="card_list" v-for="(item,index) in pullUpList" :key="item.id">
				{{index}}
			</div>

		</scroller>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 上拉加载的设置
				pullUpList: [],
				cmount: 1
			}
		},
		mounted() {},
		methods: {
			// 下拉刷新
			onRefresh(done) {
				setTimeout(() => {
					this.pullUpList = [];
					this.cmount = 1;
					done();
				}, 2000)
			},
			getData(done) {
				return new Promise((resolve, rejcet) => {
					let length = this.pullUpList.length;
					for (let i = length; i < length + 2; i++) {
						this.pullUpList.push(i);
					}
					this.cmount++;
					setTimeout(() => {
						resolve();
					}, 2000)
				})
			},
			// 上拉加载
			onInfiniteLoad(done) {
				if (this.cmount > 10)
					done(true);
				else
					this.getData().then(() => {
						done()
					});
			}
		},
		components: {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: #f7f7f7;
	}

	.a {
		width: 100%;
		height: 400px;
		background-color: #009688;
		margin-bottom: 20px;
	}


	.card_list {
		width: 100%;
		height: 120px;
		background-color: #0078AD;
		margin-bottom: 20px;
		text-align: center;
		line-height: 120px;
	}
</style>
