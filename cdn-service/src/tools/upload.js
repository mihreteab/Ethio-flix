const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export default async function uploadFile(req, res) {
  let upload = multer({
    storage: storage,
  }).single("movie_file");

  upload(req, res, function (err) {

  console.log("file",req);
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    if (!req.file) {
      return 0;
    } else if (err instanceof multer.MulterError) {
      return 0;
    } else if (err) {
     return 0;
    }

    // Display uploaded image for user validation
    return {
      path: file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    };
  });
}
