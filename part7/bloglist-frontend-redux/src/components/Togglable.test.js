import React from 'react'
import '@testing-library/jest-dom' 
import { render, screen } from '@testing-library/react' 
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', ()=> {
  let container
  const text = 'toggle content'
  beforeEach (() => {
    container = render(
      <Togglable buttonLabel="create new blog">
        <div className='testDiv'>
          {text}
        </div>
      </Togglable>
    ).container 
  })

  test('renders its children', async() => {
    await screen.findAllByText(text)
  })

  test('at the start, the children not displayed', async() => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children displayed', async() => {
    const user = userEvent.setup()
    const button = screen.getByText('create new blog')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})