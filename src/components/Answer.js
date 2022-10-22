export default function Answer({
  entitled,
  isCorrect,
  isHeld,
  selectAnswer,
  quizSubmitted,
}) {
  let styles = {
    color: isHeld ? "#f1f1f1" : "",
    backgroundColor: isHeld ? "#772ce8" : "",
  };

  if (quizSubmitted) {
    if ((isHeld && isCorrect) || isCorrect) {
      styles = {
        color: "#f1f1f1",
        border: "1px solid #82C46F",
        backgroundColor: "#82C46F",
      };
    }
    if (isHeld && !isCorrect) {
      styles = {
        color: "#f1f1f1",
        border: "1px solid #F15757",
        backgroundColor: "#F15757",
      };
    }
  }

  return (
    <li className="answer" style={styles} onClick={selectAnswer}>
      {entitled}
    </li>
  );
}
