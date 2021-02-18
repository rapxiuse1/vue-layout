<template>
  <div class="page2" style="margin-top: -100px;">
    <div class="gradient"></div>
    <Navbar2></Navbar2>
    <div class="page-content">
      <div class="page-tit2">
        <p><img src="@/assets/tip.png" alt="" /></p>
      </div>
      <div class="search">
        <input type="text" placeholder="全站搜索" />
        <router-link to="/sub/search"
          ><img src="@/assets/search.png" alt=""
        /></router-link>
      </div>
      <div class="box box-s page-flex">
        <div class="tp-logo">图片 新闻</div>
        <div class="col v-t">
          <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
            <!-- 图片尺寸固定520*320 -->
            <swiper-slide
              v-for="(item, index) in news"
              :key="index"
              class="swiper-item"
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
      </div>
      <div class="box box-m1 page-flex">
        <div class="box-shadow">
          <h2 class="title">
            <span class="active">通知公告</span>
            <span class="more">更多</span>
          </h2>
          <ul class="list">
            <li v-for="(item, index) in list1" :key="index" class="new3">
              <a  class="list-a"
                ><p>1</p>
                {{ item.title }}</a
              >
            </li>
          </ul>
        </div>
        <div class="box-shadow">
          <h2 class="title">
            <span class="active">热点新闻</span>
            <span class="more">更多</span>
          </h2>
          <ul class="list">
            <li v-for="(item, index) in list1" :key="index" class="new2 dot">
              <a  class="list-a"
                ><img src="@/assets/d.png" /> {{ item.title }}</a
              >
            </li>
          </ul>
        </div>
        <div class="box-shadow">
          <h2 class="title-login">
            <span class="active">用户登录</span>
            <img src="@/assets/icon-m2.png" class="icon-m2" />
          </h2>
          <!-- <div class="form" style="width: 100%;">
            <input placeholder="用户名" />
          </div> -->
          <div
            class="form"
            style="width: 100%; height: 200px; text-align: center;"
          >
            <input placeholder="用户名" />
            <input placeholder="密码" />
            <div style="margin-top: 42px;">
              <p>登录</p>
              <p class="forget">忘记密码</p>
            </div>
          </div>
        </div>
      </div>
      <div class="box box-rb">
        <img src="@/assets/banner.png" />
      </div>
      <div class="box box-m2 page-flex">
        <div class="m1 box-shadow">
          <h2 class="title">
            <span class="active">信息简报</span><span>审判管理</span>
            <span class="more">更多</span>
          </h2>

          <ul class="list">
            <li v-for="(item, index) in list1" :key="index" class="new dot">
              <a >{{ item.title }}</a
              ><span>{{ item.time }}</span>
            </li>
          </ul>
        </div>
        <div class="m2 box-shadow">
          <h2 class="title-zywj">
            <span class="active">重要文件</span>
            <span class="more2">更多</span>
          </h2>
          <div class="box-wj">
            <img src="@/assets/icon-wj.png" />
            <ul class="list">
              <li v-for="(item, index) in list1" :key="index">
                <a >{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="box box-m2 page-flex">
        <div class="m1 box-shadow">
          <h2 class="title">
            <span class="active">政治工作</span><span>纪检监察</span>
            <span class="more">更多</span>
          </h2>

          <ul class="list">
            <li v-for="(item, index) in list1" :key="index" class="new dot">
              <a >{{ item.title }}</a
              ><span>{{ item.time }}</span>
            </li>
          </ul>
        </div>
        <div class="m2 box-shadow">
          <h2 class="title-sfgg">
            <span class="active">司法改革</span>
            <span class="more2">更多</span>
          </h2>
          <div class="box-wj">
            <ul class="list">
              <li v-for="(item, index) in list1" :key="index">
                <a >{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="box box-m2 page-flex">
        <div class="m2 box-shadow">
          <h2 class="title">
            <span class="active">排行榜</span>
            <span class="more">更多</span>
          </h2>
          <ul class="list">
            <li v-for="(item, index) in list1" :key="index" class="new3">
              <a  class="list-a"
                ><p>1</p>
                {{ item.title }}</a
              >
              <span class="morenum">120</span>
            </li>
          </ul>
        </div>
        <div class="m1 box-shadow">
          <h2 class="title">
            <span class="active">法院文化</span>
          </h2>
          <div class="f1 page-flex">
            <div class="f2"></div>
            <div class="f3">
              <img src="@/assets/icon-m1.png" />
              <h2>2019年12月4日国家宪法日宣誓</h2>
              <p>
                我代表最高人民法院向大会报告工作，请予审议，并请全国政协各位委员提出意见。新冠肺炎疫情发生以来，习近平总书记亲自指挥、亲自部署，以习近平同志为核心的党中央团结带领全党全军我代表最高人民法院向大会报告工作，请予审议，并请全国政协各位委员提出意见。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="box page-flex box-s2">
        <div class="page-flex s21">
          <img src="@/assets/icon-m8.png" />
          <h2>司法改革大家谈</h2>
        </div>
        <div class="page-flex s21">
          <img src="@/assets/icon-m7.png" />
          <h2>多元化改革论坛</h2>
        </div>
        <div class="page-flex">
          <img src="@/assets/icon-m6.png" />
          <h2>智慧法院</h2>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import '../css/home2.scss'
import Navbar2 from '@/components/Navbar2.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    Navbar2,
    Footer
  },
  data () {
    return {
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
      }, {
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }, {
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }, {
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }, {
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }, {
        title: '关于公布2020年深圳中院劳动合同制司法辅助人员招录笔试',
        time: '2019/12/23'
      }],
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style scoped>
.more,
.more2,
.morenum {
  margin-top: 10px;
  float: right;
  display: inline-block;
  text-align: center;
  color: #999999;
  line-height: 8px;
  font-size: 12px;
  width: 40px;
  height: 8px;
  background: #ffffff;
  border: 1px solid #999999;
  opacity: 1;
  border-radius: 12px;
}
.more2 {
  margin-right: 10px;
  line-height: 18px;
  height: 18px;
}
.morenum {
  line-height: 14px;
  height: 14px;
  border: 1px solid#E83D08;
  color: #e83d08;
}
</style>


