import bcrypt from "bcryptjs";
import User from "../models/User";

const seedDefaultAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name: process.env.ADMIN_NAME || "Admin User",
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log(`Seeded default admin: ${email}`);
};

export default seedDefaultAdmin;
