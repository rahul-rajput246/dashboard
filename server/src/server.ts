import dotenv from "dotenv";
import app from "./app";
import connectDB, { disconnectDB } from "./config/db";
import seedDefaultAdmin from "./utils/seedDefaultAdmin";

dotenv.config();

const startServer = async () => {
  await connectDB();
  await seedDefaultAdmin();

  const port = Number(process.env.PORT) || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

void startServer();

process.on("SIGINT", () => {
  void disconnectDB().finally(() => process.exit(0));
});
