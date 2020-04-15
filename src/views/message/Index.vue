<template>
  <el-container>
    <el-aside width="200px">
      <div style="float: left">
        <el-button @click="select(0)">通知</el-button>
        <br>
        <el-button @click="select(1)">评论</el-button>
        <br>
        <el-button @click="select(2)">赞</el-button>
      </div>
    </el-aside>
    <el-main>
      <div style="align-content: center">
        <el-row  v-for="message in list" :key="message">
          <div border  >
            <el-tag  v-if="message.status" type="info">已读</el-tag>
            <el-tag  v-if="!message.status" type="danger">未读</el-tag>
            {{message.fromUserName}} {{message.title}}    {{message.sentTime}}
            <p  style="align-content: center" v-html="message.content"></p>
            <el-button type="primary"  @click="look(message.messagesId)">查看</el-button>
            <el-button type="primary"  @click="deleteMessage(message.messagesId)">删除</el-button>
          </div>
        </el-row>
      </div>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.row"
                  @pagination="getList"/>
    </el-main>
  </el-container>
</template>
<script>
  import Pagination from '@/components/pageNation' // Secondary package based on el-pagination
  import quillEditor from 'vue-quill-editor';
  export default {
    name: 'Index',
    components: {
      Pagination, quillEditor
    },
    data () {
      return {
        list: null,
        listQuery: {
          page: 1,
          row: 10,
          type: 0,
          userId: this.$store.state.user.userId
        }
      };
    },
    created () {
      this.select(0);
    },
    methods: {
      select (type) {
        this.listQuery.type = type
        this.$api.getMessageByUid(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
        })
      },
      look (messagesId) {
        this.$api.editMessageById({'messagesId': messagesId}).then(response => {
          // eslint-disable-next-line handle-callback-err
        }).catch((error) => {
          this.$message.error('错了哦，这是一条错误消息');
        });
      },
      deleteMessage (messagesId) {
        this.$api.deleteMessageById({'messagesId': messagesId}).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.select(this.listQuery.type);
          // eslint-disable-next-line handle-callback-err
        }).catch((error) => {
          this.$message.error('错了哦，这是一条错误消息');
        });
      }
    }
  };
</script>
