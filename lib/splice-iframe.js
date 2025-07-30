/*

  API:

  SPLICE.reportScoreAndState(location, score, state)

  location: a unique ID in the document
  score: a number between 0 and 1,
  state: arbitrary state data that the element saves and retrieves in
  order to restore student work.

  SPLICE.getState(location, callback)

  Upon retrieval, invokes callback(state, error)

  SPLICE.sendEvent(location, name, data)

  Message Protocol:

  Request from child to parent

  { subject: 'lti.frameResize', height: ... } }
  No response

  { subject: 'SPLICE.reportScoreAndState',
  score: a composite score between 0 and 1
  state: { location1: ..., location2: ..., ... }}
  No response

  { subject: 'SPLICE.getState', message_id: ... }
  Response: { subject: 'SPLICE.getState.response', message_id: ..., state: { location1: ..., location2: ..., ... }}

  { subject: 'SPLICE.sendEvent',
  name: event name,
  data: event data }

*/

/* global MutationObserver */ // https://github.com/standard/standard/issues/1159
/* global performance */

if (window.self !== window.top) { // iframe
  window.addEventListener("load", event => {
    const scores = {};
    const states = {};
    let callbacks = [];
    let docHeight = 0;

    const sendDocHeight = () => {
      if (window.self === window.top) return; // not iframe

      window.scrollTo(0, 0);
      const SEND_DOCHEIGHT_DELAY = 100;
      setTimeout(() => {
        let newDocHeight = document.body.scrollHeight + document.body.offsetTop;
        if (docHeight != newDocHeight) {
          docHeight = newDocHeight;
          const data = {subject: "lti.frameResize", message_id: generateUUID(), height: docHeight};
          window.parent.postMessage(data, "*");
          if (window.SPLICE.logging) console.log("postMessage to parent", data);
        }
      }, SEND_DOCHEIGHT_DELAY);
    };

    // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    const generateUUID = () => { // Public Domain/MIT
      var d = new Date().getTime();
      var d2 = (performance && performance.now && (performance.now() * 1000)) || 0; // Time in microseconds since page-load or 0 if unsupported
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let r = Math.random() * 16; // random number between 0 and 16
        if (d > 0) { // Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else { // Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
      });
    };

        // Send attempt to DB for storage and scoring
    const sendScoreData = ({location, score, state}) => {
      if (!window.ODSA.UTILS.scoringServerEnabled()) { return ; }
      
      const username = ODSA.UTILS.getUserEmail();
      const book = ODSA.SETTINGS.BOOK_ID;

      const scoreData = {
        username:    username,
        book:        book,
        exercise:    location,
        module:      window.ODSA.UTILS.getModuleID(),
        score:       score,
        steps_fixed: state.currentStep,
        tstamp:      (new Date(state.tstamp)).getTime(),
        /* TODO: Find a way to get this data here */
        // total_time:  +new Date() - exercises[location].startTime,
        // threshold:   exercises[location].threshold,
        // uiid:        exercises[location].uiid,
        // type:        exercises[location].type
      };

      if (window.ODSA.UTILS.hasBook()) {
        scoreData['inst_book_id'] = window.ODSA.TP.instBookId;
        if (window.ODSA.UTILS.isFullModule()) {
          scoreData['inst_chapter_module_id'] = window.ODSA.UTILS.getChapterModuleID();
        } else {
          scoreData['inst_section_id'] = window.ODSA.TP.instSectionId;
        }
      } else if (window.ODSA.UTILS.isStandaloneModule()) {
        scoreData['inst_module_version_id'] = window.ODSA.UTILS.getInstModuleVersionId();
      }
      else {
        scoreData['inst_course_offering_exercise_id'] = window.ODSA.UTILS.getInstCourseOfferingExerciseId();
      }

      scoreData['inst_book_section_exercise_id'] = window.PARAMS.instBookSectionExerciseId

      jQuery.ajax({
        url: "/odsa_exercise_attempts/pe",
        type: "POST",
        data: JSON.stringify(scoreData),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {
          withCredentials: true
        },
        success: function (data) {
          console.log("WORKED", data)
        }, 
        error: function (data) {
          data = window.ODSA.UTILS.getJSON(data);
          try {
            var res = JSON.parse(data.responseText);
            console.error(res);
            if (res.message) {
              alert('ERROR: ' + res.message);
            }
            else {
              alert('ERROR: ' + data.status + ' - ' + data.statusText);
            }
          }
          catch (e) {
            alert('ERROR: ' + data.status + ' - ' + data.statusText);
          }

          if (data.status === 400) { // Bad request
          } else {
            if (data.status === 401) {
              alert('ERROR: ' + data.status + ' - Expired Session');
            } else if (data.status === 404) {
              console.warn('Exercise does not exist in the database');
            }
          }
        }
      });

    }

    if (!("SPLICE" in window)) {
      window.SPLICE = {
        logging: true,
        getState: (location, callback) => {
          if (callbacks === undefined) {
            callback(states[location]);
          } else {
            callbacks.push({location, callback});
          }
        },
        reportScoreAndState: (location, score, state) => {
          scores[location] = score;
          states[location] = state;
          // Log received data
          if (window.SPLICE.logging) console.log("SPLICE API reportScoreAndState received:", {location, score, state});
          if (window.self === window.top) return; // not iframe
          let averageScore = 0;
          let n = 0;
          for (const location in scores) {
            averageScore += scores[location];
            n++;
          }
          if (n > 0) averageScore /= n;
          const message = {subject: "SPLICE.reportScoreAndState", message_id: generateUUID(), score: averageScore, state: states};
          window.parent.postMessage(message, "*");
          if (window.SPLICE.logging) console.log("postMessage to parent", message);

          // Send attempt to server to update canvas
          sendScoreData({location, score, state});

          // Also log event in user_interactions table
          message.type = "SPLICE.reportScoreAndState";
          message.desc = {location, score, state};
          window.ODSA.UTILS.logEvent(message);
        },
        sendEvent: (location, name, data) => {
          const message = {subject: "SPLICE.sendEvent", message_id: generateUUID(), location, name, data};
          window.parent.postMessage(message, "*");
          if (window.SPLICE.logging) console.log("postMessage to parent", message);

          // Log Event so it is sent to DB
          message.type = "SPLICE.sendEvent";
          message.desc = data;
          window.ODSA.UTILS.logEvent(message);
        }
      };
    }

    window.addEventListener("message", event => {
      if (typeof event.data !== "object") return;
      if (typeof event.data.subject !== "string") return;
      if (!event.data.subject.startsWith("SPLICE.")) return;
      if (event.data.subject.endsWith("response")) {
        if (window.SPLICE.logging) console.log("postmessage response", event.data);
        if (event.data.subject === "SPLICE.getState.response") {
          if (callbacks === undefined) return; // Already timed out
          for (const location in event.data.state) {
            scores[location] = 0;
            states[location] = event.data.state[location];
          }

          for (const {location, callback} of callbacks) {
            callback(states[location], event.data.error);
          }
          callbacks = undefined;
        }
        // Handle other responses
      }
      // TODO: SPLICE messages from children
    }, false);

    const message = {subject: "SPLICE.getState", message_id: generateUUID()};
    window.parent.postMessage(message, "*");
    if (window.SPLICE.logging) console.log("postMessage to parent", message);
    const MESSAGE_TIMEOUT = 15000;
    setTimeout(() => {
      if (callbacks === undefined) return;
      for (const {location, callback} of callbacks) {
        scores[location] = 0;
        states[location] = undefined;
        callback(undefined, {code: "timeout"});
      }
      callbacks = undefined;
    }, MESSAGE_TIMEOUT);

    sendDocHeight();
    document.body.style.overflow = "hidden";
    // ResizeObserver did not work
    const mutationObserver = new MutationObserver(sendDocHeight);
    mutationObserver.observe(document.body, {childList: true, subtree: true});
  });
}

//https://horstmann.com/codecheck/splice/splice-iframe.js