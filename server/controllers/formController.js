const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const multer = require("multer");

const form = async (req, res) => {
  try {
    const header = req.headers.authorization;
    const { tcNo, adSoyad, facultySelect, departmentSelect } = req.body;
    const { path } = req.file;
    console.log(tcNo, adSoyad, facultySelect, departmentSelect, path);
    console.log(req.tcNo);
<<<<<<< HEAD

=======
    // if (header) {

    // } else {
    //   return res.status(500).json({
    //     error: true,
    //     message: "Invalid token",
    //   });
    // }
    // console.log(token);
>>>>>>> 2abcdf1271d9face8309d4b6ab7aec05b4e29967
    if (
      !tcNo ||
      !adSoyad ||
      !facultySelect ||
      !departmentSelect ||
      !path ||
      !header
    ) {
      return res.status(400).json({
        error: true,
        message: "Form gönderilirken hata oluştu.",
      });
    } else if (req.tcNo != tcNo) {
<<<<<<< HEAD
      return res.status(401).json({
=======
      return res.status(403).json({
>>>>>>> 2abcdf1271d9face8309d4b6ab7aec05b4e29967
        error: true,
        message: "T.C. Kimlik Numaranız Form verisiyle uyuşmuyor.",
      });
    } else {
      const tokenDecode = jwt.decode(header);
      const role = tokenDecode.role;
      const newFormEntry = await prisma.uploadform.create({
        data: {
          role,
          tcNo,
          adSoyad,
          facultySelect,
          departmentSelect,
          fileUpload: path,
        },
      });
      return res.status(200).json({
        error: false,
        message: "İşleminiz başarıyla gerçekleştirilmiştir.",
        data: newFormEntry,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Form gönderimi başarısız!");
  }
};

const getFormData = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({
        error: true,
        message: "İşlem gerçekleştirilemedi.",
      });
    } else {
      const data = await prisma.uploadform.findMany({
        where: {
          role: role,
        },
      });
      return res.status(202).json({
        data,
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err,
    });
  }
};

module.exports = {
  form,
  getFormData,
};
