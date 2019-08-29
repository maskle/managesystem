<template>
<div></div>
</template>

<script>
export default {
  methods:{
     quit(){
      this.$confirm("立即退出登录？！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          },this.$router.replace("/login"));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
  }
  },
  mounted(){
      this.$confirm("立即退出登录？！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          },this.$router.replace("/login"));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
  }
};
</script>
<style scoped>

</style>