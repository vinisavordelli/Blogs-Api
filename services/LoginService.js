const { User } = require('../models');
const { createJWT } = require('../helpers/auth');

const login = async (data) => {
    const { email, password } = data;
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return ({ err: { message: 'Invalid fields' } });
    }
    const token = createJWT(user);
    return { token };
};

module.exports = {
  login,
};