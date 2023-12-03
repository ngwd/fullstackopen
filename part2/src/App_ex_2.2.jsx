const Course = ({course})=>{
  const {name, parts} = course;
  const sum = parts.reduce((acc, curr)=>acc+curr.exercises, 0)
  return (
    <div>
      <h2>{name}</h2>
      {
        parts.map((part)=>(
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        ))
      }
      <p>total of {sum} exercises</p>
    </div>
  );
};
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  return <Course course={course} />
}

export default App