const jwt = require("jsonwebtoken");
const CustomApiError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(`Bearer `)) {
    throw new CustomApiError("No token provided", 401);
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const { id, username } = decoded;
    req.user = { id, username };
  } catch (error) {
    throw new CustomApiError("Not authorize to access this route", 401);
  }

  next();
};

module.exports = authenticationMiddleware;
