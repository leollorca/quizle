import { useState, useEffect } from "react";
import Question from "./Question";

export default function Quiz(props) {
  const [questions, setQuestions] = useState([]);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  useEffect(() => {
    fetch(
      `https://the-trivia-api.com/api/questions?limit=5&region=FR&difficulty=${props.difficulty}`
    )
      .then((response) => response.json())
      .then((data) => formatData(data));
  }, [props.difficulty]);

  function formatData(data) {
    setQuestions(
      data.map((question) => {
        const {
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

        return { category, entitled, answers: shuffledAnswers };
      })
    );
  }

  function selectAnswer(event) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((prevQuestion) => {
        if (
          prevQuestion.answers.find(
            (answer) => answer.entitled === event.target.innerText
          )
        ) {
          const answers = prevQuestion.answers.map((answer) => {
            if (event.target.innerText !== answer.entitled) {
              return { ...answer, isHeld: false };
            }
            return { ...answer, isHeld: true };
          });
          return { ...prevQuestion, answers };
        }
        return prevQuestion;
      });
    });
  }

  function submitAnswers() {
    let filled = true;
    questions.forEach((question) => {
      if (!question.answers.find((answer) => answer.isHeld)) {
        filled = false;
      }
    });
    if (!filled) {
      return console.log("Quiz not fully filled!");
    }
    return setIsQuizSubmitted(true);
  }

  const questionElements = questions.map((question) => {
    const { category, entitled, answers } = question;

    return (
      <Question
        key={entitled}
        category={category}
        entitled={entitled}
        answers={answers}
        selectAnswer={selectAnswer}
        isQuizSubmitted={isQuizSubmitted}
      />
    );
  });

  return (
    <div className="quiz">
      <div className="questions">{questionElements}</div>
      {isQuizSubmitted ? (
        <button onClick={props.toggleQuiz}>Play again</button>
      ) : (
        <button onClick={submitAnswers}>Check answers</button>
      )}
    </div>
  );
}
