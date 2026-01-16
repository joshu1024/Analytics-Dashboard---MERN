export const adminsOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    console.log("Unauthorised - only admins allowed");
  }
};
