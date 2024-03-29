var express = require('express');
const multer = require('multer');

var router = express.Router();
var register = require('../controller/regcontroller');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({ storage: storage })
/* GET home page. */
router.post('/',upload.single('description'),register.insert);
router.get('/register',register.get_data);

router.get('/delete/:id',register.delete_data);
router.post('/update/:id',register.update_data);

// router.post('/login',register.login);
// router.get('/logout',register.logout);

module.exports = router;

