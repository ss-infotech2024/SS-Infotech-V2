import dotenv from "dotenv";
dotenv.config();

export const adminLogin = (req, res) => {
  console.log("Req body:", req.body);
  console.log("Env:", process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);

  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({ success: true, token: process.env.ADMIN_TOKEN });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
};
