<template>
  <div class="box-shadow boxp">
    <div class="row list-wrap">
      <div class="col v-t" style="width: 520px">
        <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
          <!-- 图片尺寸固定520*320 -->
          <swiper-slide
            v-for="(item, index) in rdxwData"
            :key="index"
            class="swiper-item"
          >
            <img class="tpxwImg" v-lazy="item.imgurl" alt="" />
          </swiper-slide>
          <div
            class="swiper-pagination"
            id="pagination"
            slot="pagination"
          ></div>
        </swiper>
      </div>
      <div class="col v-t list-sep">
        <div class="list-tit handcan" @click="goDetail(firstNews)">
          <h2>
            <a>{{ firstNews.title }}</a>
          </h2>
          <p v-html="firstNews.newcontent"></p>
        </div>
        <ul class="list">
          <li
            v-for="(item, index) in xwrdData"
            :key="index"
            class="new"
            @click="goDetail(item)"
          >
            <a>{{ item.title }}</a>
            <span class="handcan">{{ item.createtime }}</span>
          </li>
        </ul>
      </div>
    </div>
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
      xwrdData:[],
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
    this.getnews()
  },
  methods:{
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
              // res.forEach(k =>{
              //   k.showname = '热点新闻'
              // })
              self.rdxwData = res;
              self.rdxwData.forEach(k =>{
                if(k.newtypetext == '图片新闻'){
                  k.imgurl = this.imgUrl(k);
                }
                if(k.newtypetext != '图片新闻'){
                  this.xwrdData.push(k);
                  this.firstNews = this.xwrdData[0]
                }
              })
              if(self.xwrdData.length >=7){
                self.xwrdData = self.xwrdData.slice(1,7);
              }else{
                self.xwrdData= self.xwrdData.slice(1)
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
      id  = this.rdxwid;
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
.box-shadow {
  background: rgba(255, 255, 255, 1);
}
.boxp {
  padding: 20px;
}
</style>