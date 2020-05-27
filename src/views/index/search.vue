<template>
              <div style="width: 620px; height: 140px">
                <el-row>
                  <h3 class="article-title">
                    <span style="cursor: pointer" @click="getArticleById(item.sid)">{{item.title}}</span>
                    <!--  <el-tag v-for="f in (item.flag.split(','))" v-bind:key="f">{{f}}</el-tag>-->
                  </h3>
                </el-row>
                <el-row :gutter="20" class="article-info">
                  <el-col :span="5">
                    <div class="grid-content">作者： {{item.username}}</div>
                  </el-col>
                  <el-col :span="14">
                    <div class="grid-content">发布时间: {{item.createTime | filterTime }}</div>
                  </el-col>
                  <el-col :span="5">
                  </el-col>
                </el-row>
              </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    name: 'search',
    components: {},
    data () {
      return {
        msg: '这个是Home模板页',
        content: '',
        list: []
      }
    },
    created () {
      this.getParams();
      this.getRecordestById();
    },
    methods: {
      getParams () {
        this.content = this.$route.query.content;
      },
      getRecordestById () {
        this.$api.search({'content': this.content}).then(res => {
          this.list = res.data
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
</script>
<style lang="postcss" scoped>
  body {
    background-color: #ff0000;
  }
</style>
