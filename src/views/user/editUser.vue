<template>
    <div>
      <el-form
        :model="infoForm"
        ref="infoForm"
        :rules="rule"
        class="regform"
        label-width="80px">
        <el-form-item prop="infoForm.headImage" label="头像">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:10010/api/manage/uploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="infoForm.headImage" :src="infoForm.headImage" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input
            type="text"
            v-model="infoForm.username"
            placeholder="用户名">{{infoForm.headImage}}
          </el-input>
        </el-form-item>
        <el-form-item prop="birthday" label="生日">
          <div class="block">
            <el-date-picker
              v-model="infoForm.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item prop="infoForm.sex" label="性别">
          <el-radio v-model="infoForm.sex" label="false">男</el-radio>
          <el-radio v-model="infoForm.sex" label="true">女</el-radio>
        </el-form-item>
        <el-form-item prop="school" label="学校">
          <el-input
            type="text"
            v-model="infoForm.school"
            placeholder="学校">
          </el-input>
        </el-form-item>
        <el-form-item prop="school" label="期望方向">
          <el-input
            type="text"
            v-model="infoForm.expectation"
            placeholder="期望方向">
          </el-input>
        </el-form-item>
        <el-form-item prop="school" label="自我描述">
          <el-input
            type="textarea"
            v-model="infoForm.description"
            placeholder="自我描述">
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-button
            type="success"
            class="submitBtn"
            round
            @click.native.prevent="submit"
            :loading="logining">
            确定
          </el-button>
          <hr>
        </el-form-item>
      </el-form>
    </div>
  </template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    name: 'editUser',
    components: {},
    data () {
      return {
        infoForm: {
          username: '',
          headImage: '',
          birthday: '',
          joinDay: '',
          sex: false,
          school: '',
          identity: 0,
          expectation: '',
          description: '',
          userId: this.$store.state.user.userId
        }
      }
    },
    created () {
      this.getUserById()
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.infoForm.headImage = res.data;
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        // eslint-disable-next-line no-undef
        return isJPG && isLt5M;
      },
      getUserById () {
        this.$api.getUserById({'userId': this.infoForm.userId})
          .then(response => {
            this.infoForm = response.data
          }).catch((error) => {
          console.log(error);
        });
      },
      submit () {
        this.$refs.infoForm.validate(valid => {
          if (valid) {
            this.$api.editUser(this.infoForm)
              .then((res) => {
                this.$router.push({path: '/userInfo'});
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log('submit err')
          }
        })
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
