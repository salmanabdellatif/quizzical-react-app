import React from "react";

export default function StartQuiz(props) {
  return (
    <div className="start-container">
      <h2>Quizzical</h2>
      <p>Some description if needed</p>
      <button className="button" onClick={() => props.setStart(false)}>
        Start quiz
      </button>
    </div>
  );
}
