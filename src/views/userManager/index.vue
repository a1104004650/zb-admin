<template>
  <div class="zbc-container">
    
    <el-form :model="userListForm" :rules="rules" ref="userListForm">
      <el-row>
        <el-col :span="6">
            <el-form-item label="用户账号" :label-width="'80px'">
              <el-input v-model="userListForm.name" autocomplete="off" placeholder="请输入用户账号"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="用户邮箱" :label-width="'80px'">
              <el-input v-model="userListForm.email" autocomplete="off" placeholder="请输入用户邮箱"></el-input>
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

     <el-table
      :data="userDataList.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;" :border="true" :stripe="true" max-height="650px">
      <el-table-column
        label="用户编码"
        prop="userId">
      </el-table-column>
      <el-table-column
        label="用户名称"
        prop="userName">
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <!-- 状态按钮 -->
          <zbc-badge :theme="scope.row.accountStatus == '0'?'success':'error'" />
          {{ scope.row.accountStatus | userStatus}}
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

     <!-- 查看用户信息详细信息dialog -->
    <el-dialog title="用户权限信息调整" :visible.sync="dialogFormVisible" width="80%" :before-close="handleDialogClose">
      <el-form :model="form" :rules="rules" ref="form">

        <el-form-item label="用户账号" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off" ></el-input>
        </el-form-item>

        <el-form-item label="用户昵称" prop="realName" :label-width="formLabelWidth">
          <el-input v-model="form.realName" autocomplete="off" ></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off" ></el-input>
        </el-form-item>

        <el-form-item label="邮箱"  prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" ></el-input>
        </el-form-item>

        <el-form-item label="账号状态" :label-width="formLabelWidth">
          <el-select v-model="form.accountStatus" placeholder="请选择账号状态" >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户角色" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="请选择角色" @change="roleChange">
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属部门"  prop="departmentPosition"  :label-width="formLabelWidth">
          <el-select v-model="form.departmentPosition" placeholder="请选择部门">
              <el-option
                v-for="item in departmentList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>

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
        <el-button type="primary" @click="sureEditUserManage()">提 交</el-button>
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
import { SYS_QUERY_USER, SYS_QUERY_EDITUSER, SYSM_MENU_QUERYMENUS, SYS_GET_DEfFINE_ROLE, SYSM_USER_SAVEUSER, SYS_QUERY_EDITROLE,SYSM_USER_DELETEUSERDATA } from '@/api/api.js';
import { dbGet } from '@/libs/util.db';
import util from '@/libs/util.js';
import zbcBadge from '@/components/Badge';

