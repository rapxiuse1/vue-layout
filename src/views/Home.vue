<template>
  <div class="page">
    <Navbar ></Navbar>
    <div class="mid">
      <div class="page-tit">
        <h1>
          <img src="@/assets/title.png" alt="" />深圳深汕特别合作区人民法院
        </h1>
        <p><img src="@/assets/tip.png" alt="" />公正 求实 创新 奉献</p>
      </div>
      <!-- rdxwData:null,
      tzggData:null,
      xxjbData:null,
      spglData:null,
      zzgzData:null,
      jjjcData:null,
      fywhData:null -->
      <div class="main">
        <div class="row">
          <div class="col v-t main-left">
            <div class="row headline">
              <div class="col v-m" style="width: 100px">
                <img src="@/assets/top.png" alt="" />
              </div>
              <div class="col v-m">
                <swiper class="headline-swiper" :options="headlineSwiper">
                  <swiper-slide v-for="(item, index) in TodayNews" :key="index">
                    <a @click=goDetailT(item,index)>{{ item.title }}</a>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          
            <div class="row list-wrap">
              <div class="col v-t" style="width: 520px">
                
                <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
                  <!-- 图片尺寸固定520*320 -->
                  <swiper-slide
                    v-for="(item, index) in rdxwData"
                    v-if="item.newtypetext == '图片新闻'"
                    :key="index"
                    class="swiper-item"
                  >
                  <p class="headernews" style=" top: 291px;">{{ item.title }}</p>
                    <img class="tpxwImg" @click="goDetail(item,2)" v-lazy="item.imgurl" alt="" />
                  </swiper-slide>
                  <div
                    class="swiper-pagination"
                    id="pagination"
                    slot="pagination"
                  ></div>
                </swiper>
              </div>
              <div class="col v-t list-sep">
                <div class="list-tit handcan" @click="goDetail(firstNews,2)">
                  <h2>
                    <a>{{ firstNews.title }}</a>
                  </h2>
                  <div v-html="firstNews.newcontent2"></div>
                </div>
                <ul class="list">
                  <li
                    v-for="(item, index) in xwrdData"
                    :key="index"
                    class="new"
                    @click="goDetail(item,2)"
                  >
                    <a>{{ item.title }}</a>
                    <span class="handcan">{{   item.createtime.substring(0, item.createtime.indexOf(' ')) }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 class="title" style="height: 86px;">
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
                @click="goDetail(item,1)"
              >
                <a>{{ item.title }}</a
                ><span class="handcan">{{ item.createtime.substring(0, item.createtime.indexOf(' ')) }}</span>
              </li>
            </ul>
          </div>
          <div class="col v-t">
            <h2 class="title"><span class="active">搜索区</span></h2>
            <div class="search">
              <input
                type="text"
                v-model="keyword"
                placeholder="请输入您要搜索的关键词"
              />
              <router-link :to="'/search?keyword=' + keyword"
                ><img src="@/assets/search.png" alt=""
              /></router-link>
            </div>
            <div class="system">
              <h3 class="title center"><span class="active">业务系统</span></h3>
              <div
                @click="gosys(item.url)"
                v-for="(item, index) in system"
                :key="index"
                class="system-item"
              >
                <a
                  ><img v-lazy="item.icon" alt="" /><span>{{
                    item.label
                  }}</span></a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="banner"><img src="@/assets/banner.png" alt="" /></div>
        <div class="row">
          <div class="col v-t main-left">
            <h2 class="title"  style="height: 86px;">
              <span
                :class="[isActive2 == 'xxjb' ? 'active' : '']"
                @click="info2('xxjb',3)"
                >信息简报</span
              ><span
                :class="[isActive2 == 'spgl' ? 'active' : '']"
                @click="info2('spgl',4)"
                >审判管理</span
              ><span
                :class="[isActive2 == 'zzgz' ? 'active' : '']"
                @click="info2('zzgz',6)"
                >政治工作</span
              >
              <!-- <span
                :class="[isActive2 == 'jjjc' ? 'active' : '']"
                @click="info2('jjjc',11)"
                >纪检督察</span
              > -->
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
                @click="goDetail(item,index1)"
              >
                <a>{{ item.title }}</a
                ><span class="handcan">{{ item.createtime.substring(0, item.createtime.indexOf(' ')) }}</span>
              </li>
            </ul>

            <h2 class="title">
              <span class="active">开庭排期</span>
            </h2>

            <div class="table-wrap">
              <table class="table">
                <colgroup>
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                  <col width="10%" />
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
                style="height: 165px"
                :options="scheduleSwiper"
                v-if="KtpqData && KtpqData.length>3" 
              >
                <swiper-slide  v-for="(item, index) in KtpqData" :key="index">
                  <span style="width: 20%">{{ item.courtsessiontime.substring(0, item.courtsessiontime.indexOf('.'))}}</span>
                  <span style="width: 20%">{{ item.courtsessionplace }}</span>
                  <span style="width: 20%">{{ item.casenumber }}</span>
                  <span style="width: 10%">{{ item.judgeincharge }}</span>
                  <span style="width: 10%">{{ item.assistantjudge }}</span>
                  <span style="width: 20%">{{ item.casereasons }}</span>
                </swiper-slide>
              </swiper>
              
              <div v-else-if="!KtpqData" class="table-swiper" style="height: 156px">
                <div  :key="index">
                  <span style="width: 20%">暂无数据</span>
                </div>
              </div>
              <div v-else-if="KtpqData.length < 3 || KtpqData.length == 3" class="table-swiper" style="height: 156px">
                <div v-for="(item, index) in KtpqData" :key="index">
                  <span style="width: 20%">{{ item.courtsessiontime.substring(0, item.courtsessiontime.indexOf('.'))}}</span>
                  <span style="width: 20%">{{ item.courtsessionplace }}</span>
                  <span style="width: 20%">{{ item.casenumber }}</span>
                  <span style="width: 10%">{{ item.judgeincharge }}</span>
                  <span style="width: 10%">{{ item.assistantjudge }}</span>
                  <span style="width: 20%">{{ item.casereasons }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col v-t">
            <h2 class="title">
              <span class="active">办案排行</span
              ><i>统计截止办案排行：1-12月</i>
            </h2>
            <div class="table-wrap">
              <table class="table small">
                <colgroup>
                  <col width="40%" />
                  <col width="60%" />
                </colgroup>
                <tr>
                  <th>姓名</th>
                  <th>数量</th>
                </tr>
              </table>
              <swiper v-if="bnphData.length>6" class="table-swiper large" :options="schedule1Swiper">
                <swiper-slide v-for="(item, index) in bnphData" :key="index">
                  <span style="width: 40%">{{ item.fullname }}</span>
                  <span style="width: 60%">{{ item.totel }}</span>
                </swiper-slide>
              </swiper>
              <div v-else-if="!bnphData" class="table-swiper" style="height: 161px">
                <div  :key="index">
                  <span style="width: 20%">暂无数据</span>
                </div>
              </div>
              <div  v-else-if="bnphData.length < 6 || bnphData.length == 6" class="table-swiper large">
                <div v-for="(item, index) in bnphData" :key="index">
                  <span style="width: 40%">{{ item.fullname }}</span>
                  <span style="width: 60%">{{ item.totel }}</span>
                </div>
              </div>
            </div>
            <div class="table-link">
              <a @click="gosfjd('SSFYWeb_sfgg')"><img src="@/assets/b1.png" alt="" /></a>
              <a @click="gosfjd('SSFYWeb_djxx',7)"><img src="@/assets/b2.png" alt="" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <Footer></Footer>
  </div>
</template>

<script>
  var vm = null;
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      TodayNews:[],
      headline: [{
        title: '市委第三巡视组巡视我区工作动员会议召开市委第三巡视组巡视我区工作动员会议召开'
      }, {
        title: '广东高院与香港特区政府律政司 签署法律交流与互鉴框架安排广东高院与香港特'
      }, {
        title: '广东高院与香港特区政府律政司'
      }],
      headlineSwiper: {
        direction: 'vertical',
        autoplay: true,
        loop: false,
        slidesPerView: 2,
        spaceBetween: 0,
        
      },
      isActive1:'tzgg',
      isActive2:'xxjb',
      index1:3,
      news: [{
        url: require('../assets/slide.png')
      }, {
        url: require('../assets/slide.png')
      }],
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
      system: [{
        icon: require('../assets/icon1.png'),
        label: '司法政务管理',
        url:'http://146.12.3.141/ZYOA/LEAP/Login/4403/ZYOA/Login.html'
      }, {
        icon: require('../assets/icon2.png'),
        label: '省院综合业务',
        url:'http://146.12.2.66:9080/court/'
      }, {
        icon: require('../assets/icon3.png'),
        label: '新鹰眼系统',
        url:'http://146.12.2.112:8080/eamp/'
      }, {
        icon: require('../assets/icon4.png'),
        label: '中院信访管理',
        url:'http://146.12.2.2:8088/szxf/'
      }, {
        icon: require('../assets/icon5.png'),
        label: '电子卷宗系统',
        url:'http://146.12.2.191:8080/onlineArchive/'
      }, {
        icon: require('../assets/icon6.png'),
        label: '高清数字法庭',
        url:'http://146.12.97.61:8080/'
      }, {
        icon: require('../assets/icon7.png'),
        label: '案件数据平台',
        url:'http://146.12.1.87/login'
      }, {
        icon: require('../assets/icon8.png'),
        label: '廉政风险防控',
        url:'http://146.12.97.16:8080/fxjk/'
      }, {
        icon: require('../assets/icon9.png'),
        label: '审判绩效管理系统',
        url:'http://146.12.3.61/ytjx/'
      }],
      scheduleSwiper: {
        direction: 'vertical',
        autoplay: true,
        loop: true,
        slidesPerView: 3,
        spaceBetween: 0
      },
      schedule1Swiper: {
        direction: 'vertical',
        autoplay: true,
        loop: true,
        slidesPerView: 6,
        spaceBetween: 0
      },
      navInfo:JSON.parse(localStorage.getItem('navbar'))?JSON.parse(localStorage.getItem('navbar')):null,
      tzgg:null,
      xxjb:null,
      ttxw:null,
      rdxw:null,
      fywh:null,
      // KtpqData:[{courtsessiontime:'2020/3/24 14:20:01',courtsessionplace:'的期望的的范',casenumber:'大青蛙成为',judgeincharge:'毒贩夫妇付',assistantjudge:'飞飞飞飞',casereasons:'dwqdwqwdq'},{courtsessiontime:'2020/3/24 14:20:01',courtsessionplace:'的期望的的范',casenumber:'大青蛙成为',judgeincharge:'毒贩夫妇付',assistantjudge:'飞飞飞飞',casereasons:'dwqdwqwdq'},{courtsessiontime:'2020/3/24 14:20:01',courtsessionplace:'的期望的的范',casenumber:'大青蛙成为',judgeincharge:'毒贩夫妇付',assistantjudge:'飞飞飞飞',casereasons:'dwqdwqwdq'}],
      // ttxwData:null,
      rdxwData:[],
      tzggData:[],
      xxjbData:[],
      spglData:[],
      zzgzData:[],
      jjjcData:[],
      fywhData:[],
      xwrdData:[],
      fourData:[],
      firstNews:{title:''},
      tzggInfo:[],
      sjfytzData:[],
      bnphData:[],
      KtpqData:[],
      keyword:'',
      tzggid:null,
      rdxwid:null,
      xxjbid:null,
      spglid:null,
      zzgzid:null,
      jjjcid:null,
      fywhid:null,
      zywjid:null,
      lzxxid:null,
      gzzdid:null,
      djxxid:null,
      fymhid:null,
      syid:null,
      sfUrl:null,
      jdUrl:null,
     
    }
  },
  created(){
    vm = this;
    this.getPageDate();
    this.getTodayNews();
    this.getOtherNews();
    this.getKtpqData();
    this.getbnphData();
    this.seeNetNumber();
    this.getsjId()
    // this.removeBq();
    
  },
  mounted () {
     
  },
  methods: {
    //获取司法和建党id
    getsjId(){
      let data  = JSON.parse(localStorage.getItem('navbar'));
      data.forEach(i=>{
        if(i.showname == '司法改革'){
          this.sfUrl = `/infos?id=${i.id}&nametitle=${i.showname}&nameCode=${i.name}`;
        }else if(i.showname == '党建信息'){
          this.jdUrl = `/infos?id=${i.id}&nametitle=${i.showname}&index=7&nameCode=${i.name}`;
        }
      })
    },
    gosfjd(flag){
      if(flag == 'SSFYWeb_sfgg'){
        this.$router.push({path:this.sfUrl})
      }else if(flag == 'SSFYWeb_djxx'){
        this.$router.push({path:this.jdUrl})
      }
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
    gosys(url){
      window.open(url)
    },
    info1(a){
      this.isActive1 = a;
      if(a == 'tzgg'){
        this.tzggInfo = this.tzggData;
      }else if(a == 'sjfytz'){
        this.tzggInfo = this.sjfytzData;
      }
    },
    info2(a,index){
      this.isActive2 = a;
      this.index1 = index;
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
          self.TodayNews.map(i =>{
            if(i.topresid == self.syid){
              i.index = 0
            }else if(i.topresid == self.tzggid){
              i.index = 1
            }else if(i.topresid == self.rdxwid){
              i.index = 2
            }else if(i.topresid == self.xxjbid){
              i.index = 3
            }else if(i.topresid == self.spglid){
              i.index = 4
            }else if(i.topresid == self.zywjid){
              i.index = 5
            }else if(i.topresid == self.zzgzid){
              i.index = 6
            }else if(i.topresid == self.djxxid){
              i.index = 7
            }else if(i.topresid == self.lzxxid){
              i.index = 8
            }else if(i.topresid == self.gzzdid){
              i.index = 9
            }else if(i.topresid == self.fymhid){ 
              i.index = 10
            }else if(i.topresid == self.jjjcid){ 
              i.index = 11
            }
          })
        }
      })
    },
    getPageDate(){
      let self = this;
      let bean =  {'category':'SSFYWeb'}
      this.$http.post('zyWebRest_getMenuCategoryByName', bean).then(res => {
        if(res){
          res.forEach((v,i) =>{
            if(v.showname == '深汕法院综合信息发布网站'){
              self.$http.post('zyWebRest_getHomePageNewsContentBySyscode', {syscode:res[0].syscode}).then(res2 => {
                if(res2){
                }
              })
            }
          });
        }
      })
    },
    // listShow(name,typetext){
    //   let self = this;
    //   self.name =name
    //   self.newtypetext = typetext;
    //   let bean = {'category':name,'pagenum':1,'pagesize':10,}
    //   this.$http.post('zyWebRest_getNewsContentByCategory', bean).then(res => {
    //     if(res){
    //       self.contentDate = res;
    //     }
    //   })
    // },
    getOtherNews(){
      let self = this;
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(!data){
        return false;
      }
      data.forEach(i =>{
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
        }else if(i.showname == '通知公告'){
          this.tzggid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.tzggid,pagesize:9}).then(res => {
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
        }else if(i.showname == '信息简报'){
          this.xxjbid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.xxjbid,pagesize:9}).then(res => {
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
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.spglid,pagesize:9}).then(res => {
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
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.zzgzid,pagesize:9}).then(res => {
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
        }else if(i.showname == '纪检督察'){
          this.jjjcid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.jjjcid,pagesize:9}).then(res => {
            if(res){
              res.forEach(k =>{
                k.showname = '纪检督察'
              })
              self.jjjcData = res;
              if(self.jjjcData.length >=7){
                self.jjjcData = self.jjjcData.slice(0,7);
              }
            }
          })
        }else if(i.showname == '法院文化'){
          this.fywhid = i.id;
          this.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:this.fywhid,pagesize:9}).then(res => {
            if(res){
              res.forEach(k =>{
                k.showname = '法院文化'
              })
              res.forEach(k =>{
                if(k.newtypetext == '图片鉴赏' || k.newtypetext == '文化天地'){
                  self.fywhData.push(k);
                  k.imgurl = self.imgUrl(k);
                }
                console.log(this.fywhData,'fywhData')
              })
              // if(self.fywhData.length >=7){
                self.fywhData = self.fywhData.slice(0,5);
              // }
            }
          })
        }else if(i.showname == '重要文件'){ 
          this.zywjid = i.id;
        }else if(i.showname == '廉政信息'){ 
          this.lzxxid = i.id;
        }else if(i.showname == '规章制度'){ 
          this.gzzdid = i.id;
        }else if(i.showname == '首页'){ 
          this.syid = i.id;
        }else if(i.showname == '党建信息'){ 
          this.djxxid = i.id;
        }else if(i.showname == '法院门户'){ 
          this.fymhid = i.id;
        }
      })
    },
    getKtpqData(){
      let self = this;
      self.$http.post('zyWebRest_getCourtSchedule', {"pagesize":7}).then(res => {
        if(res){
          self.KtpqData = res;
        }
      })
    },
    
    //网站访问
    seeNetNumber(){
      let self = this;
      self.$http.post('zyWebRest_insertVisitor', {"websitename": "SSFYWEB"}).then(res => {
        if(res){
        }
      })
    },
    getbnphData(){
      let self = this;
      self.$http.post('zyWebRest_getRankingOfCases', {"pagesize":7}).then(res => {
        if(res){
          self.bnphData = res;
        }
      })
    },
    goDetail(item,index){
      let id  = null;
      if(item.showname == '通知公告'){
        id  = this.tzggid;
      }else if(item.showname == '信息简报'){
        id  = this.xxjbid;
      }else if(item.showname == '审判管理'){
        id  = this.spglid;
      }else if(item.showname == '政治工作'){
        id  = this.zzgzid;
      }else if(item.showname == '纪检督察'){
        id  = this.jjjcid;
      }else if(item.showname == '法院门户'){
        id  = this.fymhid;
      }else if(item.showname == '热点新闻'){
        id  = this.rdxwid;
      }else if(item.showname == '法院文化'){
        id  = this.fywhid;
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
      this.$router.push({path: `/detail?index=${index}&&id=${item.id}`})
    },
    //点击头条跳详情
    goDetailT(item){
      let id  = item.topresid;
      let content = item;
      let setDate = JSON.stringify({
        imgurl:this.imgUrl(item),
        content:content,
        id:id,
        name:item.showname2
      });
      localStorage.removeItem('setDate')
      localStorage.setItem('setDate',setDate)
      this.$router.push({path: `/detail?index=${item.index}&&id=${item.id}`})
    }
  }
}
</script>

<style scoped>
.footer {
  margin-top: 0;
}
.tpxwImg {
  width: 520px;
  height: 320px;
}
</style>


