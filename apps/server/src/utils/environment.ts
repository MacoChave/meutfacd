if (process.env.NODE_ENV !== undefined) {
	console.log('👉 Loading environment variables', process.env.NODE_ENV);
	require('dotenv').config({ path: '.env' });
} else {
	console.error('❌ NODE_ENV is undefined');
	require('dotenv').config({ path: '.env.development.local' });
}
// if (process.env.NODE_ENV.includes('test')) {
// 	require('dotenv').config({ path: '.env.test.local' });
// } else {
// 	require('dotenv').config({ path: '.env.development.local' });
// }
