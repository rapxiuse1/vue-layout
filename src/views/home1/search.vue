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
  </div>
</template>

<script>
export default {
  name:'search',
  props:{

  },
  data(){
    return{
      keyword:null,
    }
  },
  created(){
  },
  methods:{
  }
}
</script>

<style scoped>
.box-shadow {
  background: rgba(255, 255, 255, 1);
}
</style>