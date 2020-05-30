<template>
  <div>
    <el-row class="warp">
      <h1>上传试题</h1>

      <!--
      Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http:// element.eleme.io/#/zh-CN/component/form
      -->
      <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm"  label-width="120px">
          <el-form-item label="问题内容"   style="height: 250px;margin : 50px 100px">
            <div class="edit_container">
              <quill-editor v-model="infoForm.content"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption" @ready="onEditorReady($event) "  style="height: 250px">
              </quill-editor>
            </div>
          </el-form-item>
          <br>
          <el-form-item style="margin:80px 100px 20px;" label="添加选项">
            <div
              :key="index"
              v-for="(option, index) in questionOptions"
              style="display: flex; justify-content: center"
            >
              <div style="flex: 0 0 100px; text-align: right; padding-right: 10px; color: #b3b6b9">选项{{index + 1}}:</div>
              <el-input v-model="questionOptions[index]" style="margin-bottom: 8px"></el-input>
            </div>
            <el-button size="small" @click="addOption">添加选项</el-button>
          </el-form-item>
          <br>
          <el-form-item v-if="questionOptions.length > 0" label="答案" style="margin:0 100px 20px;">
            <el-radio
              v-for="(option, index) in questionOptions"
              :key="index"
              v-model="infoForm.answer"
              :label="index"
            >选项{{index + 1}}</el-radio>
          </el-form-item>
          <el-form-item label="分值" prop="score" style="margin: 0 100px">
            <el-input v-model="infoForm.score" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="解析"   style="height: 250px;margin : 30px 100px">
            <div class="edit_container">
              <quill-editor v-model="infoForm.analysis"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption" @ready="onEditorReady($event) "  style="height: 250px">
              </quill-editor>
            </div>
          </el-form-item>
          <br>
          <el-form-item label="难易程度" style="margin: 80px 60px 0">
            <el-rate v-model="infoForm.degree"></el-rate>
          </el-form-item>
          <el-form-item label="科目" style="margin: 30px 60px">
            <el-cascader @change="getKnowledgesBySId" :options="subjectOptions" v-model="sort" clearable placeholder="请选择"></el-cascader>
          </el-form-item>
          <el-form-item label="选择" style="margin: 30px 60px">
            <el-tag> {{ infoForm.knowledgeName}}</el-tag>
            <el-button @click="open" type="primary" style="margin-left: 16px;">
              点我选择 </el-button>
          </el-form-item>
          <el-drawer
            title="知识点选择"
            :visible.sync="drawer"
            :with-header="false">
            <div id='char' ref="chart" style='width: 600px;height:600px;margin: 30px'></div>
          </el-drawer>
          <el-form-item style="margin: 100px 100px" >
            <el-button type="primary" @click="onSubmit">确认发布</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'

  import { quillEditor } from 'vue-quill-editor' // 调用编辑器
  export default {
    name: 'choicesQuestion',
    data () {
      return {
        subjectOptions: [],
        drawer: false,
        sort: [],
        knowledges: [],
        knowledgeOptions: [],
        questionOptions: [],
        infoForm: {
          score: '',
          analysis: '',
          options: [],
          content: '',
          uid: this.$store.state.user.userId,
          knowledgeName: '',
          status: 0,
          subject: '',
          direction: '',
          answer: '',
          degree: 0,
          type: 2
        }
      }
    },
    computed: {
      editor () {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted () {
      // 初始化
    },
    methods: {
      addOption () {
        this.questionOptions.push('');
      },
      addNewList () {
        this.lists.push({
          id: this.nextTodoId++,
          title: this.newAddText
        })
        this.newAddText = ''
      },
      onEditorReady (editor) {
      },
      getSubject () {
        this.$api.getSubjects().then(res => {
          this.subjectOptions = res.data;
        }).catch((error) => {
          console.log(error);
          alert(error)
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
      onSubmit () {
        // 提交
        // knowledges数组拆开为三个参数
        this.infoForm.knowledge1 = this.knowledges[0];
        this.infoForm.knowledge2 = this.knowledges[1];
        this.infoForm.knowledge3 = this.knowledges[2];
        this.infoForm.options = JSON.stringify(this.questionOptions);
        this.infoForm.direction = this.sort[0]
        this.infoForm.subject = this.sort[1]
        this.$api.createQuestion(this.infoForm).then(res => {
          this.questionOptions = [];
          alert('上传成功')
        }).catch((error) => {
          console.log(error);
          alert(error)
        });
      }
    },
    components: {
//  使用编辑器
      quillEditor
    },
    created () {
      this.getSubject()
    }
  }
</script>
<style>
</style>

