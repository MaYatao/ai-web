<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
   <!-- <el-tab-pane label="内容题" name="first"><ContentQuestion></ContentQuestion></el-tab-pane>-->
    <el-tab-pane label="单选题" name="second"><choiceQuestion></choiceQuestion></el-tab-pane>
    <el-tab-pane label="多选题" name="third"><choicesQuestion></choicesQuestion></el-tab-pane>
  </el-tabs></template>

<script>
  import choiceQuestion from '@/views/Information/choiceQuestion';
  import ContentQuestion from '@/views/Information/ContentQuestion';
  import choicesQuestion from '@/views/Information/choicesQuestion';
  export default {
    name: 'createQuestion',
    components: {choiceQuestion, ContentQuestion, choicesQuestion},
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
