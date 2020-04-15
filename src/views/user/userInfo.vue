<template>
    <div style="align-content: center">
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"> <el-tag>姓名：</el-tag></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">{{infoForm.username}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"> <el-tag>头像：</el-tag></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"> <el-avatar :size="50" :src="infoForm.headImage"> </el-avatar>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"> <el-tag>生日：</el-tag></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">{{ infoForm.birthday | parseTime('{Y}-{M}-{D} {h}:{m}:{s}') }}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"> <el-tag>加入时间：</el-tag></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">{{ infoForm.birthday | parseTime('{Y}-{M}-{D} {h}:{m}:{s}') }}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"> <el-tag>身份：</el-tag></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"> {{infoForm.sex ? '男': '女'}} </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"> <el-tag>身份：</el-tag></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"> {{infoForm.identity | statusFilter}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"> <el-tag>期望：</el-tag></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"> {{infoForm.expectation }}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"> <el-tag>学校：</el-tag></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"> {{infoForm.school }}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"> <el-tag>自我介绍：</el-tag></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"> {{infoForm.description }}</div></el-col>
      </el-row>
    </div>
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
          }
          return statusMap[status]
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
            }
        },
      created () {
        this.getUserById()
      },
        methods: {
          getUserById () {
            this.$api.getUserById({'userId': this.infoForm.userId})
              .then(response => {
                this.infoForm = response.data
              }).catch((error) => {
              console.log(error);
            });
          }
        }
    }
</script>
<style lang="postcss" scoped>
    body {
        background-color: #ff0000;
    }
</style>
