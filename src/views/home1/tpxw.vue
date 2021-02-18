<template>
  <div class="box-shadow">
    <div class="col v-t" style="width: 520px">
      <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
        <!-- 图片尺寸固定520*320 -->
        <swiper-slide
          v-for="(item, index) in rdxwData"
          v-if="item.newtypetext == '图片新闻'"
          :key="index"
          class="swiper-item"
        >
          <img class="tpxwImg" v-lazy="item.imgurl" alt="" />
        </swiper-slide>
        <div class="swiper-pagination" id="pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name:'tpxw',
  props:{

  },
  data(){
    return{
      rdxwData:null,
      rdxwid:null,
      firstNews:null,
      swiperOptions: {
        autoplay: true,
        speed: 600,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
          clickable :true
        }
      },
    }
  },
  created(){
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
        if(i.showname == '热点新闻'){
          self.rdxwid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:self.rdxwid}).then(res => {
            if(res){
              res.forEach(k =>{
                k.showname = '热点新闻'
              })
              self.rdxwData = res;
              self.rdxwData.forEach(k =>{
                if(k.newtypetext == '图片新闻'){
                  k.imgurl = self.imgUrl(k);
                }
              })
            }
          })
        }
      });
    }
  }
}
</script>

<style scoped>
.box-shadow {
  background: rgba(255, 255, 255, 1);
}
</style>