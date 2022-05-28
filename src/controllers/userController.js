import userService from '../services/userService';

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        code: 1,
        message: 'Invalid email or password'
      });
    }
    let data = await userService.handleUserLogin(email, password);
    return res.status(200).json({
      code: data.code,
      message: data.message,
      data: data.data ? data.data : {}
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleLogin
};
