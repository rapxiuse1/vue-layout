<template>
  <div class="box-shadow2">
    <h2 class="title" style="height: 70px;">
      <span :class="[isActive2 == 'xxjb' ? 'active2' : '']" @click="info2('xxjb',3)">信息简报</span><span @click="info2('spgl',4)"  :class="[isActive2 == 'spgl' ? 'active2' : '']">审判管理</span>
      <span class="more"  @click=gomore>更多</span>
    </h2>

    <ul class="list">
      <li v-for="(item, index) in list" :key="index" class="new">
        <a class="dot2" @click="goDetail(item,index1)">{{ item.title }}</a
        ><span>{{item.createtime.substring(0, item.createtime.indexOf(' '))}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'xxjb',
  props:{

  },
  data(){
    return{
      list:[],
      isActive2:'xxjb',
      index1:3,
      xxjbid:null,
      spglid:null,
      newtype:null,
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
        if(i.showname == '信息简报'){
          this.xxjbid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.xxjbid,pagesize:9}).then(res => {
            if(res){
              this.newtype  = res[0].newtype;
              if(res.length >=9){
                this.list = res.slice(0,9);
              }else{
                this.list = res
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
    info2(flag,index){
      this.isActive2 = flag;
      this.index1 =index;
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(flag == 'xxjb'){
        data.forEach(i => {
        if(i.showname == '信息简报'){
          this.xxjbid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.xxjbid,pagesize:9}).then(res => {
            
            if(res){
              this.newtype  = res[0].newtype;
              if(res.length >=9){
                this.list = res.slice(0,9);
              }else{
                this.list = res
              }
            }
          })
        }   
      });
      }else if(flag == 'spgl'){
        data.forEach(i => {
        if(i.showname == '审判管理'){
          this.spglid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.spglid,pagesize:9}).then(res => {
            if(res){
              this.newtype  = res[0].newtype;
              if(res.length >=9){
                this.list = res.slice(0,9);
              }else{
                this.list = res
              }
            }
          })
        }   
      });
      }
    },
    gomore(){
      if(this.isActive2=='xxjb'){
        let id  = this.xxjbid;
        window.location.href= window.location.href = window.location.origin+window.location.pathname+`#/infos2?id=${id}&nametitle=信息简报&index=3&nameCode=${this.newtype}`;
      }else if(this.isActive2=='spgl'){
        let id  = this.spglid;
        window.location.href= window.location.href = window.location.origin+window.location.pathname+`#/infos2?id=${id}&nametitle=审判管理&index=4&nameCode=${this.newtype}`;
      }
    },
    goDetail(item,index){
      let self  =this;
      let name  = null;
      if( this.index1 =3){
        name='信息简报'
      }else if(this.index1 =4){
        name='审判管理'
      }
      let id  = self.xxjbid;
      let content = item;
      let setDate = JSON.stringify({
        imgurl:self.imgUrl(item),
        content:content,
        id:id,
        name:name
      });
      localStorage.removeItem('setDate')
      localStorage.setItem('setDate',setDate)
      //动态挂在子组件无法使用vue自定义路由
      window.location.href = window.location.origin+window.location.pathname+`#/detail2?index=${index}&id=${item.id}`
      // self.$router.push({path: `/detail2?index=${index}&id=${item.id}`})
    },
  }
}
</script>

<style scoped>
</style>