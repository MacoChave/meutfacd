import cron from 'node-cron';

// Update users within profile schedule work configured
cron.schedule('0 0 22 1/1 * ? *', () => {
	console.log('running a task daily at 10:00 PM');
});

// Check works that are due for the day
cron.schedule('0 0 8 1/1 * ? *', () => {
	console.log('running a task daily at 8:00 AM');
});
