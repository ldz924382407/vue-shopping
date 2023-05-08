<template>
  <div>
    <!--三级联动全局组件：三级联动已经注册为全局组件，因此不需要在引入-->
    <TypeNav></TypeNav>
    <!--列表-->
    <ListContainer></ListContainer>
    <!--今日推荐-->
    <Recommend></Recommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 猜你喜欢 -->
    <Like></Like>
    <!--楼层-->
    <Floor v-for="floorItem in floorList" :key="floorItem.id" :floorItem="floorItem"></Floor>
    <!--商标-->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from  '@/pages/Home/Recommend'
import Rank from  '@/pages/Home/Rank'
import Like from  '@/pages/Home/Like'
import Floor from  '@/pages/Home/Floor'
import Brand from  '@/pages/Home/Brand'
import {mapState} from "vuex"

export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch("mockGetFloorList");
    this.$store.dispatch('reqUserInfo');
  },
  computed: {
    ...mapState({floorList: state=>state.home.floorList})
  }
}
</script>

<style scoped>

</style>