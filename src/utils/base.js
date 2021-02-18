var LEAPWeb = new Object();
var leapwebconfig = {
  port: null,
  host: null,
  portal: null,
  context: null,
  server: null
};

function StringBuffer(a) {
  this._strings_ = [];
  if (a != null) {
    this._strings_[0] = a;
  }
}
StringBuffer.prototype.append = function (a) {
  if (a == null) {
    return this;
  }
  this._strings_.push(a);
  return this;
};
StringBuffer.prototype.clear = function () {
  this._strings_.clear();
  return this;
};
StringBuffer.prototype.toString = function (a) {
  if (a == null) {
    a = "";
  }
  return this._strings_.join(a);
};
var leapweburl = function () {
  this.___geti = function () {
    var e = document.getElementsByTagName("script");
    var k = window.location.href;
    var g = "WEBBase.js";
    var j = "LEAP/Resource/HTML/website/WEBBase.js";
    var b = "Resource/HTML/website/WEBBase.js";
    for (var f = 0; f < e.length; f++) {
      var d = e[f];
      var a = d.src;
      if (a) {
        if (a.indexOf("?") > -1) {
          a = a.split("?")[0];
        }
        var l = a;
        if (l.charAt(0) == "/") {
          while (k.indexOf("//") > -1) {
            k = k.replace("//", "_");
          }
          k = k.replace("http:_", "http://").replace("https:_", "https://");
          while (k.lastIndexOf("/") > -1 && k.charAt(k.lastIndexOf("/") - 1) != "/") {
            k = k.substring(0, k.lastIndexOf("/"));
          }
          if (d.src.indexOf(g) > -1) {
            k += l.replace(j, "");
          }
        } else {
          if (l.indexOf("http://") > -1 || l.indexOf("https://") > -1) {
            if (d.src.indexOf(g) > -1) {
              k = l.replace(j, "");
            }
          } else {
            var h = 0;
            while (l.indexOf("../") > -1) {
              h += 1;
              l = l.replace("../", "");
            }
            while (l.indexOf("./") > -1) {
              l = l.replace("./", "");
            }
            while (k.indexOf("//") > -1) {
              k = k.replace("//", "@");
            }
            k = k.replace("http:@", "http://").replace("https:@", "https://").substring(0, k.lastIndexOf("/") + 1);
            if (h > 0) {
              while (h > 0) {
                h--;
                k = k.substring(0, k.lastIndexOf("/"));
              }
            }
            k = k + "/" + l;
            if (d.src.indexOf(g) > -1) {
              if (k.indexOf(j) > -1) {
                k = k.replace(j, "");
              } else {
                if (k.indexOf(b) > -1) {
                  k = k.replace(b, "");
                }
              }
            }
          }
        }
      }
    }
    return k;
  };
  this.init = function () {
    var g = window.location.href;
    var d = this.___geti();
    g = d;
    if (g.charAt(g.length - 1) != "/") {
      g += "/";
    }
    var a = g;
    var j = g.indexOf("://");
    var i = g.indexOf("/", j + 3);
    var b = "";
    var f = g.substring(j + 3, i);
    var c = g.substring(0, j);
    var h = c == "https" ? 443 : 80;
    if (f.indexOf(":") > -1) {
      var e = f.indexOf(":");
      h = Number(f.substring(e + 1));
      f = f.substring(0, e);
    }
    if (g.length > i + 1) {
      b = g.substring(i + 1);
      b = b.substring(0, b.length - 1);
    }
    leapwebconfig.port = h;
    leapwebconfig.host = f;
    leapwebconfig.portal = c;
    leapwebconfig.context = b;
    leapwebconfig.server = a;
  };
  this.init();
};
var webclient = function () {
  this.be = document.getElementsByTagName("base")[0];
  this.head = this.be ? this.be : document.getElementsByTagName("head")[0];
  this.loadfile = function (d, f) {
    if (f == "js") {
      var b = false;
      var a = document.getElementsByTagName("script");
      if (a != null) {
        for (var e = 0; e < a.length; e++) {
          var g = a[e];
          if (g != null) {
            var h = g.getAttribute("path");
            if (h != null && h == d) {
              b = true;
              break;
            }
          }
        }
      }
      if (b == false) {
        var g = document.createElement("script");
        g.setAttribute("_sys", "1");
        g.type = "text/javascript";
        g.charset = "utf-8";
        g.setAttribute("path", d);
        g.setAttribute("src", leapwebconfig.server + d);
        this.head.appendChild(g);
      }
    } else {
      if (f == "css") {
        var b = false;
        var c = document.getElementsByTagName("link");
        for (var e = 0; e < c.length; e++) {
          var g = c[e];
          if (g != null) {
            var h = g.getAttribute("path");
            if (h != null && h == d) {
              b = true;
              break;
            }
          }
        }
        if (b == false) {
          var g = document.createElement("link");
          g.setAttribute("_sys", "1");
          g.setAttribute("type", "text/css");
          g.setAttribute("rel", "stylesheet");
          g.setAttribute("path", d);
          g.setAttribute("href", leapwebconfig.server + d);
          this.head.appendChild(g);
        }
      }
    }
  };
  this.getElement = function (b, a) {
    var g = null;
    try {
      if (a != null && typeof a == "string") {
        a = LEAP.getElement(a);
      }
      var j = new StringBuffer();
      if (b.indexOf("=") > -1) {
        var k = b.split("]");
        for (var c = 0; c < k.length; c++) {
          if (k[c] == "") {
            continue;
          }
          var h = null;
          if (k[c].indexOf("=") > -1) {
            var d = k[c].split("=");
            if (d[1].indexOf('"') > -1) {
              h = d[0] + "=" + d[1] + "]";
            } else {
              h = d[0] + "='" + d[1] + "']";
            }
          } else {
            if (k[c].indexOf(".") > -1) {
              h = k[c];
            } else {
              h = k[c] + "]";
            }
          }
          j.append(h);
        }
      } else {
        j.append(b);
      }
      if (!a) {
        g = document.querySelector(j.toString());
      } else {
        g = a.querySelector(j.toString());
      }
      return g;
    } catch (f) {} finally {
      g = null;
    }
  };
  this.getElements = function (b, a, m) {
    var h = null;
    try {
      if (a != null && typeof a == "string") {
        a = LEAP.getElement(a);
      }
      var l = new StringBuffer();
      if (b.indexOf("=") > -1) {
        var n = b.split("]");
        for (var d = 0; d < n.length; d++) {
          if (n[d] == "") {
            continue;
          }
          var k = null;
          if (n[d].indexOf("=") > -1) {
            var f = n[d].split("=");
            if (f[1].indexOf('"') > -1) {
              k = f[0] + "=" + f[1] + "]";
            } else {
              k = f[0] + "='" + f[1] + "']";
            }
          } else {
            if (n[d].indexOf(".") > -1) {
              k = n[d];
            } else {
              k = n[d] + "]";
            }
          }
          l.append(k);
        }
      } else {
        l.append(b);
      }
      if (!a) {
        h = document.querySelectorAll(l.toString());
      } else {
        if (m) {
          h = a.querySelectorAll(l.toString());
          if (h != null && h.length > 0) {
            var j = [];
            for (var d = 0; d < h.length; d++) {
              j.add(h[d]);
            }
            h = j.insertBefore(a, j[0]);
          } else {
            var j = [];
            h = j.add(a);
          }
        } else {
          h = a.querySelectorAll(l.toString());
        }
      }
      if (h) {
        var c = h;
        h = [];
        for (var d = 0; d < c.length; d++) {
          var o = c[d];
          h.push(o);
        }
      }
      return h;
    } catch (g) {} finally {
      h = null;
    }
  };
};
LEAPWeb.init = function () {
  new leapweburl();
  window.leapwebclient = new webclient();
  leapwebclient.loadfile("LEAP/Resource/HTML/website/Net.js", "js");
  leapwebclient.loadfile("LEAP/Resource/HTML/indexassembly/css/partLayoutStyle.css", "css");

};
export function loadWebPart(e, o, m, c) {
  if (!o) {
    return;
  }
  // if (!b) {
  //   return;
  // }
  // if (leapclient == null) {
  //   leapclient = window.leapclient;
  // }
  // if (window.leaprouters == null) {
  //   var f = leapclient.request("app_getClusterInfo");
  //   buildRouterData(f);
  // }
  // var e = leapclient.request2({
  //   name: "Studiov6_IndexPartChange",
  //   par: {
  //     websiteid: b,
  //     userid: null
  //   },
  //   router: "leap",
  //   service: "web"
  // });
  if (e != null) {
    var k = '<div class="part-main" iptf="partLayout" autoedit="0" runtime="1" ishauto="1">' + e.partcontent + "</div>";
    o.innerHTML = k;
    console.log(o)
    var a = leapwebclient.getElement("[iptf=partLayout]", o);
    if (a != null) {
      if (a.getAttribute("ishauto") == "1") {
        a.parentElement.style.position = "static";
      }
      var n = leapwebclient.getElements("[ctf=partItem]", a);
      if (n != null) {
        var j = 10;
        for (var d = 0; d < n.length; d++) {
          var h = n[d];
          if (d == 0) {
            j = 10;
          } else {
            j = ((d + 1) * 10);
          }
          var g = h.getAttribute("moduleinfo");
          if (g != null && g != "") {
            var l = JSON.parse(g);
            if (l != null) {
              LEAPWeb.setContent(n[d], l, m, c, j);
            }
          }
        }
      }
    }
  }
}

