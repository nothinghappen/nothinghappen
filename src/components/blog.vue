<template>
  <div id="main_container">
      <div id="top_img"></div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <div class="footer">
            <p>copyright © 2017-? NOTHINGHAPPEN.ME All Rights Reserved.</p>
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
        
    },
    computed:{
        
    },
    created(){
        
    }
  };
</script>

<style lang="scss" scoped>

    #main_container{
        width: 100%;
    }

    .footer{
        /*background-color: black;*/
        display: block;
        height: 10%;
        font-size: 15px;
        margin-bottom: 30px;
        clear: both;
    }

    .footer P{
        text-align: center;
    }

    #top_img{
        background-image: url("/static/image/yourname.jpeg");
        width: 100%;
        height: 250px;
        background-position: 0px 0px;
        background-size:100%;
        background-position-y:30%;
        transition: background-position-y 2s;
        background-repeat:no-repeat;
        /*animation: animatedBackground 3s linear infinite;*/
    }

    #top_img:hover{
        background-position-y:80%;
    }

    @keyframes animatedBackground {
        from { background-position: 0 0; }
        to { background-position: 100% 0; }
    }

    @-webkit-keyframes animatedBackground {
        from { background-position: 0 0; }
        to { background-position: 100% 0; }
    }   
    

</style>