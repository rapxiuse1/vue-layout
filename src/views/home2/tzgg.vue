<template>
  <div class="box-shadow2">
    <h2 class="title">
      <span class="active2">通知公告</span>
      <span class="more" @click=gomore>更多</span>
    </h2>
    <ul class="list">
      <li v-for="(item, index) in tzggData" :key="index" class="new3">
        <a @click="goDetail(item,1)" class="list-a"
          ><p :class="[index>2 ? 'blue' : '' ]">{{index+1}}</p>
          {{ item.title }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
//通知公告子组件
export default {
  name:'tzgg',
  props:{

  },
  data(){
    return{
      tzggData:[],
      tzggid:null,
      newtype:null
    }
  },
  created(){
    this.getNews()
  },
  methods:{
    getNews(){
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(!data){
        return false;
      }
      data.forEach(i => {
        if(i.showname == '通知公告'){
          this.tzggid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.tzggid,pagesize:9}).then(res => {
            if(res){
              this.newtype  = res[0].newtype;
              if(res.length >=9){
                this.tzggData = res.slice(0,9);
              }else{
                this.tzggData = res
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
      let id  = this.tzggid;
      window.location.href= window.location.href = window.location.origin+window.location.pathname+`#/infos2?id=${id}&nametitle=通知公告&nameCode=${this.newtype}&index=1`;
    },
    goDetail(item,index){
      let self  =this;
      let id  = self.tzggid;
      let content = item;
      let setDate = JSON.stringify({
        imgurl:self.imgUrl(item),
        content:content,
        id:id,
        name:"通知公告"
      });
      localStorage.removeItem('setDate')
      localStorage.setItem('setDate',setDate)
      //动态挂在子组件无法使用vue自定义路由
      window.location.href = window.location.origin+window.location.pathname+`#/detail2?index=${index}&id=${item.id}`
    },
  }
}
</script>

<style scoped>
</style>