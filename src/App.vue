<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style lang="scss">
	body,
	* {
		margin: 0;
		padding: 0;
	}

	#app {
		font-family: 'pf';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		height: 100%;
		width: 100%;
		background-color: #ffffff;
	}

	.invoiceValue {
		input[type='text'] {
			text-align: right;
		}

		input[type='number'] {
			text-align: right;
		}
	}
</style>
