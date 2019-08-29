<template>
  <div class="createpage">
    <div class="ppropinfo">{{msg}}通知</div>
    <div class="createpprop">
      <el-form
        :model="notice"
        status-icon
        :rules="rules"
        ref="notice"
        label-width="100px"
        class="demo-notice"
      >
        <el-form-item label="标题" prop="tit">
          <el-input
            type="text"
            v-model="notice.tit"
            autocomplete="off"
            placeholder="请输入标题"
            :disabled="type==2"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="con">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="通知内容"
            v-model="notice.con"
            :disabled="type==2"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-date-picker v-model="notice.time" type="date" placeholder="选择日期" :disabled="type==2"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="summitbtn">
            <el-button type="primary" @click="create('notice')" v-if="!isappear">添加</el-button>
            <el-button
              type="primary"
              @click="change('notice')"
              v-if="isappear"
              :disabled="type==2"
            >修改</el-button>
            <el-button @click="backlist">返回</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
var curdate = new Date();
export default {
  data() {
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
      notice: {
        tit: "",
        con: "",
        time: ""
      },
      rules: {
        tit: [{ required: true, message: "通知标题不能为空", trigger: "blur" }],
        con: [{ required: true, message: "通知内容不能为空", trigger: "blur" }],
        time: [{ validator: validatePass3, trigger: "blur" }]
      },
      msg: "",
      isappear: false,
      type: ""
    };
  },
  components: {},
  methods: {
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios({
            url: API.addNotice,
            method: "get",
            params: this.notice
          }).then(res => {
            if (res.data.isok) {
              this.$message({
                message: "新建通知成功",
                type: "success"
              });
              this.$router.replace("/index/notice/noticelist");
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
          this.axios({
            url: API.updateNotice,
            method: "get",
            params: this.notice
          }).then(res => {
            if (res.data.isok) {
              this.$message({
                message: "修改通知成功",
                type: "success"
              });
              this.$router.replace("/index/notice/noticelist");
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
    this.type = sessionStorage.getItem("type");
    if (id == 0) {
      this.isappear = false;
      this.msg = "新建";
    } else {
      if (this.type == 2) {
        this.msg = "查看";
      } else {
        this.msg = "修改";
      }
      this.isappear = true;
      this.axios({
        url: API.findNotice,
        method: "get",
        params: {
          id
        }
      }).then(res => {
        var arr = res.data.data[0];
        delete arr._id;
        this.notice = arr;
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
  color: $main-color
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