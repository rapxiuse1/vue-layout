<template>
  <div class="box-shadow boxp">
    <h2 class="title">
      <span class="active">开庭排期</span>
    </h2>

    <div class="table-wrap">
      <table class="table">
        <colgroup>
          <col width="15%" />
          <col width="15%" />
          <col width="20%" />
          <col width="20%" />
          <col width="10%" />
          <col width="20%" />
        </colgroup>
        <tr>
          <th>开庭时间</th>
          <th>开庭地点</th>
          <th>案号</th>
          <th>承办法官</th>
          <th>法官助理</th>
          <th>案由</th>
        </tr>
      </table>
      <swiper
        class="table-swiper"
        style="height: 161px"
        :options="scheduleSwiper"
      >
        <swiper-slide v-for="(item, index) in KtpqData" :key="index">
          <span style="width: 15%">{{ item.courtsessiontime }}</span>
          <span style="width: 15%">{{ item.courtsessionplace }}</span>
          <span style="width: 20%">{{ item.casenumber }}</span>
          <span style="width: 20%">{{ item.judgeincharge }}</span>
          <span style="width: 10%">{{ item.assistantjudge }}</span>
          <span style="width: 20%">{{ item.casereasons }}</span>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name:'ktpq',
  props:{

  },
  data(){
    return{
      scheduleSwiper: {
        direction: 'vertical',
        autoplay: true,
        loop: true,
        slidesPerView: 3,
        spaceBetween: 0
      },
      KtpqData:null,
    }
  },
  created(){
    this.getKtpqData();
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
    getKtpqData(){
      let self = this;
      self.$http.post('zyWebRest_getCourtSchedule', {"pagesize":7}).then(res => {
        if(res){
          self.KtpqData = res;
        }
      })
    },
  }
}
</script>

<style scoped>
.box-shadow {
  background: rgba(255, 255, 255, 1);
}
.boxp {
  padding: 20px;
}
.table-wrap {
  border: 0;
}
</style>