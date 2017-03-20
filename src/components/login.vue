<template>
    <div>
      <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      <el-input v-model="user.password" placeholder="请输入密码"></el-input>
      <el-button @click="login()">提交</el-button>
      <el-button @click="show()">token</el-button>      
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
          user:{
              username:'',
              password:''
          }
      };
    },
    methods: {
        login(){
            console.log(this.user.username);
            Api.post("/user/login",this.user)
            .then((res)=>{
              if(res.data == ""){
                this.$message.error("用户名或密码不正确")
              }else{
                //过期6小时
                Cookie.set("token",res.data,6*60);
                this.$router.go(-1);
              }
            }).catch((err)=>{
              this.$message.error('服务器爆炸了');
            });
        },
        show(){
            var token = Cookie.get("token");
            alert(token);
        }
    }
  };
</script>

<style lang="scss">

    

</style>