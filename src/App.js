import React from "react";
import Start from "./components/Start";
import Question from "./components/Question";
import Confetti from "react-confetti";

export default function App() {
  const [start, setStart] = React.useState(true);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);
  const [allComplete, setAllComplete] = React.useState(false);

  function playAgain() {
    setStart(true);
    setShowAnswer(false);
    setAllComplete(false);
  }

  function selectAnswer(questionId, optionId) {
    if (!showAnswer) {
      setQuestions(prev =>
        prev.map((question, index) =>
          questionId === index
            ? { ...question, selected_answer: optionId }
            : question
        )
      );
    }
  }

  React.useEffect(() => {
    if (!start) {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data =>
          setQuestions(
            data.results.map(question => {
              const options = [...question.incorrect_answers];
              options.splice(
                Math.floor(Math.random() * 4),
                0,
                question.correct_answer
              );
              return {
                question: question.question,
                options: options,
                selected_answer: undefined,
                correct_answer: question.correct_answer,
              };
            })
          )
        );
    }
  }, [start]);

  React.useEffect(() => {
    let count = 0;
    for (let i = 0; i < questions.length; i++) {
      if (
        questions[i].options[questions[i].selected_answer] ===
        questions[i].correct_answer
      ) {
        count++;
      }
    }
    setScore(count);
  }, [showAnswer]);

  React.useEffect(() => {
    setAllComplete(
      questions.every(quest => typeof quest.selected_answer !== "undefined")
    );
  }, [questions]);

  const questionElements = questions.map((question, index) => (
    <Question
      key={index}
      id={index}
      showAnswer={showAnswer}
      selectAnswer={selectAnswer}
      question={question}
      options={question.options}
    />
  ));
  return (
    <div className="app">
      {score === 5 && showAnswer ? <Confetti width={window.width} /> : ""}
      {start ? (
        <Start setStart={setStart} />
      ) : (
        <div className="quiz-container">
          {questionElements}
          <div className="footer">
            {showAnswer ? (
              <div className="button-container">
                <h3 className="score">{`You scored ${score}/5 correct answers`}</h3>
                <button className="button" onClick={() => playAgain()}>
                  Play Again
                </button>
              </div>
            ) : (
              <button
                className="button"
                disabled={!allComplete}
                onClick={() => setShowAnswer(true)}>
                Check Answers
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
