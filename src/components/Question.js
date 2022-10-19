export default function Question(props) {
  const answers = props.incorrectAnswers.map((incorrectAnswer) => {
    return <li className="answer">{incorrectAnswer}</li>;
  });

  answers.push(<li className="answer">{props.correctAnswer}</li>);

  const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

  return (
    <div className="question">
      <div className="category">{props.category}</div>
      <div className="entitled">{props.entitled}</div>
      <ul className="answers">{shuffledAnswers}</ul>
    </div>
  );
}
