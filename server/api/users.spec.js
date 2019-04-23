// /* global describe beforeEach it */

// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const User = db.model('user')

// describe('User routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/users/', () => {
//     const codysEmail = 'cody@puppybook.com'

//     const userCredentials = {
//         email: codysEmail,
//         password: 'bones',
//         isAdmin:true
//     }
//     let testUser
//     let authenticatedUser
//     beforeEach(async () => {

//       testUser = await User.create(userCredentials)
//       authenticatedUser = await request.agent(app);
//       before(function(done){
//         authenticatedUser
//           .post('/login')
//           .send(userCredentials)
//           .end(function(err, response){
//             expect(response.statusCode).to.equal(200);
//             done();
//           });
//       });
//       // let res = authenticatedUser
//       //   .post('/auth/login')
//       //   .send({email: codysEmail,
//       //     password: 'bones'})
//       //   .expect(200)
//     })

//       it('GET /api/users', async () => {

//        let res = await request(app)
//           .get('/api/users')
//           .expect(200)
//         expect(res.body).to.be.an('array')
//         expect(res.body[0].email).to.be.equal(codysEmail)
//       })

//   }) // end describe('/api/users')
// }) // end describe('User routes')
