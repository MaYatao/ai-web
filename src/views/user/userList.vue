<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="用户Id" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex  }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="注册时间">
        <template slot-scope="scope">
          <span>{{ scope.row.joinDay | parseTime('{Y}-{M}-{D} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>


      <el-table-column width="100px" label="身份">
        <template slot-scope="{row}">
          <el-tag  >
            {{row.identity | statusFilter}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit"  @click="deleteUserById(scope.row.userId)">
            删除
          </el-button>
    <!--      <router-link :to="'/articleEdit?contentId='+scope.row.contentId">
            <el-button type="primary" size="small" icon="el-icon-edit">
              修改
            </el-button>
          </router-link>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.row" @pagination="getList" />
  </div>
</template>

<script>
  import Pagination from '@/components/pageNation' // Secondary package based on el-pagination

  export default {
    name: 'userList',
    components: { Pagination },
    filters: {
      statusFilter (status) {
        const statusMap = {
          '0': '学生',
          '1': '教师',
          '2': '管理员'
        }
        return statusMap[status]
      }
    },
    data () {
      return {
        list: null,
        total: 0,
        listLoading: false,
        listQuery: {
          page: 1,
          row: 10
        }
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        this.listLoading = true
        this.$api.getUserList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
        })
        this.listLoading = false
      },
      deleteUserById (userId) {
        this.$api.deleteByCid({'userId': userId}).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getList();
          // eslint-disable-next-line handle-callback-err
        }).catch((error) => {
          this.$message.error('错了哦，这是一条错误消息');
        });
      }
    }
  }
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
