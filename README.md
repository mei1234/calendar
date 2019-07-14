# calendar
微信小程序日历 - 可以选择某天或者一段时间
在父组件中引入
.wxml
<view class="container">
  <calendar 
    calendarConfig="{{calendarConfig}}"
    bind:selTime="selTime"
  ></calendar>
</view>

.js
data: {
    calendarConfig: {
        multi: false, //false.只能选择一个时间，true.选择一段时间
        monthCount: 3, //false.没有时间的现在，数值.控制显示的月数
    }

},
selTime(e) {
   console.log('e', e);
},

.json
"usingComponents": {
    "calendar": "../../components/calendar/index"
}

效果可以看img文件的图片