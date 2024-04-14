import  Description  from "../Description/Description";
import  Feedback  from '../FeedBack/Feedback';
import  Options  from "../Options/Options";
import  Notification from "../Notification/Notification";

import css from "./App.module.css";

import { useState, useEffect } from 'react'


export default function App() {
  const typeRewiews = {
    good: 0,
    neutral: 0,
    bad: 0,
  }

  const [rewiews, setRewiews] = useState(() => {
    const savedRewiews = window.localStorage.getItem("saved-rewiews");
    if (savedRewiews !== null) {
      return JSON.parse(savedRewiews);
    }
    return typeRewiews;
  });

   useEffect(() => {
    window.localStorage.setItem("saved-rewiews", JSON.stringify(rewiews));
  }, [rewiews]);

  const totalFeedback = rewiews.good + rewiews.neutral + rewiews.bad;
  const positiveFeedback = Math.round(
    ((rewiews.good + rewiews.neutral) / totalFeedback) * 100
  );

  const updateFeedback = (feedbackType) => {
    setRewiews({
      ...rewiews,
      [feedbackType]: rewiews[feedbackType] + 1,
    });
  };

  const resetFeedbackButton = () => setRewiews(typeRewiews);

  return (
    <section className={css.container}>
      <Description />
      <Options
        onClickFeedback={(feedbackType) => updateFeedback(feedbackType)}
        resetFeedback={totalFeedback >= 1}
        resetButton={resetFeedbackButton}
      />
      {totalFeedback >= 1 && (
        <Feedback
          feedbackObj={rewiews}
          feedbackTotal={totalFeedback}
          feedbackPositive={positiveFeedback}
        />
      )}
      {totalFeedback < 1 && <Notification />}
    </section>
  );
 
}