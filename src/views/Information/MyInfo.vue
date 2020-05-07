<template>
  <div class="tabZujian">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="tab1" name="first" :key="'first'">
        <child1 v-if="isChildUpdate1"></child1>
      </el-tab-pane>
      <el-tab-pane label="tab2" name="second" :key="'second'">
        <child2 v-if="isChildUpdate2"></child2>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import MyQuestions from '@/views/Information/MyQuestions'
    import MyTests from '@/views/Information/MyTests'
    export default {
      name: 'MyInfo',
      components: {
        child1: MyQuestions,
        child2: MyTests
      },
      data () {
        return {
          // 默认第一个选项卡
          activeName: 'first',
          isChildUpdate1: true,
          isChildUpdate2: false
        }
      },
      mounted () {

      },
      methods: {
        handleClick (tab) {
          if (tab.name === 'first') {
            this.isChildUpdate1 = true;
            this.isChildUpdate2 = false;
          } else if (tab.name === 'second') {
            this.isChildUpdate1 = false;
            this.isChildUpdate2 = true;
          }
        }
      }
    }
</script>

<style scoped>

</style>
