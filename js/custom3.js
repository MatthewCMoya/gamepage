
/*------------------------------
Square class*/
function Square(r, c){
  /*Instance variables each square will track of itself*/
  this.c = c;
  this.r = r;
  this.alive = false; // default to dead.

  /* Return a string of CSS classes seperated by spaces*/
  this.css_class = function(){
    var _classes = ['square'];
    if (this.alive === true){
      _classes.push('alive');
    }
    return _classes.join(' ');
  };

  /* Return a string of html for this square*/
  this.as_html = function(){
    return '<div class="'+this.css_class()+'" data-c="'+this.c+'" data-r="'+this.r+'"></div>';
  };
}

/*-------------------------------
Grid*/
function Grid(row_count, col_count, selector){
  this.row_count = row_count;
  this.col_count = col_count;
  this.selector = selector;

  this.build_rows = function(){
    var _rows = [],
        _squareInstance
    for (var r = 0; r <= this.row_count-1; r++) {
      _rows[r] = [];
      for (var c = 0; c <= col_count-1; c++) {
        _squareInstance = new Square(r, c);
        _rows[r][c] = _squareInstance;
      }

    }
    return _rows;
  };


  this.generation = [this.build_rows(),this.build_rows()];

  this.alive_neighbor_count = function(square){
    var _count = 0,
        _neighbors = this.get_neighbors(square),
        _neighbor_count = Object.keys(_neighbors).length - 1

    for (var n = 0; n <= _neighbor_count; n++){
      var key = Object.keys(_neighbors)[n];
      if(_neighbors[key] !== null){
        if(_neighbors[key].alive){
          _count++;
        }
      }
    }
    return _count;
  };

  this.get_neighbors = function(square){
    var _r = square.r;
    var _c = square.c;

    return {
      'top_left': this.find(0, _r-1,_c-1),
      'top': this.find(0, _r-1, _c),
      'top_right': this.find(0, _r-1, _c+1),
      'right': this.find(0, _r, _c+1),
      'bottom_right': this.find(0, _r+1, _c+1),
      'bottom': this.find(0, _r+1, _c),
      'bottom_left': this.find(0, _r+1, _c-1),
      'left': this.find(0, _r, _c-1)
    };
  };

  this.update_dom = function(){
    $(this.selector).html(''); //clear grid before we begin.
    for (var r = 0; r <= this.row_count-1; r++) {
      $(this.selector).append('<div class="row clearfix"></div>');
      var _current_row = $(this.selector+ ' .row')[r];
      for (var c = 0; c <= this.col_count-1; c++) {
        $(_current_row).append(this.generation[0][r][c].as_html());
      }
    }
  };

  /*return null or a square object*/
  this.find = function(g,r,c){
    if (this.generation[g][r] === undefined){ return null; }
    if (this.generation[g][r][c] === undefined){ return null; }
    return this.generation[g][r][c];
  };

  /*run the game loop*/
  this.each_square = function(fn){
    for (var r = 0; r <= this.row_count-1; r++) {
      for (var c = 0; c <= this.col_count-1; c++) {
        fn(this.generation[0][r][c]);
      }
    }
  };

  this.reset = function(){
    grid.generation[0] = this.build_rows();
    grid.update_dom(); // draw for the first time.
  };

  this.glider = function(){
    grid.generation[0][4][3].alive = true;
    grid.generation[0][4][4].alive = true;
    grid.generation[0][4][5].alive = true;
    grid.generation[0][3][5].alive = true;
    grid.generation[0][2][4].alive = true;
  };

  this.solid_line = function(){
    var _h=Math.ceil(this.row_count/2);
    for(var i=0;i<this.col_count;i++){
      grid.generation[0][_h][i].alive = true;
    }
  };

  this.random = function(){
    for(var i=0;i<this.row_count+this.col_count;i++){
      var _r = get_rand(0,this.row_count),
          _c = get_rand(0,this.col_count);
      grid.generation[0][_r][_c].alive = true;
    }
  };
}

function get_rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/*Implimentation*/
var cols = 30;
var rows = 30;
var grid = new Grid(rows, cols, '#grid');
var interval = 1; // miliseconds
var loop_interval;

grid.reset(); // draw for the first time.
grid.update_dom(); // draw for the first time.



/*Bind the buttons*/
$('#start').click(function(){
  loop_interval = setInterval(function(){

    // loop over each square, and apply rules to next gen
    grid.each_square(function(square){
      var _r = square.r,
          _c = square.c,
          _alive_neighbor_count = grid.alive_neighbor_count(square);
      if(square.alive === true){ grid.generation[1][_r][_c].alive = true;} // survive
      if(_alive_neighbor_count < 2 && square.alive){grid.generation[1][_r][_c].alive = false;}   // lonely
      if(_alive_neighbor_count > 3 && square.alive){grid.generation[1][_r][_c].alive = false;}   // crowded
      if(_alive_neighbor_count === 3 && !square.alive){grid.generation[1][_r][_c].alive = true;}  // reproduction
    });

    /*Swap the generations*/
    grid.generation[0] = grid.generation[1].slice(0); //clone
    grid.generation[1] = grid.build_rows(); // new generation

    // update the dom
    grid.update_dom();
    console.count('generation');

  },interval);
});

$(function(){
  // TODO: MAKE THIS A CONCERN OF Square object
  $('#grid').on('click','.square',function(){
    var _r = $(this).data('r'),
        _c = $(this).data('c');
    grid.generation[0][_r][_c].alive = true;
    grid.update_dom();
  });

  $('#reset').click(function(){
    grid.reset();
    grid.update_dom();
  });

  $('#glider').click(function(){
    grid.glider();
    grid.update_dom();
  });

  $('#solid_line').click(function(){
    grid.solid_line();
    grid.update_dom();
  });


  $('#random').click(function(){
    grid.random();
    grid.update_dom();
  });


  $('#stop').click(function(){
    clearInterval(loop_interval);
  });

});






