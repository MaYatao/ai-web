<template>
  <el-container>
      <!--在视频外面加一个容器-->
      <el-row>
        <h1>学习页面</h1>
        <div class='demo'>
          <video-player class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions">
          </video-player>
        </div>
      </el-row>
    <br>
    <br>
      <el-row>
      <el-button :type="type" icon="el-icon-star-on" @click="addCollection()"> 收藏</el-button>
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
    <el-footer>
      <el-row v-for="commentResult in comments" v-bind:key="commentResult">
        <el-col :span="4">
          <div>
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
          <el-button type="success" @click="showReply((commentResult.fuserId),(commentResult.comment.commentId))"> 回复
          </el-button>
          <el-button type="success"> 点赞</el-button>
        </el-col>
        <el-col>
          <el-row :gutter="18" style="background-color: lavender" v-for="reply in (commentResult.commentResults)"
                  v-bind:key="reply">
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
    name: 'CourseDetail',
    components: {
      quillEditor
    },
    data () {
      return {
        infoForm: {
          courseId: '',
          title: '',
          description: '',
          basics: '',
          goal: '',
          knowledges: '',
          url: '',
          source: '',
          imageUrl: '',
          uploadTime: '',
          userId: '',
          direction: '',
          degree: '',
          subject: ''
        },
        isShow: false,
        courseId: '',
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
        type: 'success',
        playerOptions: {
          // 播放速度
          playbackRates: [0.5, 1.0, 1.5, 2.0],
          // 如果true,浏览器准备好时开始回放。
          autoplay: false,
          // 默认情况下将会消除任何音频。
          muted: false,
          // 导致视频一结束就重新开始。
          loop: false,
          // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          preload: 'auto',
          language: 'zh-CN',
          // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          aspectRatio: '16:9',
          // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          fluid: true,
          sources: [{
            // 类型
            type: 'video/mp4',
            // url地址
            src: ''
          }],
          // 你的封面地址
          poster: '',
          // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            // 全屏按钮
            fullscreenToggle: true
          }
        }
      }
    },
    created () {
      this.getParams()
      this.getCourseById()
      this.getComment()
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数
        this.courseId = this.$route.query.courseId
      },
      getCourseById () {
        this.$api.getCourseById({'courseId': this.courseId})
          .then(response => {
            this.infoForm = response.data
            this.playerOptions.sources[0].src = this.infoForm.url
          }).catch((error) => {
          console.log(error);
        });
      },
      getComment () {
        this.$api.getCommentByCourseId({'courseId': this.courseId}).then(response => {
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
          'courseId': this.courseId,
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
          'courseId': this.courseId,
          'fromUser': this.$store.state.user.userId,
          'toUser': this.replyId
        }).then(response => {
          this.replyText = ''
          this.replyId = ''
          this.getComment()
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
</script>
<style>
  .demo{
    display: inline-block;
    width: 600px;
    height: 338px;
    text-align: center;
    line-height: 100px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

</style>
