import crudService from '../services/crudService';
const db = require('../models');

const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render('home', {
      data: JSON.stringify(data)
    });
  } catch (err) {
    console.log({ err });
  }
};

const getAboutPage = (req, res) => {
  return res.render('test/about');
};

const getCRUD = (req, res) => {
  return res.render('curd');
};

const postCRUD = async (req, res) => {
  await crudService.createNewUser(req.body);
  return res.redirect('/get-crud');
};

const displayGetCrud = async (req, res) => {
  let data = await crudService.getAllUser();
  return res.render('getCrud', { data });
};

const getUserById = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let user = await crudService.getUserById(userId);
    if (user.email) {
      return res.render('editCrud', {
        user
      });
    } else {
      return res.send('User not found');
    }
  } else {
    return res.send('User not found');
  }
};

const putCRUD = async (req, res) => {
  let userData = req.body;
  await crudService.updateUserById(userData);
  return res.redirect('get-crud');
};

const deleteUserById = async (req, res) => {
  await crudService.deleteUserById(req.query.id);
  return res.redirect('get-crud');
};

module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  displayGetCrud,
  getUserById,
  putCRUD,
  deleteUserById
};
