/** mbhatia@vt.edu */
(function($) {
  //Peixuan moved this part to init so it will listen to the right buttons
  /*
  $(document).ready(function() {
    //disable jsavend, as it allows student to jump to last slide
    //automatically enabled by injector once all questions for slideshow have been answered
    // $(".jsavend").css("pointer-events", "none");
    $(".jsavend").css("visibility", "hidden");

    //edge case: what if first slide has question?
    //1 signifies a forward click; used by injector to increment queue if necessary
    $(".jsavforward").click(function() {
      var buttonGroup = $(this).parent();
      var parentAV = $(buttonGroup)
        .parent()
        .attr("id");

      PIFRAMES.callInjector(parentAV, 1);
    }),
      //0 signifies a backward click; used by injector to decrement queue if necessary
      $(".jsavbackward").click(function() {
        var buttonGroup = $(this).parent();
        var parentAV = $(buttonGroup)
          .parent()
          .attr("id");
        PIFRAMES.callInjector(parentAV, 0);
      }),
      $(".jsavbegin").click(function() {
        var buttonGroup = $(this).parent();
        var parentAV = $(buttonGroup)
          .parent()
          .attr("id");
        PIFRAMES.callInjector(parentAV, -1);
      }),
      $(".jsavend").click(function() {
        var buttonGroup = $(this).parent();
        var parentAV = $(buttonGroup)
          .parent()
          .attr("id");
        PIFRAMES.callInjector(parentAV);
      });
  });*/

  var PIFrames = {
    questionType: "",
    submit: `<br><input type="submit" value="Submit"> </br>`,
    feedback: `<p hidden id="feedback">Incorrect!</p>`,
    ParseTree: null,
    //Peixuan added locations parameter to let people can change frames location
    Injector(data, av_name, skip_to, locations = {top: 10, left: 5}) {
      var obj = {
        myData: data,

        //if there are multiple frames on one page, we need a reference to the correct one
        av_name: av_name,

        //injection point for the reveal button
        buttonDiv: "SHOWQUESTION",

        //the injection point on canvas
        class: "PIFRAMES",

        //holds the slide questions
        queue: {
          elements: [],
          current: 0,
          slideCounter: 1,
          descriptionCounter: 0,
          lastEncounteredQuestionSlide: 1000
        },

        // user progress
        skip_to: skip_to,

        //used for dynamic resizing
        originalAVHeight: 0,
        originalAVWidth: 0,

        //current dynamic height of AV
        currentAVHeight: 0,
        currentAVWidth: 0,

        //may use this format if we decide to create a custom version of av.umsg()
        revealQuestionButton: $("<button />", {
          class: "revealbutton",
          text: "Show Question",
          onclick: `PIFRAMES.revealQuestion("${av_name}")`
        }),

        incrementQueue: function() {
          if (this.queue.current != this.queue.elements.length - 1) {
            this.queue.current++;
          }
        },

        decrementQueue: function() {
          if (this.queue.current > 0) {
            this.queue.current--;
          }
        },

        toggleButtonSpace(height) {
          this.currentAVHeight =
            $(`#${this.av_name}`).outerHeight() + 2 * height;
          $(`#${this.av_name}`).height(this.currentAVHeight + 2 * height);
        },

        // //expands the canvas at bottom to allow injection of question
        resizeContainer: function(height) {
          if (this.originalAVHeight == 0) {
            this.currentAVHeight = $(`#${this.av_name}`).outerHeight();
            this.originalAVHeight = this.currentAVHeight;
          }

          if ($(`.${this.buttonDiv}`).children().length > 0 && height == 0) {
            $(`.${this.buttonDiv}`).empty();
            this.updateCanvas(null);
          }

          if (height == 0) {
            $(`#${this.av_name}`).outerHeight(this.originalAVHeight);
            this.currentAVHeight = this.originalAVHeight;
          } else {
            this.currentAVHeight += 1.25 * height;
            $(`#${this.av_name}`).outerHeight(this.currentAVHeight);
          }
        },

        // expands the canvas to right to allow injection of question
        resizeContainerWidth: function(width) {
          if (this.originalAVWidth == 0) {
            this.currentAVWidth = $(`#${this.av_name}`).outerWidth();
            this.originalAVWidth = this.currentAVWidth;
          }

          if ($(`.${this.buttonDiv}`).children().length > 0 && width == 0) {
            $(`.${this.buttonDiv}`).empty();
            this.updateCanvas(null);
          }

          if (width == 0) {
            $(`#${this.av_name}`).outerWidth(this.originalAVWidth);
            this.currentAVWidth = this.originalAVWidth;
          } else {
            this.currentAVWidth += 1.25 * width;
            $(`#${this.av_name}`).outerWidth(this.currentAVWidth);
          }
        },

        appendQuestion: function() {
          var current = this.queue.current;
          var question = this.getQuestion(this.queue.elements[current]);

          if (question) {
            var theHtml = this.buildElement(question);
            this.updateCanvas(theHtml);

            // var childHeight = $(`#${this.av_name}`).children(`div.${this.class}`).outerHeight();
            // this.resizeContainer(childHeight);
          }
        },

        //TODO: may need to pass av_name in the future if there are multiple frames on the page
        //Peixuan updated selectors to the specfic one
        //so the css will not mess up if there are multiple frames on the page
        updateCanvas: function(theHtml) {
          /*if ($(`.${this.class}`).children().length > 0) {
            $(`.${this.class}`).empty();
            $(`.${this.class}`).append(theHtml);
          } else {
            $(`.${this.class}`).append(theHtml);
          }

          if ($(".PIFRAMES").find("iframe").length > 0) {
            $(".jsavoutput.jsavline").css("width", "0%");
            $(".jsavoutput.jsavline").css("display", "none");
            $(".picanvas").css({
              width: "900px",
              height: "600px"
            });
            $(".PIFRAMES").css({
              width: "100%",
              height: "100%",
              left: 50
            });
          } else {
            $(".jsavoutput.jsavline").css({
              display: "inline-block",
              width: "60%",
              "vertical-align": "top"
            });
            $(".picanvas").css({
              width: "0%",
              height: "100%"
            });
            $(".PIFRAMES").css({
              width: "100%",
              height: "none",
              left: 5,
              position: "relative",
              top: 10
            }); //Mostafa added position:re;ative to fix the problem related to miss positioning the question in some frames(Mathmatical.js)
            //So the width changed fromm 34 to 100, left from 690 to 5 and added the top.
          }*/
          if ($("#" + av_name + " > .canvaswrapper > .picanvas > .PIFRAMES").children().length > 0) {
            $("#" + av_name + " > .canvaswrapper > .picanvas > .PIFRAMES").empty();
            $("#" + av_name + " > .canvaswrapper > .picanvas > .PIFRAMES").append(theHtml);
          } else {
            $("#" + av_name + " > .canvaswrapper > .picanvas > .PIFRAMES").append(theHtml);
          }
          if ($("#" + av_name + " > .canvaswrapper > .picanvas > .PIFRAMES").find("iframe").length > 0) {
            $("#" + av_name + " > .jsavoutput.jsavline").css("width", "0%");
            $("#" + av_name + " > .jsavoutput.jsavline").css("display", "none");
            $("#" + av_name + " > .canvaswrapper > .picanvas").css({
              width: "900px",
              height: "600px"
            });
            $("#" + av_name + " > .canvaswrapper > .picanvas > .PIFRAMES").css({
              width: "100%",
              height: "100%",
              left: 50
            });
          } else {
            $("#" + av_name + " > .jsavoutput.jsavline").css({
              display: "inline-block",
              width: "60%",
              "vertical-align": "top"
            });
            $("#" + av_name + " > .canvaswrapper > .picanvas").css({
              width: "0%",
              height: "100%"
            });
            $("#" + av_name + " > .canvaswrapper > .picanvas > .PIFRAMES").css({
              width: "100%",
              height: "none",
              //left: 5,
              left: locations.left,
              position: "relative",
              //top: 10
              top: locations.top
              //Peixuan changed the left and top parameter so they can be used to adjust frames locations
            }); //Mostafa added position:re;ative to fix the problem related to miss positioning the question in some frames(Mathmatical.js)
            //So the width changed fromm 34 to 100, left from 690 to 5 and added the top.
          }
        },

        updateSlideCounter: function(jsavControl) {
          //jsavforward button clicked
          if (jsavControl == 1) {
            this.queue.slideCounter++;
          }

          //jsavback button clicked
          else if (jsavControl == 0) {
            if (this.queue.slideCounter > 1) this.queue.slideCounter--;
          }

          //jsavbegin button clicked, so reset questions and counter
          else if (jsavControl == -1) {
            this.queue.slideCounter = 1;
            this.lastEncounteredQuestionSlide = 1000;
            this.queue.current = 0;
          }
          //jump to end of slideshow, push queue pointer to last question
          else {
            this.queue.slideCounter = 1;
            this.queue.lastEncounteredQuestionSlide = 1;
            this.queue.current = this.queue.elements.length - 1;
          }
        },
        disableForwardButton: function() {
          var forwardButton = $(`#${this.av_name}`).find("span.jsavforward");
          $(forwardButton).css({
            "pointer-events": "none",
            "background-color": "silver"
          });
        },

        enableForwardButton: function() {
          var forwardButton = $(`#${this.av_name}`).find("span.jsavforward");
          $(forwardButton).css({
            "pointer-events": "auto",
            "background-color": "white"
          });
        },

        disableFastForwardButton: function() {
          var forwardButton = $(`#${this.av_name}`).find("span.jsavend");
          $(forwardButton).css({
            "pointer-events": "none",
            "background-color": "silver"
          });
          // $(forwardButton).css("visibility", "hidden");
        },

        enableFastForwardButton: function() {
          var forwardButton = $(`#${this.av_name}`).find("span.jsavend");

          $(forwardButton).css({
            "pointer-events": "auto",
            "background-color": "white"
          });
          // $(forwardButton).css("visibility", "visible");

          //forwardButton.click();
        },

        alertMessage: function() {
          var message = `<p class="REVEAL">You must answer the question to proceed forward.</p>`; //removed  Click Show Question since we removed the button
          return message;
        },

        getQuestion: function(id) {
          var key = this.myData.translations.en;
          var question = key[id];
          return question;
        },

        setStudentAnswer: function(id, answer) {
          this.myData.translations.en[id].studentAnswer = answer;
        },

        addQuestion: function(id, ParseTree) {
          this.ParseTree = ParseTree;
          this.queue.elements.push(id);

          var current = this.queue.descriptionCounter;
          var question = this.getQuestion(this.queue.elements[current]);
          this.queue.descriptionCounter++;

          if (question.description != undefined) {
            var message = `<p class="REVEAL">${question.description}</p>`;
            return message;
          }

          return this.alertMessage();
        },

        buildElement: function(question) {
          var type = question.type;

          questionType = type;
          switch (type) {
            case "multiple":
              return this.buildMultipleChoice(question);
            case "true/false":
            case "textBox":
            case "textBoxStrict":
            case "textBoxFuzzy":
              return this.buildTextBox(question);
            case "textBoxAny":
              return this.buildTextBoxAny(question);
            case "select":
              return this.buildSelectFromMultipleChoices(question);
            case "drawing":
            case "iframe":
              return this.buildiFrames(question);
          }
        },

        buildMultipleChoice: function(question) {
          var choices = question.choices;
          var execute = `PIFRAMES.saveAndCheckStudentAnswer("${this.av_name}")`;
          var form = $(
            `<form class=${this.av_name} onsubmit='return ${execute}'></form>`
          );
          var html = [];
          var header = `<p>${question.question}</p>`;
          html.push(header);
          for (var i = 0; i < choices.length; i++) {
            var radio = `<input type="radio" name=${this.av_name} value='${choices[i]}' style='margin-right: 5px'>${choices[i]}</></br>`;
            html.push(radio);
          }

          html.push(PIFrames.submit);
          html.push(PIFrames.feedback);

          return form.append(html.join(""));
        },

        buildTextBox: function(question) {
          var execute = `PIFRAMES.saveAndCheckStudentAnswer("${this.av_name}")`;
          var form = $(
            `<form class=${this.av_name} onsubmit='return ${execute}'></form>`
          );
          var html = [];
          var header = `<p>${question.question}</p>`;
          html.push(header);

          var answerHeader = `Answer:`;
          html.push(answerHeader);

          var textBox = `<br> <input type="text" name=${this.av_name} autofocus="autofocus" /> </br>`;
          html.push(textBox);

          html.push(PIFrames.submit);
          html.push(PIFrames.feedback);

          return form.append(html.join(""));
        },

        buildTextBoxAny: function(question) {
          var execute = `PIFRAMES.saveAndCheckStudentAnswer("${this.av_name}")`;
          var form = $(
            `<form class=${this.av_name} onsubmit='return ${execute}'></form>`
          );
          var html = [];
          var header = `<p>${question.question}</p>`;
          html.push(header);

          var answerHeader = `Answer:`;
          html.push(answerHeader);

          var textBox = `<br> <input type="text" name=${this.av_name} autofocus="autofocus" /> </br>`;
          html.push(textBox);

          html.push(PIFrames.submit);

          return form.append(html.join(""));
        },

        buildSelectFromMultipleChoices: function(question) {
          var choices = question.choices;
          var execute = `PIFRAMES.saveAndCheckStudentAnswer("${this.av_name}")`;
          var form = $(
            `<form class=${this.av_name} onsubmit='return ${execute}'></form>`
          );
          var html = [];
          var header = `<p>${question.question}</p>`;
          html.push(header);
          for (var i = 0; i < choices.length; i++) {
            var checkbox = `<input type="checkbox" name=${this.av_name} value='${choices[i]}' style='margin-right: 5px'>${choices[i]}</></br>`;
            html.push(checkbox);
          }

          html.push(PIFrames.submit);
          html.push(PIFrames.feedback);

          return form.append(html.join(""));
        },


        buildiFrames: function(question) {
          var src = question.src;
          var iframe = $(
            `<iframe id = "iframe" width="91%" height="600px" src=${src}></iframe>`
          );

          return iframe;
        },

        getAttempts: function() {
          let data = {
            "frame_name": av_name,
            "question":  this.queue.current,
          };
          $.ajax({
            url: "/pi_attempts/get_attempts",
            type: "POST",
            async: false,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            xhrFields: {
              withCredentials: true
            },
            success: function(data) {
              console.log(data)
            },
            error: function(err) {
              console.log(err)
            }
          });
        },

        getProgress: function() {
          let data = {
            "frame_name": av_name,
          };
          $.ajax({
            url: "/pi_attempts/get_progress",
            type: "POST",
            async: false,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            xhrFields: {
              withCredentials: true
            },
            success: function(data) {
              console.log(data)
            },
            error: function(err) {
              console.log(err)
            }
          });
        },

        saveAndCheckStudentAnswer(answer) {
          var current = this.queue.current;
          this.setStudentAnswer(this.queue.elements[current], answer);
          var question = this.getQuestion(this.queue.elements[current]);

          const correct = this.studentHasAnsweredQuestionCorrectly(this.queue.elements[current]);
          let data = {
            "frame_name": av_name,
            "question":  this.queue.current,
            "correct":   correct
          };
          $.ajax({
            url: "/pi_attempts",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            xhrFields: {
              withCredentials: true
            },
            success: function(data) {
              console.log(data)
            },
            error: function(err) {
              console.log(err)
            }
          });

          if (question.type == "textBoxAny") {
            //case where we accept any string as an answer
            this.setStudentAnswer(
              this.queue.elements[current],
              question.answer
            );
            this.enableForwardButton();

            //Peixuan updated selectors
            /*if ($("input[type=submit]").is(":visible")) {
              $("input[type=submit]").hide();
              $(".PIFRAMES").append(`<p>Answer: ${question.answer}</p>`);*/
            if ($("." + av_name + "> input[type=submit]").is(":visible")) {
              $("." + av_name + "> input[type=submit]").hide();
              $("#" + av_name + " > .canvaswrapper > .picanvas > .PIFRAMES").append(`<p>Answer: ${question.answer}</p>`);

              var forwardButton = $(`#${this.av_name}`).find(
                "span.jsavforward"
              );
              setTimeout(() => forwardButton.click(), 2000);
            }
          } else if (
            this.studentHasAnsweredQuestionCorrectly(
              this.queue.elements[current]
            )
          ) {
            this.enableForwardButton();

            //Peixuan updated selectors
            /*
              if ($("input[type=submit]").is(":visible")) {
                $("input[type=submit]").hide();
                var timeFlag = 1;
                if (question.correctFeedback != undefined) {
                  //Hide the button and show the correct statement
                  $(".PIFRAMES").append(
                    `<p>Correct: ${question.correctFeedback}</p>`
                  );
                  var timeFlag = 2;
                } else {
                  $(".PIFRAMES").append(`<p>Correct!</p>`);
                }
                var forwardButton = $(`#${this.av_name}`).find(
                  "span.jsavforward"
                );
                setTimeout(() => forwardButton.click(), 1000 * timeFlag);
              }

              //the last question in the slideshow has been answered correctly, so enable the jsavend button
              if (current == this.queue.elements.length - 1) {
                this.enableFastForwardButton();
              }
            } else {
              //scenario where student submits an answer on a slide, and then resubmits a wrong answer without switching slides
              if ($("input[type=submit]").is(":visible")) {
                $("input[type=submit]").hide();

                var timeFlag = 1;
                if (question.incorrectFeedback != undefined) {
                  document.getElementById("feedback").innerHTML =
                    "Incorrect: " + `${question.incorrectFeedback}`;
                  timeFlag = 2;
                }
                $("#feedback").show();
                this.disableForwardButton();
                setTimeout(() => {
                  $("input[type=submit]").show();
                  $("#feedback").hide();
                }, 1000 * timeFlag);
              }
            }*/
            if ($("." + av_name + "> input[type=submit]").is(":visible")) {
              $("." + av_name + "> input[type=submit]").hide();
              var timeFlag = 1;
              if (question.correctFeedback != undefined) {
                //Hide the button and show the correct statement
                $("#" + av_name + " > .canvaswrapper > .picanvas > .PIFRAMES").append(
                  `<p>Correct: ${question.correctFeedback}</p>`
                );
                var timeFlag = 2;
              } else {
                $("#" + av_name + " > .canvaswrapper > .picanvas > .PIFRAMES").append(`<p>Correct!</p>`);
              }
              var forwardButton = $(`#${this.av_name}`).find(
                "span.jsavforward"
              );
              setTimeout(() => forwardButton.click(), 1000 * timeFlag);
            }

            //the last question in the slideshow has been answered correctly, so enable the jsavend button
            if (current == this.queue.elements.length - 1) {
              this.enableFastForwardButton();
            }
          } else {
            //scenario where student submits an answer on a slide, and then resubmits a wrong answer without switching slides
            if ($("." + av_name + "> input[type=submit]").is(":visible")) {
              $("." + av_name + "> input[type=submit]").hide();

              var timeFlag = 1;
              if (question.incorrectFeedback != undefined) {
                $("." + av_name + "> #feedback").html("Incorrect: " + `${question.incorrectFeedback}`);
                timeFlag = 2;
              }
              $("." + av_name + "> #feedback").show();
              this.disableForwardButton();
              setTimeout(() => {
                $("." + av_name + "> input[type=submit]").show();
                $("." + av_name + "> #feedback").hide();
              }, 1000 * timeFlag);
            }
          }
        },

        studentHasAnsweredQuestionCorrectly: function(id) {
          var question = this.getQuestion(id);

          if (this.ParseTree != null) {
            return this.ParseTree(question.studentAnswer);
          }

          if (
            question.studentAnswer !== undefined &&
            question.type == "textBoxFuzzy"
          ) {
            return question.answer.includes(question.studentAnswer);
          } else if (
            question.studentAnswer !== undefined &&
            question.type == "textBox"
          ) {
            question.studentAnswer = question.studentAnswer.replace(/\s/g, "");
            question.studentAnswer = question.studentAnswer.toLowerCase();
            question.answer = question.answer.replace(/\s/g, "");
            question.answer = question.answer.toLowerCase();

            if (
              question.answer.includes("{") &&
              question.answer.includes("}")
            ) {
              return this.permutation(question.studentAnswer, question.answer);
            } else if (Array.isArray(question.answer)) {
              for (var index = 0; index < question.answer.length; index++) {
                if (question.studentAnswer == question.answer[index]) {
                  return true;
                }
              }
              return false;
            } else {
              return question.studentAnswer == question.answer;
            }
          } else if (Array.isArray(question.studentAnswer)) {
            if (question.studentAnswer.length !== question.answer.length)
              return false;
            var studentsAnswerSorted = question.studentAnswer.sort();
            var correctAnswerSorted = question.answer.sort();
            for (var i = 0; i < studentsAnswerSorted.length; i++) {
              if (studentsAnswerSorted[i] !== correctAnswerSorted[i])
                return false;
            }
            return true;
          } else {
            //all and textBoxStrictCase
            return question.studentAnswer == question.answer;
          }
        },

        permutation: function(studentAnswer, questionAnswer) {
          var length = studentAnswer.length == questionAnswer.length;
          var studentSet =
            studentAnswer.charAt(0) == "{" &&
            studentAnswer.charAt(studentAnswer.length - 1) == "}";
          var questionSet =
            questionAnswer.charAt(0) == "{" &&
            questionAnswer.charAt(questionAnswer.length - 1) == "}";

          if (length && studentSet && questionSet) {
            studentAnswer = studentAnswer.replace(/{/g, "");
            studentAnswer = studentAnswer.replace(/}/g, "");

            questionAnswer = questionAnswer.replace(/{/g, "");
            questionAnswer = questionAnswer.replace(/}/g, "");

            var studentArray = studentAnswer.split(",");
            var questionArray = questionAnswer.split(",");

            var map = new Map();

            for (var i = 0; i < studentArray.length; i++) {
              if (map.has(studentArray[i])) {
                map.set(studentArray[i], map.get(studentArray[i]) + 1);
              } else {
                map.set(studentArray[i], 1);
              }

              if (map.has(questionArray[i])) {
                map.set(questionArray[i], map.get(questionArray[i]) - 1);
              } else {
                map.set(questionArray[i], -1);
              }
            }

            //loop through and return that the values in all the maps are zero
            for (var j = 0; j < questionArray.length; j++) {
              if (map.get(questionArray[j]) !== 0) {
                return false;
              }
            }

            return true;
          }

          return false;
        },

        checkIfSlideHasQuestion: function(jsavControl) {
          this.updateSlideCounter(jsavControl);

          this.resizeContainer(0);
          // this.resizeContainerWidth(0);
          if ($(`#${this.av_name}`).find(".REVEAL").length) {
            // this.resizeContainer(0);
            //$(`.${this.buttonDiv}`).append(this.revealQuestionButton);
            var height = $(`.${this.buttonDiv}`).outerHeight();
            var width = $(`.${this.buttonDiv}`).outerWidth();
            //this.resizeContainer(4 * height);
            // this.resizeContainerWidth(4 * width);
            // this.toggleButtonSpace(height);
            this.questionSlideListener();
            PIFRAMES.revealQuestion(av_name);
            //Peixuan updated selector
            //$(".picanvas").css({
            $("#" + av_name + " > .canvaswrapper > .picanvas").css({
              display: "inline-block",
              width: "39%"
            });
          } else {
            this.updateCanvas(null);
            // this.resizeContainer(0);
            this.enableForwardButton();
            // $(".picanvas").css("width", "0px");
          }
        },

        //injects the appropriate question into the slide handler
        //disables forward button(s) if student hasn't answered the question correctly in the past
        questionSlideListener: function() {
          if (
            this.queue.slideCounter > this.queue.lastEncounteredQuestionSlide
          ) {
            this.incrementQueue();
            this.queue.lastEncounteredQuestionSlide = this.queue.slideCounter;
          }
          if (
            this.queue.slideCounter < this.queue.lastEncounteredQuestionSlide
          ) {
            this.decrementQueue();
            this.queue.lastEncounteredQuestionSlide = this.queue.slideCounter;
          }
          var current = this.queue.current;
          if (
             current < this.skip_to || this.studentHasAnsweredQuestionCorrectly(this.queue.elements[current])
          ) {
            this.enableForwardButton();
            // if (($(`#${this.av_name}`).find('.REVEAL').length)) {
            //     alert("You need to answer the question first");
            // }
          } else {
            this.disableForwardButton();
          }
        }
      };
      //Peixuan updated obj window reference
      //window.obj = obj;
      window[av_name + "Obj"] = obj;
      return obj;
    },

    callInjector(av_name, jsavControl) {
      this.table[av_name].checkIfSlideHasQuestion(jsavControl);
    },

    //Peixuan added locations parameter
    getQuestions(av_name, locations = {top: 10, left: 5}) {
      var json_url = $('script[src*="/' + av_name + '.js"]')[0].src + "on";
      var json_data;
      $.ajax({
        url: json_url,
        dataType: "json",
        async: false,
        success: function(data) {
          json_data = data;
        }
      });

      let data = {
        "frame_name": av_name,
      };

      var skip_to;
      // get user checkout
      $.ajax({
        url: "/pi_attempts/get_checkpoint",
        type: "POST",
        async: false,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {
          withCredentials: true
        },
        success: function(data) {
          skip_to = parseInt(data.result)
        },
        error: function(err) {
          skip_to = 2;
        }
      });


      var injector = this.Injector(json_data, av_name, skip_to, locations);
      PIFRAMES.table[av_name] = injector;

      if(skip_to !== 0){
        $(document).ready(function() {
          var counter = $("#"+av_name +" .jsavcounter").text().split("/");
          var limit = parseInt(counter[1]);
          var current = parseInt(counter[0]);
          while($("#"+av_name +" span.jsavforward").css("pointer-events") === "auto" && current < limit){
            current++;
            $("#"+av_name +" span.jsavforward").trigger("click");
          }
        });
      }

      return injector;
    },


    //add div to the av_name's picanvas, so that dynamic questions have a hooking point
    //Peixuan added locations parameter
    init(av_name, av, locations = {top: 10, left: 5}) {
      console.log(av_name + " init")
      var container = $(`#${av_name}`);

      var qButton = $("<div />", {
        class: "SHOWQUESTION"
      });

      var question = $("<div />", {
        class: "PIFRAMES"
      });

      //Peixuan updated selectors
      $("#" + av_name + " .picanvas").css({
        width: "0px",
        //overflow: "inherit"
        //Peixuan changed this style so it will display submit button correctly
        //if multiple frames on the same page
        overflow: "hidden"
      });

      $(question).css({
        position: "absolute",
        top: 69,
        left: 590,
        width: "34%",
        overflow: "hidden"
      });

      $("#" + av_name + " .jsavoutput.jsavline").css({
        display: "inline-block",
        width: "60%"
      });

      $("#" + av_name + " .jsavcanvas").css({
        "min-width": "0px",
        width: "60%",
        overflow: "hidden",
        "margin-left": 0,
        "min-height": "500px"
      });



      // $(".jsavcanvas").append(qButton);
      // $(".jsavcanvas").append(question);

      $(container).append(qButton);
      $(container).append(question);

      //Peixuan updated selectors, moved jsavControl buttons to here and added locations parameter
      /*
      $(".SHOWQUESTION,.PIFRAMES").wrapAll('<div class="picanvas"></div>');
      $(".picanvas").insertAfter($(".jsavcanvas"));



      $(".jsavcanvas,.picanvas").wrapAll('<div class="canvaswrapper"></div>');
      $(".canvaswrapper").css({
        display: "flex"
      });

      return this.getQuestions(av_name);*/

      $("#" + av_name + " > .SHOWQUESTION, #" + av_name + " > .PIFRAMES").wrapAll('<div class="picanvas"></div>');
      $("#" + av_name + " > .picanvas").insertAfter($("#" + av_name + " > .jsavcanvas"));

      $("#" + av_name + " > .jsavcanvas, #" + av_name + " > .picanvas").wrapAll('<div class="canvaswrapper"></div>');
      $("#" + av_name + " > .canvaswrapper").css({
        display: "flex"
      });

      //disable jsavend, as it allows student to jump to last slide
      //automatically enabled by injector once all questions for slideshow have been answered
      // $(".jsavend").css("pointer-events", "none");
      $("#" + av_name + " > .jsavcontrols > .jsavend").css("visibility", "hidden");

      //edge case: what if first slide has question?
      //1 signifies a forward click; used by injector to increment queue if necessary
      $("#" + av_name + " > .jsavcontrols > .jsavforward").click(function() {
        var buttonGroup = $(this).parent();
        var parentAV = $(buttonGroup)
          .parent()
          .attr("id");
        PIFRAMES.callInjector(parentAV, 1);
      }),
      //0 signifies a backward click; used by injector to decrement queue if necessary
      $("#" + av_name + " > .jsavcontrols > .jsavbackward").click(function() {
          var buttonGroup = $(this).parent();
          var parentAV = $(buttonGroup)
            .parent()
            .attr("id");
          PIFRAMES.callInjector(parentAV, 0);
        }),
      $("#" + av_name + " > .jsavcontrols > .jsavbegin").click(function() {
          var buttonGroup = $(this).parent();
          var parentAV = $(buttonGroup)
            .parent()
            .attr("id");
          PIFRAMES.callInjector(parentAV, -1);
        }),
      $("#" + av_name + " > .jsavcontrols > .jsavend").click(function() {
          var buttonGroup = $(this).parent();
          var parentAV = $(buttonGroup)
            .parent()
            .attr("id");
          PIFRAMES.callInjector(parentAV);
        });

      return this.getQuestions(av_name, locations);
    },

    revealQuestion: function(av_name) {
      this.table[av_name].appendQuestion();
    },

    saveAndCheckStudentAnswer: function(av_name) {
      form = $(`form.${av_name}`);
      if (questionType.includes("textBox")) {
        checked = form.children(`input[name=${av_name}]`)[0].value;
      } else if (questionType === "select") {
        //If we have more than answer selected, in case of checkboxes, create a list and push all answers inside the list
        checked = [];
        for (
          var i = 0;
          i < form.children(`input[name=${av_name}]:checked`).length;
          i++
        ) {
          checked.push(
            form.children(`input[name=${av_name}]:checked`)[i].defaultValue
          );
        }
      } else if (questionType === "multiple") {
        checked = form.children(`input[name=${av_name}]:checked`).val();
      }
      // console.log(checked);
      this.table[av_name].saveAndCheckStudentAnswer(checked);

      //prevents form from making crud call
      return false;
    }
  };
  PIFrames.table = {};
  //PIFrames.init = init;
  //PIFrames.addQuestion = addQuestion;
  window.PIFRAMES = PIFrames;
})(jQuery);
