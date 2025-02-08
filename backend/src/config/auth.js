module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-here',
  jwtExpires: '24h'
};