export default {
  name: 'UserManager',
  components:{
    zbcBadge
  },
  data() {
     var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'));
     }
     let sectionUserPoListChecked=(rule, value, callback)=>{
          if(this.form.roles.length===0){
              return callback(new Error('请选择角色菜单'));
          }else{
              callback();
          }
    };
      return {
        userDataList: [],
        dialogFormVisible: false,
        form: {
          userName:'',
          userId:'',
          role:'',
          realName:'',
          sex:'',
          mobile:'',
          email:'',
          accountStatus:'',
          roleType:'',
          departmentPosition:'',
          roles: []
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户账号', trigger: 'blur' },
            { min: 6, max: 11, message: '账号长度必须是6-11个字符', trigger: 'blur' }
          ],
          realName: [
            {required:true,message:"用户昵称不能为空",trigger: 'blur'}
          ],
          email: [
            {required:true,message:"邮箱不能为空",trigger: 'blur'},
            {validator:checkEmail,trigger: 'blur'}
          ],
          departmentPosition: [
            { required: true, message: '请选择所属部门', trigger: 'change' }
          ],
          roles: [
             { required: true, validator: sectionUserPoListChecked, trigger: 'change' }
          ]
        },
        search:'',
        statusOptions:[{
          value: '0',
          label: '启动'
        },{
          value: '1',
          label: '禁用'
        }],
        departmentList:[{
            value: 'ADBA',
            label: '核心BA'
          }, {
            value: 'HABS',
            label: '健康管理业务人员'
          }, {
            value: 'VIPBS',
            label: 'VIP业务人员'
          }, {
            value: 'WXBS',
            label: '微信业务人员'
         }],
        userListForm: {
          name:'',
          email:''
        },
        formLabelWidth: '100px',
        roleOptions: [],
        menuTableData: [],
        menuData: [],
        defaultProps: {
          id: 'menuCode',
          children: 'childMenus',
          label: 'menuName'
        },
        defaultRoleList: []
      }
   },
  async created() {
    this.userDataList = await SYS_QUERY_USER({"username":dbGet({path:"userInfo",user:true}).userName,"email":""});
    this.menuData = await SYSM_MENU_QUERYMENUS();
    this.defaultRoleList = await SYS_GET_DEfFINE_ROLE();
    // 初始化系统预设角色
    let defaultRole = [];
    this.defaultRoleList.forEach(function(value) {
      let role = { 'value': value.roleId, 'label': value.roleName };
      defaultRole.push(role);
    });
    let diyRole = { 'value': '', 'label': '自定义角色' };
    defaultRole.push(diyRole);
    this.roleOptions =  defaultRole;
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = {
        userName: row.userName,
        userId: row.userId,
        realName: row.realName,
        role: '',
        email: row.email,
        mobile: row.mobile,
        departmentPosition: row.departmentPosition,
        roleType: '',
        accountStatus: row.accountStatus,
        roles: []
      }
      this.getUserInfo(this.form.userId);
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.form = {
          userName:'',
          userId:'',
          role:'',
          departmentPosition:'',
          email:'',
          mobile:'',
          roleType:'1',
          roles:[],
          accountStatus: '0'
      };
      // 下次dom渲染的时候执行，没什么用，就是为了不报错
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([]);
        this.changeTreeDisabled(false);
      });
    },
     handleDelete(index, row) {
        let vm = this;
        util.message.confirm({ message:"你确认要删除菜单吗？",title:"删除菜单",confirmButtonText:"确认",cancelButtonText:"取消",confirmCallback:function() {
          SYSM_USER_DELETEUSERDATA({ userId:row.userId }).then(res => {
            vm.userDataList.splice(index,1);
          });
        },type:"warning"});    
    },
    getUserInfo(userId) {
      let vm = this;
      SYS_QUERY_EDITUSER({ userId:userId }).then(res => {

        // 用户角色分类
        let defaultRole = '';
        let flag = false;
        vm.form.roleType = '1'; // 自定义角色
        for( let i = 0; i < vm.defaultRoleList.length ; i++ ) {
          if(vm.defaultRoleList[i].roleId == res.roles[0].roleId) {
            flag = true;
            defaultRole = res.roles[0].roleId;
            vm.form.roleType = '0'; // 系统角色
            break;
          }
        }

        this.changeTreeDisabled(flag);

        // 除了预设的角色显示，其它角色都是自定义角色
        vm.form.role = defaultRole;
        vm.form.roles = res;

        vm.chooseRoleTree(res.roles[0]);
      });
    },
    async roleChange(roleid) {
      // 如果为空那就是自定义角色
      console.log(roleid);
      let flag = false;
      this.form.roleType = '1';
      if(roleid) {
        this.form.roleType = '0';
        flag = true;
        let res = await this.getRoleInfo(roleid);
        this.chooseRoleTree(res);
      }

      this.changeTreeDisabled(flag);
    },
    sureEditUserManage() {
      let vm = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if(this.form.role) {
            this.form.roles = [{ "roleId" : this.form.role }];
          }else{
            this.form.roles = [{
              "roleName": this.form.userName,
              "resources": []
            }]

            let chooseRoleList = this.$refs.tree.getCheckedKeys();
            if(chooseRoleList) {
              for(let i = 0; i < chooseRoleList.length; i ++) {
                if(chooseRoleList[i]) {
                  this.form.roles[0].resources.push({ "resourceId": chooseRoleList[i] });
                }
              }
            }
          }

          let userInfo = {
            userId: this.form.userId,
            userName: this.form.userName,
            realName: this.form.realName,
            sex: this.form.sex,
            mobile: this.form.mobile,
            email: this.form.email,
            accountStatus: this.form.accountStatus,
            roleType: this.form.roleType,
            departmentPosition: this.form.departmentPosition,
            roles: this.form.roles
          };

          SYSM_USER_SAVEUSER( userInfo ).then(res => {
            SYS_QUERY_USER({"username":dbGet({path:"userInfo",user:true}).userName,"email":""}).then(res => {
              vm.userDataList = res;
              vm.dialogFormVisible = false;
            });
          });
          this.$refs['form'].resetFields();
        }else{
            console.log('error submit!!');
            return false;
        }
      })
    },
    async getRoleInfo(roleId) {
      return await SYS_QUERY_EDITROLE({ roleId:roleId });
    },
    chooseRoleTree(tree) {
      let checkValueList = [];
      for ( let k = 0; k < tree.resources.length ; k++ ) {
        checkValueList.push(tree.resources[k].resourceId);            
      }
      this.$refs.tree.setCheckedKeys(checkValueList);
    },
    changeTreeDisabled(flag) {
      this.menuData.map((item, index) => {
        this.$set(item, "disabled", flag);
        if(item && item.childMenus) {
          item.childMenus.map((childItem, index) => {
            this.$set(childItem, "disabled", flag);
          });
        }
      });
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