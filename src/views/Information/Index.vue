<template>
  <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="真题" name="first">
      <tests></tests>
    </el-tab-pane>
    <el-tab-pane label="专项练习" name="second">
      <questions></questions>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import questions from '@/views/Information/questions';
import tests from '@/views/Information/tests';
export default {
  name: 'Index',
  components: { questions, tests },
  data () {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
