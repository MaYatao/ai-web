<template>
  <el-container style="padding-bottom: 60px">
    <el-main style="margin-bottom: 40px">
      <div v-for="direction in subjectList" :key="direction" style="display: flex; text-align: left; border-bottom: 1px solid #dcdfe6; padding: 20px 0; width: 1000px; margin: 0 auto">
        <h3 style="flex: 0 0 160px; padding-right: 20px">{{direction.label}}</h3>
        <div>
          <el-button
          size="mini"
            v-for="subject in direction.children"
            :key="subject"
            style="margin: 3px 3px"
            :class="(subjests.indexOf(subject.value) === -1)? '' :'active'"
            @click="select(subject.value)"
          >{{subject.label}}</el-button>
        </div>
      </div>
    </el-main>
    <el-footer>
      <el-row :gutter="24">
        <el-col :span="3">选择难度：</el-col>
        <el-col :span="3">
          <el-rate v-model="form.degree" :colors="colors"></el-rate>
        </el-col>
        <el-col :span="3">选择试题数：</el-col>
        <el-col :span="4">
          <el-radio-group v-model="form.num">
            <el-radio-button label="10"></el-radio-button>
            <el-radio-button label="20"></el-radio-button>
            <el-radio-button label="30"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="3">选择试题类型：</el-col>
        <el-col :span="4">
          <el-checkbox-group v-model="questionsTypes">
            <!-- <el-checkbox  label=0 >内容题</el-checkbox >-->
            <el-checkbox label="1">单选题</el-checkbox>
            <el-checkbox label="2">多选题</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="3">
          <el-button @click="intoPractice()">开始练习</el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "questions",
  data() {
    return {
      form: {
        subjectIds: "",
        num: 10,
        userId: this.$store.state.user.userId,
        degree: 0,
        types: []
      },
      subjectList: "",
      subjests: [],
      questionsTypes: []
    };
  },
  created() {
    this.getSubject();
  },
  methods: {
    intoPractice() {
      this.form.subjectIds = this.subjests.join();
      this.form.types = this.questionsTypes.join();
      this.$api
        .createTestBySubject(this.form)
        .then(res => {
          this.$router.push({
            path: "/questionList",
            query: {
              testId: res.data
            }
          });
        })
        .catch(error => {
          console.log(error);
          alert(error);
        });
    },
    select(data) {
      if (this.subjests.indexOf(data) === -1) {
        this.subjests.push(data);
      } else {
        this.subjests.splice(this.subjests.indexOf(data), 1);
      }
    },
    getSubject() {
      this.$api
        .getSubjects()
        .then(res => {
          this.subjectList = res.data;
        })
        .catch(error => {
          console.log(error);
          alert(error);
        });
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.active {
  /* background: #eee; */
  color: #1e82d2;
  font-weight: bolder;
}
/*  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }*/
</style>
