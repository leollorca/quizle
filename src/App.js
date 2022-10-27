import { useState } from "react";
import Quiz from "./components/Quiz";

export default function App() {
  const [difficulty, setDifficulty] = useState(undefined);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  function handleDifficulty(event) {
    event.preventDefault();
    setDifficulty(event.target.value);
    toggleQuiz();
  }

  function toggleQuiz() {
    setIsQuizStarted((prevIsQuizStarted) => !prevIsQuizStarted);
  }

  return (
    <main>
      {isQuizStarted ? (
        <Quiz difficulty={difficulty} toggleQuiz={toggleQuiz} />
      ) : (
        <div className="difficulties">
          <input type="submit" value="easy" onClick={handleDifficulty} />
          <input type="submit" value="medium" onClick={handleDifficulty} />
          <input type="submit" value="test" onClick={handleDifficulty} />
        </div>
      )}
    </main>
  );
}
