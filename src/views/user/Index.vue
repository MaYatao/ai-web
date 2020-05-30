<template>
  <el-row style="margin-top: -20px">
    <el-col :span="4">
      <el-menu
        class="info-sub-menu"
        default-active="this.$route.path"
        :unique-opened="true"
        :router="true"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>学习信息</span>
          </template>
          <el-menu-item index="/studyIndex">我的学习</el-menu-item>
         <!-- <el-menu-item index="/map">学习推荐</el-menu-item>-->
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/userInfo">我的信息</el-menu-item>
            <el-menu-item index="/editUser">修改信息</el-menu-item>
            <el-menu-item index="/userList">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>课程信息</span>
          </template>
          <el-menu-item-group>
<!--            <el-menu-item index="/myCourse">我的创建的课程</el-menu-item>-->
            <el-menu-item index="/createCourse">创建课程</el-menu-item>
            <el-menu-item index="/courseStatistics">我的课程</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>题库管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="createTest">创建试卷</el-menu-item>
<!--
            <el-menu-item index="myQuestions">我的创建的试题</el-menu-item>
-->
            <el-menu-item index="myQuestions1">我的试题</el-menu-item>
            <el-menu-item index="myTests">我的试卷</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="4-4">
            <template slot="title">上传试题</template>
            <!--<el-menu-item index="/contentQuestion">内容题</el-menu-item>-->
            <el-menu-item index="/choiceQuestion">单选题</el-menu-item>
            <el-menu-item index="/choicesQuestion">多选题</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>论坛管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/articleList">
              <router-link to="/articleList" tag="span" class="span">我的帖子</router-link>
            </el-menu-item>
            <el-menu-item index="/articleCreate">发布帖子</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>网站管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/image">幻灯片管理</el-menu-item>
            <el-menu-item index="/announce">公告管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="20" style="padding-top: 20px">
      <div class="content">
        <router-view ></router-view>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {};
    },
    created () {
      this.index()
    },
    methods: {
      index () {
        this.$router.push({path: '/studyIndex'})
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
