<template>
  <div>
    <el-row>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-menu-item index="/main">首页</el-menu-item>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-menu-item index="/course">课程</el-menu-item>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-menu-item index="/informationIndex">题库</el-menu-item>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-menu-item index="/luntan">论坛</el-menu-item>
          </div>
        </el-col>
        <!--        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-menu-item index="/studyIndex">学习</el-menu-item>
          </div>
        </el-col>-->
        <el-col :span="3">
          <el-input size="mini" v-model="content" style="width:150px;line-height:60px;"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button
            style="margin-top:15px;"
            type="primary"
            size="mini"
            icon="el-icon-search"
            @click="search"
          >搜索</el-button>
        </el-col>

        <el-col :span="2" :offset="5">
          <div class="grid-content bg-purple">
            <el-menu-item index="/messageIndex">
              <el-badge style="height:30px;line-height:30px" :value="12">消息中心</el-badge>
            </el-menu-item>
          </div>
        </el-col>
        <el-col :span="2">
          <template v-if="user.username!=null">
            <el-menu-item index="userIndex">{{user.username}}</el-menu-item>
          </template>
          <template v-if="user.username==null">
            <el-menu-item index="/login">请先登录</el-menu-item>
          </template>
        </el-col>
        <el-col :span="2">
          <el-menu-item index="logout">退出</el-menu-item>
        </el-col>
      </el-menu>
    </el-row>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      user: this.$store.state.user,
      roles: this.$store.state.roles,
      activeIndex: "/main",
      content: ""
    };
  },
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    search() {
      this.$router.push({
        path: "/search",
        query: {
          content: this.content
        }
      });
    },
    handleSelect(key, keyPath) {
      if (key === "logout") {
        this.logout();
      } else {
        this.$router.push(key);
      }
    },
    logout() {
      alert("退出成功");
      this.$store.commit("logout");
      this.$router.push("/login");
    },
    indexs() {
      this.$router.push("/main");
    }
  },
  created() {
    // 自动加载indexs方法
    this.indexs();
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
