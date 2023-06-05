console.log('> Loading environment variables', process.env.NODE_ENV);

if (process.env.NODE_ENV.includes('production')) {
	require('dotenv').config({ path: '.env.production' });
} else {
	require('dotenv').config({ path: '.env.development' });
}
