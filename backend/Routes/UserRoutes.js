const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer')
const usercontroller = require('../Controllers/UserController')
router.post('/addnewuser', upload.single('file'),usercontroller.addnewUser)
router.get('/userbyid/:id',usercontroller.getuserbyid)
router.post('/userlogin',usercontroller.userlogin)
module.exports = router