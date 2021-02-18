<template>
  <div class="box-shadow">
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
          ><img v-lazy="item.icon" alt="" /><span>{{ item.label }}</span></a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'ywxt',
  props:{

  },
  data(){
    return{
      system: [{
        icon: require('@/assets/icon1.png'),
        label: '司法政务管理',
        url:'http://146.12.2.2:8082/frame/'
      }, {
        icon: require('@/assets/icon2.png'),
        label: '省院综合业务',
        url:'http://146.12.2.2:8082/frame/'
      }, {
        icon: require('@/assets/icon3.png'),
        label: '新鹰眼系统',
        url:'http://146.12.2.112:8080/eamp/'
      }, {
        icon: require('@/assets/icon4.png'),
        label: '中院信访管理',
        url:'http://146.12.2.2:8088/szxf/'
      }, {
        icon: require('@/assets/icon5.png'),
        label: '电子卷中系统',
        url:'http://146.12.2.191:8080/onlineArchive/'
      }, {
        icon: require('@/assets/icon6.png'),
        label: '高清数字法庭',
        url:'http://146.12.97.61:8080/'
      }, {
        icon: require('@/assets/icon7.png'),
        label: '案件数据平台',
        url:'http://146.12.1.87/login'
      }, {
        icon: require('@/assets/icon8.png'),
        label: '廉政风险防控',
        url:'http://146.12.97.16:8080/fxjk/'
      }, {
        icon: require('@/assets/icon9.png'),
        label: '审判绩效管理系统',
        url:'http://146.12.3.61/ytjx/'
      }],
    }
  },
  created(){
  },
  methods:{
  }
}
</script>

<style scoped>
</style>