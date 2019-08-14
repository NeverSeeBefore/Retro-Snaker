var XLEN = 30;
var YLEN = 30;
// 小方块宽度
var SQUAREWIDTH = 20;
// 刷新时间
var SPEED = 3;

// 游戏场景位置
var BASE_X_POINT = 200;
var BASE_Y_POINT = 100;

var SNAKE_HEAD_COLOR = 'deeppink';
var SNAKE_BODY_COLOR = 'blue';
var FLOOR_COLOR = 'orange';
var STONE_COLOR = 'black'
var FOOD_COLOR = 'red';


function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}
Square.prototype.touch = function () {
    console.log('touch');
};
Square.prototype.update = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREWIDTH + 'px';
}

var Floor = tool.extends(Square);
var Stone = tool.extends(Square);
var Food = tool.single(Square);
var SnakeHead = tool.single(Square);
var SnakeBody = tool.extends(Square);
var Snake = tool.single();
var Ground = tool.single(Square);

var Game = tool.single();

var STRATEGY_MESSAGE_ENUM = {
    MOVE: 'move',
    EAT: 'eat',
    DIE: 'die'
}

