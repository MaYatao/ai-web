<template>
  <el-container>
    <el-header>
      <h3>创建试卷</h3>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-button type="primary" icon="el-icon-search" @click="table = true">选择试题</el-button>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" icon="el-icon-search" @click="table = true">创建试题</el-button>
        </el-col>
        <el-col :span="5">
          <el-rate v-model="testForm.degree"></el-rate>
        </el-col>
        <el-col :span="5">
         题目数量{{testForm.count}}
        </el-col>
      </el-row>
      <el-row :gutter="20">
     试卷标题： <el-input style="width: 200px" v-model="testForm.title" placeholder="添加试卷标题"></el-input>
      </el-row>
    </el-header>
    <br>
    <br>
    <br>
    <br>
    <el-main>
      <br>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="题目类型"
          width="180">
          <template slot-scope="{row}">
            <el-tag  >
              {{row.type | typeFilter}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="题目标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="content"
          label="题目内容">
          <template slot-scope="scope"><p class="ql-editor" v-html="scope.row.content"> </p></template>
        </el-table-column>
        <el-table-column
          label="题目难度">
          <template slot-scope="scope"><el-rate v-model="scope.row.degree"></el-rate>  </template>
        </el-table-column>
        <el-table-column
          label="题目操作">
          <el-button type="primary" icon="el-icon-search" @click="up(scope.row)">确定</el-button>
        </el-table-column>
      </el-table>
      <el-button type="primary" icon="el-icon-search" @click="save">保存</el-button>
    </el-main>
    <el-drawer
      title="选择试题!"
      :visible.sync="table"
      direction="rtl"
      size="50%">
      <el-form ref="searchList" :model="searchList" label-width="120px">
        <el-form-item label="选择科目" prop="title">
          <el-cascader :options="options" v-model="sort" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="选择难度" >
          <el-rate v-model="searchList.degree"></el-rate>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form>
      <el-table :data="gridData">
        <el-table-column  label="题目" width="150" >
          <template slot-scope="{row}">
           <div v-html="row.content"></div>
          </template>
        </el-table-column>
        <el-table-column label="题型" width="200"> <template slot-scope="{row}">
          <el-tag  >
            {{row.type | typeFilter}}
          </el-tag>
        </template></el-table-column>
        <el-table-column label="难度">           <template slot-scope="scope"><el-rate v-model="scope.row.degree"></el-rate>  </template></el-table-column>
        <el-table-column property="knowledgeName" label="知识点"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-search" @click="select(scope.row)">确定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </el-container>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor';
  export default {
    name: 'creatsTest',
    components: {
      quillEditor
    },
    filters: {
      typeFilter (type) {
        const typeMap = {
          '1': '单选题',
          '2': '多选题'
        }
        return typeMap[type]
      }
    },
    data () {
      return {
        table: false,
        loading: false,
        tableData: [],
        gridData: [],
        sort: '',
        searchList: {
          knowledge: '',
          subject: '',
          direction: '',
          degree: 0
        },
        choiceQuestios: [],
        choicesQuestios: [],
        testForm: {
          choiceQuestios: '',
          choicesQuestios: '',
          count: 0,
          degree: 0,
          subjectId: '',
          title: '',
          type: 1,
          userId: this.$store.state.user.userId
        }
      };
    },
    methods: {
      getSubject () {
        this.$api.getSubjects().then(res => {
          this.options = res.data;
        }).catch((error) => {
          console.log(error);
          alert(error)
        });
      },
      search () {
        this.testForm.subject = this.sort[1]
        this.searchList.direction = this.sort[0]
        this.searchList.subject = this.sort[1]
        this.$api.searchQuestion(this.searchList).then(res => {
          this.gridData = res.data
        }).catch((error) => {
          console.log(error);
          alert(error)
        });
      },
      select (question) {
        if (question.type === 1) {
          this.choiceQuestios.push(question.qid)
        }
        if (question.type === 2) {
          this.choicesQuestios.push(question.qid)
        }
        this.tableData.push(question)
        this.testForm.count = this.tableData.length
      },
      save () {
        this.testForm.choiceQuestios = this.choiceQuestios.join()
        this.testForm.choicesQuestios = this.choicesQuestios.join()
        this.$api.createTest(this.testForm).then(res => {
          alert('创建成功')
        }).catch((error) => {
          console.log(error);
          alert(error)
        });
      }
    },
    created () {
      this.getSubject()
    }
  }
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
</style>
