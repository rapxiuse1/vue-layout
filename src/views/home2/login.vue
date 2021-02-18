<template>
  <div class="box-shadow2 box-x">
    <h2 class="title-login" style="line-height: 50px;">
      <span class="active2">用户登录</span>
      <img src="@/assets/icon-m2.png" class="icon-m2" />
    </h2>
    <div class="form" style="width: 100%; height: 310px;">
      <input placeholder="用户名" />
      <input placeholder="密码" />
      <div style="margin-top: 42px; text-align: center; margin-left: 2%;">
        <p>登录</p>
        <p class="forget">忘记密码</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'login',
  props:{

  },
  data(){
    return{
    }
  }
}
</script>

<style lang="scss" scoped>
.from {
  height: 420px;
  input {
    padding-left: 15px;
  }
}
</style>