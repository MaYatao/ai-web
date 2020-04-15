<template>
  <el-container>
    <el-header>
      <h3>公告列表</h3>
      <el-row :gutter="20">

        <el-col :span="5">
          <el-button type="primary" icon="el-icon-search" @click="table = true">创建公告</el-button>
        </el-col>
      </el-row>
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
        <el-button type="primary" icon="el-icon-search" @click="deleteAnnounceById(scope.row.announceId)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.row" @pagination="getList" />
    </el-main>
    <el-drawer
      title="创建公告!"
      :visible.sync="table"
      direction="rtl"
      size="50%">
      <el-form ref="infoForm" :model="infoForm" label-width="120px">
        <el-form-item label="公告标题" prop="title">
          <el-input style="width: 200px" v-model="infoForm.title" placeholder="公告标题"></el-input>
        </el-form-item>
      <el-form-item label="公告标题" prop="content">
        <el-input style="width: 200px" v-model="infoForm.content" placeholder="公告"></el-input>
      </el-form-item>
          <el-form-item label="公告标题" prop="toUser">
            <el-radio-group v-model="infoForm.toUser">
              <el-radio-button label=0>所有人</el-radio-button>
              <el-radio-button label=1>学生</el-radio-button>
              <el-radio-button label=2>老师</el-radio-button>
            </el-radio-group>
          </el-form-item>
      </el-form>
      <el-button type="primary" v-on:click="onSubmit()">发布</el-button>
    </el-drawer>
  </el-container>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor';
  import Pagination from '@/components/pageNation' // Secondary package based on el-pagination
  export default {
    name: 'announce',
    components: {
      quillEditor, Pagination
    },
    filters: {
      typeFilter (type) {
        const typeMap = {
          '0': '所有人',
          '1': '学生',
          '2': '老师'
        }
        return typeMap[type]
      }
    },
    data () {
      return {
        table: false,
        listLoading: false,
        list: null,
        infoForm: {
          toUser: 0,
          title: '',
          content: ''
        },
        listQuery: {
          page: 1,
          row: 10
        }
      };
    },
    methods: {
      getList () {
        this.listLoading = true
        this.$api.getAnnounce(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
        })
        this.listLoading = false
      },
      deleteAnnounceById (announceId) {
        this.$api.deleteAnnounceById({'announceId': announceId}).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getList();
          // eslint-disable-next-line handle-callback-err
        }).catch((error) => {
          this.$message.error('错了哦，这是一条错误消息');
        });
      },
        onSubmit () {
          this.$api.createAnnounce(this.infoForm).then(res => {
            alert(res.data)
            this.getList();
          }).catch((error) => {
            console.log(error);
            alert(error)
          });
        }
    },

    created () {
      this.getList();
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
