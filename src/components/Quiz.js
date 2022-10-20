import { useState, useEffect } from "react";
import Question from "./Question";

export default function Quiz(props) {
  const [questionsData, setQuestionsData] = useState([]);

  function formatData(data) {
    setQuestionsData(
      data.map((question) => {
        const {
          id,
          category,
          question: entitled,
          correctAnswer,
          incorrectAnswers,
        } = question;

        const answersData = incorrectAnswers.map((incorrectAnswer) => {
          return {
            entitled: incorrectAnswer,
            isHeld: false,
            isCorrect: false,
          };
        });

        answersData.push({
          entitled: correctAnswer,
          isHeld: false,
          isCorrect: true,
        });

        const shuffledAnswers = answersData.sort(() => Math.random() - 0.5);

        return { id, category, entitled, answersData: shuffledAnswers };
      })
    );
  }

  useEffect(() => {
    fetch(
      `https://the-trivia-api.com/api/questions?limit=5&region=FR&difficulty=${props.difficulty}`
    )
      .then((response) => response.json())
      .then((data) => formatData(data));
  }, []);

  const questions = questionsData.map((questionData) => {
    const { id, category, entitled, answersData } = questionData;

    return (
      <Question
        key={id}
        id={id}
        category={category}
        entitled={entitled}
        answersData={answersData}
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
