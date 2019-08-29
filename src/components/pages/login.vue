<template>
  <div class="loginpage">
    <div class="login_container">
      <h2 class="login_info">登录</h2>
      <div class="center_item">
        <el-select class="type_select" v-model="user.type" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.type"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input placeholder="请输入账号" v-model="user.name" clearable></el-input>
        <el-input placeholder="请输入密码" v-model="user.pass" clearable show-password></el-input>
        <el-button type="primary" plain @click="login">登录</el-button>
      </div>
    </div>
    <el-alert :title="info.content" type="warning" v-show="info.isappear" show-icon></el-alert>
  </div>
</template>
<script>
import API from "../../common/js/api";
export default {
  data() {
    return {
      options: [
        {
          type: 0,
          value: 0,
          label: "超级管理员"
        },
        {
          type: 1,
          value: 1,
          label: "普通管理员"
        },
        {
          type: 2,
          value: 2,
          label: "用户"
        }
      ],
      user: {
        type: "",
        name: "",
        pass: ""
      },
      info: {
        isappear: false,
        content: ""
      }
    };
  },
  components: {},
  methods: {
    login() {
      this.axios({
        url: API.login,
        method: "post",
        data: this.qs.stringify(this.user)
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: "登陆成功",
            type: "success"
          });
          sessionStorage.setItem("type", this.user.type);
          //   this.$router.replace("/index")
          sessionStorage.setItem("name", this.user.name);
          this.$router.replace("/index")
        } else {
          this.$message({
            message: res.data.info,
            type: "warning"
          });
        }
      });
    }
  },
  watch: {},
  computed: {},
  mounted() {},
  beforeRouteEnter (to, from, next) {
    sessionStorage.removeItem("type");
    next();
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.loginpage {
  width: 100vw;
  height: 100vh;
  background: url('../../assets/images/bg.jpg') center center no-repeat;
  background-size: cover;
}

.login_container {
  width: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px $border-color1 solid;
  min-height: 300px;
  background: rgba(0, 0, 0, 0.1);
}

.login_info {
  text-align: center;
  font-size: 30px;
  line-height: 60px;
  color: $warming-color;
  border-bottom: 1px solid $border-color2;
}

.center_item {
  position: absolute;
  left: 50%;
  margin-top: 90px;
  transform: translate(-50%, -50%);
}

.el-select, .el-input {
  width: 100%;
  margin-top: 20px;
}

.el-button {
  position: absolute;
  left: 50%;
  margin-top: 10px;
  transform: translateX(-50%);
}

.el-alert {
  width: 400px;
  // margin-top:30px
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
}
</style>