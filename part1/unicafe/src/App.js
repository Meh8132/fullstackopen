import { useState } from 'react'

const FeedbackButton = ({ handler, text }) => (
  <button onClick={handler}>{text}</button>
)

const FeedbackControls = ({ badHandler, goodHandler, neutralHandler }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <FeedbackButton handler={goodHandler} text="good"/>
      <FeedbackButton handler={neutralHandler} text="neutral"/>
      <FeedbackButton handler={badHandler} text="bad"/>
    </div>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const FeedbackStatistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <h1>statistics</h1>
      {total === 0
        ? <div>No feedback given</div>
        : <table>
            <tbody>
              <StatisticLine text="good" value={good}/>
              <StatisticLine text="neutral" value={neutral}/>
              <StatisticLine text="bad" value={bad}/>
              <StatisticLine text="all" value={total}/>
              <StatisticLine text="average" value={average}/>
              <StatisticLine text="positive" value={`${positive} %`} />
            </tbody>
          </table>
      }
    </div>
  )
}

const App = () => {
  const [bad, setBad] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const handleBadFeedback = () => setBad(bad + 1)
  const handleGoodFeedback = () => setGood(good + 1)
  const handleNeutralFeedback = () => setNeutral(neutral + 1)

  return (
    <div>
      <FeedbackControls
        badHandler={handleBadFeedback}
        goodHandler={handleGoodFeedback}
        neutralHandler={handleNeutralFeedback}
      />
      <FeedbackStatistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App