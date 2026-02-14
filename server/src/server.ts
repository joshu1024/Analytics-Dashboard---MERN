import "dotenv/config";

import app from"./app"
import connectToDB from"./config/connectToDB"

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server running at ${PORT}`);
});
