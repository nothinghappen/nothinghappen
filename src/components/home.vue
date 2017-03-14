<template>
  <div class="home_container">
    <div class="menu_container">
        <div id="head">
          <img src="/static/image/head.jpg" />
        </div>
        <p id="title">NOTHINGHAPPEN</p>
        <hr class="hr"/>
        <p id="subtitle">nothinghappen.me</p>
        <ul class="menu">
          <a class="menu_item" href="/blog/list"><li>文章</li></a>
          <a class="menu_item"><li>漫画</li></a>
          <a class="menu_item"><li>游戏</li></a>
          <a class="menu_item"><li>壁纸</li></a>
        </ul>
    </div>  
    <div id="footer">
      <p>copyright © 2017-? NOTHINGHAPPEN.ME All Rights Reserved.</p>
    </div>
  </div>  
</template>

<script>

  export default {
    components: {
      
    },
    data() {
      return {
        
      };
    },
    methods: {
      
    }
  };
</script>

<style lang="scss" scope>

    #mian{
      width: 100%;
      height: 100%;
    }

    #footer{
        background-color: black;
        height: 10%;
        font-size: 15px;
    }

    #footer P{
      text-align: center;
    }

    #head img{
      width:150px;
      height:150px;
      border-radius:100px;
      display: block;
      margin:0 auto;
      animation: A 15s linear 0s infinite;
      -webkit-animation: A 15s linear 0s infinite;
    }

    .hr{
      width: 70%;
      margin: 5px auto;
      border: 0;
      border-bottom: 1px solid #fff;
    }

    .home_container{
      width: 100%;
      height: 100%;
      background-image: url(/static/image/topBG.jpg);
      background-size:100% 100%;
      background-repeat:no-repeat;
    }

    .menu_container{
      position: relative;
      top:5%;
      width: 50%;
      height: 100%;
      margin: 0 auto;
    }

    #title{ 
      text-align: center;
      font-size: 45px;
      color: white;
    }

    #subtitle{
      text-align: center;
      font-size: 15px;
      color: white;
    }

    .menu{
      display: block;
      width: 100%;
      height: 220px;
      max-width: 220px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 25px;
    }

    .menu_item{
      display: block;
      width: 100%;
      margin-top: 15px;
      text-decoration: none;
      font-size: 20px;
      color: #fff;
      letter-spacing: .5px;
      text-align: center;
      transition: .4s linear;
      -webkit-transition: .4s linear;
      -moz-transition: .4s linear;
      -o-transition: .4s linear;
      border-radius: 5px;
      line-height: 180%;
    }

    a:hover{
      background-color:white; 
    }

    @keyframes A
    {
      from {-webkit-transform: rotate(0deg);}
      to {-webkit-transform: rotate(360deg);}
    }

    @-webkit-keyframes A /* Safari and Chrome */
    {
      from {-webkit-transform: rotate(0deg);}
      to {-webkit-transform: rotate(360deg);}
    }

</style>