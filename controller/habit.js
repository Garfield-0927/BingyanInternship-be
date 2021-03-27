const mongoose = require('mongoose');
const UserSchema = require('../models/user')
const User = mongoose.model('User');
const HabitSchema = require('../models/habit')
const Habit = mongoose.model('Habit')


/**
 * 
 * @param {*} req req.body中携带用户手机号以及日期
 * @param {*} res 
 */
const findOneDayHabit = async (req, res) => {
  const data = req.body;

  // 处理参数异常
  if (!data.phone || !data.date || !data.date.match(/^(\d{4})(-)(\d{2})(-)(\d{2})$/)) {
    res.json({
      code: "4000",
      msg: "params wrong"
    })
    return;
  }


  const habitData = await Habit.findOne({ user_phone: data.phone, date: data.date });
  if (!habitData) {
    const OneDayHabit = new Habit({
      user_phone: data.phone,
      date: data.date
    });
    try {
      OneDayHabit.save();
      res.json({
        code: 200,
        habit: OneDayHabit
      })
    } catch (error) {
      res.json({
        code: 4444,
        msg: "database error: " + error
      })
    }
  } else {
    res.json({
      code: 200,
      habit: habitData
    })
  }
}

/**
 * 
 * @param {*} req [phone,task,date,timeIndex]
 * @param {*} res 
 * @returns 
 */
const addHabit = async (req, res) => {
  const data = req.body;
  if (data.timeIndex == null || !data.phone || !data.task || !data.date || !data.date.match(/^(\d{4})(-)(\d{2})(-)(\d{2})$/)) {
    res.json({
      code: 4000,
      msg: "params wrong"
    })
    return;
  } else {
    let habitList = await Habit.findOne({ user_phone: data.phone, date: data.date });
    if (!habitList) {
      res.json({
        code: 4000,
        msg: "date error"
      })
    } else {
      habitList.tasks[data.timeIndex].item.push(data.task);
      try {
        await Habit.replaceOne({ user_phone: data.phone, date: data.date }, habitList)
        res.json({
          code: 200,
          msg: "add success"
        })
      } catch (error) {
        res.json({
          code: 4444,
          msg: "add fail" + errror
        })
      }
    }
  }
}

/**
 * 
 * @param {*} req [phone,date,timeIndex,taskIndex] 
 * @param {*} res 
 */
const removeHabit = async (req, res) => {
  const data = req.body;
  const phone = data.phone;
  const date = data.date;
  const timeIndex = data.timeIndex;
  const taskIndex = data.taskIndex;
  if (!phone || !date || timeIndex == null || taskIndex == null) {
    console.log('0000000000000000000000000000000');
    res.json({
      code: 4000,
      msg: "params wrong"
    })
    return;
  }
  const habitList = await Habit.findOne({ user_phone: phone, date: date })
  if (!habitList) {
    res.json({
      code: 4000,
      msg: "date error"
    })
  }
  else {
    console.log('---------------------');
    try {
      if (timeIndex < habitList.tasks.length && taskIndex < habitList.tasks[timeIndex].item.length) {
        habitList.tasks[timeIndex].item.splice(taskIndex, 1);
        await Habit.replaceOne({ user_phone: phone, date: date }, habitList)
        res.json({
          code: 200,
          msg: "remove success"
        })
      } else {
        throw new Error("index wrong")
      }
    } catch (error) {
      res.json({
        code: 4444,
        msg: "remove fail:" + errror
      })
    }
  }


}

exports.findOneDayHabit = findOneDayHabit;
exports.addHabit        = addHabit;
exports.removeHabit     = removeHabit;