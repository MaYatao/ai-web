<template>
  <el-container>
    <el-menu mode="horizontal" background-color="#545c64" text-color="#fff">
      <el-col :span="4">
        <div class="grid-content">
          <el-menu-item>课程详情</el-menu-item>
        </div>
      </el-col>
    </el-menu>
    <el-main style="display:flex; justify-content: center">
      <div class="left" style="width: 400px; margin-right: 50px">
        <img
          style="width: 390px; border-radius: 10px; padding: 4px; border: 1px solid #ccc"
          :src="infoForm.imageUrl"
        />
        <h1>{{infoForm.title}}</h1>
        <div style="margin-bottom: 16px">
          <div style="display:flex; justify-content:center; padding-bottom: 16px">
            <span style="font-size: 14px; margin-right: 16px; color: #777">难度:</span>
            <el-rate disabled v-model="infoForm.degree"></el-rate>
          </div>
          <el-tag>时长 9小时18分</el-tag>
          <el-tag>学习人数 1084889</el-tag>
          <el-tag>综合评分 9.50</el-tag>
        </div>
        <div>
          <el-tag>{{infoForm.knowledge1}}</el-tag>
          <el-tag>{{infoForm.knowledge2}}</el-tag>
          <el-tag>{{infoForm.knowledge3}}</el-tag>
        </div>
      </div>
      <div class="right" style="width: 400px">
        <div style="margin-bottom: 40px">
          <el-button type="primary">收藏</el-button>
          <router-link :to="{path:'/courseDetail',query:{'courseId':infoForm.courseId}}">
            <el-button type="success">开始学习</el-button>
          </router-link>
        </div>
        <h4>
          课程作者：
          <span style="font-weight:normal">涛哥</span>
        </h4>
        <h4>课程简介：</h4>
        {{infoForm.description}}
        <h4>
          课程基础：
          <span style="font-weight:normal">{{infoForm.basics}}</span>
        </h4>
        <h4>
          课程目标：
          <span style="font-weight:normal">{{infoForm.goal}}</span>
        </h4>
      </div>
    </el-main>
    <el-footer style="margin: 50px">
      <h3>精选评论</h3>
      <el-row v-for="commentResult in comments" v-bind:key="commentResult">
        <el-col :span="4">
          <div class="demo-basic--circle">
            <div class="block"></div>
          </div>
          <a @click="getUser(commentResult.fuserId)">
            {{commentResult.fusername}}
            <el-avatar
              :size="50"
              :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
            ></el-avatar>
          </a>
        </el-col>
        <el-col :span="10" v-html="commentResult.comment.content"></el-col>
        <el-col :span="9">
          <el-tag>发布时间：{{commentResult.comment.commentTime | filterTime}}</el-tag>
          <el-tag>点赞数:{{commentResult.comment.agree}}</el-tag>
        </el-col>
        <el-col>
          <el-row
            :gutter="18"
            style="background-color: lavender"
            v-for="reply in (commentResult.commentResults)"
            v-bind:key="reply"
          >
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
import { quillEditor } from "vue-quill-editor";

//:style="{backgroundImage: 'url(' + infoForm.imageUrl + ')', backgroundSize:'cover'}"

export default {
  name: "CourseBody",
  components: { quillEditor },
  data() {
    return {
      commentText: "",
      activeName: "first",
      infoForm: {
        courseId: 3,
        title: "Java入门第一季",
        description:
          "本教程为Java入门第一季，欢迎来到精彩的Java编程世界！Java语言已经成为当前软件开发行业中主流的开发语言。本教程将介绍Java环境搭建、工具使用、基础语法。带领大家一步一步的踏入Java达人殿堂！Let’s go!",
        basics: "0基础",
        goal: "学习大神",
        url:
          "http://192.168.183.130/group1/M00/00/00/wKi3gl7JK6-ANYLmAABUA67-KI8345.mp4",
        imageUrl:
          "http://192.168.183.130/group1/M00/00/00/wKi3gl7JK7uAMjf9AACJTjs7_vA018.jpg",
        createTime: "2020-05-23 21:57:23",
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
  created() {
    this.getParams();
    this.getCourseById();
    this.getComment();
  },
  methods: {
    getParams() {
      var courseId = this.$route.query.courseId;
      this.infoForm.courseId = courseId;
    },
    getCourseById() {
      this.$api
        .getCourseById({ courseId: this.infoForm.courseId })
        .then(response => {
          this.infoForm = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getComment() {
      this.$api
        .getCommentByCourseId({ courserId: 2 })
        .then(response => {
          this.comments = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>
