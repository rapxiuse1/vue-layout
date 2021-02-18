<template>
  <div @click=goinfo class="box box-rb margintop">
    <img src="@/assets/banner.png" />
  </div>
</template>

<script>
export default {
  name:'banner',
  props:{

  },
  data(){
    return{
      Url:null,
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
        data.forEach(i=>{
        if(i.showname == '深圳法院审判执行态势日报'){
          this.Url = `/#/infos2?id=${i.id}&nametitle=${i.showname}&nameCode=${i.name}`;
        }
      })  
    },
    goinfo(){
      window.location.href= window.location.href = window.location.origin+window.location.pathname+this.Url
    }
  }
}
</script>

<style scoped>
  .margintop{
    /* margin-top: 15px; */
  }
</style>