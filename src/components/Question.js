import Answer from "./Answer";

export default function Question(props) {
  const answerElements = props.answers.map(
    ({ entitled, isCorrect, isHeld }) => {
      return (
        <Answer
          key={entitled}
          entitled={entitled}
          isCorrect={isCorrect}
          isHeld={isHeld}
          selectAnswer={props.selectAnswer}
          quizSubmitted={props.isQuizSubmitted}
        />
      );
    }
  );

  const answersStyle = {
    pointerEvents: props.isQuizSubmitted ? "none" : "",
  };

  return (
    <div className="question">
      <div className="category">{atob(props.category)}</div>
      <div className="entitled">{atob(props.entitled)}</div>
      <ul className="answers" style={answersStyle}>
        {answerElements}
      </ul>
    </div>
  );
}
