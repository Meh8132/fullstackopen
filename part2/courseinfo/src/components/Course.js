const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(({ id, name, exercises }) => (
      <Part key={id} name={name} exercises={exercises} />
    ))}
  </div>
)

const Total = ({ parts }) => {
  const sum = parts.reduce((total, { exercises }) => total + exercises, 0)
  return <p><strong>total of {sum} exercises</strong></p>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course