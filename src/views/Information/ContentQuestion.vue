<template>
  <div>
    <el-row class="warp">
      <h1>上传试题</h1>

      <!--
      Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http:// element.eleme.io/#/zh-CN/component/form
      -->
      <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm"  label-width="120px">
          <el-form-item label="试题标题" prop="title" style="margin: 50px 100px">
            <el-input v-model="infoForm.title"></el-input>
          </el-form-item>
          <!--使用编辑器
          -->
          <el-form-item label="问题内容"   style="height: 250px;margin : 50px 100px">
          <div class="edit_container">
            <quill-editor v-model="infoForm.content"
                          ref="myQuillEditor"
                          class="editer"
                          :options="editorOption" @ready="onEditorReady($event) "  style="height: 250px">
            </quill-editor>
          </div>
            <br>
        </el-form-item>
          <el-form-item label="分值" prop="score" style="margin: 60px 100px">
            <el-input v-model="infoForm.score"></el-input>
          </el-form-item>
          <el-form-item label="答案"   style="height: 250px;margin : 60px 100px">
            <div class="edit_container">
              <quill-editor v-model="infoForm.answer"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption" @ready="onEditorReady($event) "  style="height: 250px">
              </quill-editor>
            </div>
          </el-form-item>
          <br>
          <el-form-item label="解析"   style="height: 250px;margin : 60px 100px">
            <div class="edit_container">
              <quill-editor v-model="infoForm.analysis"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption" @ready="onEditorReady($event) "  style="height: 250px">
              </quill-editor>
            </div>
          </el-form-item>
          <br>
          <el-form-item label="科目"  style="margin: 50px 60px">
            <el-cascader :options="subjectOptions" v-model="sort" clearable></el-cascader>
          </el-form-item>
          <el-form-item label="难易程度" style="margin: 30px 60px">
            <el-rate v-model="infoForm.degree"></el-rate>
          </el-form-item>
          <el-form-item style="margin: 100px 100px; " label="添加知识点" >
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
    name: 'ContentQuestion',
    data () {
      return {
        dynamicKnowledges: ['Java', '标签二', '标签三'],
        inputVisible: false,
        inputValue: '',
        subjectOptions: '',
        infoForm: {
          title: '',
          content: '',
          uid: this.$store.state.user.userId,
          sort: [],
          subject: '',
          direction: '',
          knowledge: '',
          answer: '',
          score: '',
          analysis: '',
          degree: 0,
          type: 0
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
      handleClose (tag) {
        this.dynamicKnowledges.splice(this.dynamicKnowledges.indexOf(tag), 1);
      },

      showInput () {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
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
      onSubmit () {
        // 提交
        this.infoForm.knowledge = this.dynamicKnowledges.join()
        this.infoForm.direction = this.sort[0]
        this.infoForm.subject = this.sort[1]
        this.$api.createQuestion(this.infoForm).then(res => {
        }).catch((error) => {
          console.log(error);
          alert(error)
        });
      }
    },
    components: {quillEditor},
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
