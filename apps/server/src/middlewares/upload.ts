// import fs from 'fs';
// import multer from 'multer';
// import { logger } from '../utils/logger';

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		logger({
// 			dirname: __dirname,
// 			proc: 'upload_destination',
// 			message: req.user,
// 		});
// 		const pathStorage = `${__dirname}/../storage/drafts`;
// 		fs.mkdirSync(pathStorage, { recursive: true });
// 		cb(null, pathStorage);
// 	},
// 	filename: (req, file, cb) => {
// 		logger({
// 			dirname: __dirname,
// 			proc: 'upload_filename',
// 			message: file.path,
// 		});
// 		const ext = file.originalname.split('.').pop();
// 		const filename = `${file.originalname.split('.').shift()}.${ext}`;
// 		cb(null, filename);
// 	},
// });

// const upload = multer({ storage });

// export { upload };
