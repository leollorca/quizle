export default function Answer(props) {
  let answerStyle = {
    color: props.isHeld ? "#f1f1f1" : "",
    backgroundColor: props.isHeld ? "#772ce8" : "",
  };

  if (props.quizSubmitted) {
    if ((props.isHeld && props.isCorrect) || props.isCorrect) {
      answerStyle = {
        color: "#f1f1f1",
        backgroundColor: "#06d6a0",
      };
    }
    if (props.isHeld && !props.isCorrect) {
      answerStyle = {
        color: "#f1f1f1",
        backgroundColor: "#ef476f",
      };
    }
  }

  return (
    <li className="answer" style={answerStyle} onClick={props.selectAnswer}>
      {props.entitled}
    </li>
  );
}