LEAPWeb.setContent = function (i, c, h, b, e) {
  var d = '<div class="part-item-content" ctf="partmodulebox"><div class="prat-item-content-box" ctf="partcontent"><img class="prat-item-loading" src="' + leapwebconfig.server + 'LEAP/Resource/HTML/indexassembly/images/loading.gif"></div></div>';
  var j = '<iframe src="@src" style="width:100%;height:100%;" frameborder="0" scrolling="no"></iframe>';
  if (!b) {
    b = window;
  }
  i.innerHTML = d;
  if (c != null) {
    var g = leapwebclient.getElement("[ctf=partcontent]", i);
    var k = leapwebclient.getElement("[ctf=partmodulebox]", i);
    var l = null
    var m = i.getAttribute("itemmargins")
    if (m != null && m != "") {
      l = JSON.parse(m);
    }
    if (l != null) {
      if (l.top) {
        k.style.paddingTop = l.top;
      }
      if (l.bottom) {
        k.style.paddingBottom = l.bottom;
      }
      if (l.right) {
        k.style.paddingRight = l.right;
      }
      if (l.left) {
        k.style.paddingLeft = l.left;
      }
    }
    if (c.websitetype == "1") {
      var a = {};
      a.item = g;
      a.data = c;
      var f = function () {
        h.apply(b, [a]);
      };
      setTimeout(f, e);
    } else {
      if (c.websitetype == "2") {
        g.innerHTML = j.replace("@src", c.path);
      }
    }
  }
};
LEAPWeb.init();
export default {
  loadWebPart
}