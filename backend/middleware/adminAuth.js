// middleware/adminAuth.js
import dotenv from 'dotenv';
dotenv.config();
export const adminAuth = (req, res, next) => {
  const token = req.headers["x-admin-token"];
  const expectedToken = process.env.ADMIN_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  next();
};


