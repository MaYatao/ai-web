<template>
  <el-container>
    <el-header>
      <div style="align-content: center">
        <el-button active style="margin: 3px 3px;width: 50px" v-for="(question,index) in questionList" :key="question"
                   :class="current == index ? 'current' : ''" @click="select(index)">
          {{index+1}}
        </el-button>
      </div>
    </el-header>
    <el-main>
      <p class="ql-editor" v-html="infoForm.content"></p>
      <div border v-if="infoForm.type === 1">
        <el-button plain style="width: 1000px" v-for="(Option,index) in infoForm.options.split(',')" :key="Option"
                   :class="index == infoForm.answer  ? 'isTrue' :  (index == infoForm.userAnswer && infoForm.userAnswer != infoForm.answer )  ? 'isError' : '' ">{{Option}}
        </el-button>
      </div>
      <div border v-if="infoForm.type === 2">
        <el-button plain style="width: 1000px" v-for="(Option,index) in infoForm.options.split(',')" :key="Option"
                   :class="(answers.indexOf(index+'') != -1 && userAnswers.indexOf(index+'') != -1) ? 'isOther' : (answers.indexOf(index+'') != -1 ) ? 'isTrue' : (userAnswers.indexOf(index+'') != -1 ) ? 'isError' : '' ">{{Option}}
        </el-button>
      </div>
      <br>
      正确答案：{{infoForm.answer}} 你的答案{{infoForm.userAnswer}}
      <el-tag>收藏本题</el-tag>
      <el-tag>标记一下</el-tag>
      <el-tag>屏蔽本题</el-tag>
      <br>
    </el-main>
    <el-footer>
     答案解析: <p class="ql-editor" v-html="infoForm.analysis"></p>
    </el-footer>
  </el-container>
</template>
<script>
  //   试题详情是需要手动引入的文件

  export default {
    name: 'questionDone',
    data () {
      return {
        testId: '',
        userId: this.$store.state.user.userId,
        questionList: [],
        infoForm: {
          rqid: '',
          qid: '',
          testId: '',
          userId: '',
          error: '',
          score: '',
          options: '',
          degree: '',
          content: '',
          type: '',
          answer: '',
          userAnswer: '',
          knowledge: '',
          analysis: ''
        },
        answers: [],
        userAnswers: [],
        current: 0
      }
    },
    created () {
      this.getParams()
      this.getQuestionsByUtid()
    },
    methods: {
      getQuestionsByUtid () {
        this.$api.getQuestionsByUtid({'testId': this.testId, 'userId': this.userId}).then(res => {
          this.questionList = res.data;
          this.select(0)
        }).catch((error) => {
          console.log(error);
        });
      },
      getParams () {
        this.rtid = this.$route.query.rtid
      },
      select (index) {
        this.current = index
        this.infoForm = this.questionList[index]
        if (this.infoForm.type === 2) {
          this.answers = this.infoForm.answer
          this.userAnswers = this.infoForm.userAnswer.split(',')
        }
        }
      }
  }
</script>
<style>
  .isactive {
    background-color: #79a7d2;
  }
  .inactive {
    background-color: white;
  }
  .isTrue {
    background-color: #5e7f7f;
    color:white
  }
  .isError {
    background-color: red;
  }
  .isOther {
    background-color: #efffd1;
  }
  .current {
    color: red
  }
</style>
