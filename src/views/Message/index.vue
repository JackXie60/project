<template>
  <div class="message-container" v-loading="isLoading" ref="mainContainer">
      <MessageArea @select="handleSelect" v-if="data.total" title="留言板" :isListLoading="isListLoading" :list="data.rows" :subTitle="data.total?`(${data.total})`:0"/>
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea';
import {postMessage,getMessage} from '@/api/message.js';
import { mapMutations, mapState } from 'vuex';
export default {
  components: {
    MessageArea,
  },
  computed: {
    ...mapState("message",["data","isLoading","isListLoading","page"])
  },
  async created () {
    this.$store.dispatch("message/setMessage");
  },
  methods: {
    ...mapMutations("message",["setMessage","setListLoading","addPage"]),
    async handleSelect(info,callback){
      const message = await postMessage(info);
      this.setMessage({
        total:this.data.total+1,
        rows:[
          message,
          ...this.data.rows,
        ]
      });
      callback("提交成功");
    },
    handleScroll(){
      this.$bus.$emit("mainScroll",this.$refs.mainContainer);
    },
    toTop(scrollTop){
      this.$refs.mainContainer.scrollTop = scrollTop;
    },
    async fetchMore(scrollDom){
      if(this.isListLoading||this.data.total<=this.data.rows.length){
        return;
      }
      if((scrollDom.scrollHeight-(scrollDom.scrollTop+scrollDom.clientHeight))<50){
        this.setListLoading(true);
        this.addPage()
        const message = await getMessage();
        console.log(message);
        this.setMessage({
          total:message.total,
          rows:[
            ...this.data.rows,
            ...message.rows,
          ]
        });
        this.setListLoading(false);
      }
      
    }
  },
  mounted () {
    this.$refs.mainContainer.addEventListener("scroll",this.handleScroll);
    this.$bus.$on("mainScroll",this.fetchMore);
    this.$bus.$on("setScrollTop",this.toTop)
  }
}
</script>

<style scoped>
.message-container{
  height: 100%;
  overflow-y: scroll;
  position: relative;
  scroll-behavior: smooth;
}
</style>