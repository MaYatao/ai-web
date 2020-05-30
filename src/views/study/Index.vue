<template>
  <el-row>
    <el-col :span="14">
      <el-row >
        <h3 >
          专项练习
        </h3>
        <div align="center">
          <table >
            <thead>
            <tr>
              <td >共刷题：1024</td>
              <td>做对题目：888</td>
              <td>最近一周平均分：</td>
              <td>排名：66</td>
            </tr>
            </thead>
          </table>

          <table class='table table-hover table-bordered'>
            <tr>
              <th>最近一周练习知识点</th>
              <th>做对数/总做题数</th>
              <th>正确率</th>
              <th></th>
            </tr>
            <tr>
              <td>数据库</td>
              <td>100/125</td>
              <td>80%</td>
              <td><el-button type='primary' >进入练习</el-button></td>
            </tr>
            <tr>
              <td>计算机网络</td>
              <td>55/100</td>
              <td>55%</td>
              <td><el-button type='primary' >进入练习</el-button></td>
            </tr>
            <tr>
              <td>操作系统</td>
              <td>10/10</td>
              <td>100%</td>
              <td><el-button type='primary' >进入练习</el-button></td>
            </tr>
          </table>
        </div>
      </el-row>
      <el-row>
        <h3 class='text-left text-info'>
          我的课程
        </h3>
        <div align="center">
          <table class='table'>
            <thead>
            <tr>
              <th>参加课程：1</th>
              <th>累计学习时间：50分钟</th>
            </tr>
            </thead>
          </table>
          <table class='table table-hover table-bordered'>
            <tbody>
            <tr>
              <td>数据库入门</td>
              <td><el-progress :percentage="50"></el-progress>
              </td>
              <td><el-button type='primary' >进入练习</el-button></td>
            </tr>
            <tr>
              <td>计算网络入门</td>
              <td><el-progress :percentage="50"></el-progress>
              </td>
              <td><el-button type='primary' >进入练习</el-button></td>
            </tr>
            <tr>
              <td>操作系统入门</td>
              <td><el-progress :percentage="50"></el-progress>
              </td>
              <td><el-button type='primary' >进入练习</el-button></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-row>
      <el-row>
      </el-row>
    </el-col>
    <el-col :span="10">
      <el-row>
        <el-tag>
          周日 11-17
        </el-tag>
        <el-tag>
          已打卡10天
        </el-tag>
        <el-button type="primary">立即打卡</el-button>

      </el-row>
      <el-row>
        <div id='char' style='width: 400px;height: 400px;margin: 30px'></div>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'Index',
    data () {
      return {
        nodes: [],
        nodeLink: []
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.getSubject()
      })
    },
    methods: {
      getSubject () {
        this.$api.getByPId({'subjectId': 2}).then(res => {
          this.nodes = res.data.data
          this.nodeLink = res.data.links
          console.log(this.nodes);
          console.log(this.nodeLink);
          this.drawPie()
        })
          .catch(error => {
            console.log(error);
            alert(error);
          });
      },
      drawPie () {
        var charts = echarts.init(document.getElementById('char'))
        var categories = [
          {
            name: '方向'
          },
          {
            name: '科目'
          },
          {
            name: '知识点'
          }
        ];
        charts.setOption({
          title: {
            text: '知识图谱'
          },
          tooltip: {
            formatter: function (params) {
              return params.name + (params.value ? ' : ' + params.value : '')
            }
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',

          toolbox: {
            feature: {
              restore: {}
            }
          },
          legend: {
            show: true,
            data: categories
          },
          series: [{
            type: 'graph',
            layout: 'force',
            roam: true,
            hoverAnimation: true,
            focusNodeAdjacency: true,
            draggable: true,
            symbolSize: 33,
            force: {
              repulsion: 200,
              edgeLength: 100
            },
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            },
            lineStyle: {
              width: 0.5,
              curveness: 0, /* 线条弯的角度 */
              opacity: 0.8
            },
            label: {
              emphasis: {
                position: 'center',
                show: false
              }
            },
            emphasis: {
              itemStyle: {
                borderWidth: 3
              },
              lineStyle: {
                color: 'gray',
                width: 3
              }
            },
            data: this.nodes,
            links: this.nodeLink,
            categories: categories
          }]
        })
      }
    }
  }
</script>

<style scoped>
  .table{
    margin: 10px
  }
  td{
    width:150px
  }
  th{
    width:150px
  }
</style>
