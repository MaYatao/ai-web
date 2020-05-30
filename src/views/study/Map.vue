<template>

  <div id='char' style='width: 600px;height:600px;margin: 30px'></div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'Map',
    data () {
      return {
        nodes: [],
        nodeLink: []
      }
    },
    created () {
        this.getSId()
    },
    methods: {
      getSId () {
        this.$api.getByPId({'subjectId': 2}).then(res => {
          this.nodes = res.data.data
          this.nodeLink = res.data.links
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
        });
        charts.on('click', function (param) {
          console.log('param---->', param); // 打印出param, 可以看到里边有很多参数可以使用
          // 获取节点点击的数组序号
          var arrayIndex = param.dataIndex;
          console.log('arrayIndex---->', arrayIndex);
          console.log('name---->', param.name);
          if (param.dataType === 'node') {
            this.param.name = '测试'
          } else {
            alert('点击了边' + param.value)
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
