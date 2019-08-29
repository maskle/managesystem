<template>
  <div class="managelist">
    <h2 class="pagetitle">设备列表</h2>
    <el-button type="primary" class="addbtn" v-if="type!=2" @click="add(0)" plain>添加</el-button>
    <el-table :data="equipmentinfo" style="width: 90%;margin-left:5%;margin-top:30px;">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="ip" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机房">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.door }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="带宽">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.width }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="type==2"
            :disabled="scope.row.status=='已出售'"
            @click="handlebuy(scope.row.id)"
          >{{btnmsg}}</el-button>
          <el-button size="mini" v-if="type!=2" @click="handleEdit(scope.row.id)">{{btnmsg}}</el-button>
          <el-button size="mini" type="danger" v-if="type!=2" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import API from "../../common/js/api";
export default {
  data() {
    return {
      equipmentinfo: [],
      type: "",
      btnmsg: ""
    };
  },
  components: {},
  methods: {
    add(id) {
      this.$router.push("/index/Equipment/Equipmentcreate?id=" + id);
    },
    handleEdit(id) {
      this.$router.push("/index/Equipment/Equipmentcreate?id=" + id);
    },
    handleDelete(id) {
      this.$confirm("确定删除此设备？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            url: API.delEquipment,
            method: "get",
            params: { id }
          }).then(res => {
            if (res.data.isok) {
              this.$message(
                {
                  type: "success",
                  message: "删除成功!"
                },
                this.axios({
                  url: API.findEquipment,
                  method: "get",
                  params: {}
                }).then(res => {
                  this.equipmentinfo = res.data.data;
                })
              );
            } else {
              this.$message({
                type: "error",
                message: res.data.info
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handlebuy(id) {
      this.axios({
        url: API.findEquipment,
        method: "get",
        params: { id }
      }).then(res => {
        var curdata = res.data.data[0];
        curdata.status = "已出售";
        delete curdata._id;
        this.axios({
          url: API.updateEquipment,
          method: "get",
          params: curdata
        }).then(res => {
          if (res.data.isok) {
            this.$message(
              {
                type: "success",
                message: "购买成功!"
              },
              this.axios({
                url: API.findEquipment,
                method: "get",
                params: {}
              }).then(res => {
                this.equipmentinfo = res.data.data;
              })
            );
          } else {
            this.$message({
              type: "error",
              message: "购买失败！"
            });
          }
        });
      });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.type = sessionStorage.getItem("type");
    this.axios({
      url: API.findEquipment,
      method: "get",
      params: {}
    }).then(res => {
      this.equipmentinfo = res.data.data;
    });
    if (this.type != 2) {
      this.btnmsg = "编辑";
    } else {
      this.btnmsg = "购买";
    }
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.pagetitle {
  font-size: 24px;
  line-height: 40px;
  margin: 10px 0 0 20px;
  color: $success-color;
}

.addbtn {
  margin: 10px 0 0 20px;
  font-size: 18px;
  font-family: 'kaiti';
}

.managelist>>>.el-table {
  background: rgba(0, 0, 0, 0);
  font-size: 18px;
}

.managelist>>>.el-table__header-wrapper {
  background: rgba(0, 0, 0, 0);
  font-size: 18px;
}

.managelist>>>.el-table__body-wrapper {
  background: rgba(0, 0, 0, 0);
  font-size: 18px;
}

.managelist>>>thead {
  background: rgba(0, 0, 0, 0);
  font-size: 18px;
}

.managelist>>>tbody {
  background: rgba(0, 0, 0, 0);
  font-size: 18px;
}

.managelist>>>th {
  background: rgba(0, 0, 0, 0);
  color: #303133;
  font-size: 18px;
  // font-size 18px;
  // color: #fff; text-shadow:0 0 5px #CCCCCC, 0 0 10px #CCCCCC, 0 0 15px #CCCCCC, 0 0 20px #095816, 0 0 25px #095816, 0 0 30px #095816, 0 0 50px #095816, 0 0 80px #095816, 0 0 100px #095816, 0 0 150px #095816
}

.managelist>>>td {
  background: rgba(0, 0, 0, 0);
  font-size: 18px;
  color: #303133;
  // font-size 18px;
  // color: #fff; text-shadow:0 0 5px #CCCCCC, 0 0 10px #CCCCCC, 0 0 15px #CCCCCC, 0 0 20px #095816, 0 0 25px #095816, 0 0 30px #095816, 0 0 50px #095816, 0 0 80px #095816, 0 0 100px #095816, 0 0 150px #095816
}

.managelist>>>tr {
  background: rgba(0, 0, 0, 0);
  // color green
  font-size: 18px;
  color: #303133;
  // text-shadow:0 0 5px #CCCCCC, 0 0 10px #CCCCCC, 0 0 15px #CCCCCC, 0 0 20px #095816, 0 0 25px #095816, 0 0 30px #095816, 0 0 50px #095816, 0 0 80px #095816, 0 0 100px #095816, 0 0 150px #095816
}
.managelist>>>button {
  font-size: 18px;
  font-family "kaiti"
}
</style>