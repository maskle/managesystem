<template>
  <div class="index_page" style="overflow:scroll">
    <v-header></v-header>
    <div class="main">
      <v-left></v-left>
      <v-right></v-right>
    </div>
  </div>
</template>
<script>
import vHeader from "../views/header";
import vRight from "../views/right";
import vLeft from "../views/left";
export default {
  data() {
    return {};
  },
  components: {
    vHeader,
    vRight,
    vLeft
  },
  methods: {},
  watch: {},
  computed: {},
  mounted() {},
  beforeRouteEnter(to, from, next) {
    // if (to.path.indexOf("/index")==0) {
    //   next();
    // }
    if (from.path == "/login"||to.path.indexOf("/index")==0) {
        if (sessionStorage.getItem("type")) {
          next();
        } else {
          next("/login");
        }
      } else {
        next("/login");
      }
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.index_page {
  position: fixed;
  width: 100vw;
  height: 100%;
  left: 0;
  top: 0px;
  display: flex;
  flex-direction: column;
  background: url('../../assets/images/indexbg1.jpg') center center no-repeat;
  background-size: cover;
}

.main {
  // height 1000px;
  flex: 1;
  width: 100vw;
  display: flex;
}
</style>