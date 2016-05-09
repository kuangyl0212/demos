/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 
function addAqiData() {
	aqiCityInput = document.getElementById('aqi-city-input').value;
 	aqiValueInput = document.getElementById('aqi-value-input').value;
 	if (aqiCityInput !== "" && aqiValueInput !== "") {
 		aqiValueInput = aqiValueInput.replace(/(^\s*)|(\s*$)/g, '');
 		aqiCityInput = aqiCityInput.replace(/(^\s*)|(\s*$)/g, '');
 		if (/^([a-zA-Z\u4e00-\u9fa5]*)\s*([a-zA-Z\u4e00-\u9fa5]*$)/g.test(aqiCityInput) && /^\d+$/g.test(aqiValueInput)) {
 			var city = aqiCityInput;
 			var value = parseInt(aqiValueInput, 10);
 			if (!aqiData.hasOwnProperty(city)) {
 				aqiData[city] = value;
 			} else {alert("该城市已存在！")}
 		} else {alert("输入格式不正确！\n城市名仅接受中英文字符和空格符；\n污染指数仅接受数字")}
 	} else {alert("未输入或输入不完整")}
	
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
 var tab = document.getElementById('aqi-table');
 tab.innerHTML = "";
 var tr1 = document.createElement('tr');
 tr1.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
 tab.appendChild(tr1);
 var x;
 for (x in aqiData) {
 	var tr2 = document.createElement('tr');
 	tr2.innerHTML = "<td>" + x + "</td><td>" + aqiData[x] + "</td><td><button>删除</button></td>";
 	tab.appendChild(tr2);
 }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var city = event.target.parentNode.parentNode.children[0].textContent;
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  window.addEventListener('load',function(){
  	var addBtn = document.getElementById('add-btn');
  	addBtn.addEventListener('click', addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  	var tab = document.getElementById('aqi-table');
  	tab.addEventListener('click', delBtnHandle);
  })
}

init();