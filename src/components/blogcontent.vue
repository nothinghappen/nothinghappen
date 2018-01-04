<template>
    <div id="content_container">
      <h1>{{blog.title}}</h1>
      <div v-html="blog.content" class="ql-editor">{{blog.content}}</div>
      <br/>
      <p style="font-size:16px">--That's All--</p>
      <br/>
      <p style="font-size:16px">
          发表于
          <i>{{blog.createTime}}</i>
          ,最后修改于
          <i>{{blog.updateTime}}</i>
          并被添加以下标签
          <el-tag
            class="tag"
            :key="tag"
            type="gray"
            v-for="tag in tagNames"
            :close-transition="false"
            >
            {{tag}}
        </el-tag>
      </p>
      <div style="height:100px;"></div>
    </div>
</template>

<script>
import Api from '../store/api'


  export default {
    components: {
      
    },
    data() {
      return {
        blog:{},
        tagNames:[]
      };
    },
    methods: {
      
    },
    created(){
        // Api.get("/blog",{
        //     id:this.$route.params.id
        // }).then((res)=>{
        //     this.blog = res.data;
        // });
    },
    activated(){
        this.tagNames = [];
        this.$Loading.start();
        Api.get("/blog",{
            id:this.$route.params.id
        }).then((res)=>{
            this.blog = res.data;
            for(var i = 0;i < res.data.tagItems.length;i++){
                this.tagNames.push(res.data.tagItems[i].content);
            }
            this.$Loading.finish();
        }).catch((err)=>{
            //console.log(err);
            //this.$message.error('服务器爆炸了');
            this.$Loading.error();
        });;
    },
    deactivated(){
        this.blog = {};
    }
  };
</script>

<style lang="scss" scoped>

    #content_container{
        
        width: 75%;
        margin: 0 auto;
    }

</style>