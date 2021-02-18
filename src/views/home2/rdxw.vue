<template>
  <div class="box-shadow2">
    <h2 class="title">
      <span class="active2">热点新闻</span>
      <span class="more" @click=gomore>更多</span>
    </h2>
    <ul class="list">
      <li v-for="(item, index) in rdxwData" :key="index" class="new3">
        <a @click="goDetail(item,2)" class="list-a"
          ><p class="dot2">{{index+1}}</p>
          {{ item.title }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'rdxw',
  props:{

  },
  data(){
    return{
      rdxwData:[],
      rdxwid:null,
      newtype:null,
    }
  },
  created(){
    this.getNews()
  },
  mounted(){

  },
  methods:{
    getNews(){
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(!data){
        return false;
      }
      data.forEach(i => {
        if(i.showname == '热点新闻'){
          this.rdxwid = i.id
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.rdxwid,pagesize:9}).
            then(res=>{
              if(res){
                this.newtype  = res[0].newtype;
                if(res.length >=9){
                  this.rdxwData = res.slice(0,9);
                }else{
                  this.rdxwData = res
                }
                // this.rdxwData.forEach(k =>{
                //   if(k.newtypetext == '图片新闻'){
                //     k.imgurl = this.imgUrl(k);
                //   }
                //   if(k.newtypetext != '图片新闻'){
                //     this.xwrdData.push(k);
                //     this.firstNews = this.xwrdData[0]
                //   }
                // })
                // if(this.xwrdData.length >=7){
                //   this.xwrdData = this.xwrdData.slice(1,7);
                // }else{
                //   this.xwrdData= this.xwrdData.slice(1)
                // }
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
      let id  = this.rdxwid;
      window.location.href=window.location.origin+window.location.pathname+`#/infos2?id=${id}&nametitle=热点新闻&nameCode=${this.newtype}&index=2`
    },
    goDetail(item,index){
      let self  =this;
      let id  = self.rdxwid;
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
      window.location.href = window.location.origin+window.location.pathname+`#/detail2?index=${index}&id=${item.id}`
      // self.$router.push({path: `/detail2?index=${index}&id=${item.id}`})
    },
  }
}
</script>

<style scoped>
</style>