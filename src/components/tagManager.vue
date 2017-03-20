<template>
    <div>
      <el-tag
        class="tag"
        type="primary"
        :key="tag"
        v-for="tag in dynamicTags"
        :closable="true"
        :close-transition="false"
        @close="handleClose(tag)"
        >
        {{tag}}
      </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
</template>

<script>
import Api from '../store/api'
import Cookie from '../store/cookie'

  export default {
    components: {
      
    },
    data() {
      return {
        token:'',
        tags:[],
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
      getTags(){
        Api.get("/tag",{id:1}).then((res)=>{
            this.dynamicTags = [];
            this.tags = res.data;
            for(var i = 0;i < this.tags.length;i++){
                this.dynamicTags.push(this.tags[i].content);
            }
        }).catch((err)=>{
          //this.$message.error('服务器爆炸了');
        });
      },
      saveTag(tag){
        Api.post("/admin/tag",tag)
          .then((res)=>{
            this.$message({
              message: '标签保存成功',
              type: 'success'
            });
            this.dynamicTags.push(tag.content);
          }).catch((err)=>{
            //this.$message.error('服务器爆炸了');
        });
      },
      handleClose(tag) {
        //console.log(this.tags[this.dynamicTags.indexOf(tag)].id);
        this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.delete("/admin/tag",{id:this.tags[this.dynamicTags.indexOf(tag)].id})
          .then((res)=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            this.tags.splice(this.dynamicTags.indexOf(tag), 1);
          }).catch((err)=>{
              //this.$message.error('服务器爆炸了');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          var tag = {
              ownerId:1,
              content:inputValue
          }  
          this.saveTag(tag);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    activated(){
        this.getTags();
    },
    created(){
      this.token = Cookie.get("token");
      // this.getTags();
    }
  };
</script>

<style lang="scss" scoped>

    .tag{
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .input-new-tag{
        width: 70px;
    }

</style>