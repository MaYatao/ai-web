<template>
  <div>
    <el-row class="warp">
      <h1>上传试题</h1>

      <!--
      Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http:// element.eleme.io/#/zh-CN/component/form
      -->
      <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm"  label-width="120px">
          <el-form-item label="问题内容"   style="height: 250px;margin : 50px 100px">
            <div class="edit_container">
              <quill-editor v-model="infoForm.content"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption" @ready="onEditorReady($event) "  style="height: 250px">
              </quill-editor>
            </div>
          </el-form-item>
          <br>
          <el-form-item style="margin:50px 100px; " label="添加选项" >
              <el-input v-for='(option, index) in questionOptions' :key='index' v-model='questionOptions[index]' style="margin-bottom: 8px">
              </el-input>
            <el-button size="small" @click="addOption">添加选项</el-button>
          </el-form-item>
          <br>
          <el-form-item label="答案" prop="answer">
            <el-input v-model="infoForm.answer"></el-input>
          </el-form-item>
          <el-form-item label="分值" prop="score">
            <el-input v-model="infoForm.score"></el-input>
          </el-form-item>
          <el-form-item label="解析"   style="height: 250px;margin : 30px 100px">
            <div class="edit_container">
              <quill-editor v-model="infoForm.analysis"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption" @ready="onEditorReady($event) "  style="height: 250px">
              </quill-editor>
            </div>
          </el-form-item>
          <br>
          <el-form-item label="难易程度" style="margin: 60px 60px">
            <el-rate v-model="infoForm.degree"></el-rate>
          </el-form-item>
          <el-form-item label="科目" style="margin: 30px 60px">
            <el-cascader @change="getKnowledgesBySId" :options="subjectOptions" v-model="sort" clearable placeholder="请选择"></el-cascader>
          </el-form-item>
          <el-form-item v-if="sort.length !== 0" label="知识点" style="margin: 30px 60px">
            <el-select v-model="knowledges" multiple placeholder="请选择">
              <el-option
                v-for="item in knowledgeOptions"
                :key="item.knowledgeId"
                :label="item.title"
                :value="item.knowledgeId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin: 100px 100px" >
            <el-button type="primary" @click="onSubmit">确认发布</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor' // 调用编辑器
  export default {
    name: 'choiceQuestion',
    data () {
      return {
        subjectOptions: [],
        sort: [],
        knowledges: [],
        knowledgeOptions: [],
        questionOptions: [],
        infoForm: {
          score: '',
          analysis: '',
          options: '',
          content: '',
          uid: this.$store.state.user.userId,
          knowledge1: '',
          knowledge2: '',
          knowledge3: '',
          status: 0,
          subject: '',
          direction: '',
          answer: '',
          degree: 0,
          type: 1
        }
      }
    },
    computed: {
      editor () {
        return this.$refs.myQuillEditor.quill
      }
    },
    created () {
      this.getSubject()
    },
    methods: {
      addOption () {
        this.questionOptions.push('');
      },
      addNewList () {
        this.lists.push({
          id: this.nextTodoId++,
          title: this.newAddText
        })
        this.newAddText = ''
      },
      onEditorReady (editor) {
      },
      getSubject () {
        this.$api.getSubjects().then(res => {
          this.subjectOptions = res.data;
        }).catch((error) => {
          console.log(error);
          alert(error)
        });
      },
      getKnowledgesBySId (values) {
        this.knowledges = [];
        this.$api.getKnowledgesBySId({ 'subjectId': values[1] })
          .then(res => {
            this.knowledgeOptions = res.data;
          })
          .catch(error => {
            console.log(error);
            alert(error);
          });
      },
      onSubmit () {
        // 提交
        // knowledges数组拆开为三个参数
        this.infoForm.knowledge1 = this.knowledges[0];
        this.infoForm.knowledge2 = this.knowledges[1];
        this.infoForm.knowledge3 = this.knowledges[2];
        this.infoForm.options = JSON.stringify(this.questionOptions);
        this.infoForm.direction = this.sort[0];
        this.infoForm.subject = this.sort[1];
        this.$api.createQuestion(this.infoForm).then(res => {
          this.questionOptions = [];
        }).catch((error) => {
          console.log(error);
          alert(error)
        });
      }
    },
    components: {
//  使用编辑器
      quillEditor
    }
  }
</script>
<style>
</style>

