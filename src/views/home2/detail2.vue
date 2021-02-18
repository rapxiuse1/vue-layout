<template>
    <div class="page sub2 page2">
      <Navbar2 @getUrl="getUrl"></Navbar2>
      <div class="mid small">
        <div class="row sub-tit">
          <div class="col v-m"></div>
          <div class="col v-m t-r">
            <div class="search small small2"  style="margin-bottom: 70px;">
              <input
                style="border-radius: 0;"
                type="text"
                v-model="keyword"
                placeholder="请输入您要搜索的关键词"
              />
              <router-link :to="'/search2?keyword=' + keyword"
                ><img src="@/assets/search1.png" alt=""
              /></router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="mid small">
          <div class="router">
            <router-link to="/">首页</router-link>
            <a @click="listShow(firstlmName)">{{ nametitle }}</a>
            <!-- <router-link to="/infos"></router-link> -->
            <span v-if="ifhavesirst">{{ content.newtypetext }}</span>
          </div>
          <div class="row1 row" >
            <div class="col v-t sidebarleft" v-if="ifhavesirst" >
              <div  style="margin-right: 42px">
                <div class="panel">
                  <div class="panel-tit">
                    <h2 class="title">
                      <span class="active2">{{ nametitle }}</span>
                    </h2>
                  </div>
                  <div class="panel-info">
                    <ul class="list large" v-show="pageDate">
                      <li
                        v-for="(item, index) in pageDate"
                        :key="index"
                        class="new dot2"
                        
                      >
                        <a @click="listShow(item.name, item.showname)">{{ item.showname }}</a
                        ><span><img src="@/assets/icon-rigtht.png" /></span>
                      </li>
                    </ul>
                    <ul class="list large" v-show="!pageDate">
                      <li><span>暂无数据</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col v-t sidebarleft30">
              <div class="panel" v-show="content">
                <div class="panel-tit">
                  <h2 class="title">
                    <span class="active2">{{ content.newtypetext }}</span>
                  </h2>
                </div>
                <div class="panel-info">
                  <div class="detail">
                    <h2>{{ content.title }}</h2>
                    <div class="detail-sub">
                      <span>发布时间：{{  content.createtime.substring(0, content.createtime.indexOf('.'))}}</span
                      ><span>来源：{{ content.newfrom }}</span>
                    </div>
                    <div class="detail-info">
                      <div style="text-align: center">
                        <img  :src="imgurl" alt="" />
                      </div>
                      <!-- <p>8月31日上午，全国首个飞地法院——广东省深圳深汕特别合作区人民法院在深圳第“10+1”区正式揭牌成立。广东省高级人民法院院长龚稼立，深圳市委常委、政法委书记余新国等参加揭牌仪式，深汕特别合作区法院院长张彬主持活动。</p>
                  <p>最高人民法院批复成立深汕特别合作区法院，是创新完善深汕特别合作区管理体制机制，服务保障深汕特别合作区改革发展的重要举措。深汕特别合作区法院的设立，将有效完善深汕特别合作区的司法体系，优化合作区法治化营商环境，为合作区加快建设现代化的滨海新区、产业新城提供坚强有力的司法保障。</p>
                  <p>img </p>
                  <p>自此，按照广东省委、省政府批复同意的《深汕特别合作区体制机制调整方案》（粤委〔2017〕123号）文件精神，在深汕特别合作区设立的深圳市公安局深汕分局、深圳深汕特别合作区人民检察院、深圳深汕特别合作区人民法院相继全部实现揭牌履职，为加快这块飞地建设现代化国际性滨海新区、产业新城提供坚强有力的法治保障。</p> -->
                      <div v-html="newcontent"></div>
                      <ul v-if="attfiles && attfiles.length>0">
                        <li v-for="(item,index) in attfiles"  :key="index">
                          <span style="font-size: 14px;color: #544f54ee;"><img width="16" src="../../assets/icon-doc.png"/>{{item.showName}}</span>
                          <el-button
                            @click= download(item)
                            style="margin-left: 10px; height: 30px; line-height: 10px"
                            size="small"
                            type="primary"
                            >下载文件</el-button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel" style="margin-left: 42px" v-show="!content">
                暂无数据
              </div>
            </div>
            <!-- <div class="col v-t sidebar">
          <Sidebar></Sidebar>
        </div> -->
          </div>
        </div>
        <p>
  
        </p>
      </div>
      <Footer2></Footer2>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue'
  import Navbar2 from '@/components/Navbar2.vue'
  import Footer2 from '@/components/Footer2.vue'
  export default {
    components: {
      Footer2,
      Navbar,
      Navbar2,
    },
    data () {
      return { 
        content:null,
        pageDate:null,
        nametitle:null,
        queryUrl:null,
        queryId:null,
        queryName:null,
        imgurl:null,
        ifHome:null,
        keyword:'',
        style:'',
        attfiles:[], // 文件url数组
        flag:this.$route.query.flag?this.$route.query.flag:null,
        ifhavesirst:true,
        newcontent:null,
        firstlmName:this.$route.query.firstlmName?this.$route.query.firstlmName:null,
      }
    },
    created(){
      this.getDetail()
      this.style = this.$route.query.style;
      
      if(this.flag == 1){
        this.ifhavesirst  =false
      }
      let setDate =JSON.parse(localStorage.getItem('setDate'))
      // this.imgurl = setDate.imgurl;
      this.content = setDate.content;
      // this.attfiles =setDate.content.attfiles?JSON.parse(setDate.content.attfiles):null ;
      // console.log(this.attfiles)
      // if(this.attfiles && this.attfiles.length>0){
      // console.log(this.attfiles)
      // this.fileUrl()
      // }
      
      if(setDate && setDate.pageDate){
        this.pageDate= setDate.pageDate;
        this.ifHome = true;
      }else{
        this.ifHome = false;
      }
      
      this.nametitle= setDate.name;
      this.queryUrl = setDate.url;
      this.queryId = setDate.id;
      this.queryName = setDate.name;
      if(!this.pageDate){
        this.getPageDate(this.queryId)
      }
      console.log(this.pageDate,'this.content');
     
    },
    mounted(){
     
    },
    methods:{
      //图片解析
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
        this.imgurl= imgurl
      },
      //替换正文里的图片的路径
      replaceImgUrl(){
        let self = this;
        let basePath  ='';
        let reg=new RegExp('@serveruirl@','g');
        if (location.pathname == "/") { //vue运行
          basePath = "http://192.168.0.130:8005/ZYOA//";
          if(self.newcontent.indexOf('@serveruirl@')){
            self.newcontent=self.newcontent.replace(reg,basePath);
            console.log(self.newcontent,'self.content.newcontent')
          }
        } else {
          basePath = location.origin + "/" + location.pathname.split("/")[1]+'/';
          if(self.newcontent.indexOf('@serveruirl@')){
            self.newcontent=self.newcontent.replace(reg,basePath);
          }
        }
      },
      //获取详情
      getDetail(){
        let self = this;
        self.$http.post('zyWebRest_getNewsContentById', {'id':self.$route.query.id}).then(res2 => {   
          if(res2){
            self.newcontent=res2.result[0].newcontent ;
            self.attfiles =res2.result[0].attfiles?JSON.parse(res2.result[0].attfiles):null ;
            console.log(self.attfiles)
            if(self.attfiles && self.attfiles.length>0){
            console.log(self.attfiles)
            self.fileUrl()
            }
            self.imgUrl(res2.result[0])
            console.log(self.imgUrl,'self.imgUrl')
            self.replaceImgUrl();
            let bean = {
            websitecnname:'深汕法院综合信息发布网站',
            websitename:'SSFYWEB',
            url:window.location.href,
            name:self.$route.query.id,
            cnname:self.content.title,

          }
          this.$http.post('zyWebRest_insertVisitor', bean).then(res => {
            if(res){
            }
          })
          }else{
          }
        })  
      },
       getPageDate(queryId){
         
        let self = this;
        self.contentDate=null;
        // debugger
        self.$http.post('zyWebRest_getMenuCategoryByParentid', {'parentid':queryId}).then(res2 => {   
          
          if(res2){
            if(self.$route && self.$route.query &&self.$route.query.ywname){
              // self.name=self.$route.query.ywname
            }else{
              // self.name=res2[0].name
            }
            self.pageDate = res2;
            // let bean = {'category':self.name,'pagenum':1,'pagesize':10,}
            // let res  = await http('zyWebRest_getNewsContentByCategory',  bean);
            // if(res){
            //   self.contentDate = res
            // }
          }else{
            self.ifhavesirst = false;
            self.pageDate = null ;
            self.nametitle = self.content.newtypetext
          }
        })
      },
      //解析文件流
      fileUrl(){
        var basePath = null;
        // if(this.attfiles.length>0){
          this.attfiles.map(i =>{
           i.fileUrl = null;
           if (location.pathname == "/") { //vue运行
          basePath = "http://192.168.0.130:8005/ZYOA//";
        } else {
          basePath = location.origin + "/" + location.pathname.split("/")[1];
           
        }
        i.fileUrl = basePath + "/LEAP/Download/" + i.nameedPath + "/" + i.name;
        })
        // }
        console.log(this.attfiles,'this.attfiles')
        
      },
      //下载文件
      download(item){
        var a = document.createElement('a')
        a.href = item.fileUrl
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      },
      listShow(name,showname){
        debugger
        let setDate =JSON.parse(localStorage.getItem('setDate'))
        this.$router.push({path: '/infos2',query:{id:this.queryId,ywname:name,index:this.$route.query.index,nameCode:setDate.nameCode,nametitle:this.nametitle,clickshowname:showname}})
      }
    },
  
  }
  </script>
  <style scoped>
  .router span {
    cursor: pointer;
  }
  .row{
    display: flex important!;
  }
  .section .sidebarleft{
    flex: 1 important!;
  }
  </style>
  
  