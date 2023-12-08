const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const t = blogs.reduce((total, cur)=>total + cur.likes, 0)
  return t
}
const favoriteBlog=(blogs) => {
  let pos = 0;
  let likes = -1;
  for(let i = 0; i < blogs.length; ++i) {
    if (blogs[i].likes > likes) {
      pos = i;
      likes = blogs[i].likes; 
    }
  }
  const {title, author} = blogs[pos];
  return {title, author, likes};
}

const mostBlogs = (blogs)=> {
  const count = {};
  let result = {author:"", blogs:-1};
  blogs.forEach(blog => {
    count[blog.author] = (count[blog.author] ?? 0) + 1;
    if (count[blog.author] > result.blogs) {
      result = {
        author: blog.author, 
        blogs: count[blog.author]
      }
    }
  })
  return result
}

const mostLikes = (blogs)=>{
  const authorLikes = {}
  let result = {author:"", likes:-1}
  for(i in blogs) {
    let {author, likes} = blogs[i]
    authorLikes[author] = likes + (authorLikes[author] || 0) 
    likes = authorLikes[author] 
    if (likes > result.likes) {
      result = {author, likes}
    }
  }
  return result;
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}