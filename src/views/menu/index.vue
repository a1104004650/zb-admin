<template>
  <div class="zbc-container">

    <el-form :model="menuListForm">
      <el-row>
        <el-col :span="6">
            <el-form-item label="菜单名称" :label-width="'80px'">
              <el-input v-model="menuListForm.name" autocomplete="off" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="菜单编码" :label-width="'80px'">
              <el-input v-model="menuListForm.code" autocomplete="off" placeholder="请输入菜单编码"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="3">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
         <el-col :span="9">
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </el-form>

    <!-- 菜单列表 -->
    <el-table
      :data="tableData"
      style="width: 100%" :border="true" :stripe="true" max-height="650px" :gutter="1">
      <el-table-column
        label="菜单编码"
        prop="menuId">
      </el-table-column>
      <el-table-column
        label="菜单名称"
        prop="menuName">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createdDateStr }}
        </template>
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入菜单名称关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看子菜单详细信息dialog -->
    <el-dialog title="菜单功能调整" :visible.sync="dialogFormVisible" width="80%" :before-close="handleDialogClose">
      <el-form :model="form" :rules="rules" ref="form">

        <el-form-item label="菜单名称" prop="name" :label-width="formLabelWidth" class="cdHeader">
          <el-input v-model="form.name" autocomplete="off" style="width:30%;" ></el-input>
        </el-form-item>

        <el-form-item label="icon图标" prop="menuIconPath" :label-width="formLabelWidth" class="cdHeader">
           <i v-show="form.menuIconPath" style="position: absolute;left: 7px;z-index: 1;"><i :class="form.menuIconPath"></i></i>
           <i v-show="!form.menuIconPath" style="position: absolute;left: 7px;z-index: 1;"><i class="el-icon-edit"></i></i>
           <el-select v-model="form.menuIconPath" placeholder="请选择icon图标" style="width:30%;">
                <el-option 
                   v-for="val in iconList" :key="val.order" :value="val.value" :label="val.value" >
                   <i :class="val.value">{{val.value}}</i>
                </el-option>
         </el-select>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth">
          <el-table :data="childTableData">
            <el-table-column
              label="菜单ID"
              prop="menuCode">
            </el-table-column>
            <el-table-column
              label="菜单名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.menuName" v-show="scope.row.show" placeholder="请输入菜单名称"></el-input>
                <span v-show="!scope.row.show">{{scope.row.menuName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="链接">
              <template slot-scope="scope">
                <el-input v-model="scope.row.linkUrl" v-show="scope.row.show" placeholder="请输入链接地址"></el-input>
                <span v-show="!scope.row.show">{{scope.row.linkUrl}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header">
                <el-button
                  size="small"
                  type="success"
                  icon="el-icon-plus"
                  @click="childHandleAdd()">添加</el-button>
              </template>
              <template slot-scope="scope">

                <el-button
                  v-show="!scope.row.show"
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="childHandleEdit(scope)" >编辑</el-button>

                <el-button
                  v-show="scope.row.show"
                  size="mini"
                  type="success"
                  icon="el-icon-circle-check"
                  @click="childHandleSure(scope)" >确认</el-button>

                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="childHandleDelete(scope)" >删除</el-button>

              </template>
            </el-table-column>
          </el-table>

        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-divider></el-divider>
        <el-button @click="cancelEditMessage()">取 消</el-button>
        <el-button type="primary" @click="sureEditMenu()">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-col{
  padding:0px 10px;
}
</style>

<script>
import { SYSM_MENU_QUERYMENUS, SYSM_MENU_GETEDITMENUS, SYSM_MENU_SAVEMENUS, SYSM_MENU_DELETEMAINMENU } from '@/api/api.js';
import util from '@/libs/util.js';

  export default {
    name: 'Menu',
    data() {
      return {
        tableData: [],
        childTableData: [ ],
        search: '',
        childSearch: '',
        dialogFormVisible: false,
        formLabelWidth: '100px',
        form:{
          name:'',
          menuCode:'',
          menuIconPath:''
        },
        menuListForm: {
          name:'',
          code:''
        },
        iconList:[
          {value:"el-icon-delete",label:"el-icon-delete"},
          {value:"el-icon-setting",label:"el-icon-setting"},
          {value:"el-icon-user-solid",label:"el-icon-user-solid"},
          {value:"el-icon-user",label:"el-icon-user"},
          {value:"el-icon-phone",label:"el-icon-phone"},
          {value:"el-icon-phone-outline",label:"el-icon-phone-outline"},
          {value:"el-icon-more",label:"el-icon-more"},
          {value:"el-icon-more-outline",label:"el-icon-more-outline"},
          {value:"el-icon-star-on",label:"el-icon-star-on"},
          {value:"el-icon-star-off",label:"el-icon-star-off"},
          {value:"el-icon-warning-outline",label:"el-icon-warning-outline"},
          {value:"el-icon-picture-outline",label:"el-icon-picture-outline"},
          {value:"el-icon-s-cooperation",label:"el-icon-s-cooperation"},
          {value:"el-icon-s-operation",label:"el-icon-s-operation"},
          {value:"el-icon-share",label:"el-icon-share"},
          {value:"el-icon-folder",label:"el-icon-folder"},
          {value:"el-icon-date",label:"el-icon-date"},
          {value:"el-icon-document",label:"el-icon-document"},
          {value:"el-icon-scissors",label:"el-icon-scissors"},
          {value:"el-icon-folder-opened",label:"el-icon-folder-opene"}
        ],
        rules:{
          name: [
            {required:true,message:"菜单名称不能为空",trigger: 'blur' }
          ],
          menuIconPath: [
            {required:true,message:"请选择菜单icon",trigger: 'change' }
          ]
        }
      }
    },
    async created() {
      this.tableData = await SYSM_MENU_QUERYMENUS();
      console.log(this.tableData);
    },
    methods: {
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.form.name = row.menuName;
        this.form.menuCode = row.menuCode;
        this.form.menuIconPath = row.menuIconPath;
        this.getEditMenu(row.menuId);
      },
      handleAdd() {
        this.dialogFormVisible = true;
        this.form = {};
        this.childTableData = [ ];
        this.dialogType = "add";
        if(this.$refs['form']) this.$refs['form'].resetFields();
       
      },
      handleDelete(index, row) {
        let vm = this;
        util.message.confirm({ message:"你确认要删除菜单吗？",title:"删除菜单",confirmButtonText:"确认",cancelButtonText:"取消",confirmCallback:function() {
          SYSM_MENU_DELETEMAINMENU({ menuId:row.menuId }).then(res => {
            vm.tableData.splice(index,1);
          });
        },type:"warning"});
        
      },
      childHandleEdit(scope) {
        this.$set(scope.row,"show",true);
      },
      childHandleDelete(scope) {
        let vm = this;
        util.message.confirm({ message:"你确认要删除菜单吗？",title:"删除菜单",confirmButtonText:"确认",cancelButtonText:"取消",confirmCallback:function() {
            vm.childTableData.splice(scope.$index,1);
        },type:"warning"});
      },
      // 获取点击菜单详细信息
      getEditMenu(menuId) {
        let vm = this;
        SYSM_MENU_GETEDITMENUS({ menuId:menuId }).then(res => {
          vm.childTableData = res.childMenus;
        });
      },
      childHandleSure(scope) {
        this.$set(scope.row,"show",false);
      },
      childMenuClick() {

      },
      // 增删改子菜单内容
      sureEditMenu() {
        let vm = this;
        this.$refs['form'].validate((valid) => {
          if(valid){
              SYSM_MENU_SAVEMENUS({ menuCode: this.form.menuCode, menuName: this.form.name, childMenus: this.childTableData,menuIconPath:this.form.menuIconPath}).then(res => {
                      SYSM_MENU_QUERYMENUS().then(res => {
                        vm.tableData = res;
                });
            });
            this.dialogFormVisible = false;
            this.$refs['form'].resetFields();
          }
        })
      },
      childHandleAdd() {
        if(!this.childTableData) this.childTableData = [];
        this.childTableData.push({ menuCode: null, menuName: "  ", linkUrl: "  " });
      },
      cancelEditMessage(){
        this.dialogFormVisible = false;
        this.$refs['form'].resetFields();
      },
      /**
      * 点击 X 关闭对话框的回调
      **/
      handleDialogClose() {
        this.dialogFormVisible = false;
        this.$refs['form'].resetFields();
      }
    }
  }
</script>
<style>
  .el-input--suffix .el-input__inner {
    padding-left: 24px!important;
  }
</style>