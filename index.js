const app = require("./app");
const dotenv = require("dotenv");

const connectDataBase = require("./config/database");

dotenv.config({ path: "config/config.env" });

connectDataBase();

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});
