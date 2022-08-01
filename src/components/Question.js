import React from "react";
import sanitize from "sanitize-html";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Question(props) {
  console.log(props.question);
  function styler(option, index) {
    let style = {};
    if (props.question.correct_answer === option) {
      style = css`
        background-color: #94d7a2;
      `;
    } else if (props.question.selected_answer === index) {
      style = css`
        background-color: #f8bcbc;
      `;
    }
    return style;
  }

  const optionElements = props.options.map((option, index) => (
    <div
      key={index}
      onClick={() => props.selectAnswer(props.id, index)}
      css={
        props.showAnswer
          ? styler(option, index)
          : props.question.selected_answer === index
          ? css`
              background-color: #d6dbf5;
            `
          : css``
      }>
      {sanitize(option)}
    </div>
  ));

  return (
    <div className="question">
      <h1 className="question-title">{sanitize(props.question.question)}</h1>
      <div className="options">{optionElements}</div>
    </div>
  );
}
