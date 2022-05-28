import bcrypt from 'bcryptjs';
import db from '../models';
import multer from 'multer';

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkExistUser(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          raw: true,
          attributes: {
            exclude: [''] // bỏ 1 số  key năm trong exclude
          }
        });
        console.log(password, user.password);
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          console.log(check);
          if (check) {
            userData.code = 0;
            userData.message = 'ok';
            delete user.password;
            console.log(user);
            userData.data = user;
          } else {
            userData.code = 1;
            userData.message = 'Password not wrong';
          }
        } else {
          userData.code = 1;
          userData.message = 'User not found';
        }
      } else {
        userData.code = 1;
        userData.message = 'User not found';
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const checkExistUser = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findOne({
        where: { email }
      });
      data ? resolve(true) : resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

const uploadFile = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      var storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, __basedir + '/uploads/');
        },
        filename: (req, file, cb) => {
          console.log(file.originalname);
          cb(null, `${Date.now()}-${file.originalname}`);
        }
      });
      var uploadFile = multer({ storage: storage });
      resolve(uploadFile);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { handleUserLogin, uploadFile };
