<template>
  <div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的试卷" name="/myQuestions">用户管理</el-tab-pane>
      <el-tab-pane label="我是题目" name="/myTests">配置管理</el-tab-pane>
    </el-tabs>

      <router-view></router-view></div>

  </template>

<script>
    export default {
        name: 'MyInfo',
      data () {
        return {
          activeName: '/myQuestions'
        };
      },
      methods: {
        handleClick (tab, event) {
          console.clear()
          console.log(tab)
          alert(tab)
          this.$router.push(tab)
        }
      }
    }
</script>

<style scoped>

</style>
