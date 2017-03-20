<template>
    <div id="bodycontainer">
        <div id="main_container">
            <div id="user">
                <el-card class="box-card">
                    <div id="head_container">
                        <img src="/static/image/head.jpg"/>
                    </div>
                </el-card>
            </div>
            <div style="margin-top:30px;">
                <el-card class="box-card">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="文章管理" name="first">
                            <blogManager/>
                        </el-tab-pane>
                        <el-tab-pane label="标签管理" name="second">
                            <tagManager/>
                        </el-tab-pane>
                        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                    </el-tabs>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../store/api'
import Cookie from '../store/cookie'

  export default {
    components: {
      'blogManager': require('components/blogManager'),
      'tagManager': require('components/TagManager')
    },
    data() {
      return {
          activeName:'first'
      };
    },
    methods: {
      
    },
    created(){

    }
  };
</script>

<style lang="scss" scoped>

#head_container{
    width: 100px;
    height: 100px;
}

#user{
    
}

#main_container{
    width: 75%;
    padding-top: 30px;
    margin:0 auto;
}

#bodycontainer{
    width:100%;
    height: 100%;
    background-color:#f7f8fa;
}
    

</style>