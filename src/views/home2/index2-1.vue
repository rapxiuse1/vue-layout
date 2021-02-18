<template>
  <div class="page2">
    <div class="gradient"></div>
    <Navbar2></Navbar2>
    <div id="pageContent" ref="pageContent"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Vue from 'vue';
import '../../css/home2.scss'
import Navbar2 from '@/components/Navbar2.vue'//顶部导航栏
import Footer from '@/components/Footer.vue'//底部导航栏
import Xxjb from '@/views/home2/xxjb.vue'//信息简报、审判管理
import Zywj from '@/views/home2/zywj.vue'//重要文件
export default {
  components:{
    Navbar2,
    Footer,
  },
  data(){
    return{
      array:[],
    }
  },
  created(){
    setTimeout(()=>{
      this.initDom()
    },500)

  },
  methods:{
    initDom(){
      let el = document.getElementById('pageContent')
      el.innerHTML = `<div class="part-wrap ">
    <div class="part-transverse-split-div " style="width: 50%;" 
      moduleinfo='{"name":"Zywj"}'>
    </div>
    <div class="part-transverse-split-div " style="width: 50%;" 
      moduleinfo='{"name":"Xxjb"}'>
    </div>
  </div>`
      console.log(el)
      let vm = this
      this.$nextTick(() => {
        let data = this.$refs.pageContent
        data.querySelectorAll("[moduleinfo]").forEach(function(e) {
          var t = e.getAttribute("moduleinfo");
          if(t!=null && t != ""){
            let bean = JSON.parse(t)
            vm.array.push(bean.name)
          }
        })
        console.log(this.array)
      })
      if(this.array.indexOf('Zywj')){
        let el = Vue.extend(Zywj)
        new el().$mount('.part-transverse-split-div')
      }
      if(this.array.indexOf('Xxjb')){
        let el = Vue.extend(Xxjb)
        new el().$mount('.part-transverse-split-div')
      }
      
    }
  }
}
</script>

<style>
</style>