import { useState } from "react";
import Answer from "./Answer";

export default function Question(props) {
  const [answers, setAnswers] = useState(props.answers);

  function selectAnswer(event) {
    setAnswers((prevAnswers) => {
      return prevAnswers.map((prevAnswer) => {
        if (event.target.innerText !== unescape(prevAnswer.entitled)) {
          return { ...prevAnswer, isHeld: false };
        }
        return { ...prevAnswer, isHeld: true };
      });
    });
  }

  const answerElements = answers.map(({ entitled, isCorrect, isHeld }) => {
    return (
      <Answer
        key={entitled}
        entitled={entitled}
        isCorrect={isCorrect}
        isHeld={isHeld}
        selectAnswer={selectAnswer}
        quizSubmitted={props.isQuizSubmitted}
      />
    );
  });

  const answersStyle = {
    pointerEvents: props.isQuizSubmitted ? "none" : "",
  };

  return (
    <div className="question">
      <div className="category">{unescape(props.category)}</div>
      <div className="entitled">{unescape(props.entitled)}</div>
      <ul className="answers" style={answersStyle}>
        {answerElements}
      </ul>
    </div>
  );
}
