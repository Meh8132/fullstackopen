const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => (
  <div>
    {parts.map(({ name, exercises }) => (
      <Part key={name} name={name} exercises={exercises} />
    ))}
  </div>
)

const Total = ({ parts }) => {
  const sum = parts.reduce((total, { exercises }) => total + exercises, 0)
  return <p>Number of exercises {sum}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack Application Development',
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
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App