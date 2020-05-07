<template>
  <el-main>
    <el-form
      :model="ReginForm"
      ref="ReginForm"
      :rules="rule"
      class="regform"
      label-width="80px">

      <h3>教师注册</h3>

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
        <el-radio-group v-model="ReginForm.sex">
          <el-radio label="男" value=0></el-radio>
          <el-radio label="女" value=1></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="school" label="学校">
        <el-input
          type="text"
          v-model="ReginForm.school"
          placeholder="学校">
        </el-input>
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
        ReginForm: {
          username: '',
          password: '',
          confirmpassword: '',
          birthday: '',
          sex: 1,
          school: '',
          identity: 1,
          description: ''
        },
        logining: false,
        rule: {
          username: [
            {
              required: true,
              max: 14,
              min: 7,
              message: '用户名是必须的，长度为7-14位',
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
      // ...
      submit () {
        this.$refs.ReginForm.validate(valid => {
          if (valid) {
            this.logining = true
            this.$api.post('user/register', this.ReginForm, response => {
              if (response.status >= 200 && response.status < 300) {
                console.log(response.data);
              } else {
                console.log(response.message);
              }
            });
          } else {
            console.log('submit err')
          }
        })
      },
      reset () {
        this.$refs.ReginForm.resetFields()
      },
      tologin () {
        this.$router.push('/teacherLogin')
      }
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
