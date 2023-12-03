import { useState } from 'react'

const Button = ({clickHandler, text})=> (<button onClick={clickHandler}> {text} </button>);
const StatisticLine = ({text, count}) =>(<p>{text} {count} </p>);
const Statistics = ({good, neutral, bad}) => {
  const total = ()=>(good+bad+neutral);
  const average = ()=>((good-bad)/total());
  const positivePercent = ()=>(good/total());
  const t = total();
  if (t===0) {
    return (
      <>
      <h2>Statistics</h2>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
    <h2>Statistics</h2>
    <table>
      <tbody>
        <tr><td key = 'good'>good</td><td>{good}</td></tr>
        <tr><td key = 'neutral'>neutral</td><td>{neutral}</td></tr>
        <tr><td key = 'bad'>bad</td><td>{bad}</td></tr>
        <tr><td key = 'all'>all</td><td>{t}</td></tr>
        <tr><td key = 'average'>average</td><td>{parseFloat(average().toFixed(2))}</td></tr>
        <tr><td key = 'positive'>positive</td><td>{`${(positivePercent()*100).toFixed(1)}%`}</td></tr>
      </tbody>
    </table>
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