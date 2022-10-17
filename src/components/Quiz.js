import { useState, useEffect } from "react";
import Question from "../components/Question";

export default function Quiz(props) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&difficulty=${props.difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.results);
      });
  }, []);

  const questionElements = questions.map((question) => (
    <Question question={question} />
  ));

  return <div className="quiz--container">{questionElements}</div>;
}
