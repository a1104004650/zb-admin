<template>
  <div class="d2-theme-container" flex-box="1" flex>
    <div class="d2-theme-container-main" flex-box="1" flex>
      <transition name="fade-scale">
        <div class="d2-theme-container-main-layer" flex="dir:top" style="background: #f8f9fb;">
        <!-- tab -->
          <div class="d2-theme-container-main-header" flex-box="0"> 
            <d2-tabs/>
          </div>
            <!-- 页面 -->
            <div class="d2-theme-container-main-body" flex-box="1">
              <transition :name="'fade-transverse'">
                <keep-alive :include="keepAlive">
                  <router-view :key="routerViewKey" />
                </keep-alive>
              </transition>
            </div>
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
import d2Tabs from '@/components/Tabs';
import { mapState } from 'vuex'

export default {
  name: 'mainindex',
  components: {
    d2Tabs
  },
  data() {
    return{};
  },
  computed: {
    ...mapState('storeModules', {
      keepAlive: state => state.page.keepAlive
    }),
    /**
     * @description 用来实现带参路由的缓存
     */
    routerViewKey () {
      // 默认情况下 key 类似 __transition-n-/foo
      // 这里的字符串操作是为了最终 key 的格式和原来相同 类似 __transition-n-__stamp-time-/foo
      const stamp = this.$route.meta[`__stamp-${this.$route.path}`] || ''
      return `${stamp ? `__stamp-${stamp}-` : ''}${this.$route.path}`
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';

.d2-theme-container-main-body{
  background: #f0f0f0;
  padding: 10px;
}
</style>
