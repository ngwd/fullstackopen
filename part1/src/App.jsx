const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  };

  const Header = (props)=>(<h1>{props.course.name}</h1>)
  const Content = (props)=> {
    const {_, parts} = props.course;
    const contents = parts.map((part) => (<p key={part.name}>{part.name} {part.exercises}</p>));
    return <div> {contents} </div>;
  } 
  const Total = (props)=>{
    const {_, parts} = props.course;
    const t = parts.reduce((acc, item)=>acc+item.exercises, 0);
    return <p>Number of exercises {t} </p>;
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App