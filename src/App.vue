<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      data:'2020-12-30'
    }
  },
  created(){
    
  },
  methods:{
  },
  computed:{
    // themeColor(){
    //   return this.$store.state.themeColor
    // }
  },
  watch:{
    // themeColor(val){
    //   document.getElementById('app').style.setProperty('--themeColor',val)
    // }
  }
}
</script>
<style lang="scss">
@import "@/css/main.scss";
// #app {
//   --themeColor: #008cff;
// }
</style>
