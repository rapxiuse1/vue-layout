import Vue from 'vue'
Vue.prototype.$move = function (e) {
  let odiv = e.target
  let disX = e.clientX - odiv.offsetLeft
  let disY = e.clientY - odiv.offsetTop
  document.onmousemove = (e)=>{
    let left = e.clientX-disX
    let top = e.clientY - disY
    // this.positionX = top
    // this.positionY = left
    odiv.style.left = left + 'px'
    odiv.style.top = top + 'px'
  }
  document.onmouseup = (e)=>{
    document.onmousemove = null
    document.onmouseup = null
  }
}
