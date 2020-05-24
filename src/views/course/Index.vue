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
              <el-radio-button v-for="direction in subjectList" :key="direction.value" :label="direction.value">
                {{direction.label}}
              </el-radio-button>
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
                <el-radio-button v-for=" subject in direction.children" :key="subject.value"  v-show =" subject.value >30 ? false :true" :label="subject.value" >{{subject.label}}
                </el-radio-button>
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
                <el-radio-button v-for="degree in degrees" :key="degree.value" :label="degree.value">
                  {{degree.label}}
                </el-radio-button>
            </el-radio-group>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="margin: 20px 100px">
      <el-container>
        <el-header style="text-align: left">
            <el-tag>最热</el-tag>
            <el-tag>最新</el-tag>
        </el-header>
        <el-main style="height: 400px">
          <div v-for="course in courseList" :key="course">
            <div style="height: 250px; width:200px; float: left; margin: 10px; overflow: hidden">
              <a style="cursor-pointer" @click="getCourseById(course.courseId)">
                <el-image style="border-radius: 10px" :src="course.imageUrl"></el-image>
                <h3>{{course.title}}</h3>
                <el-rate v-model="course.degree"></el-rate>
                <div style="font-size: 14px; color:#545C63; margin-top: 10px">{{course.description}}</div>
              </a>
            </div>
          </div>
        </el-main>
      </el-container>

    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        subjectList: null,
        courseList: null,
        total: 0,
        listLoading: false,
        directions: '全部',
        degrees: [{'value': -1, 'label': '全部'}, {'value': 1, 'label': '一星级'}, {'value': 2, 'label': '二星级'}, {
          'value': 3,
          'label': '三星级'
        }, {'value': 4, 'label': '四星级'}, {'value': 5, 'label': '五星级'}],
        listQuery: {
          direction: '-1',
          degree: '-1',
          subject: '-1'
        }
      }
    },
    created () {
      this.getCoursesByType()
      this.getSubject()
    },
    methods: {
      getCourseById (courseId) {
        this.$router.push({path: '/courseBody',
          query: {
            'courseId': courseId
          }});
      },
      getSubject () {
        this.$api.getSubjects().then(res => {
          this.subjectList = res.data;
        }).catch((error) => {
          console.log(error);
          alert(error)
        });
      },
      getCoursesByType () {
        this.$api.getCoursesByType(this.listQuery).then(response => {
          this.courseList = response.data
        })
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .el-radio-button{
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
    padding: 0px
  }
  .tag-title {
    margin: 10px 0 0;
  }

  .el-radio-group {
    text-align: left;
  }
</style>
