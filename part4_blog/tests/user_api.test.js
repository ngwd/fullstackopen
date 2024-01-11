const app = require('../app')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)

const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('initial one user in db', ()=> {
  beforeEach(async() =>{
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('s3kr3t', 10)
    const passwordHash1 = await bcrypt.hash(helper.newUser.password, 10)

    const user = new User({userName: 'root', passwordHash})
    const p = user.save()

    const promiseArray = helper.users.map(user=>{
      const u = new User(user)
      // const passwordHash1 = await bcrypt.hash(user.password, 10)
      u.passwordHash = passwordHash1 
      return u.save()
    })
    promiseArray.push(p);
    await Promise.all(promiseArray)
  })
  test ('beforeEach', ()=>{ })
  test('api-user-create0: creation succeeds with a fresh username', async()=>{
    const user0 = await helper.userInDB();
    await api
      .post('/api/users/')
      .send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const user1 = await helper.userInDB()
    expect(user1).toHaveLength(user0.length+1)
    
    const userNames = user1.map(u=>u.userName)
    expect(userNames).toContain(helper.newUser.userName)
  })

  test('api-user-create1: creation failed when user already exist, should fail with proper status code', async ()=> {
    const user0 = await helper.userInDB()
    const newUser = {
      userName: 'root',
      name: 'superuser',
      password: 'laikdswf',
    }
    const res = await api
    // await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    expect(res.body.error).toContain('expected `userName` to be unique')
    const user1 = await helper.userInDB()
    expect(user1).toHaveLength(user0.length)
  })

  test('api-user-create2: password length < 4', async ()=> {
    const user0 = await helper.userInDB()
    const newUser = {
      userName: 'clam',
      name: 'Clam Shaw',
      password: 'lai',
    }
    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    expect(res.body.errorMessage).toContain('password length less than 4')
    const user1 = await helper.userInDB()
    expect(user1).toHaveLength(user0.length)
  })
  afterAll(async ()=> {
    await mongoose.connection.close()
  })
})