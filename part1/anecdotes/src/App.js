import { useState } from 'react'

const AnecdoteCard = ({ anecdote, votes }) => (
  <div>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
)

const App = () => {
  const anecdoteList = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selectedAnecdoteIndex, setSelected] = useState(0)
  const [mostPopularAnecdoteIndex, setMostPopular] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdoteList.length).fill(0))

  const getRandomIndex = (min, max) =>
    min + Math.floor(Math.random() * (max - min))

  const handleNext = () => {
    let nextAnecdoteIndex = selectedAnecdoteIndex
    while (nextAnecdoteIndex === selectedAnecdoteIndex) {
      nextAnecdoteIndex = getRandomIndex(0, anecdoteList.length)
    }
    setSelected(nextAnecdoteIndex)
  }

  const handleVote = () => {
    const updatedVoteCounts = [ ...votes ]
    updatedVoteCounts[selectedAnecdoteIndex]++

    const updatedMostPopularIndex = updatedVoteCounts[selectedAnecdoteIndex] > updatedVoteCounts[mostPopularAnecdoteIndex]
        ? selectedAnecdoteIndex
        : mostPopularAnecdoteIndex

    setVotes(updatedVoteCounts)
    setMostPopular(updatedMostPopularIndex)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <AnecdoteCard
        anecdote={anecdoteList[selectedAnecdoteIndex]}
        votes={votes[selectedAnecdoteIndex]}
      />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <AnecdoteCard
        anecdote={anecdoteList[mostPopularAnecdoteIndex]}
        votes={votes[mostPopularAnecdoteIndex]}
      />
    </div>
  )
}

export default App