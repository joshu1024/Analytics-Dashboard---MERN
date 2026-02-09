import "dotenv/config";

import app = require("./app");
import connectToDB = require("./config/connectToDB");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server running at ${PORT}`);
});
