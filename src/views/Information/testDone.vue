<template>
<el-container>
  <el-header>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/questionAnalytic">评估报告</el-menu-item>
    <el-menu-item index="/questionDone">答案解析</el-menu-item>
  </el-menu>
  </el-header>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
</template>
<script>
  export default {
    name: 'testDone',
    data () {
      return {
        rtid: '',
        activeIndex: '/questionAnalytic',
        userId: this.$store.state.user.userId,
        testId: ''
      };
    },
    methods: {
      handleSelect (key, keyPath) {
        this.indexs(key)
      },
      getParams () {
        var recortTestId = this.$route.query.rtid
        this.rtid = recortTestId
        this.testId = this.$route.query.testId
      },
     indexs (key) {
        alert(this.rtid)
      this.$router.push({path: key,
        query: {
          'rtid': this.rtid
        }});
    }
  },
    created () {
      this.getParams()
    this.indexs('/questionAnalytic');
  }
  }
</script>
<style lang="postcss" scoped>
  body {
    background-color: #ff0000;
  }
</style>
