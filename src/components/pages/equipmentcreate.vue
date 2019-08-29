<template>
  <div class="createpage">
    <div class="ppropinfo">{{msg}}设备</div>
    <div class="createpprop">
      <el-form
        :model="equipment"
        status-icon
        ref="equipment"
        :rules="rules"
        label-width="100px"
        class="demo-equipment"
      >
        <el-form-item label="ip" prop="ip">
          <el-input type="text" v-model="equipment.ip" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="机房" prop="door">
          <el-input type="text" v-model="equipment.door" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编号" v-if="!isappear" prop="num">
          <el-input type="text" v-model="equipment.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="带宽" prop="width">
          <el-input type="text" v-model="equipment.width" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="equipment.status" label="空闲">空闲</el-radio>
          <el-radio v-model="equipment.status" label="已出售">已出售</el-radio>
        </el-form-item>
        <el-form-item>
          <div class="summitbtn">
            <el-button type="primary" @click="create('equipment')" v-if="!isappear">添加</el-button>
            <el-button type="primary" @click="change('equipment')" v-if="isappear">修改</el-button>
            <el-button @click="backlist">返回</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
var ipP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
var posPattern = /^\d+$/;
var pos1Pattern = /^\d+(M|KB|G)$/;
export default {
  data() {
    return {
      equipment: {},
      rules: {
        ip: [
          { required: true, message: "ip地址不能为空", trigger: "blur" },
          {
            type: "string",
            pattern: ipP,
            message: "请输入正确的ip地址",
            trigger: "blur"
          }
        ],
        door: [
          { required: true, message: "机房不能为空", trigger: "blur" },
          {
            type: "string",
            message: "请输入正整数",
            pattern: posPattern,
            trigger: "blur"
          }
        ],
        num: [
          { required: true, message: "编号不能为空", trigger: "blur" },
          {
            type: "string",
            message: "请输入正整数",
            pattern: posPattern,
            trigger: "blur"
          }
        ],
        width: [
          { required: true, message: "带宽不能为空", trigger: "blur" },
          {
            type: "string",
            message: "请输入带宽，例如“1M/KB/G”",
            pattern: pos1Pattern,
            trigger: "blur"
          }
        ],
        status: [{ required: true, message: "状态不能为空", trigger: "blur" }]
      },
      isappear: false,
      msg: "",
      confirm: ""
    };
  },
  components: {},
  methods: {
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios({
            url: API.addEquipment,
            method: "get",
            params: this.equipment
          }).then(res => {
            if (res.data.isok) {
              this.$message({
                message: "新建设备成功",
                type: "success"
              });
              this.$router.replace("/index/equipment/equipmentlist");
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
            url: API.updateEquipment,
            method: "get",
            params: this.equipment
          }).then(res => {
            if (res.data.isok) {
              this.$message({
                message: "修改设备成功",
                type: "success"
              });
              this.$router.replace("/index/equipment/equipmentlist");
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
        url: API.findEquipment,
        method: "get",
        params: {
          id
        }
      }).then(res => {
        var arr = res.data.data[0];
        delete arr._id;
        this.equipment = arr;
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