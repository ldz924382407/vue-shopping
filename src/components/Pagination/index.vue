<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" :class="{ active: pageNo == 1 }" @click="$emit('getPageNo', 1)">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 中间部分,注意：v-for遍历数字索引从1开始，由于添加规则page >= startNumAndEndNum.start，所以最终显示的只有continues个数字 -->
    <button v-for="(page, index) in startNumAndEndNum.end" v-if="page >= startNumAndEndNum.start" :key="index" :class="{ active: pageNo == page }" @click="$emit('getPageNo', page)"
    >{{ page }}</button>

    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" :class="{active:pageNo==totalPage}" @click="$emit('getPageNo', totalPage)"
    >{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      //向上取证
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码的起始数字与结束数字[连续页码的数字:至少是5]
    startNumAndEndNum() {
      //解构出来,不解构是作为实例身上的属性,不解构没法用，所谓解构：就是要将对象分解为多个属性，这个对象可以是this对象也可以是普通的对象
      const {continues, pageNo, totalPage} = this;
      //先定义两个变量存储起始数字与结束数字
      let start = 0, end = 0;
      //连续页码数字5【就是至少五页】，如果出现不正常的现象【就是不够五页】
      //不正常现象【总页数没有连续页码多】
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        //正常现象【连续页码5，但是你的总页数一定是大于等于5的】
        //起始数字，注意：parseInt()方法是向下取整
        start = pageNo - parseInt(continues / 2);
        //结束数字
        end = pageNo + parseInt(continues / 2);
        //把出现不正常的现象【start数字出现0|负数】纠正，假设pageNo为【1|2】的时候，那么start就会出现【0|负数】
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //把出现不正常的现象[end数字大于总页码]纠正，假设pageNo为【totalPage | totalPage-1】的时候，那么就会出现end > totalPage
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return {start, end};
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

.active {
  background: skyblue;
}
</style>
