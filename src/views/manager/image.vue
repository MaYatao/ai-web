<template>
  <el-container>
    <el-header>
      <h3>幻灯片列表</h3>
      <el-row :gutter="20">

        <el-col :span="5">
          <el-button type="primary" icon="el-icon-search" @click="table = true">创建幻灯片</el-button>
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
          label="介绍"
          width="180">
          <template slot-scope="{row}">
            <el-tag>
              {{row.info }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="link"
          label="超链接">
          <template slot-scope="scope"><p class="ql-editor" v-html="scope.row.link"></p></template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="图片">
          <template slot-scope="scope"><img style="width: 100px;height: 100px" :src="scope.row.url" class="avatar"></template>
        </el-table-column>
        <el-table-column
                 label="操作">
          <template slot-scope="scope">
               <el-button type="primary" icon="el-icon-search" @click="deleteImageById(scope.row.imageId)">删除</el-button>
          </template></el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.row" @pagination="getList" />
    </el-main>
    <el-drawer
      title="创建公告!"
      :visible.sync="table"
      direction="rtl"
      size="50%">
      <el-form ref="infoForm" :model="infoForm" label-width="120px">
        <el-form-item label="幻灯片介绍" prop="title">
          <el-input style="width: 200px" v-model="infoForm.info" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="content">
          <el-input style="width: 200px" v-model="infoForm.link" placeholder="公告"></el-input>
        </el-form-item>
        <el-form-item label="幻灯片" prop="toUser">
          <div class="pic_img" style="background-color: azure" >
            <div class="pic_img_box">
              <el-upload
                class="avatar-uploader"
               action="http://127.0.0.1:10010/api/manage/uploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="infoForm.url" :src="infoForm.url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <el-button type="primary" v-on:click="onSubmit()">发布</el-button>
    </el-drawer>
  </el-container>
</template>

<script>
  import Pagination from '@/components/pageNation' // Secondary package based on el-pagination
  export default {
    name: 'image',
    components: {
       Pagination
    },
    data () {
      return {
        table: false,
        listLoading: false,
        list: null,
        infoForm: {
          link: '',
          url: '',
          info: ''
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
        this.$api.getImage(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
        })
        this.listLoading = false
      },
      deleteImageById (imageId) {
        this.$api.deleteImageById({'imageId': imageId}).then(response => {
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
        this.$api.createImage(this.infoForm).then(res => {
          alert(res.data)
          this.getList();
        }).catch((error) => {
          console.log(error);
          alert(error)
        });
      },
      handleAvatarSuccess (res, file) {
        this.infoForm.url = res.data;
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
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
