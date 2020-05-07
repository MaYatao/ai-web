<template>
  <div>{{content}}</div>
</template>
<script>
    // import __ from '__' // __是需要手动引入的文件
    export default {
        name: 'search',
        components: {},
        data () {
            return {
              msg: '这个是Home模板页',
              content: '',
              list: []
            }
        },
      created () {
        this.getParams();
      },
        methods: {
          getParams () {
            this.content = this.$route.query.content;
          },
          getRecordestById () {
            this.$api.serach({'content': this.content}).then(res => {
              this.rtForm = res.data
            }).catch((error) => {
              console.log(error);
            });
          }
        }
    }
</script>
<style lang="postcss" scoped>
    body {
        background-color: #ff0000;
    }
</style>
