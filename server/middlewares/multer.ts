import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/');
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null, true);
        return;
    };
    cb(new Error('Core::Multer::UnsupportedMimetype'), false);
};

const limits = {
    fileSize: 1024 * 1024 * 20 
};

const upload = multer({ storage, fileFilter, limits });

export default upload;