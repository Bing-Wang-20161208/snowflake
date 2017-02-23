$(function() {
  function Snowflake(elementName) {
    var snowElement = document.getElementById(elementName),
        canvasContext = snowElement.getContext('2d'),
        width = config.clientWidth,
        height = config.clientHeight;
    //设置canvas尺寸
    snowElement.width = width;
    snowElement.height = height;
    //雪球数量
    var snowNum = 50;
    //构建雪球对象
    var snowArrObjs = initSnow(snowNum, width, height),
        snowArrNum = snowArrObjs.length;
    //绘制页面
    var render = function() {
      //清理之前的形状
      canvasContext.clearRect(0, 0, width, height);
      for (var i = 0; i < snowArrNum; ++i) {
        snowArrObjs[i].render(canvasContext);
      }
    }
    //更新雪花
    var update = function() {
      for (var i = 0; i < snowArrNum; ++i) {
        snowArrObjs[i].update();
      }
    }
    //绘制与更新
    var renderAndUpdate = function() {
      render();
      update();
      requestAnimationFrame(renderAndUpdate);
    }
    renderAndUpdate();
  }
  function initSnow(snowNum, width, height) {
    //雪球参数
    var options = {
      //雪球半球距离
      minRadius: 3,
      maxRadius: 10,
      //运功范围
      maxY: height,
      maxX: width,
      //速率
      minSpeedY: 0.05,
      maxSpeedY: 2,
      speedX: 0.05,
      //滤镜
      minAlpha: 0.5,
      maxAlpha: 1.0,
      minMoveX: 4,
      maxMoveX: 18
    }
    var snowArr = [];
    for (var i = 0; i < snowNum; i++) {
      snowArr[i] = new Snow(options);
    }
    return snowArr;
  }
  //雪球类
  function Snow(snowSettings) {
    this.snowSettings = snowSettings;
    this.radius = randomInRange(snowSettings.minRadius, snowSettings.maxRadius);
    //初始的X位置
    this.initialX = Math.random() * snowSettings.maxX;
    this.y = -(Math.random() * 500);
    //speed
    this.speedY = randomInRange(snowSettings.minSpeedY, snowSettings.maxSpeedY);
    this.speedX = snowSettings.speedX;
    //alpha
    this.alpha = randomInRange(snowSettings.minAlpha, snowSettings.maxAlpha);
    //angle
    this.angle = Math.random(Math.PI * 2);
    //distance
    this.x = this.initialX + Math.sin(this.angle);
    //x-distance
    this.moveX = randomInRange(snowSettings.minMoveX, snowSettings.maxMoveX);
  };
  //绘制雪球
  Snow.prototype.render = function(canvasContext) {
    canvasContext.beginPath();//开启路径
    canvasContext.fillStyle = "rgba(225, 225, 225, " + this.alpha + ")";//填充路径
    canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);//一个中心点和半径，为一个画布的当前子路径添加一条弧线;坐标，圆，沿着圆指定弧的开始点和结束点的一个角度;弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历
    canvasContext.closePath();//关闭路径
    canvasContext.fill();//fill()使用fillStyle属性所指定的颜色、渐变、模式来填充当前路径
  }
  Snow.prototype.update = function() {
    this.y += this.speedY;
    if (this.y > this.snowSettings.maxY) {
      this.y -= this.snowSettings.maxY;
    }
    this.angle += this.speedX;
    if (this.angle > Math.PI * 2) {
      this.angle -= Math.PI * 2;
    }
    this.x = this.initialX + this.moveX * Math.sin(this.angle);
  }
  //随机处理
  function randomInRange(min, max) {
    var random = Math.random() * (max - min) + min;
    return random;
  }
  //run
  Snowflake("snowflake");
})
