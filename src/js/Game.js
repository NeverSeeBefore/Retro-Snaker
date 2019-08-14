var oGame = new Game();
oGame.timer = null;
oGame.score = 0;
oGame.init = function () {
    this.timer = null;
    this.score = 0;
    this.changeScore(0);
    // 初始化地图
    oGround.init();
    // 初始化蛇
    oSnake.init(oGround);
    // 初始化食物
    oGame.createFood(oGround);
    // 绑定事件
    // next hit dealy
    document.onkeydown = function (e) {
        // 37 left, 38 up, 39 right, 40 down
        if(e.which == 37 && oSnake.direction != DIRECTION_ENUM.RIGHT){
            oSnake.direction = DIRECTION_ENUM.LEFT;
        }else if(e.which == 38 && oSnake.direction != DIRECTION_ENUM.DOWN){
            oSnake.direction = DIRECTION_ENUM.UP;
        }else if(e.which == 39 && oSnake.direction != DIRECTION_ENUM.LEFT){
            oSnake.direction = DIRECTION_ENUM.RIGHT;
        }else if(e.which == 40 && oSnake.direction != DIRECTION_ENUM.UP){
            oSnake.direction = DIRECTION_ENUM.DOWN;
        }
    }
    
    var oStart = document.getElementById('start');
    var oFaster = document.getElementById('faster');
    var oSlower = document.getElementById('slower');
    oStart.onclick = function () {
        oGame.start();
    }
    oFaster.onclick = function () {
        SPEED ++
        if(SPEED >= 9){
            SPEED = 9;
        }
        var showSpeed = document.getElementById('show-speed');
        showSpeed.innerHTML = SPEED - 2;
    }
    oSlower.onclick = function () {
        SPEED --
        if(SPEED <= 3){
            SPEED = 3;
        }
        var showSpeed = document.getElementById('show-speed');
        showSpeed.innerHTML = SPEED - 2;
    }
}

oGame.start = function () {
    this.timer = setInterval(() => {
        oSnake.move(oGround);
    }, 1000 - (100 * SPEED) );

}

oGame.over = function () {
    
    clearInterval(this.timer);
    alert('game over');
    this.init();
}

oGame.changeScore = function (val) {
    if(val == 0){
        this.score == 0;
    }else{
        this.score = this.score + SPEED - 2;
    }
    var showScore = document.getElementById('show-score');
    showScore.innerText = val || this.score;
}

oGame.createFood = function (ground) {
    var x = null;
    var y = null;
    var flag = true;
    while(flag) {
        x = 1 + Math.floor(Math.random() * (XLEN - 2));
        y = 1 + Math.floor(Math.random() * (YLEN - 2));
        var ok = true;
        for(var node = oSnake.head; node; node = node.next) {
            if(x == node.x && y == node.y){
                ok = false;
                break;
            }
        }
        if(ok){
            flag = false;
        }
    }
    var oFood = SquareFactory.create('Food', x, y, FOOD_COLOR);
    ground.remove(x, y);
    ground.append(oFood);
}



oGame.init();