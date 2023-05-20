const express = require("express");
const router = express.Router();
const { json } = require("express");
const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authController = require("../controllers/authController.js");
const formController = require("../controllers/formController.js");
const userController = require("../controllers/userController.js");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/users", authController.userAuth, async (req, res) => {
  const oku = req.cookies;
  console.log("^burada");
  console.log(oku);
  // const token = req.cookies.access_token;
  // if (token) {
  //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //     if (err) {
  //       res.status(401).send("Invalid or expired token");
  //     } else {
  //       res.send("Protected resource accessed");
  //     }
  //   });
  // } else {
  //   res.status(401).send("Token not found.");
  // }
  const users = await prisma.users.findMany();
  res.json(users);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        String(file.originalname.split(".")[1])
    );
  },
});

const upload = multer({ storage: storage });

router.get("/cookie", async (req, res) => {
  res.setHeader("benim-cookie", "token");
  res.cookie("set-cookie", "foo=bar", 200);
  return res.json({
    message: "Çerez kaydedildi",
  });
});

router.get("/welcome", async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "../client/files.html"));
});
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post(
  "/upload-form",
  authController.userAuth,
  upload.single("files"),
  formController.form
);
router.post("/form-data", authController.userAuth, formController.getFormData);
router.post(
  "/change-password",
  authController.userAuth,
  userController.ResetPassword
);
module.exports = router;
