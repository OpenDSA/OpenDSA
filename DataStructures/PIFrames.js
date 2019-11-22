/** mbhatia@vt.edu */
(function($) {
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
  });

  var PIFrames = {
    questionType: "",
    submit: `<br><input type="submit" value="Submit"> </br>`,
    feedback: `<p hidden id="feedback">Incorrect!</p>`,
    Injector(data, av_name) {
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
          lastEncounteredQuestionSlide: 1000
        },

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
        updateCanvas: function(theHtml) {
          if ($(`.${this.class}`).children().length > 0) {
            $(`.${this.class}`).empty();
            $(`.${this.class}`).append(theHtml);
          } else {
            $(`.${this.class}`).append(theHtml);
          }

          if ($(".PIFRAMES").find("iframe").length > 0) {
            $(".jsavoutput.jsavline").css("display", "none");
            $(".picanvas").css({
              width: "900px",
              height: "600px"
            });
            $(".PIFRAMES").css({
              width: "100%",
              height: "100%"
            });
          }
          // else {
          //     $(".jsavoutput.jsavline").css({
          //         "display": "inline-block",
          //         "width": "70%",
          //         "vertical-align": "top"
          //     });
          //     $(".picanvas").css({
          //         "width": "0%",
          //         "height": "100%"
          //     });
          //     $(".PIFRAMES").css("height", "");
          // }
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

        injectQuestion: function(id) {
          this.queue.elements.push(id);
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
              return this.buildTextBox(question);
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
            `<iframe width="91%" height="600px" src=${src}></iframe>`
          );

          return iframe;
        },

        saveAndCheckStudentAnswer(answer) {
          var current = this.queue.current;
          this.setStudentAnswer(this.queue.elements[current], answer);
          if (
            this.studentHasAnsweredQuestionCorrectly(
              this.queue.elements[current]
            )
          ) {
            this.enableForwardButton();
            //Hide the button and show the correct statement
            if ($("input[type=submit]").is(":visible")) {
              $("input[type=submit]").hide();
              $(".PIFRAMES").append(`<p>Correct!</p>`);

              var forwardButton = $(`#${this.av_name}`).find(
                "span.jsavforward"
              );
              setTimeout(() => forwardButton.click(), 1000);
            }

            //the last question in the slideshow has been answered correctly, so enable the jsavend button
            if (current == this.queue.elements.length - 1) {
              this.enableFastForwardButton();
            }
          } else {
            //scenario where student submits an answer on a slide, and then resubmits a wrong answer without switching slides
            if ($("input[type=submit]").is(":visible")) {
              $("input[type=submit]").hide();
              $("#feedback").show();
              this.disableForwardButton();

              setTimeout(() => {
                $("input[type=submit]").show();
                $("#feedback").hide();
              }, 1000);
            }
          }
        },

        studentHasAnsweredQuestionCorrectly: function(id) {
          var question = this.getQuestion(id);

          if(this.questionType == "textBox" && question.studentAnswer !== undefined)
          {
            if (question.answer.includes("{") && question.answer.includes("}"))
            {
              return this.permutation(question.studentAnswer, question.answer);
            }
            else if(Array.isArray(question.answer))
            {
              for(var index = 0; index < question.answer.length; index++)
              {
                if(question.studentAnswer == question.answer[index])
                {
                  return true;
                }
              }
              return false;
            }
            else
            {
              return question.studentAnswer == question.answer;
            }
          } else if (Array.isArray(question.studentAnswer)) {

            console.log("selectquestion");
            if (question.studentAnswer.length !== question.answer.length)
              return false;
            var studentsAnswerSorted = question.studentAnswer.sort();
            var correctAnswerSorted = question.answer.sort();
            for (var i = 0; i < studentsAnswerSorted.length; i++) {
              if (studentsAnswerSorted[i] !== correctAnswerSorted[i])
                return false;
            }
            return true;
          } else 
          {
            console.log("direct comparison")
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
            $(".picanvas").css({
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
            this.studentHasAnsweredQuestionCorrectly(
              this.queue.elements[current]
            )
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
      return obj;
    },

    callInjector(av_name, jsavControl) {
      this.table[av_name].checkIfSlideHasQuestion(jsavControl);
    },
    getQuestions(av_name) {
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

      var injector = this.Injector(json_data, av_name);
      PIFRAMES.table[av_name] = injector;

      return injector;
    },

    //add div to the av_name's picanvas, so that dynamic questions have a hooking point
    init(av_name, av) {
      var container = $(`#${av_name}`);

      var qButton = $("<div />", {
        class: "SHOWQUESTION"
      });

      var question = $("<div />", {
        class: "PIFRAMES"
      });

      $(".picanvas").css({
        width: "0px",
        overflow: "hidden"
      });
      // $(qButton).css({
      //     "padding-left": "5px"
      // });
      $(question).css({
        position: "absolute",
        width: "29%",
        overflow: "hidden"
      });

      $(".jsavoutput.jsavline").css({
        display: "inline-block",
        width: "60%"
      });

      $(".jsavcanvas").css({
        "min-width": "0px",
        width: "60%",
        overflow: "hidden",
        "margin-left": 0
      });

      // $(".jsavcanvas").append(qButton);
      // $(".jsavcanvas").append(question);
      $(container).append(qButton);
      $(container).append(question);

      $(".SHOWQUESTION,.PIFRAMES").wrapAll('<div class="picanvas"></div>');
      $(".picanvas").insertBefore($(".jsavcanvas"));
      return this.getQuestions(av_name);
    },

    revealQuestion: function(av_name) {
      this.table[av_name].appendQuestion();
    },

    saveAndCheckStudentAnswer: function(av_name) {
      form = $(`form.${av_name}`);
      if (questionType === "textBox") {
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
      console.log(checked);
      this.table[av_name].saveAndCheckStudentAnswer(checked);

      //prevents form from making crud call
      return false;
    }
  };
  PIFrames.table = {};
  window.PIFRAMES = PIFrames;
})(jQuery);
