import { useState } from 'react'
import Select from 'react-select'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, SET_AUTHOR_BORN } from './queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  const [ setAuthorBorn ] = useMutation(SET_AUTHOR_BORN, {
    refetchQueries: () => [{query: ALL_AUTHORS, variables: {refreshCache: false}}],
    awaitRefetchQueries: true,
    onError: (error) => {
      const msg = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(msg)
    }
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors
  const authorNames = result.data.allAuthors.map(a => ({value:a.name, label:a.name}))

  const updateAuthor = (e)=> {
    e.preventDefault()
    const intBorn = parseInt(born, 10)
    const newObj = { name: selectedAuthor.value, born: intBorn }
    // console.log(newObj)
    setAuthorBorn({variables: newObj})
    setName('')
    setBorn('')
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={updateAuthor}>
        <h2>Set birthyear</h2>
        <div>
          <Select defaultValue={selectedAuthor} onChange={ setSelectedAuthor } options={authorNames} />
        </div>
        <p>born <input type='number' value={born} onChange={({ target }) => setBorn(target.value)}/></p>
        <button type='submit'>udpate author</button>
      </form>
    </div>
  )
}

export default Authors
