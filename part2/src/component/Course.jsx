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
}
export default Course 