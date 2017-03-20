<template>
    <div>
      <el-upload
        ref="uploadbutton"
        action="//up.qbox.me/"
        type="drag"
        :thumbnail-mode="true"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :data="form"
        >
        <i v-show="false" class="el-icon-picture"></i>
      </el-upload>
      <div id="topbar">
        <div style="width:75%;height:100%;margin:0 auto;line-height:50px;">
          <h2 style="float:left;">写文章</h2>
          <div style="float:right;">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                保存<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">保存草稿</el-dropdown-item>
                <el-dropdown-item command="b">直接发布</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div id="main_container">
        <el-input v-model="blog.title" placeholder="请输入标题"></el-input>
        <div id="edit_container">
          <quill-editor ref="myTextEditor"
                      v-model="blog.content"
                      @change="onEditorChange($event)">
          </quill-editor>
        </div>
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
          <el-autocomplete
            class="inline-input"
            :fetch-suggestions="queryTags"
            placeholder="添加标签"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
      </div>
      <Modal
        v-model="modal"
        title="选择图片宽度百分比"
        @on-ok="ok"
        @on-cancel="cancel">
        <el-slider
          v-model="imgWidth"
          :step="10"
          show-stops>
        </el-slider>
    </Modal>
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
        modal:false,
        imgWidth:100,
        editorOption: {
          modules: {
              toolbar: '#toolbar'
            }
        },
        bucketHost: '',   // 上传图片的外链域名
        form: {},
        bucketHost:'',
        cursorIndex:0,
        saved:false,
        blog:{
          id:0,
          title:'',
          author:'nothinghappen',
          content:'',
          isPublic:true,
          tags:''
        },
        tags:[],
        tagsId:[],
        dynamicTags: []
      };
    },
    methods: {
      ok(){
        document.querySelector(".el-icon-picture").click();
      },
      cancel(){

      },
      beforeUpload (file) {
        let curr = "image";
        let prefix = new Date().getTime();
        let suffix = file.name
        let key = encodeURI(`${curr}/${prefix}_${suffix}`);
        return Api.get("/uptoken",{key}).then((res)=>{
                this.bucketHost = res.data.buckethost;
                this.form = {
                  key,
                  token: res.data.uptoken
                }
              }).catch((err)=>{
                //this.$message.error('服务器爆炸了');
              });
      },
      handleSuccess (response, file, fileList) {
        let key = response.key
        let name = file.name
        var imageUrl = "http://" + this.bucketHost + "/" + key;
        this.insertImage(imageUrl);
      },
      insertImage(imageUrl){
        var quill = this.$refs.myTextEditor.quillEditor;
        quill.insertEmbed(this.cursorIndex, 'image', {url:imageUrl,width:this.imgWidth});
      },
      onEditorChange({ editor, html, text }) {
        
      },
      handleClose(tag){
        var index = this.dynamicTags.indexOf(tag);
        this.dynamicTags.splice(index, 1);
        this.tagsId.splice(index,1);
      },
      handleSelect(item) {
        this.dynamicTags.push(item.value);
        this.tagsId.push(item.id);
      },
      queryTags(queryString, cb){
          var tags = this.tags;
          var res = queryString ? tags.filter(this.createFilter(queryString)) : tags;
          cb(res);
      },
      createFilter(queryString) {
        return (tags) => {
          return (tags.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleImage(){
        // console.log(this.$refs.uploadbutton);
        //我实在不懂怎么搞了，先这样吧
        this.modal = true;
        //this.insertImage({url:"http://ompl028lw.bkt.clouddn.com/image/1489420215818_bmzxdcgqz.jpg",width:35});
      },
      handleCommand(key){
        this.blog.tags = '';
        for(var i = 0;i < this.tagsId.length;i++){
          if(i == 0){
            this.blog.tags = this.blog.tags + this.tagsId[i];
          }else{
            this.blog.tags = this.blog.tags + ',' + this.tagsId[i];
          }
        }
        
        if(key == 'a'){
          this.blog.isPublic = false;
        }
        if(!this.saved){
          //console.log('post');
          Api.post("/admin/blog",this.blog)
          .then((res)=>{
            if(res.status == 200){
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success'
              });
              this.blog.id = res.data;
              this.saved = true;
            }
          }).catch((err)=>{
            //this.$message.error('服务器爆炸了');
          });
        }else{
          //console.log('update');
          Api.put("/admin/blog",this.blog)
          .then((res)=>{
            if(res.status == 200){
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success'
              });
            }
          }).catch((err)=>{        
            //this.$message.error('服务器爆炸了');
          });
        }
      }
    },
    mounted(){

      const Image = Quill.import("formats/image");

      class ImageBlot extends Image {
        static create(value) {
          let node = super.create(value);
          //console.log(value);
          node.setAttribute('src', this.sanitize(value.url));
          node.setAttribute('style', "width:"+value.width+"%");
          return node;
        }
      }
      ImageBlot.blotName = 'image';
      ImageBlot.tagName = 'img';

      Quill.register(ImageBlot);

      var quill = this.$refs.myTextEditor.quillEditor;
      var toolbar = quill.getModule('toolbar');
      toolbar.addHandler('image', ()=>{this.handleImage()});
      quill.on('selection-change', (range, oldRange, source) => {
        if (range) {
          if (range.length == 0) {
              this.cursorIndex = range.index;
          }
      }});
    },
    created(){

      this.token = Cookie.get("token");

      Api.get("/tag",{id:1}).then((res)=>{
        for(var i = 0;i < res.data.length;i++){
            var tag = {
              id:res.data[i].id,
              value:res.data[i].content
            }
            this.tags.push(tag);
        }
      }).catch((err)=>{
          //this.$message.error('服务器爆炸了');
      });

      if(!this.$route.query.id){
        return;
      }

      Api.get("/blog",{
        id:this.$route.query.id
      }).then((res)=>{
        this.blog = res.data;
        var tagitems = this.blog.tagItems;
        for(var i = 0;i < tagitems.length;i++){
          this.tagsId.push(tagitems[i].id);
          this.dynamicTags.push(tagitems[i].content);
        }
        this.saved = true;
      }).catch((err)=>{
          //this.$message.error('服务器爆炸了');
      });
    }

  };
</script>

<style lang="scss" scoped>

  #topbar{
    height: 50px;
    border-bottom:2px; 
  }

  #main_container{
    width: 75%;
    margin: 0 auto;
  }

  .el-input__inner {
    border-radius: 0px !important;
  }

  .tag{
        margin-right: 10px;
        margin-bottom: 10px;
    }
    

</style>