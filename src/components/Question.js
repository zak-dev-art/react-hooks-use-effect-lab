import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // ⏳ create a timeout to decrease timeRemaining by 1 every second
    const timer = setTimeout(() => {
      setTimeRemaining((time) => time - 1);
    }, 1000);

    // 🧹 cleanup function to clear the timeout before next run
    return () => clearTimeout(timer);
  }, [timeRemaining]); // re-run effect whenever timeRemaining changes

  // 💥 when timer hits 0, reset & mark as unanswered
  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  return (
    <div>
      <h2>{question.prompt}</h2>
      <ul>
        {question.answers.map((answer) => (
          <li key={answer}>
            <button onClick={() => onAnswered(answer === question.correctAnswer)}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
      <h5>{timeRemaining} seconds remaining</h5>
    </div>
  );
}

export default Question;
