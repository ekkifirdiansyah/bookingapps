const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set storage engine
const storage = multer.diskStorage({
    destination: "public/images",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploadSingle = multer({
    storage: storage,
    // limits: { filesize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFiletype(file, cb);
    },
}).single("image");

const storageMultiple = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = "public/images";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploadMultiple = multer({
    storage: storageMultiple,
    fileFilter: function (req, file, cb) {
        checkFiletype(file, cb);
    },
}).array("image");

// Check file Type
function checkFiletype(file, cb) {
    // Allowed ext
    const fileTypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check mine
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: Image Only !!!");
    }
}

module.exports = {
    uploadSingle,
    uploadMultiple
};