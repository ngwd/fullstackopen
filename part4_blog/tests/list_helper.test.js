const listHelper = require('../utils/list_helper')
const blogs = require('./test_helper')

describe('list_helper test', ()=>{
  test('dummy returns one', () => {
    const blogss = []

    const result = listHelper.dummy(blogss)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blogs', ()=>{
  test('favoriteBlogs', ()=>{
    const result = listHelper.favoriteBlog(blogs)

    const expect_fb = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    expect(result).toEqual(expect_fb)
  })
})
describe('most blogs', ()=>{
  test('mostBlogs', ()=>{
    const result = listHelper.mostBlogs(blogs)
    const expect_result = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(result).toEqual(expect_result) 
  })
})
describe('most likes', ()=>{
  test('mostLikes', ()=>{
    const result = listHelper.mostLikes(blogs)
    const expect_result = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(result).toEqual(expect_result) 
  })
})