<template>
  <el-container>
    <el-header>
      <h3>公告列表</h3>
    </el-header>
    <el-main>
      <br>
      <el-table
        v-loading="listLoading"
        :data="list"
        style="width: 100%">
        <el-table-column
          label="公告类型"
          width="180">
          <template slot-scope="{row}">
            <el-tag>
              {{row.toUser | typeFilter}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="公告标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="content"
          label="公告内容">
          <template slot-scope="scope"><p class="ql-editor" v-html="scope.row.content"></p></template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-search" @click="delete(scope.row.messagesId)">查看</el-button>
            <el-button type="primary" icon="el-icon-search" @click="look(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.row"
                  @pagination="getList"/>
    </el-main>
    <el-drawer
      title="消息详情!"
      :visible.sync="table"
      direction="rtl"
      size="50%">
    </el-drawer>
    <div style="align-content: center">
      <el-container>
        <el-header>{{infoForm.title}}</el-header>
        <el-main><p class="ql-editor" v-html="infoForm.content"></p></el-main>
        <el-footer>{{infoForm.sentTime}} <br>
          来自：{{infoForm.formUserName}}
        </el-footer>
      </el-container>
    </div>
  </el-container>
</template>

<script>
  import Pagination from '@/components/pageNation' // Secondary package based on el-pagination
  import {quillEditor} from 'vue-quill-editor';

  export default {
    name: 'Inform',
    components: {
      Pagination, quillEditor
    },
    data () {
      return {
        table: false,
        listLoading: false,
        list: null,
        infoForm: {
          formUserName: '',
          fromUser: '',
          fromUserImage: '',
          toUserName: '',
          toUser: '',
          toUserImage: '',
          sentTime: '',
          title: '',
          content: ''
        },
        listQuery: {
          page: 1,
          row: 10,
          userId: this.$store.state.user.userId
        }
      }
    },
    created () {
      this.getAnnounce();
    },
    method: {
      getAnnounce () {
        this.listLoading = true
        this.$api.getAnnounceByUid(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
        })
        this.listLoading = false
      },
      look (info) {
        this.infoForm = info
        this.$api.editMessageById({'messagesId': info.messagesId}).then(response => {
          // eslint-disable-next-line handle-callback-err
        }).catch((error) => {
          this.$message.error('错了哦，这是一条错误消息');
        });
        this.table = true
      },
      delete (messagesId) {
        this.$api.deleteMessageById({'messagesId': messagesId}).then(response => {
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

</style>
