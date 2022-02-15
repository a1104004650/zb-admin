<template>
  <div>
    <i v-show="!asideCollapse" class="el-icon-s-fold expandBtn" @click="toggleAside()"></i>
    <i v-show="asideCollapse" class="el-icon-s-unfold shrinkBtn" @click="toggleAside()"></i>
    <el-menu :default-active="activeIndex" class="el-menu-demo ulMenu" mode="horizontal">
      <el-menu-item index="2"><i class="el-icon-s-home" @click="handleMenuSelect('portal')"></i>首页</el-menu-item>
    </el-menu>
    <div flex-box="0" class="d2-header-right">
        <!--上次登录时间-->
        <zbc-login-date/>
        <!--通知-->
        <zbc-header-bell />
        <!--待办事项-->
        <zbc-header-message />
        <!--日志-->
        <zbc-header-log />
        
        <user-drop class="userBtn" />
      </div>
  </div>
</template>

<style scoped>
.userBtn{
  float:right;
  margin-right:20px;
}
.expandBtn,.shrinkBtn{
    width: 60px;
    line-height: 60px;
    display: inherit;
    z-index: 1;
    position: absolute;
}
.ulMenu{
  padding-left: 60px;
}
.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom:0;
}
.d2-header-right{
  position: absolute;
  top: 0;
  right: 0;
}
</style>

<script>
import { mapState, mapActions } from "vuex";
import menuMixin from '../Mixin/menu';
import userDrop from '@/components/UserDropDown';
import zbcHeaderBell from '@/components/HeaderBell';
import zbcHeaderMessage from '@/components/HeaderMessage';
import zbcHeaderLog from '@/components/HeaderLog';
import zbcLoginDate from '@/components/LoginDate';

export default {
  mixins: [
    menuMixin
  ],
  components:{
    userDrop,
    zbcHeaderBell,
    zbcHeaderMessage,
    zbcHeaderLog,
    zbcLoginDate
  },
  data() {
    return {
      activeIndex: '2',
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px'
    };
  },
  computed: {
    ...mapState("storeModules/menu", {
      asideCollapse: state => state.asideCollapse
    })
  }, 
  methods: {
    ...mapActions('storeModules/menu', [
      'toggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    toggleAside () {
      this.toggle()
    }
  }
}
</script>