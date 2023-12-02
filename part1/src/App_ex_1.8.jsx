import { useState } from 'react'

const Button = ({clickHandler, text})=> (<button onClick={clickHandler}> {text} </button>);
const Display = ({text, count}) =>(<p>{text} {count} </p>);
const Statistics = ({good, neutral, bad}) => {
  const total = ()=>(good+bad+neutral);
  const average = ()=>((good-bad)/total());
  const positivePercent = ()=>(good/total());
  return (
    <>
    <h2>Statistics</h2>
    <Display text='good' count={good}/>
    <Display text='neutral' count={neutral}/>
    <Display text='bad' count={bad}/>

    <Display text='all' count={total()}/>
    <Display text='average' count={average()}/>
    <Display text='positive' count={positivePercent()}/>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  const positiveClick = ()=> setGood(good+1);
  const negativeClick = ()=> setBad(bad+1);
  const neutralClick  = ()=> setNeutral(neutral+1);

  return (
    <div>
      <h2>Give feedback</h2>
      <Button clickHandler={positiveClick} text='good' />
      <Button clickHandler={neutralClick}  text='neutral' />
      <Button clickHandler={negativeClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App