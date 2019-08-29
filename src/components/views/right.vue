<template>
  <div class="right_page" style="overflow:scroll">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  watch: {},
  computed: {},
  mounted() {}
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.right_page {
    flex 1
    height:100%
    // font-size:100px;
}
</style>