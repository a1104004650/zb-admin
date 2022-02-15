<template>
       <el-button class="loginBtn">{{loginDate}}</el-button>
</template>
<style scoped>
.loginDate{
    font-size: 14px;
    color: #909399;
}
.loginBtn{
    border: 0;
    background: #e9eef3;
    padding: 14px 12px;
}
</style>
<script>
export default {
    data(){
        return{
           loginDate:""
        }
    },
    created() {
       this.loginDate = this.dateUtil.XDate(new Date()).toString("yyyy-MM-dd HH:mm:ss");
    }
}
</script>