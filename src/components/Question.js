import { useState } from "react";
import Answer from "./Answer";

export default function Question(props) {
  const [answers, setAnswers] = useState(props.answers);

  function selectAnswer(event) {
    setAnswers((prevAnswers) => {
      return prevAnswers.map((prevAnswer) => {
        if (event.target.innerText !== prevAnswer.entitled) {
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
        questionId={props.id}
        entitled={entitled}
        isCorrect={isCorrect}
        isHeld={isHeld}
        selectAnswer={selectAnswer}
        quizSubmitted={props.quizSubmitted}
      />
    );
  });

  return (
    <div className="question">
      <div className="category">{props.category}</div>
      <div className="entitled">{props.entitled}</div>
      <ul className="answers">{answerElements}</ul>
    </div>
  );
}
