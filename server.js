// const logger = require("./startup/logger");
const express = require("express");
const app = express();

// require("dotenv").config();
// require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);
// require("./startup/sync")();

const port = 3000 ;//process.env.PORT || 3000;
app.listen(port, () => {
    console.log({important: true, message: `server listening on port ${port}`})
    // logger.info({important: true, message: `server listening on port ${port}`});
});

