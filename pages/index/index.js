//index.js
Page({
    data: {
        calendarConfig: {
            multi: false, //false.只能选择一个时间，true.选择一段时间
            monthCount: 3, //false.没有时间的现在，数值.控制显示的月数
        }

    },
    selTime(e) {
        console.log('e', e);
    },
    onLoad: function(options) {
        //Do some initialize when page load.

    },
    onReady: function() {
        //Do some when page ready.

    },
    onShow: function() {
        //Do some when page show.

    },
    onHide: function() {
        //Do some when page hide.

    },
    onUnload: function() {
        //Do some when page unload.

    },
    onPullDownRefresh: function() {
        //Do some when page pull down.

    }
})