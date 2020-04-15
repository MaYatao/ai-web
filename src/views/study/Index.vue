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
      <div id='char' style='width: 400px;height: 400px; float:center'></div>
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
            name: '政策问题'
          },
          {
            name: '政策文本'
          },
          {
            name: '期刊论文'
          },
          {
            name: '专家'
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
                position: 'right',
                show: true
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
            data: [{
              name: '公立医院薪酬制度改革',
              category: '政策问题',
              symbolSize: 70,
              label: {
                show: true
              }
            },
              {
                name: '关于开展公立医院薪酬制度改革试点工作的指导意见',
                category: '政策文本'
              },
              {
                name: '国务院办公厅关于印发深化医药卫生体制改革2019年重点工作任务的通知',
                category: '政策文本'
              },
              {
                name: '国务院办公厅印发关于改革完善医疗卫生行业综合监管制度的指导意见',
                category: '政策文本'
              },
              {
                name: '国务院办公厅关于印发2011年公立医院改革试点工作安排的通知',
                category: '政策文本'
              },
              {
                name: '人力资源社会保障部财政部国家卫生计生委国家中医药管理局关于扩大公立医院薪酬制度改革试点的通知',
                category: '政策文本'
              },
              {
                name: '中共中央国务院关于深化医药卫生体制改革的意见',
                category: '政策文本'
              },
              {
                name: '国务院关于印发医药卫生体制改革近期重点实施方案（2009—2011年）的通知',
                category: '政策文本'
              },
              {
                name: '我国公立医院薪酬制度存在的问题及改革建议',
                category: '期刊论文'
              },
              {
                name: '改革公立医院竞争激励机制',
                category: '期刊论文'
              },
              {
                name: '医改背景下公立医院绩效分配制度研究',
                category: '期刊论文'
              },
              {
                name: '城市公立医院薪酬改革配套政策问题研究',
                category: '期刊论文'
              },
              {
                name: '宽带薪酬在我国大型公立医院的适用性分析',
                category: '期刊论文'
              },
              {
                name: '王延中',
                category: '专家'
              },
              {
                name: '李建军',
                category: '专家'
              },
              {
                name: '雷志勤',
                category: '专家'
              },
              {
                name: '李玉萍',
                category: '专家'
              },
              {
                name: '张光鹏',
                category: '专家'
              }
            ],
            links: [{
              source: '我国公立医院薪酬制度存在的问题及改革建议',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '改革公立医院竞争激励机制',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '医改背景下公立医院绩效分配制度研究',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '城市公立医院薪酬改革配套政策问题研究',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '宽带薪酬在我国大型公立医院的适用性分析',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '王延中',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '张光鹏',
              target: '国务院办公厅关于印发深化医药卫生体制改革2019年重点工作任务的通知',
              value: '研究政策'
            }, {
              source: '张光鹏',
              target: '关于开展公立医院薪酬制度改革试点工作的指导意见',
              value: '研究政策'
            }, {
              source: '张光鹏',
              target: '国务院办公厅关于印发2011年公立医院改革试点工作安排的通知',
              value: '研究政策'
            }, {
              source: '国务院办公厅关于印发深化医药卫生体制改革2019年重点工作任务的通知',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '关于开展公立医院薪酬制度改革试点工作的指导意见',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '国务院办公厅印发关于改革完善医疗卫生行业综合监管制度的指导意见',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '国务院办公厅关于印发2011年公立医院改革试点工作安排的通知',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '人力资源社会保障部财政部国家卫生计生委国家中医药管理局关于扩大公立医院薪酬制度改革试点的通知',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '中共中央国务院关于深化医药卫生体制改革的意见',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '国务院关于印发医药卫生体制改革近期重点实施方案（2009—2011年）的通知',
              target: '公立医院薪酬制度改革',
              value: '提出解决方案'
            }, {
              source: '我国公立医院薪酬制度存在的问题及改革建议',
              target: '改革公立医院竞争激励机制',
              value: '对立'
            }, {
              source: '城市公立医院薪酬改革配套政策问题研究',
              target: '医改背景下公立医院绩效分配制度研究',
              value: '相继'
            }, {
              source: '王延中',
              target: '我国公立医院薪酬制度存在的问题及改革建议',
              value: '作者'
            }, {
              source: '李建军',
              target: '医改背景下公立医院绩效分配制度研究',
              value: '作者'
            }, {
              source: '李建军',
              target: '城市公立医院薪酬改革配套政策问题研究',
              value: '作者'
            }, {
              source: '雷志勤',
              target: '城市公立医院薪酬改革配套政策问题研究',
              value: '作者'
            }, {
              source: '李玉萍',
              target: '医改背景下公立医院绩效分配制度研究',
              value: '作者'
            }, {
              source: '关于开展公立医院薪酬制度改革试点工作的指导意见',
              target: '人力资源社会保障部财政部国家卫生计生委国家中医药管理局关于扩大公立医院薪酬制度改革试点的通知',
              value: '相继'
            }, {
              source: '人力资源社会保障部财政部国家卫生计生委国家中医药管理局关于扩大公立医院薪酬制度改革试点的通知',
              target: '国务院办公厅关于印发深化医药卫生体制改革2019年重点工作任务的通知',
              value: '相继'
            }, {
              source: '国务院办公厅印发关于改革完善医疗卫生行业综合监管制度的指导意见',
              target: '关于开展公立医院薪酬制度改革试点工作的指导意见',
              value: '支持'
            }, {
              source: '国务院关于印发医药卫生体制改革近期重点实施方案（2009—2011年）的通知',
              target: '中共中央国务院关于深化医药卫生体制改革的意见',
              value: '支持'
            }, {
              source: '国务院关于印发医药卫生体制改革近期重点实施方案（2009—2011年）的通知',
              target: '国务院办公厅关于印发2011年公立医院改革试点工作安排的通知',
              value: '总分'
            }, {
              source: '中共中央国务院关于深化医药卫生体制改革的意见',
              target: '国务院办公厅关于印发2011年公立医院改革试点工作安排的通知',
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
