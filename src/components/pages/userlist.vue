<template>
  <div class="managelist">
    <h2 class="pagetitle">用户列表</h2>
    <el-button type="primary" class="addbtn" @click="add(0)" plain>添加</el-button>
    <el-table :data="userinfo" style="width: 90%;margin-left:5%;margin-top:30px;">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.idx }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.des }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生日" width="180">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.time | transformtime}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" class="controlbtn" label="操作" width="180">
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
      userinfo: []
    };
  },
  components: {},
  methods: {
    add(id) {
      this.$router.push("/index/user/usercreate?id=" + id);
    },
    handleEdit(id) {
      this.$router.push("/index/user/usercreate?id=" + id);
    },
    handleDelete(id) {
      this.$confirm("确定删除此用户？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            url: API.delUser,
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
                  url: API.findUser,
                  method: "get",
                  params: {}
                }).then(res => {
                  this.userinfo = res.data.data;
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
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.axios({
      url: API.findUser,
      method: "get",
      params: {}
    }).then(res => {
      this.userinfo = res.data.data;
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
  color: $success-color;
}

.addbtn {
  margin: 20px 0 0 20px;
  font-size: 18px;
  font-family: 'kaiti';
}

.el-table>>>.el-table__body-wrapper::-webkit-scrollbar {
  width: 12px;
  height: 12px;
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
  background: rgb(179, 216, 255);
  color: #303133;
  font-size: 18px;
  font-size: 18px;
  // color:$main-color
}

.managelist>>>td {
  background: rgb(179, 216, 255);
  font-size: 18px;
  font-size: 18px;
  color: #303133;
  // color:$main-color
}

.managelist>>>tr {
  // color: $main-color;
  font-size: 18px;
  color: #303133;
  background: rgb(179, 216, 255);
}

.managelist>>>.el-table__fixed-right::before {
  display: none;
}

.managelist>>>.el-table__fixed-right {
  border: none;
}

.managelist>>>.cell {
  line-height: 20px;
}

.managelist>>>button {
  font-size: 18px;
  font-family: 'kaiti';
}
</style>