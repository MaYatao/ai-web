<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="12">试卷：{{rtForm.title}}</el-col>
        <el-col :span="12"><el-rate v-model="rtForm.status" style="float: left"></el-rate></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> 正确题数：{{rtForm.trueNum}}/{{rtForm.totalNum}}</el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">  得分：{{rtForm.totalScore}}</el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> 耗时：{{rtForm.spendTime}}</el-col>
        <el-col :span="12"></el-col>
      </el-row>
    </el-header>
    <el-main>
      通过本次练习，你的以下技能评估结果发生了变化。
      <br>
      <br>
      <el-button type="primary">练习其他技能</el-button>
      <el-button type="success">再练一套</el-button>
    </el-main>
    <el-footer>
      根据做题结果，你可能需要：
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
          status: 0
        }
      }
    },
    created () {
      this.getParams()
      this.getRecordestById()
    },
    methods: {
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
