import React from "react";
import CounterText from "./components/counterText";
import DecrementButton from "./components/decrementButton";
import IncrementButton from "./components/incrementButton";
import ChangesByAmount from "./components/changesByAmount";

export default function App() {
  const [count, setCount] = React.useState(0);

  const handleDecrementButtonClick = () => {
    setCount(count - 1);
  };

  const handleIncrementButtonClick = () => {
    setCount(count + 1);
  };

  const handleChangeByAmountButtonClick = (event) => {
    event.preventDefault();
    const amount = parseInt(event.target.number.value);
    if (!isNaN(amount)) {
      setCount(count + amount);
    }
    event.target.number.value = "";
  };

  return (
    <div>
      <DecrementButton handleClick={handleDecrementButtonClick} />
      <CounterText count={count} />
      <IncrementButton handleClick={handleIncrementButtonClick} />
      <ChangesByAmount handleClick={handleChangeByAmountButtonClick} />
    </div>
  );
}
