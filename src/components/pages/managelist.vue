<template>
  <div class="managelist">
    <h2 class="pagetitle">管理员列表</h2>
    <el-button type="primary" class="addbtn" @click="add(0)" plain>添加</el-button>
    <el-table :data="manageinfo" style="width: 90%;margin-left:5%;margin-top:30px;">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.time | transformtime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="属性">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.prop }}</span>
        </template>
      </el-table-column>
      <el-table-column  width="180" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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
      manageinfo: []
    };
  },
  components: {},
  methods: {
    add(id) {
      this.$router.push("/index/manage/managecreate?id=" + id);
    },
    handleEdit(id) {
      this.$router.push("/index/manage/managecreate?id=" + id);
    },
    handleDelete(id) {
      this.$confirm("确定删除此管理员？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            url: API.delManage,
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
                  url: API.findManage,
                  method: "get",
                  params: {}
                }).then(res => {
                  this.manageinfo = res.data.data;
                })
              );
            } else {
              this.$message(
                {
                  type: "error",
                  message: res.data.info
                }
              );
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.axios({
      url: API.findManage,
      method: "get",
      params: {}
    }).then(res => {
      this.manageinfo = res.data.data;
    });
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.pagetitle {
  font-size: 24px;
  line-height: 40px;
  margin: 10px 0 0 20px;
  color: $success-color
}

.addbtn {
  margin: 20px 0 0 20px;
  font-size 18px;
  font-family:"kaiti"
}
.managelist>>>.el-table{
  background rgba(0,0,0,0)
  font-size 18px;
}
.managelist>>>.el-table__header-wrapper{
  background rgba(0,0,0,0)
  font-size 18px;
}
.managelist>>>.el-table__body-wrapper{
  background rgba(0,0,0,0)
  font-size 18px;
}
.managelist>>>thead{
  background rgba(0,0,0,0)
  font-size 18px;
}
.managelist>>>tbody{
  background rgba(0,0,0,0)
  font-size 18px;
}
.managelist>>>th{
  background rgba(0,0,0,0)
  color: #303133;
  font-size 18px;
  //   font-size 18px;
  // color: #fff; text-shadow:0 0 5px #CCCCCC, 0 0 10px #CCCCCC, 0 0 15px #CCCCCC, 0 0 20px #095816, 0 0 25px #095816, 0 0 30px #095816, 0 0 50px #095816, 0 0 80px #095816, 0 0 100px #095816, 0 0 150px #095816
}
.managelist>>>td{
  background rgba(0,0,0,0)
  font-size 18px;
  color: #303133;
  //   font-size 18px;
  // color: #fff; text-shadow:0 0 5px #CCCCCC, 0 0 10px #CCCCCC, 0 0 15px #CCCCCC, 0 0 20px #095816, 0 0 25px #095816, 0 0 30px #095816, 0 0 50px #095816, 0 0 80px #095816, 0 0 100px #095816, 0 0 150px #095816
}
.managelist>>>tr{
  background rgba(0,0,0,0)
  // color green
  font-size 18px;
  color: #303133;
  // text-shadow:0 0 5px #CCCCCC, 0 0 10px #CCCCCC, 0 0 15px #CCCCCC, 0 0 20px #095816, 0 0 25px #095816, 0 0 30px #095816, 0 0 50px #095816, 0 0 80px #095816, 0 0 100px #095816, 0 0 150px #095816
}
.managelist>>>button {
  font-size: 18px;
  font-family "kaiti"
}
</style>