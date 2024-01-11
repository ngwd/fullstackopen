const jwt = require('jsonwebtoken')
const users = [
  {
    _id: "6577580dc5bbebfd7ead8a40",
    userName: "ngwd",
    name: "wuedak ng",
    blogs: [ 
      "5a422a851b54a676234d17f7",
      "5a422b891b54a676234d17fa",
    ],
    __v: 0
  },
  {
    _id: "6577580dc5bbebfd7ead8a50",
    userName: "chai",
    name: "Cohen Hainen",
    blogs: [ 
      "5a422ba71b54a676234d17fb",
      "5a422aa71b54a676234d17f8",
    ],
    __v: 0
  },
  {
    _id: "6577580dc5bbebfd7ead8a70",
    userName: "vlog",
    name: "Veritas Loginas",
    blogs: [ 
      "5a422b3a1b54a676234d17f9",
      "5a422bc61b54a676234d17fc",
    ],
    __v: 0
  }
]

const newUser = {
  userName:'uitak',
  name:'uitak ng',
  password:'fullstack'
}

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    user: "6577580dc5bbebfd7ead8a40",
    comments:[
      "Wow! exactly what I want.",
      "you cann't find better explaination that this"
    ],
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    user: "6577580dc5bbebfd7ead8a50",
    likes: 5,
    comments:[
      "2222 Wow! exactly what I want.",
      "LT6666, you cann't find better explaination that this"
    ],
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    comments:[
      "1111 Wow! exactly what I want.",
      "7777, you cann't find better explaination that this"
    ],
    user: "6577580dc5bbebfd7ead8a70",
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    user: "6577580dc5bbebfd7ead8a40",
    likes: 10,
    comments:[
      "239204923-4, you cann't find better explaination that this",
      "1111 Wow! exactly what I want.",
    ],
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    user: "6577580dc5bbebfd7ead8a50",
    likes: 0,
    comments:[
      "232sdfrwe2ewr32-4, you cann't find better explaination that this",
      "3293489 Wow! exactly what I want.",
    ],
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    user: "6577580dc5bbebfd7ead8a70",
    likes: 2,
    comments:[
      "ewerwerewr2323-4, you cann't find better explaination that this",
      "3293489 Wow! exactly what I want.",
    ],
    __v: 0
  }  
]


const userInDB = async ()=>{
  const users = await User.find({})
  return users.map(u=>u.toJSON())
}

const getToken = (userName, id) => {
  console.log("user Name ", userName, " id ", id)
  const userForToken = {
    userName,
    id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  return token
}

module.exports={blogs, users, newUser, getToken, userInDB}