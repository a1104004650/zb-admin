<template>
  <div class="zbc-container">
  <el-form :model="roleForm">
      <el-row>
        <el-col :span="6">
            <el-form-item label="角色名称" :label-width="'80px'">
              <el-input v-model="roleForm.name" autocomplete="off" placeholder="请输入角色名称"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="3">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        </el-col>
      </el-row>
  </el-form>

  <el-table
      :data="roleDataList.filter(data => !search || data.roleName.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;" :border="true" :stripe="true" max-height="650px">
      <el-table-column
        label="角色编码"
        prop="roleId">
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createdDateStr">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入角色名称关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index,scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

     <el-dialog 
        :title=" dialogType === 'add' ? '新增角色信息' : '角色信息调整'" 
        :visible.sync="dialogFormVisible" 
        width="80%"
        :before-close="handleDialogClose"
      >
      <el-form ref="form" :model="form" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="角色名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="form.name" :placeholder=" dialogType === 'add' ? '请输入角色名称' : '' " autocomplete="off" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <el-form-item label="角色描述" prop="description" :label-width="formLabelWidth">
                  <el-input v-model="form.description"  :placeholder=" dialogType === 'add' ? '请输入角色描述' : '' " autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <div class="el-tree-over">
          <el-form-item label="角色菜单" prop="roles" :label-width="formLabelWidth">
                <el-tree
                  :data="menuData"
                  empty-text="暂无数据"
                  show-checkbox
                  node-key="resourceId"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                  @check-change="changeTree()">
                </el-tree>
          </el-form-item>
        </div>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-divider></el-divider>
        <el-button @click="cancelEditMessage()">取 消</el-button>
        <el-button type="primary" @click="sureEditRole()">提 交</el-button>
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
import { SYS_QUERY_ROLES, SYS_QUERY_EDITROLE, SYS_DELETE_ROLE, SYS_SAVE_ROLE, SYSM_MENU_QUERYMENUS, SYS_GET_DEfFINE_ROLE} from '@/api/api.js';
import util from '@/libs/util.js';
export default {
  name: 'Role',
   data() {
      let sectionUserPoListChecked=(rule, value, callback)=>{
          if(this.form.roles.length===0){
              return callback(new Error('请选择角色菜单'));
          }else{
              callback();
          }
      };
      return {
        roleDataList: [],
        dialogFormVisible: false,
        formLabelWidth: '100px',
        roleInfoDetail: {},
        dialogType: "",//用于新增或者修改的判断
        search: "",
        menuData: [],
        form: {
          name:'',
          roleId:'',
          description:'',
          roles:[]
        },
        roleForm: {
          name:""
        },
        defaultProps: {
          id: 'resourceId',
          children: 'childMenus',
          label: 'menuName'
        },
        rules: {
          name: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ],
          description: [
            {required:true,message:"角色描述不能为空",trigger: 'blur'}
          ],
          roles: [
             { required: true, validator: sectionUserPoListChecked, trigger: 'change' }
          ]
        }
      }
   },
  async created() {
    this.roleDataList = await SYS_GET_DEfFINE_ROLE();
    this.menuData = await SYSM_MENU_QUERYMENUS();
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form.name = row.roleName;
      this.form.roleId = row.roleId;
      this.form.description = row.description;
      this.dialogType = 'edit';
      this.getRoleInfo(this.form.roleId);
    },
    handleDelete(index, row) {
        let vm = this;
        util.message.confirm({ message:"你确认要删除菜单吗？",title:"删除菜单",confirmButtonText:"确认",cancelButtonText:"取消",confirmCallback:function() {
          SYS_DELETE_ROLE({ roleId:row.roleId }).then(res => {
            vm.roleDataList.splice(index, 1);
          });
        },type:"warning"});    
    },
    getRoleInfo(roleId){
      SYS_QUERY_EDITROLE({ roleId:roleId }).then(res => {
          console.log(res);
          this.roleInfoDetail = res;
          let checkValueList = [];
          for ( let k = 0; k < this.roleInfoDetail.resources.length ; k++ ) {
              checkValueList.push(this.roleInfoDetail.resources[k].resourceId);            
          }
          this.$refs.tree.setCheckedKeys(checkValueList);
      });
    },
    handleAdd(){
      this.dialogType = 'add';
      this.dialogFormVisible = true;
      this.form.name = "";
      this.form.roleId = "";
      this.form.description = "";
      this.form.roles = [];
      if(this.$refs.tree){
          this.$refs.tree.setCheckedKeys([]);
      }
    },
   sureEditRole(){
        let vm = this;
        let permissionList = this.$refs.tree.getCheckedKeys().filter(item => item);  
        let newArr = permissionList.map(item => {return {'resourceId': item}})
         console.log(newArr);
         let data ={
                      'roleName':this.form.name,
                      'resources':newArr,
                      'description':this.form.description
                      }
         if(this.dialogType == 'edit'){
            data.roleId = this.form.roleId;
         }
        this.$refs['form'].validate((valid) => {
          if (valid) {
            SYS_SAVE_ROLE(data).then(res =>{
                SYS_GET_DEfFINE_ROLE().then(data => {
                  vm.roleDataList = data;
                  this.dialogFormVisible = false;
                });
            })
            this.$refs['form'].resetFields();
          }else{
            console.log('error submit!!');
            return false;
          }
        })
    },
    changeTree(){
      let roles = this.$refs.tree.getCheckedNodes();
      this.form.roles.length = roles.length;
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
