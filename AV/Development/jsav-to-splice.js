$("body").on("jsav-log-event", function(event, eventData) {
  if (eventData.type === 'jsav-exercise-grade-change' || eventData.type === 'jsav-exercise-grade' || eventData.type === 'jsav-exercise-step-fixed') {
      SPLICE.reportScoreAndState(eventData.av, eventData.score.correct / eventData.score.total, { currentStep: eventData.currentStep });
  }
  // still logging scores and state to console
  // console.log(eventData);
});






// $("body").on("jsav-log-event", function(event, eventData) {
//     if (eventData.type === 'jsav-exercise-grade-change') {
//       SPLICE.reportScoreAndState(eventData.av, eventData.score.correct / eventData.score.total, { currentStep: eventData.currentStep })
//     }
//     // still logging scores and state to console
//     console.log(eventData);
//   });