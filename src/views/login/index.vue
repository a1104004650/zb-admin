<template>
  <div class="page">
          <div class="system">
              <h3>后台管理系统登录</h3>
              <div class="flex form">
                <div class="left center"><img src="../../assets/image/ht-left.png"></div>
                <div class="right">
                    <div class="logo"><img src="../../assets/image/logo.png"></div>
                    <el-form :model="formData" status-icon :rules="rules" ref="formData" class="login-form">

                      <el-form-item label="" prop="userName" required class="loginitem">
                         <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="formData.userName" ></el-input>
                      </el-form-item>

                      <el-form-item label="" prop="password" required class="loginitem">
                          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" type="password" v-model="formData.password" ></el-input>
                      </el-form-item>

                      <div class="forget"></div>
                      <div class="login"><a @click="submitForm()">登录</a></div>
                    </el-form>
                </div>
              </div>
        </div>
  </div>
</template>
<style lang="scss">
@import '~@/assets/style/login/style.scss';
@import '~@/assets/style/login/login.scss';

.loginitem{
  .el-input__inner{
    height: 50px!important;
    line-height: 50px!important;
    border-radius: 25px!important;
  }
  margin-bottom: 30px;
}
</style>

<script>
import { mapActions } from 'vuex';
import util from '@/libs/util.js';

  export default {
    name: "Login",
    data() {
      return {
        formData: {
          password: '',
          userName: ''
        },
        rules: {
          userName: [
            { required: true,message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true,message: '用户密码不能为空', trigger: 'blur' }
          ]
        }
      };

    },
    methods: {
      ...mapActions('storeModules/user', [
        'login'
      ]),
      submitForm() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.login({
              userName: this.formData.userName,
              password: this.formData.password
            }).then(() => {
              // 重定向对象不存在则返回顶层路径
              this.$router.push({name: 'Manage',query: {} })
            }).catch((res) => {
              util.message.pushMessage({ type:'warning', message:'接口异常，请联系系统管理员！'})
            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>