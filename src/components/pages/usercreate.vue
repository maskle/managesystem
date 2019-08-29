<template>
  <div class="createpage">
    <div class="ppropinfo">{{msg}}用户</div>
    <div class="createpprop">
      <el-form
        :model="user"
        status-icon
        :rules="rules"
        ref="user"
        label-width="100px"
        class="demo-user"
      >
        <el-form-item label="账号" prop="name">
          <el-input type="text" v-model="user.name" autocomplete="off" :disabled="isappear"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="user.pass" autocomplete="off" :disabled="isappear"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" v-if="!isappear" prop="confirm">
          <el-input type="password" v-model="user.confirm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="user.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio :disabled="isappear" v-model="user.sex" label="男">男</el-radio>
          <el-radio :disabled="isappear" v-model="user.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="身份证号" prop="idx">
          <el-input v-model="user.idx" :disabled="isappear"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="des">
          <el-input v-model="user.des"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-date-picker v-model="user.time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="summitbtn">
            <el-button type="primary" @click="create('user')" v-if="!isappear">添加</el-button>
            <el-button type="primary" @click="change('user')" v-if="isappear">修改</el-button>
            <el-button @click="backlist">返回</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
var uPattern = /^[a-zA-Z0-9_-]{4,12}$/;
var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z])[0-9a-z]*$/;
var curdate = new Date();
var mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
var cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请再次输入密码"));
      } else if (value !== this.user.pass) {
        return callback(new Error("两次输入密码不一致!"));
      } else {
        return callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入时间"));
      } else if (value > curdate) {
        return callback(new Error("不能超过当前时间"));
      } else {
        return callback();
      }
    };
    return {
      user: {
        name: "",
        pass: "",
        confirm: "",
        tel: "",
        email: "",
        sex: "",
        idx: "",
        des: "",
        time: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            type: "string",
            message: "4到12位数字字母组合",
            pattern: uPattern,
            trigger: "blur"
          }
        ],
        pass: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            type: "string",
            message: "密码长度6位以上，由数字字母组成，不能为纯数字或纯字母",
            pattern: pPattern,
            trigger: "blur"
          }
        ],
        confirm: [{ validator: validatePass2, trigger: "blur" }],
        prop: [{ required: true, message: "属性不能为空", trigger: "blur" }],
        time: [{ validator: validatePass3, trigger: "blur" }],
        tel: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          {
            type: "string",
            message: "请输入正确的手机号码",
            pattern: mPattern,
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "string",
            message: "请输入正确的邮箱地址",
            pattern: ePattern,
            trigger: "blur"
          }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        idx: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          {
            type: "string",
            message: "请输入正确的身份证号",
            pattern: cP,
            trigger: "blur"
          }
        ],
        des: [{ required: true, message: "备注不能为空", trigger: "blur" }]
      },
      isappear: false,
      msg: ""
    };
  },
  components: {},
  methods: {
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          delete this.user.confirm;
          this.axios({
            url: API.addUser,
            method: "get",
            params: this.user
          }).then(res => {
            if (res.data.isok) {
              this.$message({
                message: "新建用户成功",
                type: "success"
              });
              this.$router.replace("/index/user/userlist");
            } else {
              this.$message({
                message: res.data.info,
                type: "error"
              });
            }
          });
        } else {
          this.$message({
            message: "请输入正确的信息",
            type: "error"
          });
          return false;
        }
      });
    },
    backlist() {
      this.$router.go(-1);
    },
    change(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          delete this.user.confirm;
          this.axios({
            url: API.updateUser,
            method: "get",
            params: this.user
          }).then(res => {
            if (res.data.isok) {
              this.$message({
                message: "修改用户成功",
                type: "success"
              });
              this.$router.replace("/index/user/userlist");
            } else {
              this.$message({
                message: res.data.info,
                type: "error"
              });
            }
          });
        } else {
          this.$message({
            message: "请输入正确的信息",
            type: "error"
          });
          return false;
        }
      });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    var id = this.$route.query.id;
    if (id == 0) {
      this.isappear = false;
      this.msg = "新建";
    } else {
      this.msg = "修改";
      this.isappear = true;
      this.axios({
        url: API.findUser,
        method: "get",
        params: {
          id
        }
      }).then(res => {
        var arr = res.data.data[0];
        delete arr._id;
        this.user = arr;
      });
    }
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.createpprop {
  width: 80%;
  margin-left: 10%;
  box-sizing: border-box;
  padding-top: 20px;
}

.ppropinfo {
  font-size: 24px;
  line-height: 40px;
  margin: 10px 0 0 20px;
  color: $main-color;
}

.el-input-group__prepend {
  width: 100px !important;
}

.el-form-item>>>.el-form-item__label {
  color: #fff !important;
}

.el-form-item>>>.el-radio__label {
  color: #fff !important;
}

.el-date-editor {
  width: 100%;
}

.summitbtn {
  width: 180px;
  margin-left: 35%;
}

.createpage>>>.el-form-item__label {
  font-size: 18px;
}

.createpage>>>.el-form-item__error {
  font-size: 18px;
  color: red;
}

.createpage>>>button {
  font-size: 18px;
  font-family: 'kaiti';
}
</style>