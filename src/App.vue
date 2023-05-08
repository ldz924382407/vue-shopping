<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!--方式1（不推荐）：通过$route.path判断符合的才显示，弊端万一有100个路径我一直拼接下去？那写的也太长了，明显不现实-->
    <!--<Footer v-show="$route.path == '/home' || $route.path == '/search'"></Footer>-->
    <!--方式2（推荐）：通过路由上配置的meta元信息进行显隐控制-->
    <Footer v-show="$route.meta.isShow" />
  </div>
</template>

<script>
//引入Header与Footer非路由组件
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    //派发一个action||获取商品分类的三级列表的数据
    this.$store.dispatch("getCategoryList")
  }
}
</script>

<style>
</style>
