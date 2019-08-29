<template>
  <div class="header">
    <h2 class="author">中公吴彦祖</h2>
    <div class="curinfo">
      <div class="header_photo"></div>
      <span class="welcome">欢迎您，{{name}}</span>
      <el-button type="danger" size="small" @click="quit" plain>退出登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  components: {},
  methods: {
    quit() {
      this.$confirm("立即退出登录？！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          this.$router.replace("/login");
          sessionStorage.removeItem("type");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.name = sessionStorage.getItem("name");
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.header {
  // background: url('../../assets/images/welcome.jpg') center center no-repeat;
  // background-size: cover;
  height: 100px;
  width: 100vw;
  box-sizing: border-box;
  border-bottom: 1px solid $border-color2;
}

.author {
  line-height: 100px;
  font-size: 40px;
  margin-left: 20px;
  color: $warming-color;
  float: left;
}

.curinfo {
  float: right;
  height: 100px;
}

.header_photo {
  width: 60px;
  height: 60px;
  margin-top: 20px;
  float: left;
  border-radius: 50%;
  background: url('../../assets/images/headphoto.jpg') center center no-repeat;
  background-size: 100% 100%;
  margin-right: 30px;
}

.welcome {
  float: left;
  font-size: 24px;
  line-height: 100px;
  margin-right: 20px;
  color: $success-color;
  font-family: 'kaiti';
}

.el-button {
  float: left;
  margin-top: 34px;
  margin-right: 30px;
}
</style>