export default function Answer({
  entitled,
  isCorrect,
  isHeld,
  selectAnswer,
  quizSubmitted,
}) {
  let answerStyle = {
    color: isHeld ? "#f1f1f1" : "",
    backgroundColor: isHeld ? "#772ce8" : "",
  };

  if (quizSubmitted) {
    if ((isHeld && isCorrect) || isCorrect) {
      answerStyle = {
        color: "#f1f1f1",
        border: "1px solid #06d6a0",
        backgroundColor: "#06d6a0",
      };
    }
    if (isHeld && !isCorrect) {
      answerStyle = {
        color: "#f1f1f1",
        border: "1px solid #ef476f",
        backgroundColor: "#ef476f",
      };
    }
  }

  return (
    <li className="answer" style={answerStyle} onClick={selectAnswer}>
      {unescape(entitled)}
    </li>
  );
}
