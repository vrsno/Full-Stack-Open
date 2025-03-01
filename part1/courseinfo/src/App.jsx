const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((element, index) => (
        <p key={index}>{element.name}</p>
      ))}
    </div>
  );
};
const Total = (props) => {
  return (
    <p>
      Number of exercises:{" "}
      {props.exercises[0].exercises +
        props.exercises[1].exercises +
        props.exercises[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  console.log(course.name);
  console.log(course.parts);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  );
};

export default App;
