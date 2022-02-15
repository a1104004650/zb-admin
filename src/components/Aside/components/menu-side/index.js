import { mapState } from 'vuex';
import { createMenu } from '../libs/util.menu';
import menuMixin from '../../../Mixin/menu';
import { getAsideMenu } from '@/menu';
import { dbGet } from '@/libs/util.db';


export default {
  name: 'd2-layout-header-aside-menu-side',
  mixins: [ menuMixin ],
  render (h) {
    return <div class="d2-layout-header-aside-menu-side">
      <el-menu
        collapse={ this.asideCollapse }
        uniqueOpened={ true }
        defaultActive={ this.$route.fullPath }
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"
        ref="menu"
        class="el-menu-vertical-demo"
        onSelect={ this.handleMenuSelect }>
        { this.aside.map(menu => createMenu.call(this, h, menu)) }
      </el-menu>
      {
        this.aside.length === 0 && !this.asideCollapse
          ? <div class="d2-layout-header-aside-menu-empty" flex="dir:top main:center cross:center">
            
            <span>没有侧栏菜单</span>
          </div>
          : null
      }
    </div>
  },
  data () {
    return {
      asideHeight: 300,
      BS: null
    }
  },
  async created () {
    if(!this.aside || this.aside.length == 0){
      let menuAside = await getAsideMenu(dbGet({ path:'userInfo',user:true }).userId, dbGet({ path:'asideSet',user:true }));
      this.$store.commit('storeModules/menu/asideSet', menuAside);
    }
  },
  computed: {
    ...mapState('storeModules/menu', {
      // aside: state => getAsideMenu(dbGet({ path:'userId',user:true }).userId, dbGet({ path:'asideSet',user:true })),
      aside: state => state.aside,
      asideCollapse: state => state.asideCollapse
    })
  },
  watch: {
   
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
  }
}
