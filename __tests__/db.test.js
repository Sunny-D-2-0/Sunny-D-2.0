const User = require('../server/userModel.js');
const mongoose = require('mongoose');

// // Define the MongoDB connection URI for the test database
const MONGODB_URI = 'mongodb+srv://pj:cs39@cluster.kkyleu9.mongodb.net/?retryWrites=true&w=majority';

// Connect to the test database
describe('db unit tests', () => {
	beforeAll(async () => {
		await mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	});

	afterAll(async () => {
		await User.deleteMany({});
	});

	it('should create a user in database', async () => {
		const user = await User.create({ name: 'aaaa', username: 'aaaa', password: 'aaaa', days: [{ date: 'Wed Mar 29 2023', points: 0, activities: [{ name: 'Walking', time: 30 }] }] });
		expect(user.name).toBe('aaaa');
		expect(user.username).toBe('aaaa');
		expect(user.password).not.toBe('aaaa');
		expect(user.days[0].date).toBe('Wed Mar 29 2023');
		expect(user.days[0].points).toBe(0)
		expect(user.days[0].activities[0].name).toBe('Walking');
		expect(user.days[0].activities[0].time).toBe(30);
	});

	it('should find a user in database', async () => {
		const user = await User.findOne({ username: 'aaaa' });
		expect(user.name).toBe('aaaa');
		expect(user.username).toBe('aaaa');
		expect(user.password).not.toBe('aaaa');
		expect(user.days[0].date).toBe('Wed Mar 29 2023');
		expect(user.days[0].points).toBe(0)
		expect(user.days[0].activities[0].name).toBe('Walking');
		expect(user.days[0].activities[0].time).toBe(30);
	});

	it('should update a user\'s points in database', async () => {
		const user = await User.findOneAndUpdate({ username: 'aaaa' }, { $set: { ['days.0.points']: 20 } }, {new: true});
		expect(user.username).toBe('aaaa');
		expect(user.days[0].points).toBe(20);
	});

	it('should update a user\'s activities in database', async () => {
		const user = await User.findOneAndUpdate({ username: 'aaaa' }, { $set: { ['days.0.activities']: [{name: 'Walking', time: 20}] } }, {new: true});
		expect(user.username).toBe('aaaa');
		expect(user.days[0].activities[0].name).toBe('Walking');
		expect(user.days[0].activities[0].time).toBe(20);
	});
})