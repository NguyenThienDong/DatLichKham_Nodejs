const getHomePage = (req, res) => {
  return res.render("home");
};

const getAboutPage = (req, res) => {
  return res.render("test/about");
};

module.exports = {
  getHomePage,
  getAboutPage,
};
