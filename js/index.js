//窗口缩放与横竖
var config = {};
(function(doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 20 * (clientWidth / 400) + 'px';
        //宽与高度
        var proportion = 600 / 1440;
        doc.body.style.height = clientWidth * proportion + 'px';
        config.clientWidth = clientWidth;
        config.clientHeight = clientWidth * proportion;
      };
  //绑定浏览器缩放与加载时间
  win.addEventListener(resizeEvt, recalc, false);//用户反转设备绑定的事件，此为jquery mobile事件
  doc.addEventListener('DOMContentLoaded', recalc, false);//时间轴事件，浏览器加载时间
  //element.addEventListener(event, function, bool) bool指定时间在false（默认）冒泡阶段执行还是true捕获阶段
})(document, window);
