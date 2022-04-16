import { useState } from 'react';

const Stats = ({ neutral, bad, good, sum, average, positive }) => {
  if ((neutral === 0) & (bad === 0) & (good === 0)) {
    return (
      <div>
        <p>
          <b>No feedback given</b>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine text="Good" value={good}></StatisticsLine>
            <StatisticsLine text="Neutral" value={neutral}></StatisticsLine>
            <StatisticsLine text="Bad" value={bad}></StatisticsLine>
            <StatisticsLine text="All" value={sum}></StatisticsLine>
            <StatisticsLine text="Average" value={average}></StatisticsLine>
            <StatisticsLine text="Positive" value={positive}></StatisticsLine>
          </tbody>
        </table>
      </div>
    );
  }
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const getSum = () => {
    return good + neutral + bad;
  };

  const getAverage = () => {
    let average = (good - bad) / (good + neutral + bad);
    return Number.isNaN(average) ? 0 : average;
  };

  const getPositivePercentage = () => {
    let result = (good / (good + neutral + bad)) * 100;
    return Number.isNaN(result) ? 0 : result;
  };

  return (
    <div>
      <Header></Header>
      <Button handleClick={handleGoodClick} text={'good'}></Button>
      <Button handleClick={handleNeutralClick} text={'neutral'}></Button>
      <Button handleClick={handleBadClick} text={'bad'}></Button>
      <h1>Statistics</h1>
      <Stats good={good} neutral={neutral} bad={bad} sum={getSum()} average={getAverage()} positive={getPositivePercentage()}></Stats>
    </div>
  );
};

const Header = () => {
  return <h1>give feedback</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

export default App;
