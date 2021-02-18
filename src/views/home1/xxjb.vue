<template>
  <div class="box-shadow">
    <h2 class="title">
      <span
        :class="[isActive2 == 'xxjb' ? 'active' : '']"
        @click="info2('xxjb')"
        >信息简报</span
      ><span
        :class="[isActive2 == 'spgl' ? 'active' : '']"
        @click="info2('spgl')"
        >审判管理</span
      ><span
        :class="[isActive2 == 'zzgz' ? 'active' : '']"
        @click="info2('zzgz')"
        >政治工作</span
      ><span
        :class="[isActive2 == 'jjjc' ? 'active' : '']"
        @click="info2('jjjc')"
        >纪检监察</span
      >
    </h2>
    <!-- <div class="row list-tit light">
        <div class="col v-m" style="width: 150px">
        <img src="@/assets/img.png" alt="" />
        </div>
        <div class="col v-m">
        <h2><a href="">加强粤港司法交流协作推进粤港澳大湾区建设</a></h2>
        <p>广东高院与香港特区政府律政司 签署法律交流与互鉴框架安排</p>
        </div>
    </div> -->
    <ul class="list" style="height: 302px">
      <li
        v-for="(item, index) in fourData"
        :key="index"
        class="new dot"
        @click="goDetail(item)"
      >
        <a>{{ item.title }}</a
        ><span class="handcan">{{ item.createtime }}</span>
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
      isActive2:'xxjb',
      fourData:null,
      xxjbData:null,
      spglData:null,
      zzgzData:null,
      jjjcData:null,
    }
  },
  created(){
    this.getnews()
  },
  methods:{
    info2(a){
      this.isActive2 = a;
      if(a=='xxjb'){
        this.fourData = this.xxjbData;
      }else if(a=='spgl'){
        this.fourData = this.spglData;
      }else if(a=='zzgz'){
        this.fourData = this.zzgzData;
      }else if(a=='jjjc'){
        this.fourData = this.jjjcData;
      }

    },
    getnews(){
      let self = this;
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(!data){
        return false;
      }
      data.forEach(i => {
        if(i.showname == '信息简报'){
          this.xxjbid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.xxjbid}).then(res => {
            if(res){
              res.forEach(k =>{
                k.showname = '信息简报'
              })
              self.xxjbData = res;
              self.fourData = res;
              if(self.xxjbData.length >=7){
                self.xxjbData = self.xxjbData.slice(0,7);
              }
            }
          })
        }else if(i.showname == '审判管理'){
          this.spglid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.spglid}).then(res => {
            if(res){
              res.forEach(k =>{
                k.showname = '审判管理'
              })
              self.spglData = res;
              if(self.spglData.length >=7){
                self.spglData = self.spglData.slice(0,7);
              }
            }
          })
        }else if(i.showname == '政治工作'){
          this.zzgzid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.zzgzid}).then(res => {
            if(res){
              res.forEach(k =>{
                k.showname = '政治工作'
              })
              self.zzgzData = res;
              if(self.zzgzData.length >=7){
                self.zzgzData = self.zzgzData.slice(0,7);
              }
            }
          })
        }else if(i.showname == '纪检监察'){
          this.jjjcid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.jjjcid}).then(res => {
            if(res){
              res.forEach(k =>{
                k.showname = '纪检监察'
              })
              self.jjjcData = res;
              if(self.jjjcData.length >=7){
                self.jjjcData = self.jjjcData.slice(0,7);
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
    goDetail(item){
      let id  = null;
      if(item.showname == '信息简报'){
        id  = this.xxjbid;
      }else if(item.showname == '审判管理'){
        id  = this.tzggid;
      }else if(item.showname == '政治工作'){
        id  = this.zzgzid;
      }else if(item.showname == '纪检监察'){
        id  = this.jjjcid;
      }
      let content = item;
      let setDate = JSON.stringify({
        imgurl:this.imgUrl(item),
        content:content,
        id:id,
        name:item.showname
      });
      localStorage.removeItem('setDate')
      localStorage.setItem('setDate',setDate)
      this.$router.push({path: `/detail`})
    },
  }
}
</script>

<style scoped>
.box-shadow {
  background: rgba(255, 255, 255, 1);
}
</style>