<template>
  <el-container>
    <el-header height="250px">
      <el-container>
    <el-aside width="300px">Aside</el-aside>
    <el-main><div class="block">
      <el-carousel height="250px"  >
        <el-carousel-item v-for="item in imageList" :key="item" :style="{backgroundImage: 'url(' + item.url + ')', backgroundSize:'cover'}">
          <a href="#" ><h3 style="color: white">{{ item.info }}</h3></a>
        </el-carousel-item>
      </el-carousel>
    </div>
    </el-main>
      </el-container>
    </el-header>
    <el-main>
      <el-container>
        <el-header><h1 style="float: left">热门课程</h1></el-header>
        <el-main><el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple"> <el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            2019版 微服务时代Spring Boot企业微信点餐系统 </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"><el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            2019版 微服务时代Spring Boot企业微信点餐系统 </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"><el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            2019版 微服务时代Spring Boot企业微信点餐系统 </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"><el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            2019版 微服务时代Spring Boot企业微信点餐系统 </div></el-col>
        </el-row>
        </el-main>
      </el-container>
      <el-container>
        <el-header><h1 style="float: left">热门真题</h1></el-header>
        <el-main><el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple"> <el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            2019版 微服务时代Spring Boot企业微信点餐系统 </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"><el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            2019版 微服务时代Spring Boot企业微信点餐系统 </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"><el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            2019版 微服务时代Spring Boot企业微信点餐系统 </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"><el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            2019版 微服务时代Spring Boot企业微信点餐系统 </div></el-col>
        </el-row>
        </el-main>
      </el-container>
      <el-container>
        <el-header><h1 style="float: left">热门讨论</h1></el-header>
        <el-main><el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple"> <el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            2019版 微服务时代Spring Boot企业微信点餐系统 </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"><el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            2019版 微服务时代Spring Boot企业微信点餐系统 </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"><el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            2019版 微服务时代Spring Boot企业微信点餐系统 </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"><el-image :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-image>
            2019版 微服务时代Spring Boot企业微信点餐系统 </div></el-col>
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
    }
  },
  created () {
    this.getImageList()
  },
  methods: {
    getImageList () {
      this.$api.getImage(this.listQuery).then(response => {
        this.imageList = response.data.list
      })
    }
  }
}
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
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
