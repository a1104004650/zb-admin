<template>
    <el-dropdown>
        <el-button type="primary">
            <i class="el-icon-user-solid"></i>
            {{ userName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-custom" @click.native="handleMenuSelect('userInfo')">用户信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-error" divided @click.native="loginOut()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<style scoped>
  .el-button--primary {
    color: #909399!important;
    background-color: #e9eef3!important;
    border-color: #e9eef3!important;
  }
</style>
<script>
import { mapActions } from 'vuex'
import util from '@/libs/util.js';
import menuMixin from '../Mixin/menu';

export default {
    mixins: [
      menuMixin
    ],
    data() {
      return {
        userName: util.cookies.get('userInfo').userName || '游客'
      };
    },
    methods: {
    ...mapActions('storeModules/user', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    loginOut () {
      this.logout()
    }
  }
}
</script>