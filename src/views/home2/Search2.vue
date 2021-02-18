<template>
    <div class="page sub2 page2" style="padding-top: 273px;">
      <Navbar2></Navbar2>
      <div class="mid small">
        <div class="row sub-tit">
          <div class="col v-m"></div>
          <div class="col v-m t-r">
            <!-- <div class="search small">
              <input type="text" placeholder="请输入您要搜索的关键词" />
              <a ><img src="@/assets/search1.png" alt="" /></a>
            </div> -->
          </div>
        </div>
      </div>
      <div class="section">
        <div class="mid small">
          <div class="router" style="margin-top: 20px">
            <router-link to="/">首页</router-link>
            <span>搜索</span>
          </div>
          <div class="panel">
            <div class="panel-tit row">
              <h2 class="title col v-m" style="width: 157px">
                <span class="active2">搜索结果</span>
              </h2>
              <div class="search-area col v-m t-c">
                <span>关键字：</span>
                <input v-model="params.keyword" style="margin-right: 10px" />
                <!-- <select name="" id="" v-model="params.keyword">
                  <option value="">全部</option>
                  <option
                    v-for="(i, index) in navbar"
                    :key="index"
                    :value="i.showname"
                  >
                    {{ i.showname }}
                  </option>
                </select> -->
                <span>时间范围：</span>
                <el-date-picker
                value-format="yyyy-MM-dd"
                  v-model="params.startdate"
                  type="date"
                  placeholder="开始日期"
                >
                </el-date-picker>
                <span style="margin: 0 10px">至</span>
                <el-date-picker
                value-format="yyyy-MM-dd"
                  v-model="params.enddate"
                  type="date"
                  placeholder="结束日期"
                >
                </el-date-picker>
                <el-button
                  @click="search"
                  style="margin-left: 10px; height: 30px; line-height: 10px"
                  size="small"
                  type="primary"
                  >确定</el-button
                >
              </div>
              <div class="search-stat col v-m t-r">
                约找到<span style="color: #f00">{{ total }}</span
                >条结果，用时0.04秒
              </div>
            </div>
            <div class="panel-info">
              <ul class="list" v-if="dataList">
                <li
                  v-for="(item, index) in dataList"
                  :key="index"
                  class="new dot search-result"
                >
                  <a @click="goDetail(item)"
                    ><i>{{ item.newtypetext }}</i
                    ><span style="text-align: left">{{ item.title }}</span></a
                  >
                  <div style="display: flex;">
                    
                    <img v-if="item.imgUrl" width="130" v-lazy="item.imgUrl" alt=""><p
                    v-if="item.newcontent"
                    class="pcontent"
                    v-html="item.newcontent"
                  ></p></div>
                  
                  <div>
                    <em>{{ item.newfrom}}</em>
                    <em>{{ item.createtime.substring(0, item.createtime.indexOf(' ')) }}</em>
                  </div>
                </li>
              </ul>
              <ul v-else>
                <li>暂无数据</li>
              </ul>
              <div class="pages" style="margin-top: 148px">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="params.pagenum"
                  :page-sizes="[10, 20, 40, 80]"
                  :page-size="params.pagesize"
                  :hide-on-single-page="false"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2></Footer2>
    </div>
  </template>
  
  <script>
  import Navbar2 from '@/components/Navbar2.vue'
  import Footer2 from '@/components/Footer2.vue'
  import moment from 'moment';
  export default {
    components: {
      Footer2,
      Navbar2
    },
    data () {
      return { 
        params: {
          pagesize: 10,
          pagenum: 1,
          keyword: this.$route.query.keyword,
          startdate: '',
          enddate:''
        },
        total: 0,//事项总条数
        navbar:JSON.parse(localStorage.getItem('navbar'))?JSON.parse(localStorage.getItem('navbar')):'',
        dataList:null,
        pageDate:null
      }
    },
    created(){
      this.$http.post('zyWebRest_insertVisitor', {"websitename": "SSFYWEB"}).then(res => {
        if(res){
        }
      });
      this.search()
    },
    methods:{
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
      search(){
        let self = this;
        self.dataList = null;
        let startdate = moment(self.params.startdate).toDate();
        let enddate = moment(self.params.enddate).toDate();
        self.bjDate(startdate,enddate)
        // self.params.startdate = self.switchTimeFormat(self.params.startdate);
        // self.params.enddate = self.switchTimeFormat(self.params.enddate);
        self.$http.post('zyWebRest_searchAllContent', self.params).then(res => {
          if(res){
            self.dataList = res.lbcpnewscontent;
            self.dataList.map(i =>{
              i.imgUrl = self.imgUrl(i)
               if(i.showname2 == "通知公告"){
                i.index = 1
              }else if(i.showname2 == "热点新闻"){
                i.index = 2
              }else if(i.showname2 == "信息简报"){
                i.index = 3
              }else if(i.showname2 == "审判管理"){
                i.index = 4
              }else if(i.showname1 == "重要文件" || i.showname2 == "重要文件"){
                i.index = 5
              }else if(i.showname2 == "政治工作"){
                i.index = 6
              }else if(i.showname1 == "党建信息" || i.showname2 == "党建信息"){
                i.index = 7
              }else if(i.showname1 == "廉政信息" || i.showname2 == "廉政信息"){
                i.index = 8
              }else if(i.showname1 == "规章制度" || i.showname2 == "规章制度"){
                i.index = 9
              }else if(i.showname2 == "深汕法院综合信息发布网站"){
                i.index = 0
              }
            })
            self.removeBq(self.dataList);
            self.total = res.total;
          }
        })
      },
     
      goDetail(item){
        let content = item;
        let setDate = JSON.stringify({
          imgurl:item.imgUrl,
          content:content,
          id:item.topresid,
          name:item.showname2
        });
        localStorage.removeItem('setDate')
        localStorage.setItem('setDate',setDate)
        this.$router.push({path: `/detail2?index=${item.index}&id=${item.id}`})
      },
      handleSizeChange(size) {
        // this.params.pagenum = 1;  //  加这个是每次切换一页多少条的时候默认会回到第一页  不要可以去掉
        this.params.pagesize = size;
        this.search(this.params)
  
      },
      handleCurrentChange(page) {
        this.params.pagenum = page;
        this.search(this.params)
      },
      //比较两个时间的大小
      bjDate(date, date1) {
        var date = new Date(date);
        var date1 = new Date(date1);
        if (date.getTime() - date1.getTime() > 0) {
          this.$message('开始时间不能晚于结束时间');
          return;
        } 
      },
      //去掉html标签
      removeBq(dataList){
        dataList.forEach(el => {
          var s = el.newcontent;//获取里面的博客摘要内容
          var dd=s.replace(/<[^>]+>/g,"");//截取html标签
          var dds=dd.replace(/&nbsp;/ig,"");//截取空格等特殊标签
          el.newcontent ='';//清空里面内容
          el.newcontent=dds.substring(0,180) + "..."//截取200个字
        });
      }
    }
  }
  </script>
  <style scoped>
  .search-area /deep/ .el-date-editor .el-input__prefix .el-input__icon {
    margin-top: -5px;
  }
  .pcontent p {
    display: none;
  }
  .pcontent:first-child {
    display: block;
  }
  </style>
  
  