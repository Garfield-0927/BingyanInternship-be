const express = require('express');
const router = express.Router();
const userController = require("./controller/user");
const habitController = require("./controller/habit")

router.get('/checkLogin', userController.checklogin)
router.post('/register', userController.createUser)
router.post("/login", userController.UserLogin)


/* Mid Wares */
// intercept all requests without session
router.use((req,res,next)=>{
	//比较cookie和session
	if(req.cookies['phone'] && req.session['phone'] && req.cookies['phone'] === req.session['phone']){
		//相同，则视为已登录状态，跳到下一个中间件
		next()
	}else{
		//不同，则未登录，拦截请求，直接返回错误值。
		res.json({
      code: 4002,
      msg:"未登录"
    })
	}
})

router.post('/getOneDayHabit', habitController.findOneDayHabit)
router.post('/addHabit', habitController.addHabit)
router.post('/removeHabit', habitController.removeHabit)
module.exports = router;