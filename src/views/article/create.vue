<template>
  <div>
    <el-row class="warp">
      <h1>发布/修改文章</h1>

      <!--
      Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http:// element.eleme.io/#/zh-CN/component/form
      -->
      <el-col :span="18" :offset="3" class="warp-main" style="text-align: left">
        <el-form ref="infoForm" :model="infoForm" label-width="120px">
          <el-form-item label="是否开启评论：">
            <el-switch v-model="infoForm.comment" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="类型：">
            <el-radio v-model="infoForm.type" :label="0">学习</el-radio>
            <el-radio v-model="infoForm.type" :label="1">话题</el-radio>
          </el-form-item>
          <el-form-item label="标题：" prop="title">
            <el-input v-model="infoForm.title"></el-input>
          </el-form-item>
        <!--使用编辑器
        -->
        <el-form-item label="详细" style="height: 350px;margin : 50px 100px">
          <div class="edit_container">
            <quill-editor
              v-model="infoForm.content"
              ref="myQuillEditor"
              class="editer"
              :options="editorOption"
              @ready="onEditorReady($event) "
              style="height: 250px"
            ></quill-editor>
          </div>
        </el-form-item>
        <el-form-item v-if="infoForm.type === 1" label="话题：">
          <el-input v-model="infoForm.topic" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item v-if="infoForm.type === 0" label="科目：">
          <el-cascader @change="getKnowledgesBySId" :options="subjectOptions" v-model="sort" clearable placeholder="请选择"
                       style="width: 280px"></el-cascader>
        </el-form-item>
        <el-form-item label="选择" style="margin: 30px 60px">
          <el-tag> {{ infoForm.knowledgeName}}</el-tag>
          <el-button @click="open" type="primary" style="margin-left: 16px;">
            点我选择
          </el-button>
        </el-form-item>
        <el-drawer
          title="知识点选择"
          :visible.sync="drawer"
          :with-header="false">
          <div id='char' ref="chart" style='width: 600px;height:600px;margin: 30px'></div>
        </el-drawer>
        <el-form-item style="margin: 100px 100px">
          <el-button type="primary" @click="onSubmit(1)">存为草稿</el-button>
          <el-button type="primary" @click="onSubmit(0)">确认发布</el-button>
        </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {quillEditor} from 'vue-quill-editor'; // 调用编辑器
  export default {
    data () {
      return {
        drawer: false,
        subjectOptions: [],
        sort: [],
        knowledges: [],
        knowledgeOptions: [],
        infoForm: {
          // 0：学习，1：话题
          type: 0,
          title: '',
          content: '',
          userId: this.$store.state.user.userId,
          // 话题
          topic: '',
          status: 0,
          knowledgeName: '',
          comment: true
        }
      };
    },
    computed: {
      editor () {
        return this.$refs.myQuillEditor.quill;
      }
    },
    mounted () {
      this.getSubject();
    },
    methods: {
      getSubject () {
        this.$api
          .getSubjects()
          .then(res => {
            this.subjectOptions = res.data;
          })
          .catch(error => {
            console.log(error);
            alert(error);
          });
      },
      getKnowledgesBySId (values) {
        this.getSId();
      },
      open () {
        this.drawer = true
        this.drawPie()
      },
      getSId () {
        this.$api.getBySid({'subjectId': this.sort[1]}).then(res => {
          this.nodes = res.data.data
          this.nodeLink = res.data.links
        })
          .catch(error => {
            console.log(error);
          });
      },
      drawPie () {
        var charts = echarts.init(document.getElementById('char'))
        var categories = [
          {name: '科目'},
          {name: '知识点'}
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
        charts.on('click', (param) => {
          console.log('param---->', param); // 打印出param, 可以看到里边有很多参数可以使用
          if (param.dataType === 'node') {
            var knowledge = param.name
            this.infoForm.knowledgeName = knowledge
            this.drawer = false
          } else {
            /*  alert('点击了边' + param.value) */
          }
        });
      },
      onEditorReady (editor) {
      },
      onSubmit (status) {
        // 提交
        this.infoForm.status = status;
        this.infoForm.knowledge1 = this.knowledges[0];
        this.infoForm.knowledge2 = this.knowledges[1];
        this.infoForm.knowledge3 = this.knowledges[2];
        this.infoForm.direction = this.sort[0]
        this.infoForm.subject = this.sort[1]
        this.$api
          .createArticle(this.infoForm)
          .then(res => {
            this.$router.push('/luntan');
          })
          .catch(error => {
            console.log(error);
            alert(error);
          });
      }
    },
    components: {
      //  使用编辑器
      quillEditor
    }
  };
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
