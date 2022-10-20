import Answer from "./Answer";

export default function Question(props) {
  const { id, category, entitled, answersData } = props;

  const answers = answersData.map((answerData) => {
    console.log(answerData);
    return (
      <Answer
        entitled={answerData.entitled}
        isCorrect={answerData.isCorrect}
        isHeld={answerData.isHeld}
      />
    );
  });
  return (
    <div className="question">
      <div className="category">{category}</div>
      <div className="entitled">{entitled}</div>
      <ul className="answers">{answers}</ul>
    </div>
  );
}
