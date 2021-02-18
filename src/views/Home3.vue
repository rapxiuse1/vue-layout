<template>
  <div>
    <div class="nav">
      <div class="mid small">
        <div class="row">
          <div class="col v-m">
            <img src="@/assets/icon-NoPath.png" />
            <div class="router-box">
              <a v-for="(item, index) in nav" :key="index">{{ item.label }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page3" style="margin-top: 60px">
      <div class="row3 bacF8 space-around">
        <div class="col50">
          <span class="tit3"><span>法院</span>动态</span
          ><span class="lis"></span
          ><img class="yd" src="../assets/icon-yactivt.png" />
          深圳市中级人民法院2020年招录劳动合同制司法辅助人员拟录用...
        </div>
        <div class="flex1">
          <span>
            <img class="yd" src="../assets/icon-yactivt.png" />
            广东省2020年考试录用公务员深圳市警察职位体检公告
          </span>
          <a class="more3">more</a>
        </div>
      </div>
      <div class="back3">
        <img src="@/assets/icon-m10.png" />
        <a class="show-detail">查看详情 >></a>
      </div>
      <div class="row3 space-between">
        <div class="t3-box">
          <img src="@/assets/icon-m11.png" />
          <p>排行榜</p>
        </div>
        <div class="t3-box">
          <img src="@/assets/icon-m12.png" />
          <p>司法改革</p>
        </div>
        <div class="t3-box">
          <img src="@/assets/icon-13.png" />
          <p>重要文件</p>
        </div>
        <div class="t3-box">
          <img src="@/assets/icon-m16.png" />
          <p>法庭文化</p>
        </div>
        <div class="t3-box">
          <img src="@/assets/icon-m14.png" />
          <p>审判管理</p>
        </div>
      </div>
      <div class="row3">
        <div class="col33">
          <img class="bfb" src="../assets/icon-bfb.png" />
          <img class="jq" src="../assets/icon-js.png" />
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
        <div class="col33">
          <div class="v-t list-sep">
            <h2 class="title title3">
              <span class="active">法院要闻</span><span>通知公告</span
              ><span>热点新闻</span>
            </h2>
            <div class="list-tit">
              <h2>
                <a href="">加强粤港司法交流协作推进粤港澳大湾区建设</a>
              </h2>
              <p>广东高院与香港特区政府律政司 签署法律交流与互鉴框架安排</p>
            </div>
            <ul class="list">
              <li v-for="(item, index) in list1" :key="index" class="new">
                <a >{{ item.title }}</a
                ><span>{{ item.time }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col33">
          <h2 class="title title3">
            <span class="active">友情链接</span><span>信息简报</span>
          </h2>
          <ul class="list inline">
            <li v-for="(item, index) in list3" :key="index" class="new dot3">
              <a >{{ item.title }}</a
              ><span>{{ item.time }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer3">
      <div class="bq">
        版权所有：深圳市中级人民法院 深圳市福田区彩田北路6003号 邮编：518036
        备案编号：粤ICP备05046837号
      </div>
    </div>
  </div>
</template>
<script>
import '../css/home3.scss'
export default {
  name: 'Navbar',
  props: {
  },
  data () {
    return {
      nav: [
        {
          label: '网站首页',
          url: '/'
        }, {
          label: '通知公告',
          url: '/sub/infos'
        }, {
          label: '热点新闻',
          url: '/sub/news'
        }, {
          label: '信息简报',
          url: '/sub/messages'
        }, {
          label: '审判管理',
          url: '/sub/sp'
        }, {
          label: '重要文件',
          url: '/sub/importantwj'
        }, {
          label: '政治工作',
          url: '/sub/politicswork'
        }, {
          label: '党建信息',
          url: '/sub/dj'
        }, {
          label: '廉政信息',
          url: '/sub/lz'
        }
      ],
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
      }],
      list3:[{title: '罗湖区人民法院'},{title: '盐田区人民法院'},{title: '龙岗区人民法院'},{title: '深圳前海合作区人民法院'},{title: '坪山区人民法院'},{title: '福田区人民法院'},{title: '南山区人民法院'},{title: '宝安区人民法院'},{title: '龙华区人民法院'},{title: '光明区人民法院'},{title: '坪山区人民法院'},{title: '福田区人民法院'}]
    }
  },
  created(){
  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>
.v-m {
  img {
    width: 220px;
  }
  .router-box {
    display: initial;
    float: right;
  }
}
</style>

