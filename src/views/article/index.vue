<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content">
            <el-input v-model="search" placeholder="搜索">
              <el-button type="primary" icon="el-icon-search">{{list}}搜索</el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <router-link to="/articleCreate">
              <el-button type="primary" icon="el-icon-edit">我要发布</el-button>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content">
            <!-- <div style="float: left;width: 100%">
              <el-tag>推荐热帖</el-tag>
              <el-tag>最热帖子</el-tag>
              <el-tag>精华</el-tag>
            </div>-->
            <el-tabs v-model="activeName">
              <el-tab-pane label="最新热帖" name="first">
                <el-container
                  v-for="item in list"
                  v-bind:key="item"
                  style="border-bottom: 1px solid #dcdfe6"
                >
                  <el-aside style="width: 100px">
                    <div class="sub-title" style="padding-top:40px">
                      <a @click="getUser(item.userId)">
                        <el-avatar
                          :size="60"
                          shape="square"
                          :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                        ></el-avatar>
                      </a>
                    </div>
                  </el-aside>
                  <el-main style="width: 620px; height: 140px">
                    <el-row>
                      <h3 class="article-title">
                        <span
                          style="cursor: pointer"
                          @click="getArticleById(item.contentId)"
                        >{{item.title}}</span>
                        <!--  <el-tag v-for="f in (item.flag.split(','))" v-bind:key="f">{{f}}</el-tag>-->
                      </h3>
                    </el-row>
                    <el-row :gutter="20" class="article-info">
                      <el-col :span="5">
                        <div class="grid-content">作者： {{item.username}}</div>
                      </el-col>
                      <el-col :span="14">
                        <div class="grid-content">发布时间: {{item.createTime | filterTime }}</div>
                      </el-col>
                      <el-col :span="5">
                        <div v-if="item.type === 0">
                          <el-tag>{{item.knowledgeName}}</el-tag>
                        </div>
                        <div v-if="item.type === 1">
                          <el-tag type="success">{{item.topic}}</el-tag>
                        </div>
                      </el-col>
                    </el-row>
                  </el-main>
                  <el-aside style="width: 100px;padding-top: 24px">
                    <div class="grid-content">
                      <el-badge :value="item.comments" class="item">
                        <el-button size="small">评论</el-button>
                      </el-badge>
                      <el-badge :value="item.views" class="item" type="primary">
                        <el-button size="small">浏览</el-button>
                      </el-badge>
                    </div>
                  </el-aside>
                </el-container>
              </el-tab-pane>
              <el-tab-pane label="为你推荐" name="second">
                <el-container style="border-bottom: 1px solid #dcdfe6">
                  <el-aside style="width: 100px">
                    <div class="sub-title" style="padding-top:40px">
                      <a>
                        <el-avatar
                          :size="60"
                          shape="square"
                          :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                        ></el-avatar>
                      </a>
                    </div>
                  </el-aside>
                  <el-main style="width: 620px; height: 140px">
                    <el-row>
                      <h3 class="article-title">
                        <span style="cursor: pointer">亿级流量缓存架构学习（一）</span>
                      </h3>
                    </el-row>
                    <el-row :gutter="20" class="article-info">
                      <el-col :span="5">
                        <div class="grid-content">作者： 古时风筝</div>
                      </el-col>
                      <el-col :span="14">
                        <div class="grid-content">发布时间: 2020-05-30 03:11:42</div>
                      </el-col>
                      <el-col :span="5">
                        <div>
                          <el-tag>流量</el-tag>
                        </div>
                        <!-- <div v-if="item.type === 1">
                          <el-tag type="success">话题</el-tag>
                        </div>-->
                      </el-col>
                    </el-row>
                  </el-main>
                  <el-aside style="width: 100px;padding-top: 24px">
                    <div class="grid-content">
                      <el-badge :value="14" class="item">
                        <el-button size="small">评论</el-button>
                      </el-badge>
                      <el-badge :value="224" class="item" type="primary">
                        <el-button size="small">浏览</el-button>
                      </el-badge>
                    </div>
                  </el-aside>
                </el-container>
                <el-container style="border-bottom: 1px solid #dcdfe6">
                  <el-aside style="width: 100px">
                    <div class="sub-title" style="padding-top:40px">
                      <a>
                        <el-avatar
                          :size="60"
                          shape="square"
                          :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                        ></el-avatar>
                      </a>
                    </div>
                  </el-aside>
                  <el-main style="width: 620px; height: 140px">
                    <el-row>
                      <h3 class="article-title">
                        <span style="cursor: pointer">Spring Cloud Gateway 全局通用异常处理</span>
                      </h3>
                    </el-row>
                    <el-row :gutter="20" class="article-info">
                      <el-col :span="5">
                        <div class="grid-content">作者： 冷冷gg</div>
                      </el-col>
                      <el-col :span="14">
                        <div class="grid-content">发布时间: 2020-05-30 03:11:42</div>
                      </el-col>
                      <el-col :span="5">
                        <div>
                          <el-tag type="success">异常处理</el-tag>
                        </div>
                      </el-col>
                    </el-row>
                  </el-main>
                  <el-aside style="width: 100px;padding-top: 24px">
                    <div class="grid-content">
                      <el-badge :value="5" class="item">
                        <el-button size="small">评论</el-button>
                      </el-badge>
                      <el-badge :value="145" class="item" type="primary">
                        <el-button size="small">浏览</el-button>
                      </el-badge>
                    </div>
                  </el-aside>
                </el-container>
                <el-container style="border-bottom: 1px solid #dcdfe6">
                  <el-aside style="width: 100px">
                    <div class="sub-title" style="padding-top:40px">
                      <a>
                        <el-avatar
                          :size="60"
                          shape="square"
                          :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                        ></el-avatar>
                      </a>
                    </div>
                  </el-aside>
                  <el-main style="width: 620px; height: 140px">
                    <el-row>
                      <h3 class="article-title">
                        <span style="cursor: pointer">超详细！4小时开发一个SpringBoot+vue前后端分离博客项目！！</span>
                      </h3>
                    </el-row>
                    <el-row :gutter="20" class="article-info">
                      <el-col :span="5">
                        <div class="grid-content">作者： 享学源码</div>
                      </el-col>
                      <el-col :span="14">
                        <div class="grid-content">发布时间: 2020-05-30 03:11:42</div>
                      </el-col>
                      <el-col :span="5">
                        <div>
                          <el-tag>spring</el-tag>
                        </div>
                        <!-- <div v-if="item.type === 1">
                          <el-tag type="success">话题</el-tag>
                        </div>-->
                      </el-col>
                    </el-row>
                  </el-main>
                  <el-aside style="width: 100px;padding-top: 24px">
                    <div class="grid-content">
                      <el-badge :value="14" class="item">
                        <el-button size="small">评论</el-button>
                      </el-badge>
                      <el-badge :value="224" class="item" type="primary">
                        <el-button size="small">浏览</el-button>
                      </el-badge>
                    </div>
                  </el-aside>
                </el-container>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-container>
              <el-header>
                <h3>热门话题</h3>
                <div v-for="tag in tags" :key="tag" style="display:inline-block">
                  <tag class="tag">{{tag}}</tag>
                </div>
              </el-header>
              <el-main></el-main>
            </el-container>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      activeName: "first",
      tags: ["求职", "spring", "春招", "毕业", "实习", "大数据"],
      search: "",
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        row: 10
      }
    };
  },
  methods: {
    getHotArticle() {
      this.$api.getHotArticle(this.listQuery).then(response => {
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    getUser(uid) {
      this.$api
        .getUser({ userId: uid })
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    },
    getArticleById(contentId) {
      this.$router.push({
        path: "/articleDetail",
        query: {
          contentId: contentId
        }
      });
    },
    RandomColor() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    RandomColor2() {
      /* 随机颜色hsl */
      return (
        "hsl(" +
        Math.round(Math.random() * 360) +
        "," +
        Math.round(Math.random() * 100) +
        "%," +
        Math.round(Math.random() * 80) +
        "%)"
      );
    },
    random() {}
  },
  created() {
    // 自动加载indexs方法
    this.getHotArticle();
  }
};
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 20px;
}

.tag {
  border: solid #ccc 1px;
  border-radius: 10px;
  padding: 4px;
  margin-right: 10px;
  font-size: 14px;
  color: #999;
}

.article-title {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.article-info {
  color: #999;
  font-size: 14px;
}
</style>
