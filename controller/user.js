const { Cookie } = require('express-session');
const mongoose = require('mongoose');
const UserSchema = require('../models/user')
const User = mongoose.model('User');




// register api
const createUser = async (req, res) => {
  const user = new User(req.body)
  // 传参错误
  if (!user.phone || !user.password) {
    res.json({
      code: 4000,
      msg: "params wrong"
    })
  } else {
    try {
      const result = await user.save()
      res.json({
        code: 200,
        msg: "register success"
      })
    } catch (error) {
      // 异常处理
      res.json({
        code: 4444,
        msg: "database error: " + error
      })
    }

  }
}
// login api
const UserLogin = (req, res)=>{
  const user = req.body;
  // 传参错误
  if (!user.phone || !user.password) {
    res.json({
      code: 4000,
      msg: "params wrong"
    })
  } else {
    try {
      User.findOne(user, (err, userInfo)=>{
        if(!userInfo){
          res.json({
            code: 4001,
            msg: "username or password incorrect"
          })
          return ;
        }
        req.session['phone'] = userInfo.phone;
        res.cookie('phone', userInfo.phone, { maxAge: 60*60*1000 });
        res.json({
          code: 200,
          msg: "login success",
          userInfo: userInfo
        })
      })
    } catch (error) {
      res.json({
        code: 4444,
        msg: "database error: " + error
      })
    } 
  }
}
// check login api
const checklogin = (req, res)=>{
	//比较cookie和session
	if(req.cookies['phone'] && req.session['phone'] && req.cookies['phone'] === req.session['phone']){
		res.json({
      code: 200,
      isLogin: true,
      phone: req.session['phone']
    })
	}else{
		res.json({
      code: 200,
      isLogin: false,
    })
	}
}


exports.createUser = createUser;
exports.UserLogin  = UserLogin;
exports.checklogin = checklogin;