const Total = ({ parts }) => {
  const total = parts.reduce(
    (previousValue, currentValue) => previousValue + currentValue.exercises,
    0
  );

  return (
    <p>
      <strong>total of exercises {total}</strong>
    </p>
  );
};

export default Total;
