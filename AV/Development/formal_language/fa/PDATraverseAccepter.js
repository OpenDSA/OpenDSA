var willReject = function(graph, inputString){
  graph.initial.addClass('current');
  var configurations = $("<ul>");
  var currentStates = [new Configuration(graph.configurations, graph.initial, ['Z'], inputString, 0)];
  currentStates = graph.addLambdaClosure(currentStates);
  var configArray = graph.jsav.ds.array(graph.configurations);
  // var configViews = [];
  graph.configViews.push(configArray.element);
  //var $configView = $('#configurations');
  //$configView.empty();
  //$configView.append(this.configViews[0]);

  //this.jsav.displayInit();

  configurations = $("<ul>");
  for (var j = 0; j < currentStates.length; j++) {
    currentStates[j].update();
  }

  configArray = graph.jsav.ds.array(graph.configurations);
  //this.configViews.push(configArray.element);

  var cur;
  counter = 0;
  var stringAccepted = false;
  while (true) {
    //this.jsav.step();
    counter++;
    if (counter > 500) {
      break;
    }
    for (var j = 0; j < currentStates.length; j++) {
      currentStates[j].state.removeClass('current');
      currentStates[j].state.removeClass('accepted');
      currentStates[j].state.removeClass('rejected');
    }
    cur = graph.traverse(currentStates);
    if (cur.length === 0) {
      break;
    }
    currentStates = cur;

    tconfigurations = $("<ul>");
    for (var j = 0; j < currentStates.length; j++) {
      if (currentStates[j].curIndex === inputString.length) {
        if (currentStates[j].state.hasClass('final')) {
          currentStates[j].state.addClass('accepted');
          stringAccepted = true;
        }
      }
      currentStates[j].update();
    }
    configArray = graph.jsav.ds.array(this.configurations);
    //this.configViews.push(configArray.element);
  }

  return !stringAccepted;
}

// Configuration object
var Configuration = function(configurations, state, stack, str, index) {
  this.state = state;
  this.inputString = str;
  this.curIndex = index;
  this.stack = stack.slice(0);
  this.element = $('.configuration').last().clone();
  this.update = function() {
    this.element.find('#currentState').text(this.state.value());
    this.element.find('#readInput').text(this.inputString.substring(0, this.curIndex));
    this.element.find('#unreadInput').text(this.inputString.substring(this.curIndex, this.inputString.length));
    this.element.find('#stack').text(this.stack.join());
    this.element.removeClass('configNormal').removeClass('configAccepted').removeClass('configRejected');
    if (this.state.hasClass('accepted')) {
      this.element.addClass('configAccepted');
    } else if (this.state.hasClass('rejected')) {
      this.element.addClass('configRejected');
    } else {
      this.element.addClass('configNormal');
    }
    var newL = $("<li>");
    newL.append(this.element);
    configurations.append(newL);
    this.element.show();
  }
  /*this.toString = function() {
    return this.state.value() + ' ' + this.inputString.substring(0, this.curIndex) + ' ' + this.stack.join();
  }*/
};