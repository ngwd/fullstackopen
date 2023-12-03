const Course = ({course})=>{
  const {name, parts} = course;
  const sum = parts.reduce((acc, curr)=>acc+curr.exercises, 0)
  const courseItems = parts.map(
    (part)=>(
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    ));
  return (
    <>
      <h2>{name}</h2>
      {courseItems}
      <p><b>total of {sum} exercises</b></p>
    </>
  );
};
const Courses=({courses})=>{
  return (
    <div>
      <h1>Web development curriculum</h1>
      {
        courses.map(course=><Course key={course.id} course={course}/>)
      }
    </div>
  );
};
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ] 
  return <Courses courses={courses} />
}

export default App
