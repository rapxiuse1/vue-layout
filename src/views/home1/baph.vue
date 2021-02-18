<template>
  <div class="box-shadow">
    <h2 class="title">
      <span class="active">办案排行</span><i>统计截止办案排行：1-10月</i>
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
        <swiper-slide v-for="(item, index) in bnphData" :key="index">
          <span style="width: 40%">{{ item.fullname }}</span>
          <span style="width: 60%">{{ item.totel }}</span>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name:'baph',
  props:{

  },
  data(){
    return{
      schedule1Swiper: {
        direction: 'vertical',
        autoplay: true,
        loop: true,
        slidesPerView: 6,
        spaceBetween: 0
      },
      bnphData:null,
    }
  },
  created(){
    this.getbnphData();
  },
  methods:{
    getbnphData(){
      let self = this;
      self.$http.post('zyWebRest_getRankingOfCases', {"pagesize":7}).then(res => {
        if(res){
          self.bnphData = res;
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
</style>