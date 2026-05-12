const app = require("./app.js");
const ENV = require("./config/Env.js");

// PORT
const PORT = ENV.PORT || 8000;

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
