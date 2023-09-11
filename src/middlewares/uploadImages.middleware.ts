import multer from "multer";

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_, file, cb) => {
      cb(null, "./public/images");
    },
    filename: (_, file, cb) => {
      cb(null, Date.now().toString() + "_" + file.originalname);
    },
  }),
  fileFilter: (_, file, cb) => {
    const allowedMimeTypes = ["image/jpg", "image/png", "image/jpeg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
