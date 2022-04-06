const request = require('supertest');
const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

describe(' Launches API', () => {
  beforeAll( async () => {
    await mongoConnect();
  });

  afterAll( async() => {
    await mongoDisconnect();
  });

  describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);      
    })
  })
  
  describe('Test POST /launc', () => {  
    const completeLaunchData = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
      launchDate: 'January 4,2028',
    };
  
    const launchDataWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
    };
  
    const launchDataWithInvalidDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
      launchDate: 'toast',
    }
  
    test('It should respond with 201 created', async () => {
      const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);
      
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);
  
      expect(response.body).toMatchObject(launchDataWithoutDate)
    })
  
    test('Should catch missing required properties', async () => {
      const respone = await request(app)
        .post('/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);
  
      expect(respone.body).toStrictEqual({
        error: 'Missing needed data.'
      })
    })
  
    test('Should catch invalid dates', async () => {
      const respone = await request(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400);
  
    expect(respone.body).toStrictEqual({
      error: 'Invalid Launch Date'
    })
    })
  })
})