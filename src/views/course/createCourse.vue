<template>
  <div>
    <div class="album albumvideo">
      <h2>创建课程</h2>
      <el-form ref="infoForm" :model="infoForm"  label-width="120px">
        <el-form-item label="标题" style="margin: 30px 60px">
          <el-input v-model="infoForm.title">内容</el-input>
        </el-form-item>
        <el-form-item label="介绍" style="margin: 30px 60px">
          <el-input v-model="infoForm.description"></el-input>
        </el-form-item>
        <el-form-item label="学习基础" style="margin: 30px 60px">
          <el-input v-model="infoForm.basics"></el-input>
        </el-form-item>
        <el-form-item label="学习目标" style="margin: 30px 60px">
          <el-input v-model="infoForm.goal"></el-input>
        </el-form-item>
        <el-form-item label="科目" style="margin: 30px 60px">
          <el-cascader @change="getKnowledgesBySId" :options="subjectOptions" v-model="sort" clearable placeholder="请选择"></el-cascader>
        </el-form-item>
        <el-form-item label="难易程度" style="margin: 30px 60px">
          <el-rate v-model="infoForm.degree"></el-rate>
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
        <el-form-item label="上传视频" v-model='infoForm.url' style="margin: 30px 60px">
          <div class="pic_img" style="background-color: azure">
            <div class="pic_img_box">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:10010/api/manage/uploadFile"
                v-bind:data="{FoldPath:'上传目录'}"
                v-bind:on-progress="uploadVideoProcess"
                v-bind:on-success="handleVideoSuccess"
                v-bind:before-upload="beforeUploadVideo"
                v-bind:show-file-list="false"
              >
                <video
                  v-if="videoForm.showVideoPath !='' && !videoFlag"
                  v-bind:src="videoForm.showVideoPath"
                  class="avatar video-avatar"
                  controls="controls"
                >您的浏览器不支持视频播放</video>
                <i
                  v-else-if="videoForm.showVideoPath =='' && !videoFlag"
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
                <el-progress
                  v-if="videoFlag === true"
                  type="circle"
                  v-bind:percentage="videoUploadPercent"
                  style="margin-top:7px;"
                ></el-progress>
              </el-upload>
            </div>
          </div>
          <p class="Upload_pictures">
            <span></span>
            <span>最多可以上传1个视频，建议大小500M，推荐格式mp4</span>
          </p>
        </el-form-item>
        <el-form-item label="上传封面" v-model="infoForm.imageUrl" style="margin: 30px 60px">
          <div class="pic_img" style="background-color: azure">
            <div class="pic_img_box">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:10010/api/manage/uploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="infoForm.imageUrl" :src="infoForm.imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item style="margin: 100px 100px">
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:10010/api/manage/uploadFile"
            :on-change="handleChange"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传课程资料</div>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin: 100px 100px">
          <el-button type="primary" @click="onSubmit">确认发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'createCourse',
    data () {
      return {
        nodes: [],
        nodeLink: [],
        sort: [],
        kkk: '',
        infoForm: {
          degree: 0,
          title: '',
          description: '',
          username: this.$store.state.user.username,
          userId: this.$store.state.user.userId,
          basics: '',
          subject: '',
          direction: '',
          source: '',
          url: '',
          imageUrl: '',
          knowledgeName: ''
        },
        drawer: false,
        fileList: [],
        sourceList: [],
        subjectOptions: [],
        videoFlag: false,
        videoUploadPercent: '', // 是否显示进度条
        // 进度条的进度，
        isShowUploadVideo: false,
        // 显示上传按钮
        videoForm: {
          showVideoPath: ''
        }
      };
    },
    methods: {
      getSubject () {
        this.$api.getSubjects().then(res => {
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
      // 上传资料
      handleChange (file, fileList) {
        this.fileList = fileList;
      },
      // 上传前回调
      beforeUploadVideo (file) {
        var fileSize = file.size / 1024 / 1024 < 500;
        if (
          [
            'video/mp4',
            'video/ogg',
            'video/flv',
            'video/avi',
            'video/wmv',
            'video/rmvb',
            'video/mov'
          ].indexOf(file.type) === -1
        ) {
          alert('请上传正确的视频格式');
          return false;
        }
        if (!fileSize) {
          alert('视频大小不能超过500MB');
          return false;
        }
        this.isShowUploadVideo = false;
      },
      // 进度条
      uploadVideoProcess (event, file, fileList) {
        this.videoFlag = true;
        this.videoUploadPercent = file.percentage.toFixed(0) * 1;
      },
      // 上传成功回调
      handleVideoSuccess (res, file) {
        this.isShowUploadVideo = true;
        this.videoFlag = false;
        this.videoUploadPercent = 0;
        alert(res.data);
        this.videoForm.showVideoPath = res.data;
        this.infoForm.url = res.data;
      },
      handleAvatarSuccess (res, file) {
        this.infoForm.imageUrl = res.data;
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
      onSubmit () {
        // 提交
        for (let i = 0; i < this.fileList.length; i++) {
          this.sourceList.push(this.fileList[i].response.data);
        }
        this.infoForm.source = this.sourceList.join();
        this.infoForm.direction = this.sort[0];
        this.infoForm.subject = this.sort[1];
        // knowledges数组拆开为三个参数
        this.$api.createCourse(this.infoForm)
          .then(res => {
            alert('上传成功')
            // this.$router.push('/luntan');
          })
          .catch(error => {
            console.log(error);
            alert(error);
          });
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
      }
    },
    created () {
      this.getSubject();
    }
  };
</script>

<style scoped>
</style>
