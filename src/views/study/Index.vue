<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-row>
        <h3 >
          专项练习
        </h3>
        <table >
          <thead>
          <tr>
            <th>共刷题：1024</th>
            <th>做对题目：888</th>
            <th>最近一周平均分：</th>
            <th>排名：66</th>
          </tr>
          </thead>
        </table>
        <table class='table table-hover table-bordered'>
          <thead>
          <tr>
            <th></th>
            <th>最近一周练习知识点</th>
            <th>做对数/总做题数</th>
            <th>正确率</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><input type='radio' ></td>
            <td>数据库</td>
            <td>100/125</td>
            <td>80%</td>
            <td><el-button type='primary' >进入练习</el-button></td>
          </tr>
          <tr>
            <td><input type='radio' ></td>
            <td>计算机网络</td>
            <td>55/100</td>
            <td>55%</td>
            <td><el-button type='primary' >进入练习</el-button></td>
          </tr>
          <tr>
            <td><input type='radio' ></td>
            <td>操作系统</td>
            <td>10/10</td>
            <td>100%</td>
            <td><el-button type='primary' >进入练习</el-button></td>
          </tr>
          </tbody>
        </table>
      </el-row>
      <el-row>
        <h3 class='text-left text-info'>
          我的课程
        </h3>
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
      </el-row>
      <el-row>

      </el-row>
     </el-col>
    <el-col :span="8">
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
        <h1>技能图谱</h1>
      <div id='char' style='width: 400px;height: 400px;'></div>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'Index',
    mounted () {
      this.$nextTick(function () {
        this.drawPie()
      })
    },
    methods: {
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
        var option = {
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
              curveness: 0.3,
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
            data: [
              {
              name: 'Java工程师',
              category: '方向',
              symbolSize: 70,
              label: {
                show: true
              }
            },
              {
                name: '哈哈',
                category: '科目'
              },
              {
                name: '嘿嘿',
                category: '科目'
              },
              {
                name: '嘻嘻',
                category: '科目'
              },
              {
                name: '呵呵',
                category: '科目'
              },
              {
                name: '啊啊',
                category: '科目'
              },
              {
                name: '嗯嗯',
                category: '科目'
              },
              {
                name: '哎哎',
                category: '科目'
              },
              {
                name: '哼哼',
                category: '知识点'
              },
              {
                name: '哎呀',
                category: '知识点'
              },
              {
                name: '嘿呀',
                category: '知识点'
              },
              {
                name: '嘿哈',
                category: '知识点'
              },
              {
                name: '咯咯',
                category: '知识点'
              }
            ],
            links: [{
              source: '哼哼',
              target: 'Java工程师',
              value: '提出解决方案'
            }, {
              source: '哎呀',
              target: 'Java工程师',
              value: '提出解决方案'
            }, {
              source: '嘿呀',
              target: 'Java工程师',
              value: '提出解决方案'
            }, {
              source: '嘿哈',
              target: 'Java工程师',
              value: '提出解决方案'
            }, {
              source: '咯咯',
              target: 'Java工程师',
              value: '提出解决方案'
            }, {
              source: '嘿嘿',
              target: 'Java工程师',
              value: '提出解决方案'
            }, {
              source: '哈哈',
              target: 'Java工程师',
              value: '提出解决方案'
            }, {
              source: '嘻嘻',
              target: 'Java工程师',
              value: '提出解决方案'
            }, {
              source: '呵呵',
              target: 'Java工程师',
              value: '提出解决方案'
            }, {
              source: '啊啊',
              target: 'Java工程师',
              value: '提出解决方案'
            }, {
              source: '嗯嗯',
              target: 'Java工程师',
              value: '提出解决方案'
            }, {
              source: '哎哎',
              target: 'Java工程师',
              value: '提出解决方案'
            }, {
              source: '哼哼',
              target: '哎呀',
              value: '对立'
            }, {
              source: '嘿哈',
              target: '嘿呀',
              value: '相继'
            }, {
              source: '王延中',
              target: '哼哼',
              value: '作者'
            }, {
              source: '李建军',
              target: '嘿呀',
              value: '作者'
            }, {
              source: '李建军',
              target: '嘿哈',
              value: '作者'
            }, {
              source: '雷志勤',
              target: '嘿哈',
              value: '作者'
            }, {
              source: '李玉萍',
              target: '嘿呀',
              value: '作者'
            }, {
              source: '哈哈',
              target: '啊啊',
              value: '相继'
            }, {
              source: '啊啊',
              target: '嘿嘿',
              value: '相继'
            }, {
              source: '嘻嘻',
              target: '哈哈',
              value: '支持'
            }, {
              source: '哎哎',
              target: '嗯嗯',
              value: '支持'
            }, {
              source: '哎哎',
              target: '呵呵',
              value: '总分'
            }, {
              source: '嗯嗯',
              target: '呵呵',
              value: '总分'
            }],
            categories: categories
          }]
        }
        charts.setOption(option)
      }
    }
  }
</script>

<style scoped>

</style>
