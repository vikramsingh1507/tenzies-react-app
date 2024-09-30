/* eslint-disable react/prop-types */
export default function Die({ value, isHeld, holdDice }) {
  const styles = {
    backgroundColor: isHeld ? "#212527" : "#ffffff",
  };
  return (
    <div
      className={`die ${
        ["one", "two", "three", "four", "five", "six"][value - 1]
      }`}
      style={styles}
      onClick={holdDice}
    >
      <span className="dot dot-one"></span>
      <span className="dot dot-three"></span>
      <span className="dot dot-four"></span>
      <span className="dot dot-five"></span>
      <span className="dot dot-six"></span>
      <span className="dot dot-seven"></span>
      <span className="dot dot-nine"></span>
    </div>
  );
}
