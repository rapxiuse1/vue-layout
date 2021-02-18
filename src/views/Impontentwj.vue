<template>
  <div class="page">
    <Navbar></Navbar>
    <div class="mid">
      <div class="page-tit text-left">
        <div>
          <h1>
            <img src="@/assets/title.png" alt="" />深圳深汕特别合作区人民法院
          </h1>
          <p><img src="@/assets/tip.png" alt="" />公正 求实 创新 奉献</p>
        </div>

        <div class="system margin-left-m">
          <h3 class="title center"><span class="active">业务系统</span></h3>
          <div v-if="system.length > 5" v-show="closeOpen">
            <div class="system-item s-width flex" style="color: #fff;">
              <a 
                ><img v-lazy="system[0].icon" alt="" /><span>{{
                  system[0].label
                }}</span></a
              >
              <a 
                ><img v-lazy="system[1].icon" alt="" /><span>{{
                  system[1].label
                }}</span></a
              >
              <a 
                ><img v-lazy="system[2].icon" alt="" /><span>{{
                  system[2].label
                }}</span></a
              >
              <a 
                ><img v-lazy="system[3].icon" alt="" /><span>{{
                  system[3].label
                }}</span></a
              >
              <a @click="openMore"
                ><img src="@/assets/icon-more.png" alt="" /><span>更多</span></a
              >
            </div>
          </div>
          <div v-if="ifOpen">
            <div
              v-for="(item, index) in system"
              :key="index"
              class="system-item s-width a"
              style="color: #fff;"
            >
              <a 
                ><img v-lazy="item.icon" alt="" /><span>{{ item.label }}</span></a
              >
            </div>
            <a @click="openMore"><span>更多</span></a>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="row">
          <div class="col v-t main-left width100">
            <div class="row list-wrap">
              <div class="col v-t" style="width: 100%;">
                <swiper
                  class="swiper swiper2"
                  ref="mySwiper"
                  :options="swiperOptions"
                >
                  <!-- 图片尺寸固定520*320 -->
                  <swiper-slide
                    v-for="(item, index) in news"
                    :key="index"
                    class="swiper-item swiper-item1"
                  >
                    <img v-lazy="item.url" alt="" />
                  </swiper-slide>
                  <div
                    class="swiper-pagination"
                    id="pagination"
                    slot="pagination"
                  ></div>
                </swiper>
              </div>
            </div>
            <div class="flex2">
              <div class="row headline width60">
                <div class="col v-m" style="width: 100px;">
                  <img src="@/assets/top.png" alt="" />
                </div>
                <div class="col v-m">
                  <swiper class="headline-swiper" :options="headlineSwiper">
                    <swiper-slide
                      v-for="(item, index) in headline"
                      :key="index"
                    >
                      <router-link to="/">{{ item.title }}</router-link>
                    </swiper-slide>
                  </swiper>
                </div>
              </div>
              <div class="table-link flex2 margins30">
                <a ><img src="@/assets/b1.png" alt="" /></a>
                <a ><img src="@/assets/b2.png" alt="" /></a>
              </div>
            </div>

            <div class="flex2">
              <div class="col v-t list-sep">
                <div class="list-tit">
                  <h2>
                    <a href="">加强粤港司法交流协作推进粤港澳大湾区建设</a>
                  </h2>
                  <p>广东高院与香港特区政府律政司 签署法律交流与互鉴框架安排</p>
                </div>
                <ul class="list">
                  <li v-for="(item, index) in list" :key="index" class="new">
                    <a >{{ item.title }}</a
                    ><span>{{ item.time }}</span>
                  </li>
                </ul>
              </div>
              <div style="margin-left: 50px;">
                <h2 class="title">
                  <span class="active">通知公告</span><span>上级法院通知</span>
                </h2>
                <div class="row list-tit light">
                  <div class="col v-m" style="width: 150px;">
                    <img src="@/assets/img.png" alt="" />
                  </div>
                  <div class="col v-m">
                    <h2>
                      <a href="">加强粤港司法交流协作推进粤港澳大湾区建设</a>
                    </h2>
                    <p>
                      广东高院与香港特区政府律政司 签署法律交流与互鉴框架安排
                    </p>
                  </div>
                </div>

                <ul class="list">
                  <li
                    v-for="(item, index) in list1"
                    :key="index"
                    class="new dot"
                  >
                    <a >{{ item.title }}</a
                    ><span>{{ item.time }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- <div class="col v-t"> -->
          <!-- <h2 class="title"><span class="active">搜索区</span></h2> -->
          <div class="search ssq">
            <input type="text" placeholder="请输入您要搜索的关键词" />
            <router-link to="/sub/search"
              ><img src="@/assets/search.png" alt=""
            /></router-link>
          </div>

          <!-- </div> -->
        </div>
        <div class="banner"><img src="@/assets/banner.png" alt="" /></div>
        <div class="row">
          <div class="col v-t main-left">
            <h2 class="title">
              <span class="active">信息简报</span><span>审判管理</span
              ><span>政治工作</span><span>纪检监察</span>
            </h2>
            <div class="row list-tit light">
              <div class="col v-m" style="width: 150px;">
                <img src="@/assets/img.png" alt="" />
              </div>
              <div class="col v-m">
                <h2><a href="">加强粤港司法交流协作推进粤港澳大湾区建设</a></h2>
                <p>广东高院与香港特区政府律政司 签署法律交流与互鉴框架安排</p>
              </div>
            </div>
            <ul class="list" style="margin-bottom: 30px;">
              <li v-for="(item, index) in list1" :key="index" class="new dot">
                <a >{{ item.title }}</a
                ><span>{{ item.time }}</span>
              </li>
            </ul>

            <h2 class="title"><span class="active">开庭排期</span></h2>

            <div class="table-wrap width140">
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
              <swiper class="table-swiper" :options="scheduleSwiper">
                <swiper-slide v-for="(item, index) in schedule" :key="index">
                  <span style="width: 15%;">{{ item.time }}</span>
                  <span style="width: 15%;">{{ item.location }}</span>
                  <span style="width: 20%;">{{ item.no }}</span>
                  <span style="width: 20%;">{{ item.p }}</span>
                  <span style="width: 10%;">{{ item.p1 }}</span>
                  <span style="width: 20%;">{{ item.detail }}</span>
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="col v-t">
            <h2 class="title">
              <span class="active">办案排行</span
              ><i>统计截止办案排行：1-10月</i>
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
              <swiper class="table-swiper large" :options="schedule1Swiper">
                <swiper-slide v-for="(item, index) in schedule1" :key="index">
                  <span style="width: 40%;">{{ item.name }}</span>
                  <span style="width: 60%;">{{ item.title }}</span>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="culture">
      <div class="mid small">
        <div class="t-c">
          <h2 class="title center" style="display: inline-block;">
            <span class="active">法院文化</span>
          </h2>
        </div>
        <ul>
          <li v-for="(item, index) in list2" :key="index">
            <a >
              <!-- 图片尺寸 300*200 -->
              <img v-lazy="item.icon" alt="" />
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
      ifOpen:false,
      closeOpen:true,
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
        loop: true,
        slidesPerView: 2,
        spaceBetween: 0
      },
      news: [{
        url: require('../assets/slide.png')
      }, {
        url: require('../assets/slide.png')
      }],
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
      list: [{
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }, {
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }, {
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }, {
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }, {
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }, {
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }],
      list1: [{
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }, {
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }, {
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }],
      system: [{
        icon: require('../assets/icon1.png'),
        label: '司法政务管理'
      }, {
        icon: require('../assets/icon2.png'),
        label: '省院综合业务'
      }, {
        icon: require('../assets/icon3.png'),
        label: '新鹰眼系统'
      }, {
        icon: require('../assets/icon4.png'),
        label: '中院信访管理'
      }, {
        icon: require('../assets/icon5.png'),
        label: '电子卷中系统'
      }, {
        icon: require('../assets/icon6.png'),
        label: '高清数字法庭'
      }, {
        icon: require('../assets/icon7.png'),
        label: '案件数据平台'
      }, {
        icon: require('../assets/icon8.png'),
        label: '廉政风险防控'
      }, {
        icon: require('../assets/icon9.png'),
        label: '审判绩效管理系统'
      }],
      list2: [{
        icon: require('../assets/img1.png'),
        title: '2019年12月4日国家宪法日宣誓国家宪法日宣誓'
      }, {
        icon: require('../assets/img1.png'),
        title: '2019年12月4日国家宪法日宣誓'
      }, {
        icon: require('../assets/img1.png'),
        title: '2019年12月4日国家宪法日宣誓'
      }, {
        icon: require('../assets/img1.png'),
        title: '2019年12月4日国家宪法日宣誓'
      }, {
        icon: require('../assets/img1.png'),
        title: '2019年12月4日国家宪法日宣誓'
      }],
      scheduleSwiper: {
        direction: 'vertical',
        autoplay: true,
        loop: true,
        slidesPerView: 2,
        spaceBetween: 0
      },
      schedule: [{
        time: '2020-11-19 09：00',
        location: '第一审判庭',
        no: '（2020）粤0392 刑初 1号',
        p: '张彬',
        p1: '张国',
        detail: '盗窃罪'
      }, {
        time: '2020-11-19 10：00',
        location: '第一审判庭',
        no: '（2020）粤0392 刑初 1号',
        p: '张彬',
        p1: '张国',
        detail: '盗窃罪'
      }, {
        time: '2020-11-19 11：00',
        location: '第一审判庭',
        no: '（2020）粤0392 刑初 1号',
        p: '张彬',
        p1: '张国',
        detail: '盗窃罪'
      }],
      schedule1Swiper: {
        direction: 'vertical',
        autoplay: true,
        loop: true,
        slidesPerView: 5,
        spaceBetween: 0
      },
      schedule1: [{
        name: '张三',
        title: '450（诉讼50）'
      }, {
        name: '张三',
        title: '451（诉讼50）'
      }, {
        name: '张三',
        title: '452（诉讼50）'
      }, {
        name: '张三',
        title: '453（诉讼50）'
      }, {
        name: '张三',
        title: '454（诉讼50）'
      }, {
        name: '张三',
        title: '455（诉讼50）'
      }]
    }
  },
  mounted () {
  },
  methods: {
    openMore(){
      this.ifOpen = !this.ifOpen;
      this.closeOpen  =!this.closeOpen
    }
  }
}
</script>

<style scoped>
.footer {
  margin-top: 0;
}
</style>


