/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var chart = $(".aqi-chart-wrap"),width;
  switch (pageState.nowGraTime) {
    case "day":
      width = 10;
      break;
    case "week":
      width = 30;
      break;
    case "month":
      width = 50;
      break;
  }
  chart.empty()
    for (x in chartData){
      var div = $("<div title=" + chartData[x] + "></div>");
      div.css({
        "display":"inline-block",
        "width":width + "px",
        "height":chartData[x]+"px",
        "background":'#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6)
      })
      chart.append(div)
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化

  // 设置对应数据

  // 调用图表渲染函数
  //
  $('#form-gra-time').change(function(e){
      pageState.nowGraTime = e.target.value;
      initAqiChartData();
      renderChart()
    })
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化

  // 设置对应数据

  // 调用图表渲染函数


}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  pageState.nowGraTime = $('#form-gra-time input[checked=checked]').val();
  graTimeChange()
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  var select = $("#city-select");

  // pageState.nowSelectCity = select.val();

  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for (x in aqiSourceData){
    select.append("<option value=" + x + ">" + x +"</option>")
  }
  pageState.nowSelectCity = select.children().first().val();
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.change(function(){
    pageState.nowSelectCity = $(this).val();
    initAqiChartData();
    renderChart();
  })
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for (x in aqiSourceData) {
    if (x == pageState.nowSelectCity) {
      switch (pageState.nowGraTime) {
        case "day":
          chartData = {};
          // chartData[x] = aqiSourceData[x];
          for(y in aqiSourceData[x]){
            chartData[y] = aqiSourceData[x][y];
          }
          break;
        case "week":
          chartData = {};
          var w = {};
          for (y in aqiSourceData[x]){
            var n;
            var date = new Date(y);
            var date1 = new Date(date.getFullYear(),0,1);
            var day1 =date1.getDay();
            if(day1 == 1){
              n = 1;
            } else {
              n = 9-day1;
            }
            var day = Math.floor((date -date1)/(24*3600*1000)) + 1;
            var week = Math.floor((day - n)/7 + 2)
            if (!w[week]) {
              w[week] = [aqiSourceData[x][y]];
            } else {
              w[week].push(aqiSourceData[x][y]);
            }
          }
          for(x in w){
            var sum = 0;
            for (var i=0;i<w[x].length;i++){
              sum += w[x][i];
            }
            chartData[x] = sum/w[x].length;
            // console.log(w[x])
          }
          break;
        case "month":
          chartData = {};
          var m = {};
          for (y in aqiSourceData[x]){
           var date = new Date(y);
           var n = date.getMonth();
           if (!m[n]){
             m[n]=[aqiSourceData[x][y]];
           } else {
             m[n].push(aqiSourceData[x][y]);
           }
          }
          // console.log(m);
          for(x in m){
            var sum = 0;
            for (var i=0;i<m[x].length;i++){
              sum += m[x][i];
            }
            chartData[x] = sum/m[x].length;
          }
          break;
    }
  }
}
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

$(document).ready(function(){
  init();
})
