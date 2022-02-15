<template>
  <el-col :span="24">
    <router-link
              to="/portal"
              flex-box="0">
              <img v-if="!this.asideCollapse" :src="asideMidImage" style="margin:20px 20px;width: 140px;">
              <img v-else :src="asideSmallImage" class="asid-S" style="padding: 8px 0;">
    </router-link>
          <div flex-box="0"
              ref="aside"
              :class="{'d2-theme-container-aside': true, 'd2-theme-container-transition': asideTransition}"
              >
              <d2-menu-side/>
          </div>
  </el-col>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
.el-submenu {
  text-align: left;
}
.el-menu-item {
  text-align: left;
}
.el-menu {
    border-right: 0;
}
.el-aside {
    background-color: #304156!important;
    line-height: normal!important;;
}
.asid-S{
    width: 30px;
    margin-top: 10px;
}
</style>

<script>
import d2MenuSide from './components/menu-side'
import { mapState } from "vuex";

export default {
  data() {
    return {
      menu: [],
      asideMidImage: require('@/assets/image/allianz-M.png'),
      asideSmallImage: require('@/assets/image/allianz-S.png')
    };
  },
  components:{
    d2MenuSide
  },
  computed: {
    ...mapState("storeModules/menu", {
      asideCollapse: state => state.asideCollapse,
      asideTransition: state => state.asideTransition
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>