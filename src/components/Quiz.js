import { useState, useEffect } from "react";
import Question from "./Question";

export default function Quiz({ difficulty }) {
  const [questions, setQuestions] = useState([]);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple&encode=url3986`
    )
      .then((response) => response.json())
      .then((data) => formatData(data));
  }, [difficulty]);

  function formatData(data) {
    setQuestions(
      data.results.map((question) => {
        const {
          category,
          question: entitled,
          correct_answer: correctAnswer,
          incorrect_answers: incorrectAnswers,
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

        return { category, entitled, answers: shuffledAnswers };
      })
    );
  }

  function submitAnswers() {
    setIsQuizSubmitted(true);
  }

  const questionElements = questions.map((question) => {
    const { category, entitled, answers } = question;

    return (
      <Question
        key={entitled}
        category={category}
        entitled={entitled}
        answers={answers}
        isQuizSubmitted={isQuizSubmitted}
      />
    );
  });

  return (
    <div className="quiz">
      <div className="questions">{questionElements}</div>
      <button onClick={submitAnswers}>Submit</button>
    </div>
  );
}
