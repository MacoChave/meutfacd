console.log('👉 Loading environment variables', process.env.NODE_ENV);

if (process.env.NODE_ENV.includes('production')) {
	require('dotenv').config({ path: '.env' });
}
if (process.env.NODE_ENV.includes('test')) {
	require('dotenv').config({ path: '.env.test.local' });
} else {
	require('dotenv').config({ path: '.env.development.local' });
}
