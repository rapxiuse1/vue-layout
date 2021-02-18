<template>
  <div class="nav2">
    <div class="mid small">
      <div class="row1">
        <div class="right">
          <img src="@/assets/icon-NoPath.png" />
        </div>
        <div class="col-sapn">
          <span
            v-for="(item, index) in nav"
            :key="index"
          >
            <span class="sp1">
              <!-- <span
                v-if="index == 0"
                class="t3"
                :class="[nav == index ? 'activtB' : '']"
                @click="changeNav(index)"
                >{{ item.label }}</span
              > -->
              <span
                class="t3"
                :class="{ activtB: tab === item.label }"
                @click="goB(item,index)"
                >{{ item.label }}</span
              ></span
            >
            <span class="zx"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
  },
  data () {
    return {
      nav:0,
      nav:[
        {
          label: '网站首页',
          url: '/home2'
        }, {
          label: '通知公告',
          url: null,
          id:null,
          name:null
        }, {
          label: '热点新闻',
          url: null,
          id:null,
          name:null
        }, {
          label: '信息简报',
          url: null,
          id:null,
          name:null
        }, {
          label: '审判管理',
          url: null,
          id:null,
          name:null
        }, {
          label: '重要文件',
          url: null,
          id:null,
          name:null
        }, {
          label: '政治工作',
          url: null,
          id:null,
          name:null
        },
        // {
        //   label: '党建信息',
        //   url: null,
        //   id:null,
        //   name:null
        // }, 
        // {
        //   label: '廉政信息',
        //   url: null,
        //   id:null,
        //   name:null
        // }, {
        //   label: '规章制度',
        //   url: null,
        //   id:null,
        //   name:null
        // }, 
        // {
        //   label: '法院门户',
        //   url: null,
        //   id:null,
        //   name:null
        // }, {
        //   label: '纪检督察',
        //   url: null,
        //   id:null,
        //   name:null
        // }
      ],
      SSFYWebId:null,
      indexList:null,
      indexId:null,
      showStyle:false,
      navList:[],
      tab:''
    }
  },
  created(){
    console.log(this)
    this.navlist();
    //this.indexLists()
    if(this.$route.query.index !='undefined' && this.$route.query.index!= null){
      this.tab  = this.nav[this.$route.query.index].label
    }else if(this.$route.name=="home2"){
      this.tab  = "网站首页";
    }else if(!this.$route.query.index){
      this.tab =null;
    }else if(this.$route.name!="home"){
      this.tab  = null;
    }
    console.log(this.tab,'this.tab')
  },
  methods:{
    // changeNav(a){
    //   this.nav = a
    // },
    navlist(){
      let self = this;
      let bean =  {'category':'SSFYWeb'}
      this.$http.post('zyWebRest_getMenuCategoryByName', bean).then(res => {
        if(res){
          self.$emit('syscode', res[0].syscode)
          res.map((v,k)=>{
            if(v.showname == '深汕法院综合信息发布网站'){
              self.SSFYWebId = v.id
              let listBean = {'parentid':self.SSFYWebId,"pagesize":999,}
              var res2;
              self.$http.post('zyWebRest_getMenuCategoryByParentid', listBean).then(res2 => {
                if(res2){
                  res2.map((a,b)=>{
                    self.nav.map((c,d) =>{
                      if(a.showname == '首页'){
                        self.indexId = a.id
                      }
                      if(a.showname == c.label){
                        c.url =  `/infos2?id=${a.id}&nametitle=${a.showname}&nameCode=${a.name}`;
                        c.id = a.id;
                        c.name = a.name
                      }
                    })
                  })
                  console.log(this.nav,'nav')
                  self.navList = res2
                  localStorage.setItem('navbar',JSON.stringify(res2))
                }
              })
            }
          });
        }
      })
    },
    goB(item,index){
      this.tab  = item.label;
      let flag = {id:item.id,name:item.label,nameCode:item.name}
      this.$emit('getUrl',flag)
      this.$router.push({path:item.url,query:{style:'1',index:index}})
    },
  }
}
</script>
<style lang="scss" scoped>
.nav2 {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  background: rgb(255, 255, 255, 1);
  border-bottom: 1px solid rgb(224, 222, 222);
}
.row1 {
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
 .small {
   width: 68%;
 }
 .right{
   width: 100%;
 }
.right  img {
  /* text-align: center; */
  width: 46%;
}
.zx {
  width: 0px;
  height: 30px;
  border: 1px solid #c6cfe0;
  opacity: 0.25;
  margin-left: 18%;
}
.activtB {
  background: #c3d715;
}
.t3 {
  text-align: center;
  color: #333333;
  font-weight: bold;
  line-height: 22px;
  border-radius: 6px;
  font-size: 16px;
  display: inline-block;
  width: 45px;
  height: 45px;
  padding: 8px 8px;
}
.col-sapn .sp1 {
  margin-left: 20px;
}
.col-sapn {
  justify-content: flex-end;
  display: flex;
  align-items: center;
  width: 55.5%;
  span {
    cursor: pointer;
    align-items: center;
    display: flex;
  }
}
</style>

