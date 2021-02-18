<template>
  <div class="footer">
    <div class="mid small">
      <div class="footer-link">
        <a href="#" v-show="false"
          >应用管理
          <div class="footer-link-sub" v-show="false">
            <a href="#">办公室</a>
            <a href="#">财务部</a>
            <a href="#">监察督查室</a>
            <a href="#">政治部干部处</a>
            <a href="#">监察督查室监察督查室</a>
            <a href="#">监察督查室</a>
            <a href="#">监察督查室</a>
            <a href="#">政治部干部处</a>
            <a href="#">办公室</a>
            <a href="#">监察督查室</a>
            <a href="#">监察督查室</a>
            <a href="#">政治部干部处</a>
          </div>
        </a>
        <a href="#" v-show="false"
          >部门链接
          <div class="footer-link-sub" v-show="false">
            <a href="#">办公室</a>
            <a href="#">财务部</a>
            <a href="#">监察督查室</a>
            <a href="#">政治部干部处</a>
            <a href="#">办公室</a>
            <a href="#">监察督查室</a>
          </div>
        </a>
        <a href="#"
          >区院链接
          <div class="footer-link-sub">
            <a href="http://146.12.132.25:8080/nweb/">前海合作区人民法院</a>
            <a href="http://146.12.32.15/">福田区人民法院</a>
            <a href="http://146.12.17.171/">罗湖区人民法院</a>
            <a href="http://146.12.48.3/">南山区人民法院</a>
            <a href="http://146.12.97.21/">盐田区人民法院</a>
            <a href="http://146.12.65.2/">宝安区人民法院</a>
            <a href="http://172.21.2.192/">龙岗区人民法院</a>
          </div>
        </a>
        <a href="#"
          >常用链接
          <div class="footer-link-sub">
            <a href="http://146.12.2.2/index.html">深圳市中院内网
            </a>
            <a href="http://www.court/">人民法院内网
            </a>
            <a href="http://146.0.2.42/gdweb/">广东法院内部网
            </a>
            <a href="http://peixun.zg.pcc/">中国法官培训网
              </a>
            <a href="http://192.1.40.54/court-digital-library-search/page/portal/portalHomepage.html">广东法院数字图书馆
            </a>
            <a href="http://192.0.101.37/summer-ssoserver/login?service=http%3A%2F%2F192.0.101.91%2Fpcfgpt&tgt=null">破产重整工作平台
            </a>
            <a href="http://146.12.2.2/qzlx/index.html">群众路线
            </a>
            <a href="http://172.17.6.3/">深圳公务员之窗
            </a>
            <a href="http://146.12.2.2/jcms/Login.do">网站管理
            </a>
            <a href="http://146.12.2.197:8080/count/webapp/cpwscxtj/cxtj.jsp">文书上网统计
              </a>
            <a href="http://146.12.2.66:9080/court/tools.html">综合业务系统控件下载
            </a>
            <a href="http://146.12.2.84:8080/SZUnTaxPro/searchCollate.jsp">诉讼费非税查询接口
            </a>
            <a href="http://146.0.250.11:9080/court/sfjy/qscxtj/cx.jsp">全省司法建议查询
            </a>
            <a href="http://146.12.2.2/zhfy/2020/03/29175749376.html">常用软件下载
            </a>
            <a href="http://192.1.36.126:9099/sffx-zzpt/index/index.html">最高院大数据平台
            </a>
            <a href="http://146.0.2.92:81/#/">省院大数据平台
            </a>
            <a href="http://146.0.2.91:9006/">全省法院办案工作动态
            </a>
            <a href="http://146.12.3.61/tsrb/cdb/tjbb/tsrb">深圳法院态势日报
            </a>
          </div>
        </a>
      </div>
      <div class="row">
        <div class="col v-m">
          <p>版权所有：深圳深汕特别合作区人民法院</p>
          <p v-show="false">备案编号：粤ICP备05046837号</p>
        </div>
        <div class="col v-m">
          <p>信息维护：深圳永兴元科技股份有限公司</p>
          <p v-show="false">技术客服热线电话：010-65299063</p>
        </div>
        <div class="col v-m t-r footer-count">
          <span>浏览网站人数统计：</span>
          <b v-for="(i, index) in numarr" :key="index">{{ i }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footers',
  props: {
  },
  data () {
    return {
      seeWebNumber:0,
      numarr:[0]
    }
  },
  created(){
    let self = this;
    self.$http.post('zyWebRest_getWebsiteNumberOfVisitors', {"websitename": "SSFYWEB"}).then(res => {
      if(res){
        self.seeWebNumber = res;
        var str = self.seeWebNumber.toString();
        self.numarr=str.split("");

      }
    })
  }
}
</script>


