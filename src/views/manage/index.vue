<template>
  <el-container>
    <div class="el-aside">
      <Aside></Aside>
    </div>
    <el-container direction="vertical">
      <div class="d2-layout-header-aside-content" flex="dir:top">
        <el-header>
          <div  class="d2-theme-header">
              <Header></Header>
          </div>
        </el-header>
          <Main></Main>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/Header/index.vue";
import Aside from "@/components/Aside/index.vue";
import Main from "@/components/Main/index.vue";


export default {
  name: "Manage",
  components: {
    Header, Aside, Main
  }
};
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
.el-aside {
  background-color: rgb(84, 92, 100);
  border: 0;
  color: #333;
  text-align: center;
  line-height: 200px;
  overflow: unset;
}
.el-header {
    padding: 0;
}
.el-header, .el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color:white;
  color: #333;
  text-align: center;
  padding:0 0 0 0 ;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container {
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu {
    background-color: #e9eef3;
}
</style>
