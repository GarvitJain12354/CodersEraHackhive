const express = require("express");
const {
  homepage,
  login,
  signin,
  signout,
  studentData,
  sendMail,
  changePassword,
  resetPassword,
  getLocation,
  uploadCsv,
  getDevice
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/", homepage);
// user data
router.get("/user", isAuthenticated, studentData);
// login
router.post("/login", login);
// POST signIn
router.post("/signin", signin);
// POST SIGNOUT
router.post("/signout", isAuthenticated, signout);
// for forget send mail POST
router.post("/internstudent/sendmail", sendMail);
// password changed
router.post("/forgetlink/:id", changePassword);
// reset password
router.post("/reset/password", isAuthenticated, resetPassword);
router.post("/get/getlocation",getLocation);
// Save Data 
router.post("/upload/data",uploadCsv);
router.get("/device/:id",getDevice)
module.exports = router;
