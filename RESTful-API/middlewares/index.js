const fs = require("fs");

const logReqRes = (filname) => {

    //using closures
    return (req, res, next) => {
        fs.appendFile(filname, 
            `${new Date().toISOString()} - ${req.ip} ${req.method}: ${req.path}\n`,
            (err, data) => {
                next();
        });
    };
};

module.exports = { logReqRes };