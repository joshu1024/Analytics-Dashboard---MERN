import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    // Extract token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" }); // return stops execution
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    next(); // proceed to next middleware
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

export default protect;
