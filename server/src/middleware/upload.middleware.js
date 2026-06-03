import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
  if (acceptedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

export const mediaUpload = multer({
  storage,
  limits: { fileSize: 7 * 1024 * 1024 },
  fileFilter,
});

export const projectUploads = multer({
  storage,
  limits: { fileSize: 7 * 1024 * 1024 },
  fileFilter,
}).fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);
