<template>
  <div id="app">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    
  }
}
</script>

<style lang="scss">

#app{
  width: 100%;
  height: 100%;
  margin: 0px;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0px;
}

img{
    max-width: 100%;
}

</style>
