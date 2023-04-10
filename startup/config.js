const config = require("config");

module.exports = () => {
    if (!config.get("jwtPrivateKey")) {
        throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
    }

    if (!config.get("fileUploadPath")) {
        throw new Error("FATAL ERROR: fileUploadPath is not defined.");
    }
}