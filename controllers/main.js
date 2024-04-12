// check username, password in post(login) request
// if exist create new JWT
// if not send back to frontend

// setup authentication so only the request with JWT can access the dashboard
const jwt = require("jsonwebtoken");
const CustomApiError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomApiError("Please provide email and password", 400);
  }

  // for demonstration only, normally provide dby DB
  const id = new Date().getDate();

  // try to keep payload small for user experience
  // in produciton we use long complex secrets
  // payload - secret - options
  const token = jwt.sign({ id, username }, process.env.JWT_TOKEN, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  //   console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
