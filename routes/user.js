const router = require('express').Router();
const userController = require('../controllers/user');
const UpdateUserValidation = require('../middlewares/validations/UpdateUserValidation');

router.get('/me', userController.getUser);
router.patch('/me', UpdateUserValidation, userController.updateUser);

module.exports = router;
