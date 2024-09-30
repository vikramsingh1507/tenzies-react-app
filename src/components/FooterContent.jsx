export default function FooterContent({
  rollCount,
  time,
  lowestRoll,
  lowestTime,
}) {
  return (
    <footer>
      <div>
        <h3>ROLLS</h3>
        <span className="gameStat">{rollCount}</span>
      </div>
      <div>
        <h3>TIME (s)</h3>
        <span className="gameStat">{time}</span>
      </div>
      <div>
        <h3>BEST ROLLS</h3>
        <span className="gameStat">{lowestRoll}</span>
      </div>
      <div>
        <h3>BEST TIME (s)</h3>
        <span className="gameStat">{lowestTime}</span>
      </div>
    </footer>
  );
}
