<template>
  <el-card class="box-card" style="width: 800px; margin: 0 auto">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>
    <el-form ref="form" label-width="100px" style="display: flex;">
      <div class="left" style="width: 400px">
        <el-form-item label="头像：">
          <el-avatar shape="square" :size="86" :src="infoForm.headImage"></el-avatar>
        </el-form-item>
        <el-form-item label="姓名：">{{infoForm.username}}</el-form-item>
        <el-form-item label="生日：">{{ infoForm.birthday | parseTime('{Y}-{M}-{D} {h}:{m}:{s}') }}</el-form-item>
        <el-form-item label="加入时间：">{{ infoForm.birthday | parseTime('{Y}-{M}-{D} {h}:{m}:{s}') }}</el-form-item>
      </div>
      <div class="right" style="width: 400px">
        <el-form-item label="性别：">{{infoForm.sex ? '男': '女'}}</el-form-item>
        <el-form-item label="身份：">{{infoForm.username}}</el-form-item>
        <el-form-item label="期望：">{{infoForm.identity | statusFilter}}</el-form-item>
        <el-form-item label="学校：">{{infoForm.school }}</el-form-item>
        <el-form-item label="自我介绍：">{{infoForm.description }}</el-form-item>
      </div>
    </el-form>
  </el-card>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  name: 'userInfo',
  components: {},
  filters: {
    statusFilter (status) {
      const statusMap = {
        '0': '学生',
        '1': '教师',
        '2': '管理员'
      };
      return statusMap[status];
    }
  },
  data () {
    return {
      infoForm: {
        username: '',
        headImage: '',
        birthday: '',
        sex: false,
        school: '',
        identity: 0,
        expectation: '',
        description: '',
        userId: this.$store.state.user.userId
      }
    };
  },
  created () {
    this.getUserById();
  },
  methods: {
    getUserById () {
      this.$api
        .getUserById({ userId: this.infoForm.userId })
        .then(response => {
          this.infoForm = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="postcss" scoped>
body {
  background-color: #ff0000;
}
</style>
