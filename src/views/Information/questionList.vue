<template>
  <el-container>
    <el-header>
      <h3>{{testForm.title}}
        <div class='timer' style="float: right;color: #FA5555">
          <div ref='startTimer'></div>
        </div>
      </h3>
    </el-header>
    <el-main>
      <p class="ql-editor" v-html="infoForm.content"></p>
      <div border v-if="infoForm.type === 1">
        <div border v-for="(Option,index) in infoForm.options.split(',')" :key="Option">
          <label><input type="radio" v-model="infoForm.answer" :value="index">{{Option}}</label>
        </div>
      </div>
      <div border v-if="infoForm.type === 2">
        <el-button plain style="width: 1000px" v-for="(Option,index) in infoForm.options.split(',')" :key="Option"
                   :class="(answers.indexOf(index+'') == -1) ? 'inactive' : 'isactive' "
                   @click="selectOption(index+'')">{{Option}}
        </el-button>
      </div>
    </el-main>
    <el-footer>
      <el-tag>收藏本题</el-tag>
      <el-tag>标记一下</el-tag>
      <el-tag>屏蔽本题</el-tag>
      <br>
      <div style="align-content: center">
        <el-button active style="margin: 3px 3px;width: 50px" v-for="(question,index) in questionList" :key="question"
                   :class="current == index ? 'current' : ''" @click="select(index)">
          {{index+1}}
        </el-button>
      </div>
      <el-button @click="onsubmit()">提交</el-button>
    </el-footer>
  </el-container>
</template>
<script>
  //   试题详情是需要手动引入的文件
  import question from './questionAnalytic'
  import questionDetail from './questionDone'

  export default {
    name: 'questionList',
    components: {question, questionDetail},
    data () {
      return {
        hour: 0,
        minutes: 0,
        seconds: 0,
        questionList: [],
        choiceQuestios: [],
        choicesQuestios: [],
        testForm: {
          testId: '',
          userId: '',
          title: '',
          degree: 0
        },
        infoForm: {
          qid: '',
          options: '',
          content: '',
          knowledge: '',
          status: 0,
          subject: '',
          direction: '',
          answer: '',
          degree: '',
          type: 1
        },
        answers: [],
        current: 0
      }
    },
    created () {
      this.getParams()
      this.getTestByTid();
      this.timer = setInterval(this.startTimer, 1000);
    },
    destroyed () {
      clearInterval(this.timer);
    },

    methods: {
      onsubmit () {
        if (this.infoForm.type === 2) {
          this.questionList[this.current].answer = this.answers.join()
        }
        var spendTime = (this.hour < 10 ? '0' + this.hour : this.hour) + ':' + (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds)
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.$api.createRecordTest({
          'questionList': this.questionList,
          'userId': this.$store.state.user.userId,
          'testId': this.testForm.testId,
          'degree': this.testForm.degree,
          'title': this.testForm.title,
          'status': this.testForm.status,
          'spendTime': spendTime
        }).then(res => {
           this.$router.push({path: '/testDone',
             query: {
               'rtid': res.data,
               'userId': this.$store.state.user.userId,
               'testId': this.testForm.testId
             }});
        }).catch((error) => {
          console.log(error);
        });
      },
      selectOption (index) {
        if (this.answers.indexOf(index) === -1) {
          this.answers.push(index)
        } else {
          this.answers.splice(this.answers.indexOf(index), 1)
        }
      },
      select (index) {
        if (this.infoForm.type === 2) {
          this.questionList[this.current].answer = this.answers.join()
        }
        this.current = index
        this.infoForm = this.questionList[index]
        if (this.infoForm.type === 2) {
          this.answers = this.infoForm.answer.split(',')
        }
      },
      getParams () {
        this.testForm.tetsId = this.$route.query.testId
      },
      getTestByTid () {
        var tid = this.testForm.tetsId
        this.$api.getTestByTid({'testId': tid}).then(res => {
          this.testForm = res.data
          this.choiceQuestios = res.data.choiceQuestios
          this.choicesQuestios = res.data.choicesQuestios
          for (var i = 0; i < this.choiceQuestios.length; i++) {
            this.choiceQuestios[i].answer = ''
            this.questionList.push(this.choiceQuestios[i]);
          }
          for (var j = 0; j < this.choicesQuestios.length; j++) {
            this.choicesQuestios[j].answer = []
            this.questionList.push(this.choicesQuestios[j]);
          }
          this.select(0)
        }).catch((error) => {
          console.log(error);
        });
      },
      startTimer () {
        this.seconds += 1;
        if (this.seconds >= 60) {
          this.seconds = 0;
          this.minutes = this.minutes + 1;
        }
        if (this.minutes >= 60) {
          this.minutes = 0;
          this.hour = this.hour + 1;
        }
        this.$refs.startTimer.innerHTML = (this.hour < 10 ? '0' + this.hour : this.hour) + ':' + (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds);
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

  .current {
    color: red
  }
</style>
