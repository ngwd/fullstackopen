import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import Blog from './Blog'

test('renders blog', ()=> {
  const blog = {
    title:'Component testing is done with react-testing-library',
    author:'Juichiro Koizumi',
    url:'http://jindx.com',
    likes: 10,
    user: '6577580dc5bbebfd7ead8a40'
  }

  const upVote = jest.fn()
  const remove = jest.fn()

  const { container } = render(<Blog key='5023234' blog={blog} removable={true} upVote={upVote} remove={remove} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('view')

  // const element = screen.getByText('Component testing is done with react-testing-library')
  // expect(element).toBeDefined()
})