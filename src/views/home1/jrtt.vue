<template>
  <div class="box-shadow">
    <div class="row headline">
      <div class="col v-m" style="width: 100px">
        <img src="@/assets/top.png" alt="" />
      </div>
      <div class="col v-m">
        <swiper class="headline-swiper" :options="headlineSwiper">
          <swiper-slide v-for="(item, index) in TodayNews" :key="index">
            <a @click="goDetail(item)">{{ item.title }}</a>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'jrtt',
  props:{

  },
  data(){
    return{
      TodayNews:null,
      headlineSwiper: {
        direction: 'vertical',
        autoplay: true,
        loop: true,
        slidesPerView: 2,
        spaceBetween: 0
      },
    }
  },
  created(){
    this.getTodayNews();
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
    getTodayNews(){
      let self = this;
      let bean =  {"syscode":"22.001"};
      this.$http.post('zyWebRest_getHeadlineNewsContentBySyscode', bean).then(res => {
        if(res){
          let a = res.slice(1,11);
          self.TodayNews = a;
        }
      })
    },
    goDetail(item){
      let id  = item.parentid2;
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

<style lang="scss" scoped>
.headline {
  height: 100%;
  img {
    height: 100%;
  }
}

.box-shadow {
  background: rgba(255, 255, 255, 1);
  padding: 0;
  height: 0;
}
</style>