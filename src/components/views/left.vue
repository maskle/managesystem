<template>
  <div class="left_page" style="overflow-y:scroll">
    <router-link to="/index/manage/managelist" v-if="type==0" active-class="select">管理员管理</router-link>
    <router-link to="/index/user/userlist" v-if="type!=2" active-class="select">用户管理</router-link>
    <router-link to="/index/notice/noticelist" active-class="select">通知{{msg}}</router-link>
    <router-link to="/index/equipment/equipmentlist" active-class="select">设备{{msg}}</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type:'',
      msg:''
    };
  },
  components: {},
  methods: {},
  watch: {},
  computed: {},
  mounted() {
    this.type=sessionStorage.getItem("type");
    if(this.type!=2){
      this.msg="管理";
    }else{
      this.msg=""
    }
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.left_page {
  width: 200px;
  min-width 200px
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid $border-color3;
  padding-top:30px;
}

a {
  display: block;
  width 100%
  line-height 40px;
  font-size 24px;
  text-align center
  margin-top:10px;
  color:#fff
}
a:hover,.select{
    background $warming-color
    color:#fff
}
</style>