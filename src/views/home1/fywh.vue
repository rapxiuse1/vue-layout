<template>
  <div class="box-shadow">
    <div class="culture">
      <div class="mid small">
        <div class="t-c">
          <h2 class="title center" style="display: inline-block">
            <span class="active">法院文化</span>
          </h2>
        </div>
        <ul>
          <li
            v-for="(item, index) in fywhData"
            :key="index"
            @click="goDetail(item)"
          >
            <a>
              <!-- 图片尺寸 300*200 -->
              <img v-lazy="item.imgurl" alt="" />
              <span>{{ item.title }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'fywh',
  props:{

  },
  data(){
    return{
      fywhData:[],
      fywhid:null,
    }
  },
  created(){
    this.getnews()
    //this.getKtpqData();
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
    getnews(){
      let self = this;
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(!data){
        return false;
      }
      data.forEach(i => {
        if(i.showname == '法院文化'){
          this.fywhid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.fywhid}).then(res => {
            if(res){
              res.forEach(k =>{
                k.showname = '法院文化'
              })
              res.forEach(k =>{
                if(k.newtypetext == '图片鉴赏'){
                  self.fywhData.push(k);
                  k.imgurl = self.imgUrl(k);
                }
              })
              if(self.fywhData.length >=7){
                self.fywhData = self.fywhData.slice(0,5);
              }
            }
          })
        }
      });
    },
    goDetail(item){
      let id  = null;
      if(item.showname == '法院文化'){
        id  = this.fywhid;
      }
      let content = item;
      let setDate = JSON.stringify({
        imgurl:this.imgUrl(item),
        content:content,
        id:id,
        name:'法院文化'
      });
      localStorage.removeItem('setDate')
      localStorage.setItem('setDate',setDate)
      window.location.href = `/#/detail2?index=${index}&id=${item.id}`
    },
  }
}
</script>

<style scoped>
.box-shadow {
  background: rgba(255, 255, 255, 1);
}
</style>