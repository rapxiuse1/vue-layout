<template>
  <div class="nav">
    <div class="mid small">
      <div class="row">
        <div class="col v-m wdith78">
          <!-- <router-link to="/home3">另一个首页</router-link> -->
          <a
            @click="goB(item,index)"
            :class="{ active: tab === item.label }"
            v-for="(item, index) in nav"
            :key="index"
            >{{ item.label }}</a
          >
        </div>
        <div class="col v-m t-r style">
          <!-- <a @click="setStyle">主题设置</a>
          <transition name="myselect">
            <ul v-show="showStyle">
              <li @click="goStyle(1)">风格一</li>
              <li @click="goStyle(2)">风格二</li>
            </ul>
          </transition> -->

          <!-- <el-color-picker
            v-model="color"
            show-alpha
            :predefine="predefineColors"
            @change="changeThemeColor"
            style="vertical-align: middle"
          ></el-color-picker> -->
        </div>
        <!-- <div class="col v-m t-r nav-avatar">
          <img src="@/assets/face.png" alt="" />
          <span>请登录</span>
        </div> -->
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
      predefineColors: [//设置预定义颜色
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      color:'rgba(255, 69, 0, 0.68)',
      nav: [
        {
          label: '网站首页',
          url: '/',
          name:null
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
        }, {
          label: '党建信息',
          url: null,
          id:null,
          name:null
        }, {
          label: '廉政信息',
          url: null,
          id:null,
          name:null
        }, {
          label: '规章制度',
          url: null,
          id:null,
          name:null
        }
        // , {
        //   label: '法院门户',
        //   url: null,
        //   id:null
        // }, {
        //   label: '纪检督察',
        //   url: null,
        //   id:null
        // }
      ],
      SSFYWebId:null,
      navList:[],
      indexList:null,
      indexId:null,
      showStyle:false,
      tab:''
    }
  },
  created(){
    this.navlist();
    console.log(this.navName,'navName')
  },
  mounted(){
    // debugger
    if(this.$route.query.index !='undefined' && this.$route.query.index!= null){
      this.tab  = this.nav[this.$route.query.index].label
    }else if(this.$route.name=="home"){
      this.tab  = "网站首页";
    }else if(!this.$route.query.index){
      this.tab =null;
    }else if(this.$route.name!="home"){
      this.tab  = null;
    }
    console.log(this.tab,'this.tab')
  },

  methods:{
    navlist(){
      let self = this;
      let bean =  {'category':'SSFYWeb'}
      this.$http.post('zyWebRest_getMenuCategoryByName', bean).then(res => {
        if(res){
          this.$emit('syscode', res[0].syscode)
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
                        c.url =  `/infos?id=${a.id}&nametitle=${a.showname}&nameCode=${a.name}`;
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
    setStyle(){
      this.showStyle = !this.showStyle
    },
    goStyle(n){
      if(n == 1){
        this.$router.push('/index2')
      }else if(n == 2){
        this.$router.push('/home3')
      }
    }, 
    changeThemeColor(val){
      this.$store.commit('changeThemeColor',val)
    }
  }
}
</script>
<style lang="scss" scoped>
.style {
  position: relative;
  ul {
    position: absolute;
    right: 70px;
    width: 80px;
    li {
      cursor: pointer;
      border-radius: 5px;
      background: rgba(255, 255, 255, 1);
      font-size: 17px;
      line-height: 32px;
      color: rgb(5, 5, 5);
      padding: 10px;
    }
    li:hover {
      background: rgb(19, 115, 204);
      color: rgba(255, 255, 255, 1);
    }
  }
  .myselect-enter-active {
    transition: all 0.8s ease;
  }
  .myselect-enter,
  .myselect-leave-to {
    opacity: 0;
  }
}
</style>

