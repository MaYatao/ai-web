<template>
  <el-container>
    <el-header :style="{backgroundImage: 'url(' + infoForm.imageUrl + ')', backgroundSize:'cover'}">
      <el-row style="color: white ">
        <el-col :span="8">
          <h3>{{infoForm.title}}
            <el-tag v-for="f in (infoForm.knowledges.split(','))" v-bind:key=f v-bind:value=f>{{f}}</el-tag>
          </h3>
        </el-col>
        <el-col :span="12">
          <el-button type="primary">收藏</el-button>
          <router-link :to="{path:'/courseDetail',query:{'courseId':infoForm.courseId}}">
            <el-button type="success">开始学习</el-button>
          </router-link>
        </el-col>
      </el-row>
      <el-row style="color: white">
        <el-col :span="8">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="50"
                         :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"> 涛哥
              </el-avatar>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          难度:
          <el-rate disabled v-model="infoForm.degree"></el-rate>
          <el-tag> 时长 9小时18分</el-tag>
          <el-tag>学习人数 1084889</el-tag>
          <el-tag> 综合评分9.50</el-tag>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-container style="margin: 50px">
        <br><br>
        <el-header>
          课程简介： {{infoForm.description}}
          课程基础： {{infoForm.basics}}
          课程目标：{{infoForm.goal}}
        </el-header>
        <el-main>
          资料下载：{{infoForm.source}}
        </el-main>
      </el-container>
    </el-main>
    <el-footer style="margin: 50px">
      <h3>精选评论</h3>
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
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor';

  export default {
    name: 'CourseBody',
    components: {quillEditor},
    data () {
      return {
        commentText: '',
        activeName: 'first',
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
        comments: {}
      };
    },
    created () {
      this.getParams()
      this.getCourseById()
      this.getComment()
    },
    methods: {
      getParams () {
        var courseId = this.$route.query.courseId
        this.infoForm.courseId = courseId
      },
      getCourseById () {
        this.$api.getCourseById({'courseId': this.infoForm.courseId})
          .then(response => {
            this.infoForm = response.data
          }).catch((error) => {
          console.log(error);
        });
      },
      getComment () {
        this.$api.getCommentByCourseId({'courserId': 2}).then(response => {
          this.comments = response.data
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
</style>
