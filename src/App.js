import { useState } from "react";
import Quiz from "./components/Quiz";

export default function App() {
  const [difficulty, setDifficulty] = useState(undefined);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  function startQuiz() {
    setIsQuizStarted(true);
  }

  function handleDifficulty(event) {
    event.preventDefault();
    setDifficulty(event.target.value);
    startQuiz();
  }

  return (
    <main>
      {isQuizStarted ? (
        <Quiz difficulty={difficulty} />
      ) : (
        <div className="difficulties">
          <input type="submit" value="easy" onClick={handleDifficulty} />
          <input type="submit" value="medium" onClick={handleDifficulty} />
          <input type="submit" value="hard" onClick={handleDifficulty} />
        </div>
      )}
    </main>
  );
}
