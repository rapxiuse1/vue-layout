<template>
  <div class="box-shadow2 box-x">
    <p class="title-zywj" style="line-height: 50px;">
      <span class="active2 span1">重要文件</span>
      <span class="more2" @click=gomore>更多</span>
    </p>
    <div class="box-wj">
      <img style="margin-top: 34px;" src="@/assets/icon-wj.png" />
      <ul class="list list1 zywj"  v-if="zywjData.length>0">
        <li v-for="(item, index) in zywjData"  :key="index">
          <a class="zy" @click="goDetail(item,5)" 
          >
          {{ item.title }}</a
        >
        </li>
      </ul>
      <ul class="list list1 zywj" v-else>
        <li >
          <a  
          >暂无数据</a
        >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'zywj',
  props:{

  },
  data(){
    return{
      zywjData:[],
      zywjid:null,
      newtype:null
    }
  },
  created(){
    this.getNews()
  },
  methods:{
    getNews(){
      let that  =this;
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(!data){
        return false;
      }
      data.forEach(i => {
        if(i.showname == '重要文件'){
          that.zywjid = i.id;
          that.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:that.zywjid,pagesize:9}).then(res => {
            if(res){
              that.newtype  = res[0].newtype;
              if(res.length >=6){
                that.zywjData = res.slice(0,6);
              }else{
                that.zywjData = res
              }
            }
          })
        }   
      });
    },
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
    gomore(){
      let id  = this.zywjid;
      window.location.href= window.location.href = window.location.origin+window.location.pathname+`#/infos2?id=${id}&nametitle=重要文件&nameCode=${this.newtype}&index=5`;
    },
    goDetail(item,index){
      debugger  
      let self  =this;
      let id  = self.zywjid;
      let content = item;
      let setDate = JSON.stringify({
        imgurl:self.imgUrl(item),
        content:content,
        id:id,
        name:"重要文件"
      });
      localStorage.removeItem('setDate')
      localStorage.setItem('setDate',setDate)
      //动态挂在子组件无法使用vue自定义路由
      window.location.href =  window.location.href = window.location.origin+window.location.pathname+`#/detail2?index=${index}&id=${item.id}`
    },
  }
}
</script>

<style scoped>
  .zywj{
    margin-top: 14px !important;
  }
  .list1{
    height: 54%;
  }
</style>