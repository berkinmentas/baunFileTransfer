const { PrismaClient } = require("@prisma/client");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const ResetPassword = async (req, res) => {
  try {
    const header = req.headers.authorization;
    const authDecode = jwt.decode(header);
    const tc = authDecode.tcNo;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userData = await prisma.users.findFirst({
      where: {
        tcno: tc,
      },
    });
    const passwordCheck = await bcrypt.compare(
      currentPassword,
      userData.password
    );
    const comparePass = await bcrypt.compare(newPassword, userData.password);
    console.log(comparePass);
    const hashPassword = await bcrypt.hash(newPassword, 10);

    if (!passwordCheck) {
      return res.status(400).json({
        error: true,
        message: "Mevcut şifrenizi yanlış giriniz.",
      });
    }
    if (confirmPassword != newPassword) {
      return res.status(400).json({
        error: true,
        message: "Şifreler eşleşmiyor.",
      });
    }
    if (comparePass) {
      return res.status(400).json({
        error: true,
        message: "Lütfen mevcut şifrenizden farklı bir şifre giriniz.",
      });
    } else {
      console.log("burada");

      // const updatePassword = await prisma.users.update({
      //   where: { role: "bolumbsk" },
      //   data: { password: "hashPassword" },
      // });
      const updatePassword = await prisma.users.updateMany({
        where: {
          tcno: tc,
        },
        data: {
          password: hashPassword,
        },
      });
      console.log("şimdiburda");
      return res.status(202).json({
        error: false,
        message: "Şifreniz başarıyla güncellenmiştir.",
        data: updatePassword,
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Bir sorun oluştu.",
      data: err,
    });
  }
};

module.exports = {
  ResetPassword,
};
