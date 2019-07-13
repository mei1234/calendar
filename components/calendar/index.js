// components/calendar2/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        calendarConfig: {
            type: Object
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        year: null, //年份
        month: null, //月份
        day: null, //日
        currentYear: null, //当前时间的年份
        currentMonth: null, //当前时间的月份
        currentDay: null, //当前时间的日子
        leftShow: false, //左箭头
        rightShow: true, //右箭头
        count: null, //控制可以显示从今个月到之后的月份数
        weeks: ['S', 'M', 'T', 'W', 'T', 'F', 'S'], //星期
        days: [], //每个月拥有的天数
        moveR: '', //每个月的第一天偏移的距离
        day1: {}, //选择的比较小时间
        day2: {}, //
        startTime: '',
        endTime: '',
    },
    observers: {
        // 'calendarConfig.monthCount': function(calendarConfig) {
        //     this.data.count = calendarConfig.monthCount
        // }
    },
    lifetimes: {
        attached: function() {
            // 在组件实例进入页面节点树时执行
            // this.data.count = this.data.calendarConfig.monthCount
        },
    },
    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function() {
            // this.data.count = this.data.calendarConfig.monthCount
            this.setData({
                    count: this.data.calendarConfig.monthCount
                })
                // 当前的时期
            this.currentDate();
            // 计算每个月份一共有多少天数
            this.hasDays();
            // 当前的月份是从星期几开始
            this.isFirstDay();

        },
        hide: function() {},
        resize: function() {},
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 点击右箭头 》月份加一 count减一
        addMonth() {
            console.log('calendarConfig4', this.data.calendarConfig);
            if (this.data.calendarConfig.monthCount) {
                if (this.data.count != 1) {
                    let count = this.data.count - 1;
                    this.setData({
                        count
                    })
                }
            }

            if (this.data.month === 12) {
                this.setData({
                    month: 1,
                    year: this.data.year + 1
                });
                this.isFirstDay();
            } else {
                this.setData({
                    month: this.data.month + 1
                });
                this.isFirstDay();
            }
        },
        // 点击左箭头 》月份减一  count加一
        reduceMonth() {
            if (this.data.calendarConfig.monthCount) {
                if (this.data.count != this.data.calendarConfig.monthCount) {
                    let count = this.data.count + 1;
                    this.setData({
                        count
                    })
                }
            }

            if (this.data.month === 1) {
                this.setData({
                    month: 12,
                    year: this.data.year - 1
                });
                this.isFirstDay();
            } else {
                this.setData({
                    month: this.data.month - 1
                });
                this.isFirstDay();
            }
        },
        // 计算当前的年份是不是闰年
        isLeapYear(year) {
            if (((year % 4) === 0 && (year % 100) !== 0) || (year % 400) === 0) {
                return true
            } else {
                return false
            }
        },
        // 计算每个月份一共有多少天数
        hasDays() {
            let isLeapYear = this.isLeapYear(this.data.year);
            this.setData({
                days: [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            })
        },
        // 当前的时期
        currentDate() {
            let current = new Date(); //最好是从服务器获取当前的时间，你懂的
            let year = current.getFullYear();
            let month = current.getMonth() + 1;
            let day = current.getDate()
            this.setData({
                year,
                month,
                day,
                currentYear: year,
                currentMonth: month,
                currentDay: day
            });
        },
        // 当前的月份是从星期几开始
        isFirstDay() {
            let day = this.data.year + '-' + this.data.month + '-' + 1;
            let week = (new Date(day)).getDay();
            // console.log('week', week);
            let moveR = (week * 80) + 'rpx'
            this.setData({
                moveR
            })
        },
        // 选择时间
        selTime(e) {
            // console.log('e', e);
            let day = e.currentTarget.dataset.day;
            let time = this.data.year + '-' + this.data.month + '-' + day;
            let current = this.data.currentYear + '-' + this.data.currentMonth + '-' + this.data.currentDay;
            // 必须要大于,等于当前时间
            if (Date.parse(time) > Date.parse(current) || Date.parse(time) == Date.parse(current)) {
                // 当typeDay为2是选择一个时间段
                if (this.data.calendarConfig.multi == true) {
                    if (this.data.day1.year) {
                        // console.log('1111');
                        if (this.data.day2.year) {
                            //day1和day2都有值 ———> 把day1和day2清空，把选择的时间赋给day1
                            this.data.startTime = time;
                            [this.data.day1, this.data.day2] = [{ year: this.data.year, month: this.data.month, day: day }, '']
                        } else {
                            // day1有值，day2没有值 ————> 要比较day1和新选择的time时间的大小
                            let startTime = Date.parse(this.data.startTime);
                            let endTime = Date.parse(time);
                            if (startTime > endTime) {
                                [this.data.startTime, this.data.endTime] = [time, this.data.startTime];
                                [this.data.day1, this.data.day2] = [{ year: this.data.year, month: this.data.month, day: day }, this.data.day1];
                            } else if (startTime < endTime) {
                                this.data.endTime = time;
                                this.data.day2 = { year: this.data.year, month: this.data.month, day: day }
                            } else {
                                // 当day1和点击的日期一致的时候就清空day1的时间
                                this.data.endTime = ''
                                this.data.day1 = {};
                            }
                        }
                    } else {
                        // console.log('2222');
                        if (this.data.day2.year) {
                            //day1没值，day2有值
                        } else {
                            // day1没值，day2没有值 --> 给day1值
                            this.data.startTime = time;
                            this.data.day1 = { year: this.data.year, month: this.data.month, day: day }
                        }
                    }
                    this.setData({
                        day1: this.data.day1,
                        day2: this.data.day2
                    });
                    let selTime = {
                        day1: this.data.day1,
                        day2: this.data.day2
                    }
                    this.triggerEvent('selTime', selTime)
                } else {
                    // 是选择一个时间
                    console.log("是选择一个时间")
                    this.data.day1 = { year: this.data.year, month: this.data.month, day: day };
                    this.setData({
                        day1: this.data.day1,
                    })
                    let selTime = {
                        day1: this.data.day1,
                    }
                    this.triggerEvent('selTime', selTime)
                }
            }
        },
    }
})