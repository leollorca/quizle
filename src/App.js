import { useState } from "react";
import Quiz from "./components/Quiz";

export default function App() {
  const [difficulty, setDifficulty] = useState(undefined);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  function startQuiz() {
    setIsQuizStarted(true);
  }

  function handleDifficulty(e) {
    e.preventDefault();
    setDifficulty(e.target.value);
    startQuiz();
  }

  return (
    <main>
      {isQuizStarted ? (
        <Quiz difficulty={difficulty} />
      ) : (
        <>
          <h1>Let's start a quiz!</h1>
          <input type="submit" value="easy" onClick={handleDifficulty} />
          <input type="submit" value="medium" onClick={handleDifficulty} />
          <input type="submit" value="hard" onClick={handleDifficulty} />
        </>
      )}
    </main>
  );
}
