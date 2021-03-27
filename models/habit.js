const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HabitSchema = new Schema({
  user_phone: {
    type: String
  },
  date: { type: String },
  tasks: {
    type: Array, default: [
      {
        time: "起床",
        item: [
          {
            iconName: "#icon-Washingmachine",
            taskDesc: "洗漱整理",
            completed: false,
            completedBgc: "#CCFF99",
            completedTime: "",
            completedMessage: "",
            persistDay: 1,
            daysInARow: 1,
          },
          {
            iconName: "#icon-chizaocan",
            taskDesc: "记得早餐",
            completed: false,
            completedBgc: "#FFCC33",
            completedTime: "",
            completedMessage: "",
            persistDay: 8,
            daysInARow: 4,
          },
        ]
      },
      {
        time: "晨间",
        item: [
          {
          iconName: "#icon-yingyu",
          taskDesc: "英语听力",
          completed: false,
          completedBgc: "#CC6699",
          completedTime: "",
          completedMessage: "",
          persistDay: 4,
          daysInARow: 2,
        },
        ]
      },
      {
        time: "中午",
        item: [{
          iconName: "#icon-signal",
          taskDesc: "模电数电",
          completed: false,
          completedBgc: "#99CCFF",
          completedTime: "",
          completedMessage: "",
          persistDay: 0,
          daysInARow: 0,
        },]
      },
      {
        time: "午间",
        item: []
      },
      {
        time: "晚间",
        item: []
      },
      {
        time: "睡前",
        item: []
      },
    ]
  }
})

mongoose.model("Habit", HabitSchema)