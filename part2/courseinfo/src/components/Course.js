import React from 'react';

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <div>
      <ul>
        {course.parts.map((part) => (
          <li key={part.id}>
            <Part part={part}></Part>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Total = (props) => {
  const total = props.course.parts.reduce((p, n) => p + n.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export default Course;
