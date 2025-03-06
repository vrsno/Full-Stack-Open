const Course = ({ course }) => {
  const Total = ({ parts }) => {
    const sum = parts.reduce((total, part) => total + part.exercises, 0);

    return (
      <p>
        <strong>{`Total of ${sum} exercises`}</strong>
      </p>
    );
  };

  const Header = ({ name }) => {
    return <h2>{name}</h2>;
  };

  const Content = ({ parts }) => {
    const Part = ({ part }) => (
      <p>
        {part.name} {part.exercises}
      </p>
    );

    return (
      <>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </>
    );
  };

  return (
    <>
      {course.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
