const { PrismaClient } = require("@prisma/client");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const cookieParser = require("cookie-parser");

const loginValidationSchema = Joi.object({
  tcno: Joi.string().length(11).required(),
  password: Joi.string().min(4).max(30).required(),
});

// Sırasıyla Anabilim Dalı, kendi Anabilim dalındaki dosyaları,
// fakülte kendi fakültesindeki tüm anabilşmdallarındaki dosyaları,
//  rektörlük tüm fakülte ve ana bilşmdalllarını

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { tcno, password } = req.body;
    const usCheck = await prisma.users.findFirst({
      where: { tcno: tcno },
    });
    if (usCheck) {
      return res.status(405).json({
        error: true,
        message: "Bu T.C. Kimlik numarasıyla zaten bir kayıt mevcut.",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        tcno,
        password: hash,
      },
    });
    res.json({
      error: false,
      message: "Kayıt Başarıyla Oluşturuldu.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Kayıt oluşturulurken bir hata oluştu.",
      error_msg: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { error, value } = loginValidationSchema.validate(req.body);
    const userCheck = await prisma.users.findFirst({
      where: {
        tcno: req.body.tcno,
      },
    });
    if (error) {
      res.status(404).json({
        error: true,
        message: error.message,
      });
      return;
    }
    if (!userCheck) {
      res.status(404).json({
        error: true,
        message: "Kullanıcı adı veya şifre hatalı",
      });
      return;
    }

    const passwordValid = await bcrypt.compare(
      req.body.password,
      userCheck.password
    );
    if (!passwordValid) {
      return res.status(404).json({
        error: true,
        message: "Kullanıcı adı veya şifre hatalı.",
      });
    }
    const token = jwt.sign(
      { role: userCheck.role, tcNo: userCheck.tcno },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("bau_auth_token", token, {
      maxAge: 1000,
      httpOnly: true,
    });
    // res.cookie("token", token, 200);
    //
    // res.setHeader("Authorization", `Bearer ${token}`);

    return res.json({
      error: false,
      message: "Login successful.",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Bir hata oluştu.",
    });
  }
};

const userAuth = async (req, res, next) => {
  // const token = req.cookies.bau_auth_token;
  const token = req.headers.authorization;
  // console.log(token);
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          error: true,
          message: "Invalid token",
        });
      }
      req.role = decoded.role;
      next();
    });
  } catch {
    res.clearCookie("access-token");
    return res.redirect("/login.html");
  }
};

module.exports = {
  register,
  login,
  userAuth,
};
