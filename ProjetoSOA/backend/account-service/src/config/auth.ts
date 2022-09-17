export default {
  secret: process.env.APP_SECRET || "secret",
  expiresIn: 60 * 60 * 24 * 7
};
