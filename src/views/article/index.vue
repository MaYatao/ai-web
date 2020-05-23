<template >
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content bg-purple">
          <el-input v-model="search" placeholder="搜索"><el-button type="primary" icon="el-icon-search">{{list}}搜索</el-button></el-input></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"><router-link to='/articleCreate'><el-button type="primary" icon="el-icon-edit">我要发布</el-button></router-link></div></el-col>
      </el-row>
      </el-header>
    <el-main>
      <el-row :gutter="20">
      <el-col :span="16"><div class="grid-content bg-purple">
        <div style="float: left;width: 100%">
          <el-tag>最新发表</el-tag>
          <el-tag >最热帖子</el-tag>
          <el-tag >精华</el-tag>
        </div>
        <div style="float: left;margin-top: 10px">
          <el-container  v-for="item in list"  v-bind:key="item" >
            <el-aside width="100px"><div class="sub-title">
              <div class="demo-basic--circle">
                <div class="block">
                  <a  @click="getUser(item.userId)">
                  <el-avatar :size="100" :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-avatar>
                  </a>
                </div>
              </div>
            </div></el-aside>
            <el-main >
              <el-row>
                <el-col :span="24" style="width: 700px">
                  <div style="float: left"><h3><a  @click="getArticleById(item.contentId)" >{{item.title}} </a>
                  <!--  <el-tag v-for="f in (item.flag.split(','))" v-bind:key="f">{{f}}</el-tag>-->
                  </h3>
                  </div></el-col>
              </el-row>
              <el-row :gutter="20" style="width: 700px">
                <el-col :span="5"><div class="grid-content bg-purple">{{item.username}}</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">{{item.createTime | filterTime }}</div></el-col>
                <el-col :span="14"><div class="grid-content bg-purple">
                  <el-badge :value="item.comments" class="item">
                  <el-button size="small">评论</el-button>
                </el-badge>
                  <el-badge :value=item.views class="item" type="primary">
                    <el-button size="small">浏览</el-button>
                  </el-badge>
                </div></el-col>
              </el-row>
            </el-main>
          </el-container>
        </div>
      </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"><el-container>
        <el-header>
          <h3>热门话题 </h3>
          <div v-for="tag in tags" :key="tag" style="display:inline-block">
            <tag  class="tag" >{{tag }}</tag>
          </div>
           </el-header>
        <el-main></el-main>
      </el-container></div></el-col>
    </el-row>
    </el-main>
  </el-container>
</template>

<script>

    export default {
        name: 'index',
     data () {
      return {
        tags: ['求职', 'spring', '春招', '毕业', '实习', '大数据'],
        search: '',
        list: null,
        total: 0,
        listQuery: {
          page: 1,
          row: 10
        }
      }
    },
      methods: {

        getHotArticle () {
          this.$api.getHotArticle(this.listQuery).then(response => {
            this.list = response.data.list
            this.total = response.data.total
          })
        },
        getUser (uid) {
        this.$api.getUser({userId: uid}).then(response => {
           alert(response)
          }).catch((error) => {
          console.log(error);
        });
        },
        getArticleById (contentId) {
          this.$router.push({
            path: '/articleDetail',
            query: {
              contentId: contentId
            }
          })
        },
       RandomColor () {
          var r = Math.floor(Math.random() * 256);
          var g = Math.floor(Math.random() * 256);
          var b = Math.floor(Math.random() * 256);
          return 'rgb(' + r + ',' + g + ',' + b + ')';
        },
        RandomColor2 () { /* 随机颜色hsl */
          return 'hsl(' +
            Math.round(Math.random() * 360) + ',' +
            Math.round(Math.random() * 100) + '%,' +
            Math.round(Math.random() * 80) + '%)';
        },
        random () {
        }
      },
      created () {
        // 自动加载indexs方法
       this.getHotArticle();
      }
    }
</script>

<style scoped>
  .item {
    margin-top: 10px;
    margin-right: 20px;
  }
 .tag {
    border: solid #ccc 1px;
    border-radius: 10px;
    padding: 3px;
    margin-right: 10px;
  }
</style>
