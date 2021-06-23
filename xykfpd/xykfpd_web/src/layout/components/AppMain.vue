<template>
  <keep-alive :include="tagNames" ref="keppalig"
    ><router-view :key="key"
  /></keep-alive>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    key() {
      console.log(this.$route.fullPath);
      return this.$route.fullPath;
    },
    ...mapGetters(["tagNames"]),
  },
  mounted() {
    console.log(this.tagNames);
  },
};
</script>
