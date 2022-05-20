const db = require("../models");

const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("home", {
      data: JSON.stringify(data),
    });
  } catch (err) {
    console.log({ err });
  }
};

const getAboutPage = (req, res) => {
  return res.render("test/about");
};

module.exports = {
  getHomePage,
  getAboutPage,
};
