<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="文章Id" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.courseId }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="作者">
        <template slot-scope="scope">
          <span>老师</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title  }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="学习时间">
        <template slot-scope="scope">
          <span>{{ scope.row.lastTime | parseTime('{Y}-{M}-{D} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>


      <!--   <el-table-column width="100px" label="状态">
           <template slot-scope="{row}">
             <el-tag  >
               {{row.status | statusFilter}}
             </el-tag>
           </template>
         </el-table-column>-->

      <el-table-column class-name="status-col" label="学习时间" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.basics }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="知识点" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.knowledgeName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit"  @click="deleteByCid(scope.row.courseId)">
            删除
          </el-button>
          <router-link :to="'/articleEdit?courserId='+scope.row.courserId">
            <el-button type="primary" size="small" icon="el-icon-edit">
              修改
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.row" @pagination="getList" />
  </div>
</template>

<script>
  import Pagination from '@/components/pageNation' // Secondary package based on el-pagination

  export default {
    name: 'Mytest',
    components: { Pagination },
    filters: {
      statusFilter (status) {
        const statusMap = {
          '0': '发布成功',
          '1': '草稿',
          '-1': '删除'
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
          row: 10,
          userId: this.$store.state.user.userId
        }
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        this.listLoading = true
        this.$api.getMyCourseById(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
        })
        this.listLoading = false
      },
      deleteByCid (cid) {
        this.$api.deleteByCid({'contentId': cid, 'userId': this.$store.state.user.userId}).then(response => {
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
