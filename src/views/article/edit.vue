<template>
  <div>
    <el-row class="warp">
      <h1>修改文章</h1>
      <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm"  label-width="120px">
          是否开启评论  <el-switch
          v-model="infoForm.comment"
          value="infoForm.comment"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
          <el-form-item label="标题" prop="title" style="margin: 50px 100px">
            <el-input v-model="infoForm.title"  vaule="infoForm.title"></el-input>
          </el-form-item>
          <!--使用编辑器
          -->
          <el-form-item label="详细"   style="height: 250px;margin : 50px 100px">
            <div class="edit_container">
              <quill-editor v-model="infoForm.content"
                            ref="myQuillEditor"
                            vaule="infoForm.content"
                            class="editer"
                            :options="editorOption" @ready="onEditorReady($event) "  style="height: 250px">
              </quill-editor>
            </div>
          </el-form-item>
          <el-form-item style="margin: 100px 100px; " label="添加标签" >
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
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
            <el-button type="primary" @click="onDraft">存为草稿</el-button>
            <el-button type="primary" @click="onSubmit">确认发布</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import { quillEditor } from 'vue-quill-editor' // 调用编辑器
    export default {
        name: 'edit',
        components: {quillEditor},
        data () {
            return {
              dynamicTags: [],
              inputVisible: false,
              inputValue: '',
              infoForm: {
                contentId: '',
                title: '',
                content: '',
                userId: this.$store.state.user.userId,
                flag: '',
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
      created () {
        this.getParams()
        this.getArticleById(this.contentId);
      },
      methods: {
        getArticleById (contentId) {
          this.$api.getArticleById({contentId: contentId})
            .then(response => {
              this.infoForm.title = response.data.title
              this.infoForm.content = response.data.content
              this.infoForm.status = response.data.status
              this.infoForm.contentId = response.data.contentId
              // eslint-disable-next-line no-undef
              this.infoForm.comment = response.data.comment
              this.dynamicTags = response.data.flag.split(',')
            }).catch((error) => {
            console.log(error);
          });
        },
        showInput () {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },
        getParams () {
          // 取到路由带过来的参数
          this.contentId = this.$route.query.contentId
        },
        handleClose (tag) {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        handleInputConfirm () {
          let inputValue = this.inputValue;
          if (inputValue) {
            this.dynamicTags.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
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
      }
    }
</script>
<style lang="postcss" scoped>
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
