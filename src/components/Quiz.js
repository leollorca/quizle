import { useState, useEffect } from "react";
import Question from "./Question";

export default function Quiz(props) {
  const [questions, setQuestions] = useState([]);
  const [isQuizFilled, setIsQuizFilled] = useState(true);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&difficulty=${props.difficulty}&type=multiple&encode=base64`
    )
      .then((response) => response.json())
      .then((data) => formatData(data));
  }, [props.difficulty]);

  console.log(questions);

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

  function selectAnswer(event) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((prevQuestion) => {
        if (
          prevQuestion.answers.find(
            (answer) => answer.entitled === btoa(event.target.innerText)
          )
        ) {
          const answers = prevQuestion.answers.map((answer) => {
            if (btoa(event.target.innerText) !== answer.entitled) {
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
      if (
        question.answers.find((answer) => answer.isHeld && answer.isCorrect)
      ) {
        setScore((prevScore) => prevScore + 1);
      }
    });
    if (!filled) {
      setScore(0);
      return setIsQuizFilled(false);
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
        <div>
          <span className="score">
            You scored {score} correct answer{score > 1 ? "s" : ""}!
          </span>
          <button onClick={props.toggleQuiz}>Play again</button>
        </div>
      ) : (
        <div>
          {!isQuizFilled && (
            <span className="filled">Please answer all questions !</span>
          )}
          <button onClick={submitAnswers}>Check answers</button>
        </div>
      )}
    </div>
  );
}
