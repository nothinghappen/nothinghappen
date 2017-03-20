<template>
    <div id="content_container">
      <h1>{{blog.title}}</h1>
      <div v-html="blog.content" class="ql-editor">{{blog.content}}</div>
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
        blog:{}
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
        this.$Loading.start();
        Api.get("/blog",{
            id:this.$route.params.id
        }).then((res)=>{
            this.blog = res.data;
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