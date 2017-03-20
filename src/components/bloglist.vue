<template>
  <div id="main_container">
      <div class="second_container">
        <div class="blog_container" v-for="b,index in blogs">
            <div>
                <p class="title"><router-link :to="'/blog/'+b.id">{{b.title}}</router-link></p>
                <div class="createtime">
                    <p style="font-size:16px">{{b.createTime}}</p>
                </div>
            </div>
            <div style="clear:both">
                <p v-html="b.content">
                    {{b.content}}
                </p>
            </div>
            <div class="tag_container">
                <el-tag
                    class="tag"
                    :key="tag"
                    type="gray"
                    v-for="tag in b.tagNames"
                    :close-transition="false"
                    >
                    {{tag}}
                </el-tag>
            </div>
        </div>
        <div class="blog_container_bottom">
            <el-pagination
                layout="prev, pager, next"
                :total="pageNum"
                :page-size="10"
                @current-change="handlePageChange">
            </el-pagination>
        </div>
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
        blogs:[]
      };
    },
    methods: {
        handlePageChange(page){
            this.getAndRefresh(page);
        },
        getAndRefresh(p){
            this.$Loading.start();
            Api.get("/bloglist",{
                page:p,
                pageSize:10
            }).then((res)=>{
                this.pageNum = res.data.blogcount;
                this.blogs = res.data.bloglist;
                for(var i = 0;i < this.blogs.length;i++){
                    this.blogs[i].content = this.blogs[i].content.replace(/\<img.*?\>/g, '［图片］');
                    this.blogs[i].tagNames = [];
                    for(var j = 0;j < this.blogs[i].tagItems.length;j++){
                        this.blogs[i].tagNames.push(this.blogs[i].tagItems[j].content);
                    }
                }
                this.$Loading.finish();
            }).catch((err)=>{
                //console.log(err);
                //this.$message.error('服务器爆炸了');
                this.$Loading.error();
            });
        }
    },
    computed:{
        
    },
    created(){
        this.getAndRefresh(1);
    }
  };
</script>

<style lang="scss" scoped>

    .tag{
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .tag_container{
        text-align: right;
    }

    .second_container{
        width: 75%;
        margin: 0 auto;
    }

    .createtime{
        float: right;
        margin-top: 10px;
    }


    p.title{
        float: left;
        font-size: 40px;
    }

    a{
        color: #333;
    }

    .blog_container{
        width: 100%;
        /*background: pink;*/
        margin-top: 10px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ddd;
    }

    #main_container{
        width: 100%;
        margin-top: 30px;
    }

    a.next{
        font-size: 16px;
        margin-right: 30px;
    }

    a.last{
        font-size: 16px;
        margin-left: 30px;
    }

    .blog_container_bottom{
        width: 100%;
        height: 40px;
        margin: 0 auto;
    }
    
</style>