<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="12">试卷：{{rtForm.title}}</el-col>
        <el-col :span="12"><el-rate v-model="rtForm.degree" style="float: left"></el-rate></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> 正确题数：</el-col>
        <el-col :span="12"><div  style="float: left">{{rtForm.trueNum}}/{{rtForm.totalNum}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">  得分：</el-col>
        <el-col :span="12"><div  style="float: left">{{rtForm.totalScore}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> 耗时：</el-col>
        <el-col :span="12"><div  style="float: left">{{rtForm.spendTime}}</div></el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-button type="primary">练习其他技能</el-button>
      <el-button type="success">再练一套</el-button>
    </el-main>
    <el-footer style="height: 100px">
      根据做题结果，你可能需要：
      <div v-for="test in list" :key="test">
        <a  @click="getTestByTid(test.testId)">
          <div style="height: 250px;width:200px;float: left;margin: 10px">
            <el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            {{test.title}}
            <el-rate v-model="test.degree" :colors="colors"></el-rate>
          </div>
        </a>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
  //   试题详情是需要手动引入的文件
  export default {
    name: 'questionAnalytic',
    components: {},
    data () {
      return {
        rtForm: {
          title: '',
          rtid: '',
          totalScore: '',
          totalNum: '',
          spendTime: '',
          trueNum: '',
          degree: 1
        },
        list: '',
        listQuery: {
          page: 1,
          row: 10
        }
      }
    },
    created () {
      this.getParams()
      this.getRecordestById()
      this.getHotTests()
    },
    methods: {
      getHotTests () {
        this.$api.getHotTests(this.listQuery).then(res => {
          this.list = res.data.list;
          this.total = res.data.total
        }).catch((error) => {
          console.log(error);
        });
      },
      getParams () {
        this.rtForm.rtid = this.$route.query.rtid
      },
      getRecordestById () {
        this.$api.getRecordTestById({'rtid': this.rtForm.rtid}).then(res => {
          this.rtForm = res.data
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>

</style>
