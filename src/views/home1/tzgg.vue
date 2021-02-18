<template>
  <div class="box-shadow">
    <h2 class="title">
      <span
        :class="[isActive1 == 'tzgg' ? 'active' : '']"
        @click="info1('tzgg')"
        >通知公告</span
      ><span
        :class="[isActive1 == 'sjfytz' ? 'active' : '']"
        @click="info1('sjfytz')"
        >上级法院通知</span
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
    <ul class="list">
      <li
        v-for="(item, index) in tzggInfo"
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
  name:'tzgg',
  props:{

  },
  data(){
    return{
      isActive1:'tzgg',
      isActive2:'xxjb',
      tzggInfo:[],
      tzggid:null,
      sjfytzData:[],
    }
  },
  created(){
    this.getnews()
  },
  methods:{
    info1(a){
      this.isActive1 = a;
      if(a == 'tzgg'){
        this.tzggInfo = this.tzggData;
      }else if(a == 'sjfytz'){
        this.tzggInfo = this.sjfytzData;
      }
    },
    getnews(){
      let self = this;
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(!data){
        return false;
      }
      data.forEach(i => {
        if(i.showname == '通知公告'){
          this.tzggid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.tzggid}).then(res => {
            if(res){
              res.forEach(k =>{
                k.showname = '通知公告'
              })
              self.tzggData = res;
              self.tzggInfo = res;
              self.tzggData.forEach(k =>{
                if(k.newtypetext == '上级法院通知'){
                  self.sjfytzData.push(k);
                }
              })
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
      id  = this.tzggid;
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