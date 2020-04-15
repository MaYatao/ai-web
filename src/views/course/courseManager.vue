<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="上传课程" name="first"><createCourse></createCourse></el-tab-pane>
    <el-tab-pane label="课程分析" name="third"><CourseStatistics></CourseStatistics></el-tab-pane>
  </el-tabs>
</template>
<script>

  import createCourse from '@/views/course/createCourse';
  import CourseStatistics from '@/views/course/courseStatistics';
  export default {
    name: 'courseManager',
    components: {createCourse, CourseStatistics},
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
