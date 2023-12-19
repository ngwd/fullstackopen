import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  test('update parent state, and call onSubmit', async () => {
    const newBlog = {
      title: '',
      author: '',
      url: ''
    }
    const handleNewBlogChange = jest.fn()
    const addNew = jest.fn()

    // const spy = jest.spyOn(BlogForm.prototype, 'addNew')
    // const spy = jest.spyOn(console, 'log')

    render(<BlogForm newBlog={newBlog} handleNewBlogUpdate={handleNewBlogChange} addNew={addNew}/>)
    /*
    const inputTitle = screen.getByLabelText('title:')
    const inputAuthor = screen.getByLabelText('author:')
    const inputUrl = screen.getByLabelText('url:')
    */
    const inputs = screen.getAllByRole('textbox')
    const saveButton = screen.getByText('create')

    const user = userEvent.setup()
    await user.type(inputs[0], 'C programming language')
    await user.type(inputs[1], 'Ken Thompson')
    await user.type(inputs[2], 'http://localhost')

    await user.click(saveButton)
    expect(addNew.mock.calls).toHaveLength(1)
  })
})

