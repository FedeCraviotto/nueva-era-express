const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users');
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});

const uploadFile = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileData = file;
        const validExt = ['.jpg', '.png', '.jpeg'];

        if (fileData) {
            const fileExt = (path.extname(fileData.originalname)).toLowerCase();
            if (!validExt.includes(fileExt)) {
                req.isInvalidExt = true;
                return cb(null, false);
            } else {
                return cb(null, true);
            }
        }
        return cb(null, false);
    },
});

module.exports = uploadFile;
