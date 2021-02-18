<template>
  <div class="box-shadow2 box-x">
    <p class="title-zywj"  style="line-height: 50px;">
      <span class="active2 span1">司法改革</span>
      <span class="more2" @click=gomore>更多</span>
    </p>
    <div class="box-wj">
      <!-- <img src="@/assets/icon-wj.png" /> -->
      <ul class="list list2" style="margin-top: -6px;" v-if="sfggData.length>0">
        <li v-for="(item, index) in sfggData"  :key="index">
          <a @click="goDetail(item)" class="zy"
          >
          {{ item.title }}</a
        >
        </li>
      </ul>
      <ul class="list list2" style="margin-top: -6px;"  v-else>
        <li >
          <a  
          >暂无数据</a
        >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'sfgg',
  props:{

  },
  data(){
    return{
      sfggData:[],
      sfggid:null,
      newtype:null
    }
  },
  created(){
    this.getNews()
  },
  methods:{
    getNews(){
      let that  =this;
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(!data){
        return false;
      }
      data.forEach(i => {
        if(i.showname == '司法改革'){
          that.sfggid = i.id;
          that.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:that.sfggid}).then(res => {
            if(res){
              that.newtype  = res[0].newtype;
              if(res.length >=9){
                that.sfggData = res.slice(0,9);
              }else{
                that.sfggData = res
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
    gomore(){
      let id  = this.sfggid;
      window.location.href=window.location.origin+window.location.pathname+`#/infos2?id=${id}&nametitle=司法改革&nameCode=${this.newtype}&index=5`;
    },
    goDetail(item,index){
      let self  =this;
      let id  = self.sfggid;
      let content = item;
      let setDate = JSON.stringify({
        imgurl:self.imgUrl(item),
        content:content,
        id:id,
        name:"司法改革"
      });
      localStorage.removeItem('setDate')
      localStorage.setItem('setDate',setDate)
      //动态挂在子组件无法使用vue自定义路由
      window.location.href =  window.location.href = window.location.origin+window.location.pathname+`#/detail2?index=${index}&id=${item.id}`
    },
  }
}
</script>

<style scoped>
  .box-wj{
    margin-top: 25px;
    height: 80%;
  }
</style>