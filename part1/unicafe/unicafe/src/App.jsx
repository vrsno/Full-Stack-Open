import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Header = ({
  title,
  handleClickGood,
  handleClickNeutral,
  handleClickBad,
}) => {
  return (
    <>
      <h1>{title}</h1>
      <Button handleClick={handleClickGood} text="Good" />
      <Button handleClick={handleClickNeutral} text="Neutral" />
      <Button handleClick={handleClickBad} text="Bad" />
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total > 0 ? (good - bad) / total : 0;
  const positive = total > 0 ? (good / total) * 100 : 0;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={total} />
        <StatisticLine text="Average" value={average.toFixed(2)} />
        <StatisticLine text="Positive" value={`${positive.toFixed(2)}%`} />
      </tbody>
    </table>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header
        title="Give Feedback"
        handleClickGood={() => setGood(good + 1)}
        handleClickNeutral={() => setNeutral(neutral + 1)}
        handleClickBad={() => setBad(bad + 1)}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
