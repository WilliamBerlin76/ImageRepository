const {v4: uuidv4} = require("uuid");

module.exports = (fileName) => {
    let file = fileName.split('.');
    let fname = `${uuidv4()}.${file[file.length - 1]}`;
    return fname;
};