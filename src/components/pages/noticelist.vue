<template>
  <div class="managelist">
    <h2 class="pagetitle">消息列表</h2>
    <el-button type="primary" class="addbtn" v-if="type!=2" @click="add(0)" plain>添加</el-button>
    <el-table :data="noticeinfo" style="width: 90%;margin-left:5%;margin-top:30px;">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.tit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.time | transformtime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">{{btnmsg}}</el-button>
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
      noticeinfo: [],
      type: "",
      btnmsg: ""
    };
  },
  components: {},
  methods: {
    add(id) {
      this.$router.push("/index/notice/noticecreate?id=" + id);
    },
    handleEdit(id) {
      this.$router.push("/index/notice/noticecreate?id=" + id);
    },
    handleDelete(id) {
      this.$confirm("确定删除此通知？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            url: API.delNotice,
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
                  url: API.findNotice,
                  method: "get",
                  params: {}
                }).then(res => {
                  this.noticeinfo = res.data.data;
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
    this.type = sessionStorage.getItem("type");
    if (this.type != 2) {
      this.btnmsg = "编辑";
    } else {
      this.btnmsg = "查看";
    }
    this.axios({
      url: API.findNotice,
      method: "get",
      params: {}
    }).then(res => {
      this.noticeinfo = res.data.data;
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
  font-size: 18px;
}

.managelist>>>td {
  background: rgba(0, 0, 0, 0);
  font-size: 18px;
  color: #303133;
}

.managelist>>>tr {
  background: rgba(0, 0, 0, 0);
  color: #303133;
  font-size: 18px;
  // color: #fff;
  // text-shadow:0 0 5px #CCCCCC, 0 0 10px #CCCCCC, 0 0 15px #CCCCCC, 0 0 20px #095816, 0 0 25px #095816, 0 0 30px #095816, 0 0 50px #095816, 0 0 80px #095816, 0 0 100px #095816, 0 0 150px #095816
}
.managelist>>>button {
  font-size: 18px;
  font-family "kaiti"
}
</style>