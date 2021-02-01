<template>
  <div class="left-menu">
    <div style="width: 180px">
      <a-menu
        :default-selected-keys="[
          $router.currentRoute.matched[1] ? $router.currentRoute.matched[1].name : ''
        ]"
        :default-open-keys="[$router.currentRoute.matched[0].name]"
        mode="inline"
        theme="dark"
        :inline-collapsed="$store.state.collapsed"
      >
        <template v-for="menuItem in menuRoutes">
          <a-sub-menu :key="menuItem.name" v-if="menuItem.meta.hidden === false">
            <span slot="title"
              ><a-icon type="mail" /><span>{{ menuItem.meta.title }}</span></span
            >
            <template v-for="menuChild in menuItem.children">
              <a-menu-item :key="menuChild.name" v-if="menuChild.meta.hidden === false">
                <router-link :to="{ name: menuChild.name }"></router-link>
                {{ menuChild.meta.title }}
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      menuRoutes: (state) => state.menuRoutes,
    }),
  },
};
</script>

<style lang="less">
.left-menu {
  display: inline-block;
  width: 180px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  .ant-menu {
    height: 100vh;
  }
}
</style>
