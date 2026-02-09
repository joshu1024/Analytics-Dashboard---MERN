const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (user, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15d" },
  );

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return token;
};

module.exports = { generateTokenAndSetCookie };
