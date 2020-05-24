<template>
  <el-container>
    <el-header :style="{backgroundImage: 'url(' + infoForm.imageUrl + ')', backgroundSize:'cover'}">
      <el-row style="color: white ">
        <el-col :span="8">
          <h1>{{infoForm.title}}
            <el-tag >{{infoForm.knowledge1}}</el-tag>
            <el-tag >{{infoForm.knowledge2}}</el-tag>
            <el-tag >{{infoForm.knowledge3}}</el-tag>
          </h1>
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
         <h1> 课程简介：</h1> {{infoForm.description}}
          <h1>课程基础</h1>： {{infoForm.basics}}
          <h1>课程目标：</h1>{{infoForm.goal}}
        </el-header>
        <el-main>
        <a >   资料下载</a>
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
          courseId: 3,
          title: 'Java入门第一季',
          description: '本教程为Java入门第一季，欢迎来到精彩的Java编程世界！Java语言已经成为当前软件开发行业中主流的开发语言。本教程将介绍Java环境搭建、工具使用、基础语法。带领大家一步一步的踏入Java达人殿堂！Let’s go!',
          basics: '0基础',
          goal: '学习大神',
          url: 'http://192.168.183.130/group1/M00/00/00/wKi3gl7JK6-ANYLmAABUA67-KI8345.mp4',
          imageUrl: 'http://192.168.183.130/group1/M00/00/00/wKi3gl7JK7uAMjf9AACJTjs7_vA018.jpg',
          createTime: '2020-05-23 21:57:23',
          userId: 1,
          username: null,
          direction: 2,
          degree: 3,
          subject: 27,
          knowledge1: 1,
          knowledge3: 3,
          knowledge2: 2
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
