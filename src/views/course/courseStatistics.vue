<template>
  <div class='echart'>
    <div>echarts</div>
    <div id="myEchart"></div>
  </div>
</template>

<script>
  var echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

  export default {
    name: 'courseStatistic',
    components: {
    },
    data () {
      return {
        params: {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
      };
    },
    mounted () {
      let myChart = echarts.init(document.getElementById('myEchart'));
      myChart.setOption(this.params)
    },
    // 方法集合
    methods: {
    }
  }
</script>
<style lang='scss' scoped >
  #myEchart{
    width: 500px;
    height: 400px;
  }

</style>
