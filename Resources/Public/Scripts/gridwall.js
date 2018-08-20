var MIWeb = MIWeb || {};
MIWeb.GridWall = function(container, options) {
  this.container = container;

  this.config = {
    height: 'min', //defines base row height (final row size gets calculated); possible values: 'min', 'max', 'avg', [number(px)]
    maxCols: false, //max cols per row; possible values: false (no limit), [number]
    zoom: 'overlay' //zoom mode; possible values: 'overlay','popup'
  };
  if(options) {
    for(var field in options) {
      this.config[field] = options[field];
    }
  }

  this.init();
};
MIWeb.GridWall.prototype.init = function() {
  var gridwall = this;

  //remove text nodes (whitespaces)
  var n, a=[], walk=document.createTreeWalker(this.container,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) {
    a.push(n);
  }
  for(var n = 0; n < a.length; n++) {
    a[n].parentNode.removeChild(a[n]);
  }

  if(!this.hasClass(this.container, 'gridwall')) {
    this.addClass(this.container, 'gridwall')
  }

  if(!this.elements) {
    this.elements = document.createElement("div");
    this.elements.className = "gridwall-element-container";
    while(this.container.children.length > 0) {
      this.elements.appendChild(this.container.children[0]);
    }
    this.container.appendChild(this.elements);
  }

  //calc orientation values
  var rowHeight = this.calcRowHeight();
  var canvasSize = {
    x: this.container.clientWidth,
    y: this.container.clientHeight
  };

  //calc element sizes
  var rowStart = 0;
  var rowSize = 0;
  for(var c = 0; c < this.elements.children.length; c++) {
    var child = this.elements.children[c];

    //wrap element if its not wrapped already
    if(!this.hasClass(child, "gridwall-element")) {
      var childWrapper = document.createElement("div");
      childWrapper.className = 'gridwall-element';
      child.parentNode.insertBefore(childWrapper, child);
      childWrapper.appendChild(child);
      child = childWrapper;
    }

    var sizeFactor = rowHeight /  child.clientHeight;
    child.style.width = (child.clientWidth * sizeFactor / canvasSize.x * 100) + '%';

    //resize elements to fill a row
    rowSize += child.clientWidth;
    if(rowSize > canvasSize.x || c === this.elements.children.length - 1 || (this.config.maxCols && c >= rowStart + this.config.maxCols - 1)) {
      var overflow = rowSize - canvasSize.x;
      var colCount = c - rowStart + 1;
      var modifiedRowHeight = canvasSize.x / rowSize * rowHeight;
      for(var rc = rowStart; rc <= c; rc++) {
        var rowChild = this.elements.children[rc];
        rowChild.style.width = (canvasSize.x / rowSize * rowChild.clientWidth / canvasSize.x * 100) + '%';
      }

      rowStart = c + 1;
      rowSize = 0;
    }

    //add zoom events
    child.onclick = function() {
      if(gridwall.config.zoom === 'overlay') {
        gridwall.addClass(gridwall.container, 'zoomed');
        gridwall.overlay.innerHTML = this.innerHTML;
        //gridwall.overlay.style.display = 'block';
      } else if(gridwall.config.zoom === 'popup') {
        //gridwall.addClass(gridwall.container, 'zoomed');
        gridwall.addClass(gridwall.popup, 'opened');
        gridwall.popup.innerHTML = this.innerHTML;
      }
    };
  }

  //create overlay
  if(!this.overlay) {
    this.overlay = document.createElement("div");
    this.overlay.className = "gridwall-overlay";
    this.overlay.onclick = function() {
      gridwall.removeClass(gridwall.container, 'zoomed');
    };
    this.container.appendChild(this.overlay);
  }

  //create popup
  if(!this.popup) {
    this.popup = document.createElement("div");
    this.popup.className = "gridwall-popup";
    this.popup.onclick = function() {
      gridwall.removeClass(gridwall.popup, 'opened');
    };
    document.getElementsByTagName('body')[0].appendChild(this.popup);
  }
};

MIWeb.GridWall.prototype.calcRowHeight = function(start,length) {
  start = start || 0;
  length = length || (this.elements.children.length - start);

  var rowHeight = false;
  if(this.config.height === 'min' || this.config.height === 'max' || this.config.height === 'avg') {
    for(var c = start; c < start + length; c++) {
      var childHeight = this.elements.children[c].clientHeight;
      var childWidth = this.elements.children[c].clientWidth;
      if(childWidth > this.elements.clientWidth) {
        childHeight *= this.elements.clientWidth / childWidth;
      }
      if(childHeight > 0 && (rowHeight === false || (
        (this.config.height === 'min' && childHeight < rowHeight)
        || (this.config.height === 'max' && childHeight > rowHeight)
        || this.config.height === 'avg'
      ))) {
        if(this.config.height === 'avg') {
          rowHeight += childHeight;
        } else {
          rowHeight = childHeight;
        }
      }
    }
    if(this.config.height === 'avg') {
      rowHeight = rowHeight / this.elements.children.length;
    }
  } else {
    rowHeight = this.config.height;
  }

  return rowHeight || 0;
}

MIWeb.GridWall.prototype.hasClass = function(elem, className) {
  return (" " + elem.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + className + " ") > -1;
};

MIWeb.GridWall.prototype.addClass = function(elem, className) {
  if(this.hasClass(elem, className)) {
    return;
  }
  elem.className += " " + className;
};

MIWeb.GridWall.prototype.removeClass = function(elem, className) {
  if(!this.hasClass(elem, className)) {
    return;
  }
  elem.className = (" " + elem.className + " ").replace(/[\n\t]/g, " ").replace(" " + className + " "," ").trim();
};
