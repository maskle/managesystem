<template>
 <div>
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
  mounted(){},
  beforeRouteEnter (to, from, next) {
    if(sessionStorage.getItem("type")!=2){
      next();
    }
    else{
      next("/login")
    }
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl'
</style>