var oSnake = new Snake();
// 蛇头蛇尾
oSnake.head = null;
oSnake.tail = null;

var DIRECTION_ENUM = {
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    },
    UP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: 1
    }
}
oSnake.init = function (ground) {
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, SNAKE_HEAD_COLOR);
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, SNAKE_BODY_COLOR);
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, SNAKE_BODY_COLOR);

    this.head = snakeHead;
    this.tail = snakeBody2;

    ground.remove(3, 1);
    ground.append(snakeHead);
    ground.remove(2, 1);
    ground.append(snakeBody1);
    ground.remove(1, 1);
    ground.append(snakeBody2);

    // 双向链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    this.direction = DIRECTION_ENUM.RIGHT;
}
// 策略处理
oSnake.strategies = {
    move: function (snake, ground, square, fromEat) {
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, SNAKE_BODY_COLOR)

        newBody.next = snake.head.next;
        newBody.last = null;
        newBody.next.last = newBody;
        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, SNAKE_HEAD_COLOR);
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(newHead.x, square.y);
        ground.append(newHead);

        oSnake.head = newHead;
        if (!fromEat) {

            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, FLOOR_COLOR);
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);

            snake.tail = snake.tail.last;
        }
    },
    eat: function (snake, ground, square) {
        this.move(snake, oGround, square, true);
        oGame.createFood(ground);
        oGame.changeScore();
    },
    die: function () {
        oGame.over();
        console.log('over');
    }
}


// 以蛇头为参考，根据自身方向，判断下一个碰到的方块
oSnake.move = function (ground) {
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if (typeof square.touch == 'function') {
        this.strategies[square.touch()](this, oGround, square);
    }

}




// oSnake.move(oGround);