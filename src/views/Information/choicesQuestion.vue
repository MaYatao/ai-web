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
            <ul>
              <li v-for='(Option,index) in dynamicOptions' :key='Option' border>
                {{Option}}  {{index}} <button @click='optionClose(Option)'>删除</button>
              </li>
            </ul>
            <el-button  size="small" @click="addOption">添加选项</el-button>
            <el-input
              v-if="optionVisible"
              v-model="optionValue"
              ref="saveOptionInput"
              size="small"
              @keyup.enter.native="handleOptionConfirm"
              @blur="handleOptionConfirm"
            >
            </el-input>
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
          <el-form-item label="科目"  style="margin: 10px 60px">
            <el-cascader :options="options" v-model="sort" clearable></el-cascader>
          </el-form-item>
          <el-form-item style="margin:50px 100px; " label="添加知识点" >
            <br>
            <el-tag
              :key="tag"
              v-for="tag in dynamicKnowledges"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">添加新标签</el-button>
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
    name: 'choicesQuestion',
    data () {
      return {
        dynamicKnowledges: ['Java', '标签二', '标签三'],
        dynamicOptions: ['Java', '标签二', '标签三'],
        optionVisible: false,
        optionValue: '',
        inputVisible: false,
        inputValue: '',
        subjectOptions: '',
        infoForm: {
          score: '',
          analysis: '',
          options: '',
          content: '',
          uid: this.$store.state.user.userId,
          knowledge: '',
          status: 0,
          sort: [],
          subject: '',
          direction: '',
          answer: '',
          degree: 0,
          type: 2
        }
      }
    },
    computed: {
      editor () {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted () {
      // 初始化
    },
    methods: {
      addNewList () {
        this.lists.push({
          id: this.nextTodoId++,
          title: this.newAddText
        })
        this.newAddText = ''
      },
      handleClose (tag) {
        this.dynamicKnowledges.splice(this.dynamicKnowledges.indexOf(tag), 1);
      },
      optionClose (option) {
        this.dynamicOptions.splice(this.dynamicOptions.indexOf(option), 1);
      },
      showInput () {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      addOption () {
        this.optionVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveOptionInput.$refs.input.focus();
        });
      },
      handleInputConfirm () {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicKnowledges.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      handleOptionConfirm () {
        let optionValue = this.optionValue;
        if (optionValue) {
          this.dynamicOptions.push(optionValue);
        }
        this.optionVisible = false;
        this.optionValue = '';
      },
      onEditorReady (editor) {
      },
      getSubject () {
        this.$api.getSubjects().then(res => {
          this.options = res.data;
        }).catch((error) => {
          console.log(error);
          alert(error)
        });
      },
      onSubmit () {
        // 提交
        this.infoForm.knowledge = this.dynamicKnowledges.join()
        this.infoForm.options = this.dynamicOptions.join()
        this.infoForm.direction = this.sort[0]
        this.infoForm.subject = this.sort[1]
        this.$api.createQuestion(this.infoForm).then(res => {
        }).catch((error) => {
          console.log(error);
          alert(error)
        });
      }
    },
    components: {
//  使用编辑器
      quillEditor
    },
    created () {
      this.getSubject()
    }
  }
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

