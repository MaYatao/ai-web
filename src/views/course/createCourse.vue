<template>
  <div>
    <div class="album albumvideo">
      <h2>创建课程</h2>
      <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
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
        <el-form-item v-if="sort.length !== 0" label="知识点" style="margin: 30px 60px">
          <el-select v-model="knowledges" multiple placeholder="请选择">
            <el-option
              v-for="item in knowledgeOptions"
              :key="item.knowledgeId"
              :label="item.title"
              :value="item.knowledgeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难易程度" style="margin: 30px 60px">
          <el-rate v-model="infoForm.degree"></el-rate>
        </el-form-item>
        <el-form-item label="上传视频" prop="infoForm.url" style="margin: 30px 60px">
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
        <el-form-item label="上传封面" prop="infoForm.imageUrl" style="margin: 30px 60px">
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
export default {
  name: 'createCourse',
  data () {
    return {
      sort: [],
      infoForm: {
        degree: 0,
        title: '',
        description: '',
        userId: this.$store.state.user.userId,
        basics: '',
        subject: '',
        direction: '',
        source: '',
        url: '',
        imageUrl: ''
      },
      knowledges: [],
      fileList: [],
      sourceList: [],
      subjectOptions: [],
      knowledgeOptions: [],
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
      this.knowledges = [];
      this.$api.getKnowledgesBySId({ 'subjectId': values[1] })
        .then(res => {
          this.knowledgeOptions = res.data;
        })
        .catch(error => {
          console.log(error);
          alert(error);
        });
    },
    handleInputConfirm () {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
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
      this.infoForm.knowledge1 = this.knowledges[0];
      this.infoForm.knowledge2 = this.knowledges[1];
      this.infoForm.knowledge3 = this.knowledges[2];
      this.$api
        .createCourse(this.infoForm)
        .then(res => {
          // this.$router.push('/luntan');
        })
        .catch(error => {
          console.log(error);
          alert(error);
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
