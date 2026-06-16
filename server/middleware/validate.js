exports.validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || username.length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters' });
  }
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }
  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  next();
};