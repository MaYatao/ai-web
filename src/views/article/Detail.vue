<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="4">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="50"
                         :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-avatar>
            </div>
          </div>
          {{data.username}}
        </el-col>
        <el-col :span="10">
          <div>
            <h3>{{data.title}}
            <!--  <el-tag v-for="f in (data.flag.split(','))" v-bind:key=f v-bind:value=f>{{f}}</el-tag>-->
            </h3>
          </div>
        </el-col>
<!--        <el-col :span="9">
          <div class="grid-content bg-purple">
            <el-button type="success">已关注</el-button>
          </div>
        </el-col>-->
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <h2></h2>
        <p class="ql-editor" v-html="content"></p>
      </el-row>
      <el-row>
        <el-tag>发布时间：{{data.contentTime | filterTime}}</el-tag>
        <el-tag> 浏览量{{data.views}}</el-tag>
        <el-tag>点赞数:{{data.agree}}</el-tag>
        <el-button :type="type" icon="el-icon-star-on"  @click="addCollection()"> 收藏</el-button>
        <el-button type="success" @click="showToggle" icon="el-icon-chat-dot-round"> 评论</el-button>

      </el-row>
      <el-row :gutter="20" v-show="isShow">
        <el-col :span="16">
          <div class="edit_container">
            <quill-editor v-model="commentText"
                          ref="myQuillEditor"
                          class="editer"
                          :options="editorOption" @ready="onEditorReady($event) " style="height: 100px">
            </quill-editor>
          </div>
        </el-col>
        <el-col :span="8">
          <el-button type="success" @click="saveComment"> 确定</el-button>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-row v-for="commentResult in comments" v-bind:key="commentResult">
        <el-col :span="4">
          <div class="demo-basic--circle">
            <div class="block">
            </div>
          </div>
          <a @click="getUser(commentResult.fuserId)">{{commentResult.fusername}}
            <el-avatar :size="50"
                       :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-avatar>
          </a></el-col>
        <el-col :span="10" v-html="commentResult.comment.content"></el-col>
        <el-col :span="9">
          <el-tag>发布时间：{{commentResult.comment.commentTime | filterTime}}</el-tag>
          <el-tag>点赞数:{{commentResult.comment.agree}}</el-tag>
          <el-button type="success" @click="showReply((commentResult.fuserId),(commentResult.comment.commentId))"> 回复</el-button>
          <el-button type="success"> 点赞</el-button>
        </el-col>
        <el-col>
        <el-row :gutter="18" style="background-color: lavender" v-for="reply in (commentResult.commentResults)" v-bind:key="reply">
          <el-col :span="3">
            <a @click="getUser(reply.fuserId)">{{reply.fusername}}</a>@
            <a @click="getUser(reply.tuserId)">{{reply.tusername}}</a>
          </el-col>
          <el-col :span="10" v-html="reply.comment.content"></el-col>
          <el-col :span="5">
            <el-tag>发布时间：{{reply.comment.commentTime | filterTime}}</el-tag>
            <el-tag>点赞数:{{reply.comment.agree}}</el-tag>
            <el-button type="success" @click="showReply((reply.fuserId), (reply.comment.parentId))">回复</el-button>
            <el-button type="success"> 点赞</el-button>
          </el-col>
        </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="isReply">
        <el-col :span="16">
          <div class="edit_container">
            <quill-editor v-model="replyText"
                          ref="myQuillEditor"
                          class="editer"
                          :options="editorOption" @ready="onEditorReady($event) " style="height: 50px">
            </quill-editor>
          </div>
        </el-col>
        <el-col :span="8">
          <el-button type="success" @click="replyComment"> 确定</el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>

</template>

<script>
  import {quillEditor} from 'vue-quill-editor';

  export default {
    name: 'Detail',
  components: {
    quillEditor
  },
    data: function () {
      return {
        isShow: false,
        contentId: '',
        content: '',
        data: {},
        editorOption: {
          placeholder: ''
        },
        commentText: '',
        parentId: '',
        isReply: false,
        replyText: '', // 回复内容
        replyId: '', // 所回复者Id
        comments: {},
        type: 'success'
      }
    },
    created () {
      this.getParams()
      this.getArticleById(this.contentId);
      this.getComment()
      this.addViews();
    },
    methods: {
      getArticleById (contentId) {
        this.$api.getArticleById({'contentId': contentId})
          .then(response => {
            this.data = response.data
            this.content = response.data.content
          }).catch((error) => {
          console.log(error);
        });
      },
      getParams () {
        // 取到路由带过来的参数
        this.contentId = this.$route.query.contentId
      },
      addViews () {
        this.$api.addViews({
          'contentId': this.contentId,
          'fromUser': this.$store.state.user.userId,
          'toUser': this.data.userId
        }).then(response => {
          this.data.views = this.data.views + 1
        }).catch((error) => {
          console.log(error)
        })
      },
      getComment () {
        this.$api.getCommentByContentId({'contentId': this.contentId}).then(response => {
          this.comments = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      showToggle () {
        this.isShow = !this.isShow
      },
      // 保存评论
      saveComment () {
        this.isShow = !this.isShow
        this.$api.addComment({
          'content': this.commentText,
          'parentId': null,
          'contentId': this.contentId,
          'fromUser': this.$store.state.user.userId,
          'toUser': this.data.userId
        }).then(response => {
          this.commentText = ''
          this.getComment()
        }).catch((error) => {
          console.log(error);
        });
      },
      showReply (toId, pId) {
        this.isReply = !this.isReply
        this.replyId = toId
        this.parentId = pId
      },
      // 保存评论
      replyComment () {
        this.isReply = !this.isReply
        this.$api.addComment({
          'content': this.replyText,
          'parentId': this.parentId,
          'contentId': this.contentId,
          'fromUser': this.$store.state.user.userId,
          'toUser': this.replyId
        }).then(response => {
          this.replyText = ''
          this.replyId = ''
          this.getComment()
        }).catch((error) => {
          console.log(error);
        });
      },
      addCollection () {
        this.$api.addCollection({
          'contentId': this.contentId,
          'fromUser': this.$store.state.user.userId,
          'toUser': this.data.userId
        }).then(response => {
          this.type = 'info'
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
