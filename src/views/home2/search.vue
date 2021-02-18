<template>
  <div class="search">
    <input type="text" v-model="keyword" placeholder="全站搜索" />
    <router-link :to="'/search2?keyword=' + keyword"
      ><img src="@/assets/search.png" alt=""
    /></router-link>
  </div>
</template>

<script>
export default {
  name:'search',
  props:{

  },
  data(){
    return{
      keyword:'',
    }
  }
}
</script>

<style scoped>
.search {
  width: 40%;
  margin: 0 auto;
}
.search input {
  border-radius: 25px;
  height: 50px;
}
</style>