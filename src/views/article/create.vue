<template>
  <div>
    <el-row class="warp">
      <h1>发布/修改文章</h1>

      <!--
      Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http:// element.eleme.io/#/zh-CN/component/form
      -->
      <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm" label-width="120px">
          是否开启评论
          <el-switch v-model="infoForm.comment" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          <el-form-item label="标题" prop="title" style="margin: 50px 100px">
            <el-input v-model="infoForm.title"></el-input>
          </el-form-item>
          <!--使用编辑器
          -->
          <el-form-item label="详细" style="height: 350px;margin : 50px 100px">
            <div class="edit_container">
              <quill-editor
                v-model="infoForm.content"
                ref="myQuillEditor"
                class="editer"
                :options="editorOption"
                @ready="onEditorReady($event) "
                style="height: 250px"
              ></quill-editor>
            </div>
          </el-form-item>
          <el-form-item label="科目" style="margin: 10px 60px">
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
          <el-form-item style="margin: 100px 100px">
            <el-button type="primary" @click="onSubmit(1)">存为草稿</el-button>
            <el-button type="primary" @click="onSubmit(0)">确认发布</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'; // 调用编辑器
export default {
  data () {
    return {
      subjectOptions: [],
      sort: [],
      knowledges: [],
      knowledgeOptions: [],
      infoForm: {
        // 0：学习，1：话题
        type: 0,
        title: '',
        content: '',
        userId: this.$store.state.user.userId,
        // 话题
        topic: '',
        status: 0,
        comment: true
      }
    };
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted () {
    this.getSubject();
  },
  methods: {
    getSubject () {
      this.$api
        .getSubjects()
        .then(res => {
          this.subjectOptions = res.data;
        })
        .catch(error => {
          console.log(error);
          alert(error);
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
    onEditorReady (editor) {},
    onSubmit (status) {
      // 提交
      this.infoForm.status = status;
      this.infoForm.knowledge1 = this.knowledges[0];
      this.infoForm.knowledge2 = this.knowledges[1];
      this.infoForm.knowledge3 = this.knowledges[2];
      this.infoForm.direction = this.sort[0]
      this.infoForm.subject = this.sort[1]
      this.$api
        .createArticle(this.infoForm)
        .then(res => {
          this.$router.push('/luntan');
        })
        .catch(error => {
          console.log(error);
          alert(error);
        });
    }
  },
  components: {
    //  使用编辑器
    quillEditor
  }
};
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
