<template>
  <!-- 商品分类导航三级菜单联动组件 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!--1级联动菜单-->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item bo" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                <h3 @mouseenter="changeIndex(index)" :class="{cur: currentIndex == index }">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>
                <!--方式2：通过js的方式控制display的显示与隐藏-->
                <div class="item-list clearfix" :style="{display: currentIndex == index ? 'block' : 'none'}">
                  <div class="subitem">
                    <!--2级联动菜单-->
                    <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <!--3级联动菜单-->
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入lodash:是把lodash全部封装好的函数全都引入进来了
//按需引入：只是引入节流函数，其他的函数没有引入（模块），这样做的好处是，当你打包项目的时候体积会小一些
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show:true
    }
  },
  //组件挂载完毕
  mounted() {
    //当组件挂载完毕，让show属性变为false
    //如果不是Home路由组件，将typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  methods: {
    //用于修改组件实例身上的currentIndex的属性值
    //当用户鼠标移入到h3身上的时候就会立即出发一次
    changeIndex: throttle(function(index) {
      //修改当前currentIndex索引值
      //函数节流:在20MS时间之内只能执行一次
      this.currentIndex = index;
    }, 20),
    //当鼠标离开的时候，让商品分类列表进行隐藏
    leaveIndex() {
      this.currentIndex = -1;
      //判断如果是Search路由组件的时候才会执行
      if (this.$route.path != '/home') {
        this.show = false;
      }
    },
    //进行路由跳转的回调函数
    goSearch(event) {
      //最好的解决方案：编程式导航+事件委派
      //存在一些问题：事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父亲节点
      //问题1：点击a标签的时候，才会进行路由跳转【怎么能确认点击的一定是a标签？】
      //答案：给a标签绑定自定义data-categoryName属性，只要能获取到自定义属性就代表是a标签
      //event.target:获取到的是触发事件的元素(div、h3、a、em、dt、dl)
      let element = event.target;
      //节点有一个属性dataset，可以过去节点的自定义属性与属性值
      let {categoryname, category1id, category2id, category3id} = element.dataset;
      //如果标签身上带有categoryname一定是a标签，且当前这个if语句：一定是a标签才会进入
      if (categoryname) {
        //准备路由跳转的参数对象
        let location = {name: 'search'}
        let query = {categoryName: categoryname}
        //一级目录
        if(category1id) {
          query.category1Id = category1id
          //二级目录
        } else if (category2id) {
          query.category2Id = category2id
          //三级目录
        } else {
          query.category3Id = category3id
        }
        //动态给location配置对象添加query属性
        location.query = query;
        //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        //路由跳转
        this.$router.push(location);
      }
    },
    //当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      if (this.$route.path != '/home') {
        this.show = true;
      }
    }
  },
  computed:{
    ...mapState({categoryList:state=>state.home.categoryList})
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //方式1：通过css控制显隐
          //&:hover {
          //  .item-list {
          //    display: block;
          //  }
          //}
        }

        //方式1：:hover
        //.item:hover {
        //  background: skyblue;
        //}
        //方式2：定义cur，定义鼠标事件，当划入的时候判断currentIndex和index是否相等，相等就显示背景色
        .cur {
          background: skyblue;
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>