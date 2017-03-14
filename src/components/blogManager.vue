<template>
    <div>
      <div style="margin-bottom:16px;">
         <el-button type="primary" @click="write()">写文章</el-button>
      </div>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="public"
        label="状态">
        <template scope="scope">
            <p v-if="scope.row.public">发布</p>
            <p v-if="!scope.row.public">草稿</p>
        </template>
      </el-table-column>
      <el-table-column
        inline-template
        :context="_self"
        label="操作"
        width="200">
        <span>
          <el-button @click="handleEdit($index)" type="primary" size="small">修改</el-button>
          <el-button @click="handleDelete($index)" type="danger" size="small">删除</el-button>
        </span>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
          layout="prev, pager, next"
          :total="pageNum"
          :page-size="10"
          @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Api from '../store/api'

  export default {
    components: {
      
    },
    data() {
      return {
        pageNum:0,
        tableData:[]
      };
    },
    methods: {
      handlePageChange(page){
        this.getBlogList(page);
      },
      write(){
          this.$router.push({path:'/editor'});
      },
      handleEdit(index){
          this.$router.push({path:'/editor?id='+this.tableData[index].id})
      },
      handleDelete(index){
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.delete("/blog",{id:this.tableData[index].id})
          .then((res)=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch((err)=>{
            this.$message.error('服务器爆炸了');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      getBlogList(p){
          Api.get("/blogAdminlist",{
                page:p,
                pageSize:10
            }).then((res)=>{
                this.tableData = res.data;
            });
      },
      getBlogCount(){
            Api.get("/blogAdmincount").then((res)=>{
                this.pageNum = res.data;
            }).catch((err)=>{
                this.$message.error('服务器爆炸了');
            });
        }
    },
    created(){
        this.getBlogList(1);
        this.getBlogCount();
    }
  };
</script>

<style lang="scss">

    

</style>