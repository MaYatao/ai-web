<template>
  <el-container>
    <el-header height="260px">
      <el-container class="carousel-area">
        <el-aside style="overflow:visible;width:240px">
          <el-menu
            style="border:none"
            background-color="#2b333b"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <a href="#" target="_blank">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span>前沿 / 区块链 / 人工智能</span>
              </el-menu-item>
            </a>
            <a href="#" target="_blank">
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span>前端 / 小程序 / JS</span>
              </el-menu-item>
            </a>
            <a href="#" target="_blank">
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">后端 / JAVA / Python</span>
              </el-menu-item>
            </a>
            <a href="#" target="_blank">
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">移动 / Android / IOS</span>
              </el-menu-item>
            </a>
            <a href="#" target="_blank">
              <el-menu-item index="5">
                <i class="el-icon-setting"></i>
                <span slot="title">运维 / 测试 / 数据库</span>
              </el-menu-item>
            </a>
          </el-menu>
        </el-aside>
        <el-main style="padding:0">
          <el-carousel height="280px">
            <el-carousel-item
              v-for="item in imageList"
              :key="item"
              :style="{backgroundImage: 'url(' + item.url + ')', backgroundSize:'cover'}"
            >
              <a href="#">
                <h3 style="color: white">{{ item.info }}</h3>
              </a>
            </el-carousel-item>
          </el-carousel>
        </el-main>
      </el-container>
    </el-header>
    <el-main style="width: 90%;margin: 16px auto 0">
      <el-container>
        <el-header>
          <h1 style="float: left;">热门课程</h1>
        </el-header>
        <el-main style="padding-top: 0">
          <el-row :gutter="32">
            <el-col :span="6">
              <div class="grid-content">
                <el-image
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                ></el-image>2019版 微服务时代Spring Boot企业微信点餐系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-image
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                ></el-image>2019版 微服务时代Spring Boot企业微信点餐系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-image
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                ></el-image>2019版 微服务时代Spring Boot企业微信点餐系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-image
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                ></el-image>2019版 微服务时代Spring Boot企业微信点餐系统
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-container>
        <el-header>
          <h1 style="float: left">热门真题</h1>
        </el-header>
        <el-main style="padding-top: 0">
          <el-row :gutter="32">
            <el-col :span="6">
              <div class="grid-content">
                <el-image
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                ></el-image>2019版 微服务时代Spring Boot企业微信点餐系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-image
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                ></el-image>2019版 微服务时代Spring Boot企业微信点餐系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-image
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                ></el-image>2019版 微服务时代Spring Boot企业微信点餐系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-image
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                ></el-image>2019版 微服务时代Spring Boot企业微信点餐系统
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-container>
        <el-header>
          <h1 style="float: left">热门讨论</h1>
        </el-header>
        <el-main style="padding-top: 0">
          <el-row :gutter="32">
            <el-col :span="6">
              <div class="grid-content">
                <el-image
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                ></el-image>2019版 微服务时代Spring Boot企业微信点餐系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-image
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                ></el-image>2019版 微服务时代Spring Boot企业微信点餐系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-image
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                ></el-image>2019版 微服务时代Spring Boot企业微信点餐系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-image
                  :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
                ></el-image>2019版 微服务时代Spring Boot企业微信点餐系统
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      imageList: null,
      listQuery: {
        page: 1,
        row: 10
      }
    };
  },
  created () {
    this.getImageList();
  },
  methods: {
    getImageList () {
      this.$api.getImage(this.listQuery).then(response => {
        this.imageList = response.data.list;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.carousel-area {
  width: 80%;
  margin: 0 auto;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 12px 24px 0 rgba(7, 17, 27, 0.2);
}

.grid-content {
  font-size: 16px;
  font-weight: bold;
  color:#07111B;
}

.grid-content .el-image{
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 8px;
}
</style>
