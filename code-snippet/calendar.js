class Calendar {
  constructor(date = new Date()) {
    this.data = {
      year: '',
      month: '',
      day: '',
      headerCell: [],
      dayCell: []
    };
    this.monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    this.dayNames = ['日', '一', '二', '三', '四', '五', '六'];
    
    this.init(date);
  }

  init(date) {
    if (date.toString() === 'Invalid Date') {
      date = new Date();
    }

    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();

    this.update();
  }

  setData() {
    const firstDayOfMonth = new Date(this.year, this.month, 1).getDay(); // 当前日期是一周中第几天
    const numDaysInMonth = new Date(this.year, this.month + 1, 0).getDate(); // 当前日期是一月中第几天（当月有多少天）

    // 星期标题
    for (let i = 0; i < 7; i++) {
      this.data.headerCell.length < 7 && this.data.headerCell.push(this.dayNames[i]);
    }

    // 每天
    let currentDay = 1;
    this.data.dayCell.length && (this.data.dayCell = []);
    while (currentDay <= numDaysInMonth) {

      for (let i = 0; i < 7; i++) {
        // 本月第一天之前和最后一天以后的占位符
        if ((i < firstDayOfMonth && currentDay === 1) || currentDay > numDaysInMonth) {
          this.data.dayCell.push('');
        } else {
          this.data.dayCell.push(currentDay);
          currentDay++;
        }
      }
    }

    this.data.year = this.year;
    this.data.month = this.month + 1;
    this.data.day = this.day;

    console.log(this.data);
  }

  update(date) {
    if (date) {
      this.init(date);
    }

    this.setData();
  }

  nextMonth() {
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }

    this.update();
  }

  prevMonth() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }

    this.update();
  }

  prevYear() {
    this.year--;
    this.update();
  }

  prevYear() {
    this.year--;
    this.update();
  }

  nextYear() {
    this.year++;
    this.update();
  }
}

// vue3 使用
const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      calendar: new Calendar(),
      btns: [
        {text: '上一年', fn: this.prevYear},
        {text: '上月', fn: this.prevMonth},
        {text: '下月', fn: this.nextMonth},
        {text: '下一年', fn: this.nextYear},
        {text: '跳转到2000年1月1日', fn: this.update}
      ]
    };
  },
  methods: {
    prevYear() {
      this.calendar.prevYear();
    },
    prevMonth() {
      this.calendar.prevMonth();
    },
    nextMonth() {
      this.calendar.nextMonth();
    },
    nextYear() {
      this.calendar.nextYear();
    },
    update () {
      this.calendar.update(new Date(2000, 0, 1));
    }
  }
});

app.mount('#app');

