<template>
  <div class="page sub">
    <Navbar @getUrl="getUrl"></Navbar>
    <!-- <Navbar2 v-else-if="style == '2'" @getUrl="getUrl"></Navbar2> -->
    <div class="mid small">
      <div class="row sub-tit">
        <div class="col v-m"><img src="../assets/title0.png" alt="" /></div>
        <div class="col v-m t-r">
          <div class="search small">
            <input
              style="border-radius: 0"
              type="text"
              v-model="params.keyword"
              placeholder="请输入您要搜索的关键词"
            />
            <router-link :to="'/search?keyword=' + params.keyword"
              ><img src="../assets/search1.png" alt=""
            /></router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="mid small">
        <div class="router">
          <router-link to="/">首页</router-link>
          <span>{{ nametitle }}</span>
        </div>
        <div class="row row1">
          <div class="col v-t sidebarleft" v-if="ifhavesirst">
            <div style="margin-right: 42px">
              <div class="panel">
                <div class="panel-tit">
                  <h2 class="title">
                    <span class="active">{{ nametitle }}</span>
                  </h2>
                </div>
                <div class="panel-info">
                  <ul class="list large" v-show="pageDate">
                    <li
                      v-for="(item, index) in pageDate"
                      :key="index"
                      class="new dot2"
                    >
                      <a @click="listShow(item.name, item.showname)">{{
                        item.showname
                      }}</a
                      ><span><img src="../assets/icon-rigtht.png" /></span>
                    </li>
                  </ul>
                  <!-- <ul class="list large">
              <li v-for="(item, index) in list2" :key="index" class="new dot1 images-title">
                <router-link to="/sub/detail">{{item.title}}</router-link>
                <div class="flex margin-top"> 
                  <img v-lazy="item.img" alt="">
                  <div class="content">
                    <p>{{item.content}}</p>
                    <p class="time">{{item.time}}</p>
                  </div>
                </div>
                </li>
            </ul> -->
                  <ul class="list large" v-show="!pageDate">
                    <li><span>暂无数据</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col v-t sidebarleft30">
            <div class="panel">
              <div class="panel-tit">
                <h2 class="title">
                  <span class="active">{{ newtypetext }}</span>
                </h2>
              </div>
              <div class="panel-info">
                <!-- <img src="../assets/title1.png" alt="" style="margin-bottom:10px;width:100%;"> -->
                <ul class="list large" v-show="rightData">
                  <li
                    v-for="(item, index) in rightData"
                    :key="index"
                    class="new dot1"
                    @click="goDetail(item)"
                  >
                    <a>{{ item.title }}</a
                    ><span>{{
                      item.createtime.substring(0, item.createtime.indexOf(" "))
                    }}</span>
                  </li>
                </ul>
                <ul class="list large" v-show="!rightData">
                  <li class="new dot1">暂无数据</li>
                </ul>
                <div class="pages">
                  <!-- <a  class="active">1</a>
              <a >2</a>
              <a >3</a>
              <a >4</a>
              <a >5</a>
              <span>...</span>
              <a >10</a>
              <a >下一页</a> -->
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="params.pagenum"
                    :page-sizes="[10, 20, 40, 80]"
                    :page-size="params.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                  >
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col v-t sidebar">
          <div>
    <div class="panel">
      <div class="panel-tit"><h2 class="title"><span class="active">内部公告</span></h2><a  class="panel-more"></a></div>
      <div class="panel-info">
        <ul class="list large">
          <li v-for="(item, index) in list1" :key="index" class="new dot2"><a >{{item.title}}</a><span>{{item.time}}</span></li>
        </ul>
      </div>
    </div>
    <div class="panel">
      <div class="panel-tit"><h2 class="title"><span class="active">对区院通知公告</span></h2><a  class="panel-more"></a></div>
      <div class="panel-info">
        <ul class="list large">
          <li v-for="(item, index) in list1" :key="index" class="new dot2"><a >{{item.title}}</a><span>{{item.time}}</span></li>
        </ul>
      </div>
    </div>
  </div>
      </div> -->
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Navbar2 from '@/components/Navbar2.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Navbar,
    Navbar2,
    Footer
  },
  data () {
    return {
      params: {
        pagesize: 10,
        pagenum: 1,
        keyword: '',
      },
      total: 0,//事项总条数
      lmId:null,
      pageDate:null,
      contentDate:null,
      name:null,
      nametitle:null,
      newtypetext:null,
      url:'',
      rightData:null,
      style:'',
      ifhavesirst:true,
      listShowName:null,
    }
  },
  created(){
    console.log(this.$route.params)
    let that = this;
    that.style = that.$route.query.style
    that.$http.post('zyWebRest_insertVisitor', {"websitename": "SSFYWEB"}).then(res => {
      if(res){
      }
    })
    that.lmId = that.$route.query.id;
    
    that.nametitle = that.$route.query.nametitle;
    if(that.$route && that.$route.query &&that.$route.query.nameCode){
      that.name=that.$route.query.nameCode
          }
    
          that.listShow()
          that.getPageDate();
  },
  methods :{
    getUrl(item){
      this.lmId = item.id
      this.nametitle = item.name;
      this.name  = item.nameCode;
      console.log(this.lmId,this.nametitle,this.url,'ssss')
      this.getPageDate();
    },
    // async initcontentDate (){
    //    let self = this;
    //    let bean = {"category":self.name,"pagenum":1,"pagesize":10,}
    //    let res  = await http("zyWebRest_getNewsContentByCategory",  bean);
    //    if(res){
    //      self.contentDate = res
    //    }
    // },
    getPageDate(){ 
      let self = this;
      self.contentDate=null;
      let name = null;
      self.$http.post('zyWebRest_getMenuCategoryByParentid', {'parentid':self.lmId}).then(res2 => {
        if(res2){
          self.ifhavesirst  = true;
          if(self.$route.query.newtypetext){
            self.newtypetext = self.$route.query.newtypetext;
          }else{
            self.newtypetext = res2[0].showname;
          }
          self.pageDate = res2;
          if(self.$route.query.ywname){
            name  = self.$route.query.ywname
          }else{
            name = res2[0].name
          }
          // let bean = {'category':name,'pagenum':1,'pagesize':10,}
          this.$http.post('zyWebRest_getNewsContentByCategory', {'category':name,'pagenum':1,'pagesize':10,}).then(res => {
            
            if(res){
              self.contentDate = res.result;
              self.total = res.total
              self.rightData =res.result;
            }
          })
          // let res  = await http('zyWebRest_getNewsContentByCategory',  bean);
          // if(res){
          //   self.contentDate = res
          // }
        }else{
          this.$http.post('zyWebRest_getNewsContentByCategory', {'category':self.name,'pagenum':1,'pagesize':10,}).then(res => {
            if(res){
              self.newtypetext= self.nametitle
              self.ifhavesirst  =false;
              self.contentDate = res.result;
              self.total = res.total
              self.rightData =res.result;
              self.rightData.map(i =>{
                i.flag = 1
              })
            }else{
              self.name='无数据' ;
              self.newtypetext = '无数据' ;
              self.pageDate = null ;
              self.contentDate = null ;
              self.total = 0
              self.rightData =null;
            }
          })
         
        }
      })
    },
    listShow(name,typetext){
      let chName  = null;
      let self = this;
      if(name){
        chName = name;
      }else{
        chName =self.$route.query.ywname
      }
      self.newtypetext = typetext;
      let bean = {'category':chName,'pagenum':1,'pagesize':10,}
      this.$http.post('zyWebRest_getNewsContentByCategory', bean).then(res => {
        if(res){
          self.contentDate = res.result;
          self.total = res.total
          self.rightData =res.result;
        }else{
              self.newtypetext = typetext;
              self.contentDate = null ;
              self.total = 0
              self.rightData =null;
        }
      })
    },
    goDetail(item){
      let content = item;
      let pageDate  = this.pageDate;
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
      let setDate = JSON.stringify({
        imgurl:imgurl,
        content:content,
        pageDate:pageDate,
        id:this.lmId,
        name:this.nametitle,
        nameCode:this.name
      });
      localStorage.removeItem('setDate')
      localStorage.setItem('setDate',setDate)
      let index = this.$route.query.index;
      if(item.flag == 1){
        this.$router.push({path: `/detail?index=${index}&flag=${item.flag}&id=${item.id}`})
      }else{
        this.$router.push({path: `/detail?index=${index}&id=${item.id}`})
      }
      
    },
    search(){
      let self = this;
      self.searchDate = null;
      self.total=0
      if(!this.params.keyword){
        self.rightData = self.contentDate;
      }else{
        self.$http.post('zyWebRest_searchAllContent', self.params).then(res => {
          if(res){
            self.searchDate = res.lbcpnewscontent;
            self.rightData = self.searchDate;
            if(res.lbcpnewscontent){
              self.total = res.total;
            }else{
              self.total = 0
            }
          }})
      }
    },
    handleSizeChange(size) {
      this.params.pagenum = 1;  //  加这个是每次切换一页多少条的时候默认会回到第一页  不要可以去掉
      this.params.pagesize = size;
      this.search(this.params)

    },
    handleCurrentChange(page) {
      this.params.pagenum = page;
      this.search(this.params)
    }
  },
  watch:{
    
  }
}
</script>

