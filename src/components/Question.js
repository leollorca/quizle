export default function Question(props) {
  const {
    category,
    question,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  } = props.question;

  return (
    <div className="question--container">
      <div className="category">{category}</div>
      <div className="question">{question}</div>
      <ul className="answers"></ul>
    </div>
  );
}
