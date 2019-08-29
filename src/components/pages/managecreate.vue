<template>
  <div class="createpage">
    <div class="ppropinfo">{{msg}}管理员</div>
    <div class="createpprop">
      <el-form
        :model="user"
        :rules="rules"
        status-icon
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
        <el-form-item label="属性" prop="prop">
          <el-input v-model.number="user.prop"></el-input>
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
        prop: "",
        time: "",
        confirm: ""
      },
      // confirm: "",
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
        time: [{ validator: validatePass3, trigger: "blur" }]
      },

      msg: "",
      isappear: false
    };
  },
  components: {},
  methods: {
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          delete this.user.confirm;
          this.axios({
            url: API.addManage,
            method: "get",
            params: this.user
          }).then(res => {
            if (res.data.isok) {
              this.$message({
                message: "新建管理员成功",
                type: "success"
              });
              this.$router.replace("/index/manage/managelist");
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
            url: API.updateManage,
            method: "get",
            params: this.user
          }).then(res => {
            if (res.data.isok) {
              this.$message({
                message: "修改管理员成功",
                type: "success"
              });
              this.$router.replace("/index/manage/managelist");
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
        url: API.findManage,
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