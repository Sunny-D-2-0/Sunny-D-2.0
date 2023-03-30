// app.test.js
const request = require('supertest');
const server = 'http://localhost:3000';


describe('Route integration', () => {
	describe('/', () => {
		describe('GET', () => {
			it('responds with 200 status and text/html content type', () => {
				return request(server)
					.get('/')
					.expect('Content-Type', /text\/html/)
					.expect(200);
			});
		});
	});

	describe('/api', () => {

		describe('/signup', () => {
			it('responds with 200 status and application/json content type', () => {
				return request(server)
					.post('/api/signup')
					.send({ name: 'new2', username: 'new2', password: 'new2' })
					.expect('Content-Type', /application\/json/)
					.expect(200);
			});
		});

		describe('/login', () => {
			it('responds with 200 status and application/json content type', () => {
				return request(server)
					.post('/api/login')
					.send({ username: 'new2', password: 'new2' })
					.expect('Content-Type', /application\/json/)
					.expect(200);
			});
		});

		describe('/update', () => {
			it('responds with 200 status', () => {
				return request(server)
					.patch('/api/update')
					.send({ username: 'new2', points: '20', activity: { activity: 'Walk', time: 30 } })
					.expect(200);
			});
		});
	});
});