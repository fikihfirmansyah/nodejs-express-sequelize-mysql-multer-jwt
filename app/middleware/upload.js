const multer = require("multer");
const rootDir = require('path').resolve('./');

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, rootDir + "/public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-united-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
