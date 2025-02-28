const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name}: {props.exercises}
    </p>
  );
};

const Content = () => {
  const data1 = {
    name: "Half Stack application development",
    exercises: 10,
  };

  const data2 = {
    name: "Using props to pass data",
    exercises: 7,
  };

  const data3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Part name={data1.name} exercises={data1.exercises} />
      <Part name={data2.name} exercises={data2.exercises} />
      <Part name={data3.name} exercises={data3.exercises} />
    </div>
  );
};
const Total = (props) => {
  return (
    <p>
      Number of exercises
      {props.exercises1 + props.exercises2 + props.exercises3}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;
  return (
    <div>
      <Header course={course} />
      <Content />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

export default App;
