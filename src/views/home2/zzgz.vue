<template>
  <div class="box-shadow2">
    <h2 class="title"  style="height: 70px;">
      <span :class="[isActive2 == 'zzgz' ? 'active2' : '']" @click="info2('zzgz',6)">政治工作</span><span @click="info2('jjdc')"  :class="[isActive2 == 'jjdc' ? 'active2' : '']">纪检督察</span>
      <span class="more"  @click=gomore>更多</span>
    </h2>

    <ul class="list">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="new"
        @click="goDetail(item)"
      >
        <a class="dot2">{{ item.title }}</a
        ><span>{{item.createtime.substring(0, item.createtime.indexOf(' '))}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name:'zzgz',
  props:{

  },
  data(){
    return{
      list:[],
      isActive2:'zzgz',
      index1:6,
      zzgzid:null,
      jjdcid:null,
      newtype:null,
    }
  },
  created(){
    console.log(this)
    this.getNews()
  },
  methods:{
    getNews(){
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(!data){
        return false;
      }
      data.forEach(i => {
        if(i.showname == '政治工作'){
          this.zzgzid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.zzgzid,pagesize:9}).then(res => {
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
    info2(flag,index){
      this.isActive2 = flag;
      this.index1 =index;
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(flag == 'zzgz'){
        data.forEach(i => {
        if(i.showname == '政治工作'){
          this.zzgzid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.zzgzid,pagesize:9}).then(res => {
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
      }else if(flag == 'jjdc'){
        this.list=[]
      //   data.forEach(i => {
      //   if(i.showname == '纪检督察'){
      //     this.jjdcid = i.id;
      //     this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.jjdcid,pagesize:9}).then(res => {
      //       if(res){
      //         this.newtype  = res[0].newtype;
      //         if(res.length >=9){
      //           this.list = res.slice(0,9);
      //         }else{
      //           this.list = res
      //         }
      //       }
      //     })
      //   }   
      // });
      }
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
      if(this.isActive2=='zzgz'){
        let id  = this.zzgzid;
        window.location.href= window.location.href = window.location.origin+window.location.pathname+`#/infos2?index=6&id=${id}&nametitle=政治工作&nameCode=${this.newtype}`;
      }else if(this.isActive2=='spgl'){
        let id  = this.jjdcid;
        window.location.href= window.location.href = window.location.origin+window.location.pathname+`#/infos2?id=${id}&nametitle=纪检督察&nameCode=${this.newtype}`;
      }
    },
    goDetail(item){
      let name  = null;
      let id =null;
      let index = null;
      if( this.index1 =6){
        name='政治工作';
        id = this.zzgzid;
        index = 6;
      }else {
        name='纪检督察';
        id  = this.jjdcid;
      }
      let self  =this;
      // id  = self.tzggid;
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