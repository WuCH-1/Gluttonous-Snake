window.onload = function() {
    start()
    document.onkeydown = attachEvents;
    gogo()
}

var len = 3; //初始状态蛇的长度
var count = 30;
var globalArr = multiArray(count); //棋盘
var carrier = multiArray(count); //载体占位
var snake = [];
var snakeGo; //定时器
var speed = 10; //速度
var direction = 39; //初始化方向
var flag = true;

//snake
function initSnake() {
    var pointer = randomPointer(len - 1, len - 1, count / 2)
    for (var i = 0; i < len; i++) {
        var x = pointer[0] - i,
            y = pointer[1];
        snake.push([x, y]);
        carrier[x][y] = "snake";
        globalArr[x][y].className = "snake";
    }
}
//随机范围
function randomPointer(startX, startY, end) {
    startX = startX || 0;
    startY = startY || 0;
    end = end || count;
    var x = Math.floor(Math.random() * (end - startX)) + startX;
    var y = Math.floor(Math.random() * (end - startY)) + startY;
    if (carrier[x][y]) { return randomPointer(startX, startY, end) }
    return [x, y];
}
//创建多维数组
function multiArray(count) {
    var arr = new Array(count);
    for (var i = 0; i < count; i++) {
        arr[i] = new Array(count);
    }
    return arr;
}
//游戏地图
function initMap(box, count) {
    var box = document.querySelector(box);
    for (var j = 0; j < count; j++) {
        var col = document.createElement("tr");
        for (var i = 0; i < count; i++) {
            var row = document.createElement("td");
            var val = col.appendChild(row);
            globalArr[i][j] = val;
        }
        box.appendChild(col);
    }
}
//显示食物
function careateFood() {
    var p = randomPointer();
    carrier[p[0]][p[1]] = "food";
    globalArr[p[0]][p[1]].className = "food";
}
// 游戏开始
function start() {
    initMap('.gameMap', count);
    initSnake();
    careateFood();
}
// 按键事件
function attachEvents(e) {
    e = e || event;
    if (flag) {
        flag = false;
        direction = Math.abs(e.keyCode - direction) != 2 && e.keyCode > 36 && e.keyCode < 41 ? e.keyCode : direction;
    }
}
// 移动定时器
function gogo() {
    if (snakeGo) { window.clearInterval(snakeGo); }
    snakeGo = window.setInterval(step, Math.floor(3000 / speed));
}

//移动判断
function step() {
    //获取目标点
    var headX = snake[0][0],
        headY = snake[0][1];
    switch (direction) {
        case 37:
            headX -= 1;
            break;
        case 38:
            headY -= 1;
            break;
        case 39:
            headX += 1;
            break
        case 40:
            headY += 1;
            break;
    }
    if (headX >= count || headX < 0 || headY >= count || headY < 0 || carrier[headX][headY] == "snake") {
        window.clearInterval(snakeGo);
        alert("撞墙死亡");
        return;
    }
    if (carrier[headX][headY] != "food") {
        var lastX = snake[len - 1][0],
            lastY = snake[len - 1][1];
        carrier[lastX][lastY] = false;
        globalArr[lastX][lastY].className = '';
        snake.pop();
    } else {
        careateFood();
    }
    snake.unshift([headX, headY]);
    carrier[headX][headY] = 'snake';
    globalArr[headX][headY].className = 'snake';
    len = snake.length;
    flag = true;
}