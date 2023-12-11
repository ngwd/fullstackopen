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
    const user = new User({username: 'root', passwordHash})
    await user.save()
    /*
    const userObjs = helper.users.map(user=>new User(user))
    const promiseArray = userObjs.map(user=>user.save())
    await Promise.all(promiseArray)
    */
  })
  test('creation succeeds with a fresh username', async()=>{
    const user0 = await helper.userInDB();
    const newUser = {
      userName:'ngwd',
      name:'wuedak ng',
      password:'fullstack'
    } 

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const user1 = await helper.userInDB()
    expect(user1).toHaveLength(user0.length+1)
    
    const userNames = user1.map(u=>u.userName)
    expect(userNames).toContain(newUser.userName)
  })

  afterAll(async ()=> {
    await mongoose.connection.close()
  })
})