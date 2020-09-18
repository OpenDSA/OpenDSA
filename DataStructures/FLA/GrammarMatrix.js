(function($) {
  "use strict";
  if (typeof JSAV === "undefined") { return; }
  var arrow = String.fromCharCode(8594);
  var defaultOptions = {style: "table",
                        autoresize: true,
                        center: true,
                        visible: true};
  /* Matrix data structure for JSAV library. */
  var GrammarMatrix = function(jsav, initialData, options) {
    this.jsav = jsav;
    this.options = options;
    if(initialData){
      this.productions = initialData;
      var i;
      if ($.isArray(initialData)) { // initialData contains an array of data
        this.options = $.extend({}, defaultOptions, options);
        options = this.options;
      } else if (typeof initialData === "object") { // initialData is options
        this.options = $.extend({}, defaultOptions, initialData);
        options = this.options; // cache the options
        // we'll create an initialData based on lines and columns options
        var temparr = [];
        initialData = [];
        temparr.length = options.columns;
        for (i = options.rows; i--; ) { initialData.push(temparr); }
      } else {
        console.error("Invalid arguments for initializing a matrix!");
      }
      this.element = options.element?$(options.element):$("<div class='jsavmatrix' />")
                                                        .appendTo(jsav.canvas); // add to DOM
      if ('id' in options) {
        this.id(options.id, {record: false});
      }
      // add a class for the style of the matrix
      this.element.addClass("jsavmatrix" + options.style);

      // create arrays within the matrix element
      // set visible to false to prevent the array from animating show
      var arrayOpts = $.extend({}, options, {center: false, visible: false}),
          arrayElem;

      // make sure we don't pass the matrix's id or positioning to the arrays
      delete arrayOpts.id;
      delete arrayOpts.left;
      delete arrayOpts.top;
      delete arrayOpts.relativeTo;
      this._arrays = [];
      for (i = 0; i < initialData.length; i++) {
        // create an element for the array and add to options
        arrayElem = $("<ol />");
        arrayOpts.element = arrayElem;
        this.element.append(arrayElem);
        // initialize the array
        this._arrays.push(new jsav.ds.array(initialData[i], arrayOpts));
        // set the array visible, visibility will be handled by the matrix element
        arrayElem.css("display", "block");
      }
      this.options = $.extend(true, {}, this.options);
      JSAV.utils._helpers.handlePosition(this);
      this.layout();
      JSAV.utils._helpers.handleVisibility(this, this.options);
      this.createRow(["" , arrow , ""]);
    }
    else{//no data so create empty grammar matrix object
      this.productions = [];
      this._arrays = [];
      this.element = options.element?$(options.element):$("<div class='jsavmatrix' />")
                                                        .appendTo(jsav.canvas); // add to DOM
      this.createRow(["" , arrow , ""]);
    }
  };

  JSAV.utils.extend(GrammarMatrix, JSAV._types.ds.JSAVDataStructure);
  var matrixproto = GrammarMatrix.prototype;


  // Function to fix all table column widths
  function layoutTable (mat, index) {
    // if column index is given, does layout for that column, otherwise lays out all columns
    if (typeof index === 'undefined') {
      for (var i = 0; i < mat._arrays[0]._indices.length; i++) {
        layoutColumn(mat, i);
      }
    } else {
      layoutColumn(mat, index);
    }
    mat.layout();
  };
  // Function to lay out a single column width
  matrixproto.layoutColumn = function (index) {
    var maxWidth = 100;     // default cell size
    /*for (var i = 0; i < mat._arrays.length; i++) {
        var cell = mat._arrays[i]._indices[index].element;
        if ($(cell).width() > maxWidth) {
          maxWidth = $(cell).width();
        }
    }*/
    for (var i = 0; i < this._arrays.length; i++) {
        if (typeof this._arrays[i]._indices[index] !== undefined){
          var cell = this._arrays[i]._indices[index].element;
          if ($(cell).width() > maxWidth) {
          maxWidth = $(cell).width();
        }
      }
    }
    if (maxWidth > 100) {
      for (var i = 0; i < this._arrays.length; i++) {
        var cell = this._arrays[i]._indices[index].element;
        $(cell).find('.jsavvalue').width(maxWidth);
      }
    }
  };
  matrixproto.layout = function(options){
    for (var i = 0; i < this._arrays[0]._indices.length; i++) {
      this.layoutColumn(i);
    }
    this._arrays.forEach(element => {
      element.layout();
    });
    var dimensions, i,
        l = this._arrays.length,
        maxWidth = -1;
    // if we want to center the structure, add the css class to do that
    if (this.options.center) {
      this.element.addClass("jsavcenter");
    }
    for (i = 0; i < l; i++) {
      dimensions = this._arrays[i].layout(options);
      maxWidth = Math.max(maxWidth, dimensions.width);
    }
    this.element.width(maxWidth + "px");
  }
  matrixproto.value = function (row, column, newValue = null){
    if(newValue === null){ //get the value at row and column
      if(row >= this.productions.length && row == this._arrays.length - 1)//get the value of the empty row
        return null;
      return this.productions[row][column];
    }
    else //set the value
    this._arrays[row]._indices[column].value(newValue);
  }

  matrixproto.unhighlight = function(index){
    if(index && index < this._arrays.length){
      this._arrays[index].unhighlight();
    } else {
      for(var i = 0; i<this._arrays.length; i++)  {
        this._arrays[i].unhighlight();
        //var row = this._arrays[i];
        /*for(var j = 0; j<row._indices.length; j++){
            row.unhighlight(j);
        }*/
      }
    }
  }
  
  matrixproto.highlight = function(index){
    if(index !== undefined && index < this._arrays.length){
      this._arrays[index].highlight();
    } else {
      for(var i = 0; i<this._arrays.length; i++)  {
        this._arrays[i].highlight();
        //var row = this._arrays[i];
        /*for(var j = 0; j<row._indices.length; j++){
            row.unhighlight(j);
        }*/
      }
    }
  }
  matrixproto.addEmptyRow = function(){
    if(!(this._arrays.length > 0 && this._arrays[this._arrays.length - 1]._values[0] === "")){//there is no empty line
      this.createRow(["", arrow, ""]);
    }
  }

  matrixproto.appendRow = function(row){
    //if(this._arrays.length > 0 && this._arrays[this._arrays.length - 1]._values[0] === ""){//there is an empty row, so fill it instead of adding a new row
      this.value(this._arrays.length - 1, 0, row[0]);
      this.value(this._arrays.length - 1, 2, row[2]);
      //return;
    //}
    this.createRow(["", arrow, ""]);
  }

  matrixproto.createRow = function(row){
    var arrayOpts = $.extend({}, this.options, {center: false, visible: true}),
        arrayElem;
    // make sure we don't pass the matrix's id or positioning to the arrays
    delete arrayOpts.id;
    delete arrayOpts.left;
    delete arrayOpts.top;
    delete arrayOpts.relativeTo;
    arrayElem = $("<ol />");
    arrayOpts.element = arrayElem;
    this.element.append(arrayElem);
    // initialize the array
    this._arrays.push(new this.jsav.ds.array(row, arrayOpts));
    // set the array visible, visibility will be handled by the matrix element
    arrayElem.css("display", "block");
    this.options = $.extend(true, {}, this.options);
    JSAV.utils._helpers.handlePosition(this);
    this.layout();
    JSAV.utils._helpers.handleVisibility(this, arrayOpts);
  }
  matrixproto.getProductions = function(){
    return $.extend(true,[],this.productions);
  }

  matrixproto.getProductionsForSpecificVariable = function (variable){
    var result = [];
    for(var i = 0; i< this.productions.length; i++){
      var production = this.productions[i];
      if(production[0] === variable)
        result.push(production);
    }
    return result;
  }

  matrixproto.addNewProductionRule = function (rule){
    var rhs = rule[2];
    if(rhs.indexOf('|') > 0){
      var lhs = rule[0];
      var newRHS = rhs.split('|');
      for (var i = 0; i< newRHS.length; i++){
        var newRule = [lhs, arrow, newRHS[i]];
        this.productions.push(newRule);
        this.appendRow(newRule);
      }
    }
    else    {
      this.productions.push(rule);
      this.appendRow(rule);
    }
  }

  matrixproto.clear = function(){
    this.productions = [];
    this._arrays = [];
    if (this.element) {
      this.element.remove();
    }  }

  matrixproto.createNewMatrix = function(newProductions){
    this.productions = newProductions;
    this.element.addClass("jsavmatrix" + options.style);
    // create arrays within the matrix element
    // set visible to false to prevent the array from animating show
    var arrayOpts = $.extend({}, options, {center: false, visible: false}),
        arrayElem;

    // make sure we don't pass the matrix's id or positioning to the arrays
    delete arrayOpts.id;
    delete arrayOpts.left;
    delete arrayOpts.top;
    delete arrayOpts.relativeTo;
    this._arrays = [];
    for (i = 0; i < newProductions.length; i++) {
      // create an element for the array and add to options
      arrayElem = $("<ol />");
      arrayOpts.element = arrayElem;
      this.element.append(arrayElem);
      // initialize the array
      this._arrays.push(new this.jsav.ds.array(newProductions[i], arrayOpts));
      // set the array visible, visibility will be handled by the matrix element
      arrayElem.css("display", "block");
    }
    this.options = $.extend(true, {}, options);
    JSAV.utils._helpers.handlePosition(this);
    this.layout();
    JSAV.utils._helpers.handleVisibility(this, this.options);
  }

  matrixproto.highlightCell = function(row, col){
    this._arrays[row]._indices[col]
  }

  matrixproto.modifyProduction = function(row, col, newValue){
    this._arrays[row]._indices[col].value(newValue);
    var oldProduction, newProduction;
    oldProduction = this.productions[row];
    if(col === 0)//change the variable
      newProduction = [newValue , arrow , oldProduction[2]];
    else
      newProduction = [oldProduction[0] , arrow , newValue];
    
    this.productions.splice(row, 1, newProduction);
  }

  matrixproto.getGrammarVariables = function(){
    var variables = new Set();
    variables.add(this.productions[0][0]);
    for(var i = 1; i< this.productions.length; i++){
      variables.add(this.productions[i][0]);
    }
    return Array.from(variables);
  }

  matrixproto.getUnitProductions = function(){
    var unitProductions = _.filter(this.productions, function(x) {
      return x[2].length === 1 && variables.indexOf(x[2]) !== -1;
    });
    return unitProductions;
  }

  matrixproto.highlightProductionWithVariableOccurance = function(productionVariable){
    for(var i = 0; i<this._arrays.length; i++)  {
      var row = this._arrays[i];
      for(var j= 0; j< row._indices.length; j++)
        if(row._indices[j].value().includes(productionVariable)){
          for(var k = 0; k<row._indices.length; k++){
            row.highlight(k);
        }
      }
    }
  }

  matrixproto.highlightProduction = function(productionVariable){
    for(var i = 0; i<this._arrays.length; i++)  {
      var row = this._arrays[i];
      if(row._indices[0].value() === productionVariable){
        for(var j = 0; j<row._indices.length; j++){
          row.highlight(j);
        }
      }
    }
  }
  matrixproto.hideRow = function(index){
    this._arrays[index].hide();
  }

  matrixproto.showRow = function(index){
    this._arrays[index].show();
  }

  matrixproto.highlightProductionGivenFromTO = function(from, to){
    for(var i = 0; i<this._arrays.length; i++)  {
      var row = this._arrays[i];
      if(row._indices[0].value() === from){
        for(var j= 0; j< row._indices.length; j++)
          if(row._indices[j].value().includes(to)){
            for(var k = 0; k<row._indices.length; k++){
              row.highlight(k);
          }
        }
      }
    }
  }

  matrixproto.removeProduction = function(index){
    this.productions.splice(index, 1);
    this._arrays.splice(index, 1);
    this.element[0].removeChild(this.element[0].children[index])
  }

  matrixproto.findProduction = function(toAdd){
    if (_.map(this.productions, function(x) {return x.join('');}).indexOf(toAdd) !== -1) {
      return true;
    }
    return false;
  }

  // events to register as functions on the matrix
  var events = ["click", "dblclick", "mousedown", "mousemove", "mouseup",
                "mouseenter", "mouseleave"];
  // returns a function for the passed eventType that binds a passed
  // function to that eventType for indices in the arrays
  var eventhandler = function(eventType) {
    return function(data, handler) {
      // store reference to this, needed when executing the handler
      var self = this;
      // bind a jQuery event handler, limit to .jsavindex
      this.element.on(eventType, ".jsavindex", function(e) {
        var targetArray = $(this).parent();
        // get the row of the clicked element
        var row = self.element.find(".jsavarray").index(targetArray);
        var col = targetArray.find(".jsavindex").index(this);
        // log the event
        self.jsav.logEvent({type: "jsav-matrix-" + eventType,
                            matrixid: self.id(),
                            row: row,
                            column: col});
        if ($.isFunction(data)) { // if no custom data..
          // ..bind this to the matrix and call handler
          // with params row and column and the event
          data.call(self, row, col, e);
        } else if ($.isFunction(handler)) { // if custom data is passed
          var params = $.isArray(data)?data.slice(0):[data]; // get a cloned array or data as array
          params.unshift(col); // add index to first parameter
          params.unshift(row); // add index to first parameter
          params.push(e); // jQuery event as the last
          handler.apply(self, params); // apply the function
        }
      });
      return this;
    };
  };
  // create the event binding functions and add to array prototype
  for (i = events.length; i--; ) {
    matrixproto[events[i]] = eventhandler(events[i]);
  }
  matrixproto.on = function(eventName, data, handler) {
    eventhandler(eventName).call(this, data, handler);
    return this;
  };


window.GrammarMatrix = GrammarMatrix;
})(jQuery);