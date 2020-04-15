<template>
  <el-container>
    <el-header>
      <h1 style="float: left">
        <el-tag> 最热</el-tag>
        <el-tag> 最火</el-tag>
        <el-tag> 最新</el-tag>
      </h1>
    </el-header>
    <el-main>
      <div v-for="test in list" :key="test">
        <a  @click="getTestByTid(test.testId)">
        <div style="height: 250px;width:200px;float: left;margin: 10px">
          <el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
          {{test.title}}
          <el-rate v-model="test.status" :colors="colors"></el-rate>
        </div>
        </a>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'tests',
    data () {
      return {
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        total: 0,
        listQuery: {
          page: 1,
          row: 10
        },
        list: ''
      }
    },
    created () {
      this.getHotTests()
    },
    methods: {
      getTestByTid (tetsId) {
        this.$router.push({path: '/questionList',
          query: {
            'testId': tetsId
          }});
      },
      getHotTests () {
        this.$api.getHotTests(this.listQuery).then(res => {
         this.list = res.data.list;
          this.total = res.data.total
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>

</style>
