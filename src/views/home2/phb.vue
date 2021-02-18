<template>
  <div class="box-shadow2">
    <h2 class="title">
      <span class="active2">排行榜</span>
      <!-- <span class="more" @click=gomore>更多</span> -->
    </h2>
    <ul class="list">
      <li v-for="(item, index) in PhList" :key="index" class="new3">
        <a  @click="goDetail(item)"  class="list-a list-b"
          ><p :class="[index>2 ? 'blue' : '' ]"> {{index+1}}</p>
          {{ item.title }}</a
        >
        <span class="morenum">{{item.num}}</span>
      </li>
      <!-- <li  class="new3">
        <a  @click="goDetail(item)"  class="list-a list-b"
          ><p :class="blue"> 1</p>
          个人隔热个人二个哈特华润银行已经热狗特特鬼二天4天5条4二公分二个如果</a
        >
        <span class="morenum">1</span>
      </li>
      <li  class="new3">
        <a  @click="goDetail(item)"  class="list-a list-b"
          ><p :class="blue"> 1</p>
          个人隔热个人二个哈特华润银行已经热狗特特鬼二天4天5条4二公分二个如果</a
        >
        <span class="morenum">1</span>
      </li>
      <li  class="new3">
        <a  @click="goDetail(item)"  class="list-a list-b"
          ><p :class="blue"> 1</p>
          个人隔热个人二个哈特华润银行已经热狗特特鬼二天4天5条4二公分二个如果</a
        >
        <span class="morenum">1</span>
      </li>
      <li  class="new3">
        <a  @click="goDetail(item)"  class="list-a list-b"
          ><p :class="blue"> 1</p>
          个人隔热个人二个哈特华润银行已经热狗特特鬼二天4天5条4二公分二个如果</a
        >
        <span class="morenum">1</span>
      </li>
      <li  class="new3">
        <a  @click="goDetail(item)"  class="list-a list-b"
          ><p :class="blue"> 1</p>
          个人隔热个人二个哈特华润银行已经热狗特特鬼二天4天5条4二公分二个如果</a
        >
        <span class="morenum">1</span>
      </li>
      <li  class="new3">
        <a  @click="goDetail(item)"  class="list-a list-b"
          ><p :class="blue"> 1</p>
          个人隔热个人二个哈特华润银行已经热狗特特鬼二天4天5条4二公分二个如果</a
        >
        <span class="morenum">1</span>
      </li>
      <li  class="new3">
        <a  @click="goDetail(item)"  class="list-a list-b"
          ><p :class="blue"> 1</p>
          个人隔热个人二个哈特华润银行已经热狗特特鬼二天4天5条4二公分二个如果</a
        >
        <span class="morenum">1</span>
      </li>
      <li  class="new3">
        <a  @click="goDetail(item)"  class="list-a list-b"
          ><p :class="blue"> 1</p>
          个人隔热个人二个哈特华润银行已经热狗特特鬼二天4天5条4二公分二个如果</a
        >
        <span class="morenum">1</span>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name:'phb',
  props:{

  },
  data(){
    return{
      list1: [
        {
          title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
          time: '2019/12/23'
        }, {
          title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
          time: '2019/12/23'
        }, {
          title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
          time: '2019/12/23'
        }, {
          title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
          time: '2019/12/23'
        }, {
          title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
          time: '2019/12/23'
        }, {
          title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
          time: '2019/12/23'
        }, {
          title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
          time: '2019/12/23'
        }
      ],
      // PhList:[{title:'defdef',num:5}]
      PhList:[]
    }
  },
  created(){
    this.getPhList()
  },
  methods:{
    imgUrl(item){
      var basePath = null;
      let imgurl = null
      if (location.pathname == "/") { //vue运行
        basePath = "http://192.168.0.130:8005/ZYOA/";
      } else {
        basePath = location.origin + "/" + location.pathname.split("/")[1];
         
      }
      if(item && item.imgtitle){
        let img = JSON.parse(item.imgtitle);
        imgurl = basePath + "/LEAP/Download/" + img.nameedPath + "/" + img.name
      }
      return imgurl;
    },
    // gomore(){
    //   let id  = this.rdxwid;
    //   window.location.href=window.location.origin+window.location.pathname+`#/infos2?id=${id}&nametitle=热点新闻&nameCode=${this.newtype}&index=2`
    // },
    goDetail(item){
      let self  =this;
      let id  = item.topresid;
      let content = item;
      let setDate = JSON.stringify({
        imgurl:self.imgUrl(item),
        content:content,
        id:id,
        name:"热点新闻"
      });
      localStorage.removeItem('setDate')
      localStorage.setItem('setDate',setDate)
      //动态挂在子组件无法使用vue自定义路由
      // debugger
      // if (location.pathname == "/") { //vue运行
      //   let url = 'http://192.168.0.130:8005/ZYOA/web/bazy/ssfy_home2#/home2'
      //   url = `/#/detail2?index=${index}&id=${item.id}`;
      //   window.location.href 
      //   window.location.href = `/#/detail2?index=${index}&id=${item.id}`;
      // } else {

      // }
      window.location.href = window.location.origin+window.location.pathname+`#/detail2?index=${item.index}&id=${item.id}`
      // self.$router.push({path: `/detail2?index=${index}&id=${item.id}`})
    },
    getPhList(){
      this.$http.post('zyWebRest_getNewsContentWeeklyRanking', {"pagenum":1,"pagesize":9}).then(res => {
            if(res){
              this.PhList = res;
              this.PhList.map(i =>{
                if(i.showname2 == "通知公告"){
                i.index = 1
              }else if(i.showname2 == "热点新闻"){
                i.index = 2
              }else if(i.showname2 == "信息简报"){
                i.index = 3
              }else if(i.showname2 == "审判管理"){
                i.index = 4
              }else if(i.showname1 == "重要文件" || i.showname2 == "重要文件"){
                i.index = 5
              }else if(i.showname2 == "政治工作"){
                i.index = 6
              }else if(i.showname1 == "党建信息" || i.showname2 == "党建信息"){
                i.index = 7
              }else if(i.showname1 == "廉政信息" || i.showname2 == "廉政信息"){
                i.index = 8
              }else if(i.showname1 == "规章制度" || i.showname2 == "规章制度"){
                i.index = 9
              }else if(i.showname2 == "深汕法院综合信息发布网站"){
                i.index = 0
              }
              })
            }
          })
    }
  }
}
</script>

<style scoped>
  .morenum{
    margin-top: 6px;
  }
  .list-b{
    width: 80% !important;
  }
  .list{
  height: 81%;
}
</style>