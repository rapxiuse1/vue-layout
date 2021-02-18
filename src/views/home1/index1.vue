<template>
  <div class="page">
    <Navbar></Navbar>
    <div class="mid">
      <div class="page-tit">
        <h1>
          <img src="@/assets/title.png" alt="" />深圳深汕特别合作区人民法院
        </h1>
        <p><img src="@/assets/tip.png" alt="" />公正 求实 创新 奉献</p>
      </div>
      <div id="pageContent" ref="pageContent" class="page-content"></div>
      <div class="culture"></div>

      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import '../../css/home1.scss'
import Vue from 'vue';
import Base from '@/utils/base'
import Navbar from '@/components/Navbar.vue'//顶部导航栏
import Footer from '@/components/Footer.vue'//底部导航栏
// import Baph from '@/views/home1/baph.vue'//办案排行
// import Fywh from '@/views/home1/fywh.vue'//法院文化
// import Jrtt from '@/views/home1/jrtt.vue'//今日头条
// import Ktpq from '@/views/home1/ktpq.vue'//开庭排期
// import Rdxw from '@/views/home1/rdxw.vue'//热点新闻
// import banner from '@/views/home1/banner.vue'//banner图
// import sfgg from '@/views/home1/sfgg.vue'//两个图
// import Tzgg from '@/views/home1/tzgg.vue'//通知公告
// import Xxjb from '@/views/home1/xxjb.vue'//信息简报
// import Ywxt from '@/views/home1/ywxt.vue'//业务系统
export default {
  components:{
    Navbar,
    Footer,
    // Baph,
    // Fywh,
    // Jrtt,
    // Ktpq,
    // Rdxw,
    // Search,
    // banner,
    // sfgg,
    // Tzgg,
    // Xxjb,
    // Ywxt
  },
  data(){
    return{
      array:[],
      content:'',
      comps:[],
      // componentList:[
      //   {id:'baph',name:Baph},
      //   {id:'fywh',name:Fywh},
      //   {id:'jrtt',name:Jrtt},
      //   {id:'ktpq',name:Ktpq},
      //   {id:'rdxw',name:Rdxw},
      //   {id:'search',name:Search},
      //   {id:'banner',name:banner},
      //   {id:'sfgg',name:sfgg},
      //   {id:'tzgg',name:Tzgg},
      //   {id:'xxjb',name:Xxjb},
      //   {id:'ywxt',name:Ywxt},
      // ]
    }
  },
  created(){
    //this.getUrl()
  },
  mounted(){
    debugger
    let style= '/infos'
    this.$router.push(style)
  }, 
  methods:{
    getUrl(){
      debugger
      let url = location.href
      //let url = 'http://192.168.0.130:8005/ZYOA/web/nszy/ssfy_home1#/'
      //截取url获取路径设置字段
      if(url.indexOf('#')!=-1){
        url = url.split('#')[0]
        if(url.indexOf('/')!=-1){
          url = url.split('/')
          url = [...url].pop() //es6解构数组并返回最后一个元素，即后台设置资源名称如：ssfy_home2
          console.log(url)
          this.initUrl(url)
        }
      }
    },
    initUrl(url){
      let name = 'zyWebRest_getWebParam'
      let bean = {}
      bean.name = url
      this.$http.post(name,bean)
        .then(res=>{
          if(res){
            let obj = res.customize
            obj = JSON.parse(obj)
            if(obj.style){
              console.log(obj.style)
              let homeUrl = obj.style
              this.$router.push({path:homeUrl})
            }else if(obj.webname){
              console.log(obj.webname)
              let webname = obj.webname
              this.initData(webname)
            }  
          }
        }) 
    },
    initData(webname){
      let name = 'zyWebRest_getIndexPartChangeByResourceName'
      let bean = {}
      bean.name = webname
      this.$http.post(name,bean)
        .then(res=>{
          console.log(res)
          let e = res
          this.initContent(e)
        }) 
    },
    initContent(e){
      let el = document.getElementById('pageContent')
      Base.loadWebPart(e,el,this.callback)
    },
    callback(arg){
      let data = arg.data
      this.comps.push(data.url)
      this.comps.map(app => {
        if(app == data.url){
          console.log(app)
          let child = require(`../${app}.vue`).default//定义动态引入的子组件
          console.log(child)
          let el = Vue.extend(child)//创建一个基于子组件的子类
          new el().$mount(".prat-item-content-box")//挂载到div上
        }
      })
      // for(const i in this.componentList){
      //   if(data.url == this.componentList[i].id){
      //     let el = Vue.extend(this.componentList[i].name)
      //     new el().$mount(".prat-item-content-box")
      //   }
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  width: 1680px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  padding: 30px;
  box-sizing: border-box;
}
</style>
<style>
.part-main {
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.part-main[ishauto="1"] {
  position: relative;
  height: auto;
}
.part-mainbox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.part-main[ishauto="1"] .part-mainbox {
  height: auto;
}
.part-sel {
  border: 2px dashed #f00 !important;
  box-sizing: border-box !important;
}
.part-line div[pbt="line"] {
  border: 1px dashed #09f;
  box-sizing: border-box;
}
.part-main[useredit="1"].part-line div[pbt="line"] {
  padding: 5px;
}
.part-wrap {
  margin-top: 20px;
  width: 100%;
  height: 400px;
  clear: both;
  overflow: hidden;
  position: relative;
}
.part-main[useredit="1"] .part-wrap {
  margin-top: 5px;
}
.part-transverse-split-div {
  box-sizing: border-box;
  float: left;
  height: 100%;
  padding: 0 5px;
  overflow: hidden;
  position: relative;
}
.part-vertical-split-div {
  width: 99.9%;
  margin: 0 auto;
  position: relative;
}
.part-config {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99;
  border: 1px solid #ececec;
  box-sizing: border-box;
  display: none;
  background-color: white;
}
.part-config-item {
  width: 180px;
  height: 35px;
  line-height: 35px;
  margin-left: 10px;
}
.part-config-item label {
  font-size: 16px;
  width: 90px;
  display: inline-block;
}
.part-config-item input[type="text"] {
  border: 0;
  border-bottom: 1px solid #000;
  width: 80px;
}
/* .part-item-content {
  position: absolute;
  left: 3px;
  right: 3px;
} */
.part-item-content {
  box-sizing: border-box;
  height: 99%;
}
.part-line .part-item-content {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 9px 0 rgba(0, 0, 0, 0.2);
}
.prat-item-content-box {
  width: 100%;
  height: 100%;
}
.prat-item-content-box-white {
  background-color: white;
  border: 1px solid #09f;
  box-sizing: border-box;
}
.prat-item-content-move {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  cursor: move;
}
.prat-item-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.prat-item-del {
  width: 18px;
  height: 18px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  cursor: pointer;
}
.prat-item-dragleft {
  width: 5px;
  z-index: 100;
  cursor: e-resize;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background-size: 30px 4px;
}
.part-item-shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 9px 0 rgba(0, 0, 0, 0.2);
}
.part-item-movebgcolor {
  background: #d3e7ff;
  z-index: 999;
}
</style>