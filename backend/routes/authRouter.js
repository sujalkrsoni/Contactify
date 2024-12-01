const { register, login } = require("../controller/authController");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/authValidation");

const router = require("express").Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;
