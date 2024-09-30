export default function MainContent({
  dieElements,
  handleRollOrReset,
  isGameWon,
  hasGameStarted,
}) {
  return (
    <main>
      <h1>Tenzies</h1>
      <h2>
        {hasGameStarted
          ? isGameWon
            ? `You won Tenzies!`
            : `The game will automatically reset if not won within 100 seconds.`
          : `Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.`}
      </h2>
      <div className="dice-container">{dieElements}</div>
      <button className="roll-btn" onClick={handleRollOrReset}>
        {hasGameStarted ? (isGameWon ? "Reset game" : "Roll") : "Play Tenzies"}
      </button>
    </main>
  );
}
