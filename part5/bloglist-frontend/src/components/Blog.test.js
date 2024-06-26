import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog', async () => {
  const blog = {
    title:'Component testing is done with react-testing-library',
    author:'Juichiro Koizumi',
    url:'http://jindx.com',
    likes: 10,
    user: '6577580dc5bbebfd7ead8a40'
  }

  const mockUpVoteHandler = jest.fn()
  const remove = jest.fn()

  const { container } = render(<Blog key='5023234' blog={blog} removable={true} upVote={mockUpVoteHandler} remove={remove} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('view')

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(div).toHaveTextContent('like 10')
  expect(div).toHaveTextContent('remove')
  expect(div).toHaveTextContent('hidehttp://jindx.com')

  screen.debug()

  const buttonLike = screen.getByText('like')
  await user.click(buttonLike)
  await user.click(buttonLike)
  expect(mockUpVoteHandler.mock.calls).toHaveLength(2)
  // const element = screen.getByText('Component testing is done with react-testing-library')
  // expect(element).toBeDefined()
})