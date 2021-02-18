<template>
  <div class="box box-s page-flex">
    <div class="tp-logo">图片 新闻</div>
    <div class="col v-t" style="height: 77%;width: 46%;">
      <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
        <!-- 图片尺寸固定520*320 -->
        <swiper-slide
        v-for="(item, index) in rdxwData"
        v-if="item.newtypetext == '图片新闻'"
        :key="index"
        class="swiper-item"
        >
        <p class="headernews" style=" top: 88%;">{{ item.title }}</p>
          <img class="tpxwImg" @click="goDetail(item,2)" v-lazy="item.imgurl" alt="" />
        </swiper-slide>
        <div class="swiper-pagination" id="pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="col v-t list-sep" style="height: 78.5%;">
      <div class="list-tit handcan" @click="goDetail(firstNews,2)">
        <h2>
          <a>{{ firstNews.title }}</a>
        </h2>
        <div v-html="firstNews.newcontent2"></div>
      </div>
      <ul class="list" style="margin-top: 2.8%;border-top: 1px dashed #c3c0c0;overflow: hidden;">
        <li
          v-for="(item, index) in xwrdData"
          :key="index"
          class="new margin-left"
          @click="goDetail(item,2)"
        >
          <a>{{ item.title }}</a>
          <span class="handcan">{{   item.createtime.substring(0, item.createtime.indexOf(' ')) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//图片新闻子组件
export default {
  name:'tpxw',
  props:{

  },
  data(){
    return{
      rdxwData:null,
      xwrdData:[],
      rdxwid:null,
      firstNews:{title:''},
      swiperOptions: {
        autoplay: true,
        speed: 600,
        loop: false,
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
    this.getNews()
  },
  mounted(){

  },
  methods:{
    getNews(){
      let self = this;
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(!data){
        return false;
      }
      data.forEach(i => {
        if(i.showname == '热点新闻'){
          self.rdxwid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:self.rdxwid,pagesize:11,}).then(res => {
            if(res){
              res.forEach(k =>{
                k.showname = '热点新闻'
              })
              self.rdxwData = res;
              self.rdxwData.forEach(k =>{
                if(k.newtypetext == '图片新闻'){
                  k.imgurl = self.imgUrl(k);
                }
                if(k.newtypetext != '图片新闻'){
                  self.xwrdData.push(k);
                  self.firstNews = self.xwrdData[0];
                  if(self.firstNews){
                    self.removeBq()
                  }
                  // 
                  console.log(self.firstNews,'self.firstNews')
                }
              })
              if(self.xwrdData.length >=7){
                self.xwrdData = self.xwrdData.slice(1,9);
              }else{
                self.xwrdData= self.xwrdData.slice(1)
              }
            }
          })
        }
        
      });
    },
        //去掉html标签
    removeBq(){
  // dataList.forEach(el => {
    this.firstNews.newcontent2 = this.firstNews.newcontent;
  var dd=this.firstNews.newcontent2.replace(/<[^>]+>/g,"");//截取html标签
  var dds=dd.replace(/&nbsp;/ig,"");//截取空格等特殊标签
  this.firstNews.newcontent2 ='';//清空里面内容
  this.firstNews.newcontent2=dds.substring(0,30) + "..."//截取200个字
  // });
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
    goDetail(item,index){
      let self  =this;
      let id  = self.rdxwid;
      let content = item;
      let setDate = JSON.stringify({
        imgurl:self.imgUrl(item),
        content:content,
        id:id,
        name:item.showname
      });
      localStorage.removeItem('setDate')
      localStorage.setItem('setDate',setDate)
      //动态挂在子组件无法使用vue自定义路由
      window.location.href =  window.location.href = window.location.origin+window.location.pathname+`#/detail2?index=${index}&id=${item.id}`
      // self.$router.push({path: `/detail2?index=${index}&id=${item.id}`})
    },
  }
}
</script>

<style lang="scss" scoped>
.list-sep {
  width: 43%;
}
.margin-left{
  margin-left: -10px;
  padding: 1.56% 10px;
}
.list{
  height: 77%;
}
.swiper{width:95%;height:102%;position: relative;}
.tpxwImg{height:102%;width: 100%;cursor:pointer;}
</style>