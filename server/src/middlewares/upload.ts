import fs from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const pathStorage = `${__dirname}/../storage/201020831`;
		fs.mkdirSync(pathStorage, { recursive: true });
		cb(null, pathStorage);
	},
	filename: (req, file, cb) => {
		// TODO: mi-cv.pdf mi-foto.png mi-video.mp4
		const ext = file.originalname.split('.').pop();
		const filename = `${file.originalname.split('.').shift()}.${ext}`;
		cb(null, filename);
	},
});

const upload = multer({ storage });

export { upload };
