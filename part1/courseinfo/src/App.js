const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course}></Header>
      <Content ex1={exercises1} ex2={exercises2} ex3={exercises3} p1={part1} p2={part2} p3={part3}></Content>
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3}></Total>
      {/* <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.p1} ex={props.ex1} />
      <Part part={props.p2} ex={props.ex2} />
      <Part part={props.p3} ex={props.ex3} />
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.ex} {props.part}
    </p>
  );
};

export default App;
