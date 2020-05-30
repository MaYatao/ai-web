<template>
  <el-container>
    <el-header style="height: initial">
      <el-row :gutter="20" style="margin: 10px">
        <el-col :span="2">
          <h3 class="tag-title">方向</h3>
        </el-col>
        <el-col :span="18">
          <el-radio-group style="border-left: 1px solid #DCDFE6;" v-model="listQuery.direction">
            <el-radio-button label="-1">全部</el-radio-button>
            <el-radio-button
              v-for="direction in subjectList"
              :key="direction.value"
              :label="direction.value"
            >{{direction.label}}</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 10px">
        <el-col :span="2">
          <h3 class="tag-title">科目</h3>
        </el-col>
        <el-col :span="18">
          <el-radio-group style="border-left: 1px solid #DCDFE6;" v-model="listQuery.subject">
            <el-radio-button label="-1">全部</el-radio-button>
            <template v-for="direction in subjectList">
              <el-radio-button
                v-for=" subject in direction.children"
                :key="subject.value"
                v-show=" subject.value >30 ? false :true"
                :label="subject.value"
              >{{subject.label}}</el-radio-button>
            </template>
            <el-radio-button>更多...</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 10px">
        <el-col :span="2">
          <h3 class="tag-title">难度</h3>
        </el-col>
        <el-col :span="18" style="text-align: left">
          <el-radio-group style="border-left: 1px solid #DCDFE6;" v-model="listQuery.degree">
            <el-radio-button
              v-for="degree in degrees"
              :key="degree.value"
              :label="degree.value"
            >{{degree.label}}</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="margin: 20px 100px">
      <el-container>
        <!-- <el-header style="text-align: left">
          <el-tag>最热</el-tag>
          <el-tag>最新</el-tag>
        </el-header>-->
        <el-main style="height: 400px">
          <el-tabs v-model="activeName">
            <el-tab-pane label="最新课程" name="first">
              <div v-for="course in courseList" :key="course">
                <div
                  style="height: 250px; width:200px; float: left; margin: 10px; overflow: hidden"
                >
                  <a style="cursor-pointer" @click="getCourseById(course.courseId)">
                    <el-image style="border-radius: 10px" :src="course.imageUrl"></el-image>
                    <h3>{{course.title}}</h3>
                    <el-rate v-model="course.degree"></el-rate>
                    <div
                      style="font-size: 14px; color:#545C63; margin-top: 35px"
                    >{{course.description}}</div>
                  </a>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="推荐课程" name="second">
              <div style="height: 250px; width:200px; float: left; margin: 10px; overflow: hidden">
                <a style="cursor-pointer">
                  <el-image
                    style="border-radius: 10px"
                    src="https://user-gold-cdn.xitu.io/1590396956093fe77ed22b8434cc3ddfa23cd5818559b.jpg?imageView2/1/q/85/format/webp/interlace/1"
                  ></el-image>
                  <h3>大规模混合部署项目落地实践</h3>
                  <el-rate value="3"></el-rate>
                  <div
                    style="font-size: 14px; color:#545C63; margin-top: 35px"
                  >字节跳动技术学院、掘金技术社区联合主办的课程。</div>
                </a>
              </div>
              <div style="height: 250px; width:200px; float: left; margin: 10px; overflow: hidden">
                <a style="cursor-pointer">
                  <el-image
                    style="border-radius: 10px"
                    src="https://user-gold-cdn.xitu.io/2020/5/26/172510f889a32ee3?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1"
                  ></el-image>
                  <h3>轻量级Git服务</h3>
                  <el-rate value="4"></el-rate>
                  <div
                    style="font-size: 14px; color:#545C63; margin-top: 35px"
                  >Gogs是一款极易搭建的自助Git服务，使用Go语言开发。</div>
                </a>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      activeName: "first",
      subjectList: null,
      courseList: null,
      total: 0,
      listLoading: false,
      directions: "全部",
      degrees: [
        { value: -1, label: "全部" },
        { value: 1, label: "一星级" },
        { value: 2, label: "二星级" },
        {
          value: 3,
          label: "三星级"
        },
        { value: 4, label: "四星级" },
        { value: 5, label: "五星级" }
      ],
      listQuery: {
        direction: "-1",
        degree: "-1",
        subject: "-1"
      }
    };
  },
  created() {
    this.getCoursesByType();
    this.getSubject();
  },
  methods: {
    getCourseById(courseId) {
      this.$router.push({
        path: "/courseBody",
        query: {
          courseId: courseId
        }
      });
    },
    getSubject() {
      this.$api
        .getSubjects()
        .then(res => {
          this.subjectList = res.data;
        })
        .catch(error => {
          console.log(error);
          alert(error);
        });
    },
    getCoursesByType() {
      this.$api.getCoursesByType(this.listQuery).then(response => {
        this.courseList = response.data;
      });
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.el-radio-button {
  width: auto;
  height: auto;
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

/* 更改element-UI按钮样式 */
.el-radio {
  text-align: center;
  text-decoration: none;
  padding: 0px;
}
.tag-title {
  margin: 10px 0 0;
}

.el-radio-group {
  text-align: left;
}
</style>
