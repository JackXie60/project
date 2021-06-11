<template>
  <div class="blogRight-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleClick" />
  </div>
</template>

<script>
import debounce from "@/util/debounce.js";
import RightList from "../Blog//component/RightList";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    RightList,
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  created() {
    this.setSelectDebounce = debounce(this.setSelect, 50);
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  destroyed() {
      this.$bus.$off("mainScroll",this.setSelectDebounce);
  },
  methods: {
    handleClick(item) {
      location.hash = item.anchor;
      console.log(this.tocWithSelect);
    },
    setSelect(scrollDom) {
      if (!scrollDom) {
        return;
      }
      this.activeAnchor = "";
      const range = 200;
      for (const dom of this.doms) {
        if (!dom) {
          continue;
        }
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          return;
        } else {
          this.activeAnchor = dom.id;
        }
      }
    },
  },
  computed: {
    tocWithSelect() {
      const getToc = (toc = []) => {
        return toc.map((t) => {
          return {
            ...t,
            isSelect: t.anchor === this.activeAnchor,
            children: getToc(t.children),
          };
        });
      };
      return getToc(this.list);
    },
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.list);
      return doms;
    },
  },
};
</script>

<style scoped lang="less">
.blogRight-container {
  padding: 20px;
}
</style>
