<template>
  <footer>
		<div v-for="(l,i) in FooterList" :key="i">
			<router-link :to="{name:l.name}">
				<i class="iconfont" :class="l.icon"></i>
				<span>{{l.text}}</span>
				<van-tag v-if="l.hot"  class="hot"  :color="$route.name==l.name?'#ff5f16':'#999'"  >{{8}}</van-tag>
			</router-link>
		</div>
	</footer>
</template>

<script>
export default {
    name:'myfooter',
}
</script>

<style lang="scss" scoped>
footer{
	position:fixed;
	width:100%;
	height:45px;
	left:0;
	bottom:0;
	background:#fff;
	display:flex !important;
    z-index:3000;
    border-top:1px solid #b9b9b9;
	div{
		flex:1;
		height:45px;
		a{
			display: block;
			width:100%;
			height:100%;
			display:flex;
			flex-direction:column;
			box-sizing:border-box;
			padding:3px 0;
			text-align:center;
			font-family:"微软雅黑";
			color:#999;
			position: relative;
			i{
                width:100%;
                height:20px;
                line-height:20px;
                font-size:18px !important;
			}
			span{
				width:100%;
				height:19px;
				line-height:19px;
				font-size:14px;
			}
			.hot{
				position: absolute;
				top:3px;
				left:60%;
				display: inline-block;
                width:20px;
                height:16px;
                font-size:12px;
                line-height: 16px;
				border-radius: 50%;
				// background: red;
				color:#fff;
			}
		}
		.nav-active,.router-link-exact-active,.router-link-active{
			color:#ff5f16;
			border-color:#ff5f16;
		}

	}
}
</style>
