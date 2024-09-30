import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import MainContent from "./components/MainContent";
import FooterContent from "./components/FooterContent";

function App() {
  const numOfDice = 10;
  const [dice, setDice] = React.useState(initializeDice());
  const [hasGameStarted, setHasGameStarted] = React.useState(false);
  const [isGameWon, setisGameWon] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [times, setTimes] = React.useState(getFromLocalStorage("times", []));
  const [rolls, setRolls] = React.useState(getFromLocalStorage("rolls", []));
  const [lowestTime, setLowestTime] = React.useState("-");
  const [lowestRoll, setLowestRoll] = React.useState("-");
  const { width, height } = useWindowSize();

  function initializeDice() {
    const randomDice = [];
    for (let i = 0; i < numOfDice; i++) {
      randomDice.push(generateNewDie());
    }
    return randomDice;
  }

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  // Check if Game is won everytime the dice change
  React.useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld === true);
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    if (allDiceHeld && allSameValue) {
      setisGameWon(true);
      setTimes((prevTimes) => [...prevTimes, time]);
      setRolls((prevRolls) => [...prevRolls, rollCount]);
    }
  }, [dice]);

  // Find the best time everytime times changes
  React.useEffect(() => {
    if (times.length > 0) {
      const newLowestTime = Math.min(...times);
      if (newLowestTime !== lowestTime) {
        setLowestTime(newLowestTime);
      }
      localStorage.setItem("times", JSON.stringify(times));
    }
  }, [times]);

  // Find the best rollCount everytime rolls changes
  React.useEffect(() => {
    if (rolls.length > 0) {
      const newLowestRoll = Math.min(...rolls);
      if (newLowestRoll !== lowestRoll) {
        setLowestRoll(newLowestRoll);
      }
      localStorage.setItem("rolls", JSON.stringify(rolls));
    }
  }, [rolls]);

  // Set the timer when the game begins
  React.useEffect(() => {
    let timerId;

    if (hasGameStarted && isGameWon === false) {
      timerId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    if (time >= 100) {
      resetGame();
    }

    return () => {
      clearInterval(timerId);
    };
  }, [hasGameStarted, isGameWon, time]);

  function handleRollOrReset() {
    if (!hasGameStarted) {
      setHasGameStarted(true); // Start the game, but don't roll dice
    } else if (isGameWon) {
      resetGame(); // Reset the game if won
    } else {
      rollDiceAndTrackRolls(); // Only roll dice after game has started
    }
  }

  function rollDiceAndTrackRolls() {
    setRollCount((prevValue) => prevValue + 1);
    setDice((prevDice) => {
      return prevDice.map((prevDie) => {
        return prevDie.isHeld === false ? generateNewDie() : prevDie;
      });
    });
  }

  function resetGame() {
    setTime(0);
    setRollCount(0);
    setisGameWon(false);
    setHasGameStarted(false);
    setDice(initializeDice());
  }

  function holdDice(idOfClickedDie) {
    if (hasGameStarted === true) {
      setDice((prevDice) => {
        return prevDice.map((prevDie) => {
          return prevDie.id === idOfClickedDie
            ? { ...prevDie, isHeld: !prevDie.isHeld }
            : prevDie;
        });
      });
    }
  }

  function getFromLocalStorage(key, fallBackValue) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallBackValue;
  }

  const dieElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <>
      {isGameWon && <Confetti width={width} height={height} />}

      <MainContent
        dieElements={dieElements}
        isGameWon={isGameWon}
        handleRollOrReset={handleRollOrReset}
        hasGameStarted={hasGameStarted}
      />

      <FooterContent
        rollCount={rollCount}
        time={time}
        lowestRoll={lowestRoll}
        lowestTime={lowestTime}
      />
    </>
  );
}

export default App;
