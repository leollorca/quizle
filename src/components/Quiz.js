import { useState, useEffect } from "react";
import Question from "./Question";

export default function Quiz({ difficulty }) {
  const [questions, setQuestions] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    fetch(
      `https://the-trivia-api.com/api/questions?limit=5&region=FR&difficulty=${difficulty}`
    )
      .then((response) => response.json())
      .then((data) => formatData(data));
  }, []);

  function formatData(data) {
    setQuestions(
      data.map((question) => {
        const {
          id,
          category,
          question: entitled,
          correctAnswer,
          incorrectAnswers,
        } = question;

        const answers = incorrectAnswers.map((incorrectAnswer) => {
          return {
            entitled: incorrectAnswer,
            isHeld: false,
            isCorrect: false,
          };
        });

        answers.push({
          entitled: correctAnswer,
          isHeld: false,
          isCorrect: true,
        });

        const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

        return { id, category, entitled, answers: shuffledAnswers };
      })
    );
  }

  function submitAnswers() {
    setQuizSubmitted(true);
  }

  const questionElements = questions.map((question) => {
    const { id, category, entitled, answers } = question;

    return (
      <Question
        key={id}
        id={id}
        category={category}
        entitled={entitled}
        answers={answers}
        quizSubmitted={quizSubmitted}
      />
    );
  });

  return (
    <div className="quiz">
      <div className="questions">{questionElements}</div>
      <button onClick={submitAnswers}>
        {quizSubmitted ? "New quiz" : "Submit"}
      </button>
    </div>
  );
}
