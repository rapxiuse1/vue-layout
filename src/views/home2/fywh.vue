<template>
  <div class="box-shadow2">
    <h2 class="title">
      <span class="active2">法院文化</span>
      <span class="moreF more" @click=gomore>更多</span>
    </h2>
    <div class="f1 page-flex" style="height: 80%;">
      <div class="img-box" >
        <img @click=act(1) v-lazy="a1" />
        <img @click=act(2) v-lazy="a2" />
        <img @click=act(3) v-lazy="a3" />
        <img @click=act(4) v-lazy="a4" />
      </div>
      <div class="f3" style="margin-right: 40px;" @click=goDetail(fywhData[index])>
        <div style="text-align: center;height: 83%;position: relative;">
          <p class="headernews"style=" top: 94%;    height: 36px;margin-top: -21px;text-align: center;font-size: 20px;color: #fff;" >{{fywhData[index].title}}</p>
          <img style="cursor:pointer;width: 100%;height: 100%;"  v-if="fywhData && fywhData[index].imgtitle"  v-lazy="fywhData[index].imgurl" />
        </div>
        <!-- <div style="height: 17%;">
          <h2>{{fywhData[index].title}}</h2>
        <p v-html="fywhData[index].newcontent.replace(/<\/?(img)[^>]*>/gi, '')">
        </p>
        </div> -->
        
     
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'fywh',
  props:{

  },
  data(){
    return{
        a1:require('@/assets/active1.png'),
        a2:require('@/assets/noactive2.png'),
        a3:require('@/assets/noactive3.png'),
        a4:require('@/assets/noactive4.png'),
        fywhData:[],
        fywhid:null,
        newtype:null,
        index:0,
    }
  },
  created(){
    this.getNews()
  },
  methods:{
    gomore(){
      let id  = this.fywhid;
      window.location.href=window.location.origin+window.location.pathname+`#/infos2?id=${id}&nametitle=法院文化&nameCode=${this.newtype}`;
    },
    act(flag){
      let that = this;
      that.index = flag-1
      if(flag == 1){
        that.a1=require('@/assets/active1.png');
        that.a2=require('@/assets/noactive2.png');
        that.a3=require('@/assets/noactive3.png');
        that.a4=require('@/assets/noactive4.png');
      }else if(flag == 2){
        that.a1=require('@/assets/noactive1.png');
        that.a2=require('@/assets/active2.png');
        that.a3=require('@/assets/noactive3.png');
        that.a4=require('@/assets/noactive4.png');
      }else if(flag == 3){
        that.a1=require('@/assets/noactive1.png');
        that.a2=require('@/assets/noactive2.png');
        that.a3=require('@/assets/active3.png');
        that.a4=require('@/assets/noactive4.png');
      }else if(flag == 4){
        that.a1=require('@/assets/noactive1.png');
        that.a2=require('@/assets/noactive2.png');
        that.a3=require('@/assets/noactive3.png');
        that.a4=require('@/assets/active4.png');
      }
    },
    getNews(){
      let that  =this;
      let data = JSON.parse(localStorage.getItem('navbar'));
      if(!data){
        return false;
      }
      data.forEach(i => {
        if(i.showname == '法院文化'){
          that.fywhid = i.id;
          that.$http.post('zyWebRest_getAllNewsContentByCategoryId', {categoryid:that.fywhid}).then(res => {
            if(res){
              that.newtype  = res[0].newtype;
              res.forEach(k =>{
                
                if(k.newtypetext == '图片鉴赏' || k.newtypetext == '文化天地'){
                  that.fywhData.push(k);
                  
                  if(k && k.imgtitle){
                    k.imgurl = that.imgUrl(k);
                  }else{
                    k.imgurl=null
                  }
                }
                console.log(this.fywhData,'fywhData')
              })
              // if(self.fywhData.length >=7){
                that.fywhData = that.fywhData.slice(0,4);
                console.log(that.fywhData,'self.fywhDatself.fywhDatself.fywhDat')
              // }
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
    goDetail(item,index){
      let self  =this;
      let id  = self.fywhid;
      let content = item;
      let setDate = JSON.stringify({
        imgurl:self.imgUrl(item),
        content:content,
        id:id,
        name:"法院文化"
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
.f1 {
  justify-content: center;
  padding-bottom: 5px;
  margin-top: -25px;
}
.f1 .f3 {
  width: 97%;
  height: 100%;
}
.img-box{
  margin-left: 16px;width: 20%;
  height: 90%;
}
.img-box img{
  height: 23%;
  cursor:pointer;
}
.moreF{
  height: .4rem;
}

</style>