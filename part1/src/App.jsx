const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  const Header = (props)=>(<h1>{props.course}</h1>)
  const Content = ()=> {
    const contents = parts.map((part) => (<p key={part.name}>{part.name} {part.exercises}</p>));
    return <div> {contents} </div>;
  } 
  const Total = ()=>{
    const t = parts.reduce((acc, item)=>acc+item.exercises, 0);
    return <p>Number of exercises {t} </p>;
  }

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total />
    </div>
  )
}

export default App