<template>
  <el-main>
    <el-form
      :model="ReginForm"
      ref="ReginForm"
      :rules="rule"
      class="regform"
      label-width="80px">

      <h3>学生注册</h3>

      <el-form-item prop="username"  label="用户名">
        <el-input
          type="text"
          v-model="ReginForm.username"
          placeholder="用户名">
        </el-input>
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input
          type="password"
          v-model="ReginForm.password"
          placeholder="密码">
        </el-input>
      </el-form-item>

      <el-form-item prop="confirmpassword" label="确认密码">
        <el-input
          type="password"
          v-model="ReginForm.confirmpassword"
          placeholder="确认密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="birthday" label="生日">
        <div class="block">
          <el-date-picker
            v-model="ReginForm.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-radio v-model="ReginForm.sex" label="false">男</el-radio>
        <el-radio v-model="ReginForm.sex" label="true">女</el-radio>
      </el-form-item>
      <el-form-item prop="school" label="学校">
        <el-input
          type="text"
          v-model="ReginForm.school"
          placeholder="学校">
        </el-input>
      </el-form-item>
      <el-form-item prop="direction" label="期望方向">
        <el-select v-model="ReginForm.direction" placeholder="请选择方向">
          <el-option
            v-for="item in subjectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="description" label="自我描述">
        <el-input
          type="textarea"
          v-model="ReginForm.description"
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
          注册
        </el-button>
        <el-button
          type="primary"
          class="resetBtn"
          round
          @click.native.prevent="reset">
          重置
        </el-button>
        <hr>
        <p>已经有账号，马上去<span class="to" @click="tologin">登录</span></p>
      </el-form-item>

    </el-form>
  </el-main>
</template>
<script>
  export default {
    data () {
      let confirmpasswordCheck = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('密码是必须的'))
        } else if (value !== this.ReginForm.password) {
          return callback(new Error('两次输入的密码不一致'))
        } else {
          return callback()
        }
      }
      return {
        subjectOptions: [],
        ReginForm: {
          username: '',
          password: '',
          confirmpassword: '',
          birthday: '',
          sex: 'false',
          school: '',
          identity: 0,
          direction: '',
          expectation: '',
          description: ''
        },
        logining: false,
        rule: {
          username: [
            {
              required: true,
              max: 14,
              min: 2,
              message: '用户名是必须的，长度为2-14位',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '密码是必须的！',
              trigger: 'blur'
            }
          ],
          confirmpassword: [
            {
              required: true,
              validator: confirmpasswordCheck,
              trigger: 'blur'
            }
          ]
        }
      }
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
      submit () {
        this.$refs.ReginForm.validate(valid => {
          if (valid) {
            this.$api.studentRegister(this.ReginForm)
              .then(() => {
                this.$router.push({ path: '/login' });
              })
              .catch((error) => {
                alert(error);
              });
          } else {
            alert('submit err')
          }
          this.$router.push('/');
        })
      },
      reset () {
        this.$refs.ReginForm.resetFields()
      },
      tologin () {
        this.$router.push('/login')
      }
    },
    created () {
      this.getSubject();
    }
  }
</script>

<style scoped>
  .regform {
    margin: 20px auto;
    width: 315px;
    background: #fff;
    box-shadow: 0 0 10px #B4BCCC;
    padding: 30px 30px 0 30px;
    border-radius: 25px;
  }
  .submitBtn {
    width: 45%;
  }
  .to {
    color: #FA5555;
    cursor: pointer;
  }
</style>
