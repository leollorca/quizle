import { useState, useEffect } from "react";

export default function Quiz(props) {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&difficulty=${props.difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        setQuizData(data.results);
      });
  }, []);

  return <div className="quiz--container">{props.difficulty}</div>;
}
