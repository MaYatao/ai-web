<template>
  <div>
    <el-row class="warp">
      <h1>发布/修改文章</h1>

      <!--
      Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http:// element.eleme.io/#/zh-CN/component/form
      -->
      <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm"  label-width="120px">
        是否开启评论  <el-switch
            v-model="infoForm.comment"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <el-form-item label="标题" prop="title" style="margin: 50px 100px">
            <el-input v-model="infoForm.title"></el-input>
          </el-form-item>
          <!--使用编辑器
          -->
          <el-form-item label="详细"   style="height: 250px;margin : 50px 100px">
            <div class="edit_container">
              <quill-editor v-model="infoForm.content"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption" @ready="onEditorReady($event) "  style="height: 250px">
              </quill-editor>
            </div>
          </el-form-item>
          <el-form-item label="科目"  style="margin: 10px 60px">
            <el-cascader :options="options" v-model="subjectId" clearable></el-cascader>
          </el-form-item>
          <el-form-item style="margin: 100px 100px; " >
            <el-button class="button-new-tag" size="small" @click="showInput">添加知识点</el-button>
          </el-form-item>
          <el-form-item style="margin: 100px 100px" >
            <el-button type="primary" @click="onDraft">存为草稿</el-button>
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
    data () {
      return {
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        subjectId: '',
        knowledges: [],
        options: [],
        infoForm: {
          title: '',
          content: '',
          userId: this.$store.state.user.userId,
          topic: '',
          status: 0,
          comment: true
        }
      }
    },
    computed: {
      editor () {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted () {
      this.getSubject()
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
      handleClose (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput () {
        this.$api.getKnowledgesBySId({'subjectId': this.subjectId[1]}).then(res => {
         this.knowledges = res.data
          this.dynamicTags = res.data
        }).catch((error) => {
          console.log(error);
          alert(error)
        });
      },
      onEditorReady (editor) {
      },
      onSubmit () {
        // 提交
        this.infoForm.flag = this.dynamicTags.join()
        this.infoForm.status = 0
        this.$api.createArticle(this.infoForm).then(res => {
                this.$router.push('/luntan');
            }).catch((error) => {
              console.log(error);
              alert(error)
            });
          },
      onDraft () {
        // 提交
        this.infoForm.flag = this.dynamicTags.join()
        this.infoForm.status = 1
        this.$api.createArticle(this.infoForm).then(res => {
          this.$router.push('/luntan');
        }).catch((error) => {
          console.log(error);
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
