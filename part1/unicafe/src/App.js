import { useState } from 'react';

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

  return (
    <div>
      <Header></Header>
      <Button handleClick={handleGoodClick} text={'good'}></Button>
      <Button handleClick={handleNeutralClick} text={'neutral'}></Button>
      <Button handleClick={handleBadClick} text={'bad'}></Button>
      <Stats good={good} neutral={neutral} bad={bad}></Stats>
    </div>
  );
};

const Header = () => {
  return <h1>give feedback</h1>;
};

const Stats = ({ neutral, bad, good }) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

export default App;
