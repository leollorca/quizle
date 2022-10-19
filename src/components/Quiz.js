import { useState, useEffect } from "react";
import Question from "./Question";

export default function Quiz(props) {
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    fetch(
      `https://the-trivia-api.com/api/questions?limit=5&region=FR&difficulty=${props.difficulty}`
    )
      .then((res) => res.json())
      .then((data) => {
        setQuestionsData(data);
      });
  }, []);

  const questions = questionsData.map((questionData) => {
    const {
      category,
      question: entitled,
      correctAnswer,
      incorrectAnswers,
    } = questionData;

    return (
      <Question
        category={category}
        entitled={entitled}
        correctAnswer={correctAnswer}
        incorrectAnswers={incorrectAnswers}
      />
    );
  });

  return (
    <div className="quiz">
      <div className="questions">{questions}</div>
      <button>Submit</button>
    </div>
  );
}
