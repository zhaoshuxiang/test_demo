(function() {
    // 设备像素比
    var dpr = window.devicePixelRatio;

    // 大圆半径（默认会有一个像素的描边）
    var BIG_RADIUS_CSS = 50 + 1;
    var BIG_RADIUS = BIG_RADIUS_CSS * dpr;

    // 小圆半径（默认会有一个像素的描边）
    var SMALL_RADIUS_CSS = 12 + 1;
    var SMALL_RADIUS = SMALL_RADIUS_CSS * dpr;

    // 辐条长度
    var SPOKE_LENGTH_CSS = 80;
    var SPOKE_LENGTH = SPOKE_LENGTH_CSS * dpr;

    // 画布半径
    var CANVAS_RADIUS_CSS = BIG_RADIUS_CSS + SPOKE_LENGTH_CSS + SMALL_RADIUS_CSS * 2;
    var CANVAS_RADIUS = CANVAS_RADIUS_CSS * dpr;

    // 画布的宽、高
    var CANVAS_WIDTH_CSS = CANVAS_RADIUS_CSS * 2;
    var CANVAS_WIDTH = CANVAS_RADIUS * 2;
    var CANVAS_HEIGHT_CSS = 600;
    var CANVAS_HEIGHT = CANVAS_HEIGHT_CSS * dpr;

    // 发射塔与轮盘之间的距离
    var DIST = 50;
    // 小球之间的间隔
    var INTERVAL = 30;

    // 初始小球的数量
    var NUMBER = 8;
    // 发射塔显示的小球数
    var BASE_NUMBER = 3;

    // 旋转的角度
    var angle = 12;


    // 游戏的状态
    var state = {
        // 当前关卡
        level: 1,
        // 游戏结果：1、主界面 2、进行中  3、成功  4、失败
        res: 2,
        // 旋转的速度
        speed: Math.PI / 45,
        // 旋转小球的圆心坐标
        coordinate: [{
            angle: Math.PI / 180,
            x: 0,
            y: 0,
            value: 1,
            f: true // 是否完成连接
        }],
        // 发射塔剩余的小球数
        number: 10,
        // 小球的状态： 1、还在发射塔中 2、飞行中 3、进入轨道 4、连线完成
        flag: 1,
        // 正在发射的小球的坐标
        flay: {
            x: CANVAS_RADIUS,
            y: CANVAS_RADIUS * 2 + DIST * dpr + SMALL_RADIUS
        },
        // 连线的坐标
        line: {
            x: CANVAS_RADIUS,
            y: CANVAS_RADIUS * 2 - SMALL_RADIUS
        },

        lineL: 0
    };

    var cE = document.getElementById("game");
    var ct = cE.getContext('2d');

    function init() {
        initEvent();
        initGameLevel(1);
        initCanvasEle();
        draw();
        // drawT();

        // 更精细的画线
        // ct.beginPath();
        // ct.moveTo(0, 1000.5);
        // ct.lineTo(200, 1000.5);
        // ct.stroke();

    }

    function initEvent() {
        document.addEventListener('touchstart', function(event) {
            sendBall();
        });
    }

    function initGameLevel(level) {
        var arr = [];

        state.level = level;
        state.speed = Math.PI / 180;
        state.number = 15;

        // 初始化小球的角度
        for (var i = 0; i < NUMBER; i++) {
            arr.push({
                angle: Math.PI * 2 * i / NUMBER,
                f: true
            });
        }

        state.coordinate = arr;
        // console.log(state);
    }

    function initCanvasEle() {
        cE.width = CANVAS_WIDTH;
        cE.height = CANVAS_HEIGHT;

        cE.style.width = CANVAS_RADIUS_CSS * 2 + 'px';
        cE.style.height = CANVAS_HEIGHT_CSS + 'px';
    }

    function draw() {
        if (state.res === 2) {
            // 绘制转盘
            drawCircle();

            // 绘制发射塔
            drawT();
        }

        ct.stroke();
        ct.fill();

        requestAnimationFrame(draw);
    }

    function drawCircle() {
        // 大圆和小圆圆心的距离
        var PP = BIG_RADIUS + SPOKE_LENGTH + SMALL_RADIUS;

        // 清空画布
        ct.clearRect(0, 0, CANVAS_WIDTH * 2, CANVAS_HEIGHT);

        // 绘制：大圆
        ct.beginPath();
        ct.arc(CANVAS_RADIUS, CANVAS_RADIUS, BIG_RADIUS - dpr, 0, Math.PI * 2);

        // 画数字
        // ct.font = "30px sans-serif";
        // ct.fillStyle = "#fff"
        // ct.fillText('5', CANVAS_RADIUS, CANVAS_RADIUS);

        // 绘制：小圆、辐条
        for (var i = 0; i < state.coordinate.length; i++) {
            state.coordinate[i].angle = state.coordinate[i].angle + state.speed;
            var sX = Math.cos(state.coordinate[i].angle) * PP + CANVAS_RADIUS;
            var sY = Math.sin(state.coordinate[i].angle) * PP + CANVAS_RADIUS;
            state.coordinate[i].x = sX;
            state.coordinate[i].y = sY;

            // ct.fillStyle = "#000";
            ct.lineWidth = 1;
            ct.moveTo(sX, sY);
            ct.arc(sX, sY, SMALL_RADIUS - dpr, 0, Math.PI * 2);

            if (state.coordinate[i].f) {
                ct.moveTo(CANVAS_RADIUS, CANVAS_RADIUS);
                ct.lineTo(sX, sY);
            }
        }

        // angle = angle + state.speed;
    }


    function drawT() {
        var endNumber = state.number >= BASE_NUMBER ? state.number - BASE_NUMBER : 0;
        var x, y;

        // 待发射的小球
        for (var i = state.number; i > endNumber; i--) {
            if (0 === state.number - i) {
                y = CANVAS_RADIUS * 2 + DIST * dpr + SMALL_RADIUS;
            } else {
                y = CANVAS_RADIUS * 2 + DIST * dpr + SMALL_RADIUS + (SMALL_RADIUS * 2 + INTERVAL) * (state.number - i);
            }

            ct.moveTo(CANVAS_RADIUS, y);

            // ct.font = "16px serif";
            // ct.fillStyle="red";
            // ct.fillText(i, CANVAS_RADIUS, y);

            ct.arc(CANVAS_RADIUS, y, SMALL_RADIUS, 0, Math.PI * 2);
        }

        // 已发射的小球
        if (2 === state.flag) {
            x = state.flay.x;
            y = state.flay.y;

            ct.moveTo(x, y);
            ct.arc(x, y, SMALL_RADIUS, 0, Math.PI * 2);
        }

        // 链接线
        if (3 === state.flag) {
            var tB = state.coordinate[state.coordinate.length - 1];
            x = Math.cos(tB.angle) * state.lineL + CANVAS_RADIUS;
            y = Math.sin(tB.angle) * state.lineL + CANVAS_RADIUS;

            state.lineL = state.lineL + 5;
            ct.moveTo(tB.x, tB.y);
            ct.lineTo(CANVAS_RADIUS, CANVAS_RADIUS);
            // 连线成功
            tB.f = true;
        }
    }

    function sendBall() {
        // 负责处理 state 不负责绘制
        if (state.number > 0) {
            state.flag = 2;
            state.number = state.number - 1;
            ballSpeed();
        }
    }

    // 更新飞动小球的位置
    function ballSpeed() {
        var bSpeed = 50;
        var p = CANVAS_RADIUS * 2 - SMALL_RADIUS;

        if (state.flay.y >= p - bSpeed && state.flay.y <= p + bSpeed) {
            state.flay.y = CANVAS_RADIUS * 2 - SMALL_RADIUS;
            state.flag = 3;
            state.coordinate.push({
                angle: Math.PI / 180 * 90,
                x: CANVAS_RADIUS,
                y: state.flay.y,
                value: state.number + 1,
                f: false
            });

            state.flay.y = CANVAS_RADIUS * 2 + DIST * dpr + SMALL_RADIUS;

            check();
        } else {
            state.flay.y = state.flay.y - bSpeed;
            requestAnimationFrame(ballSpeed);
        }
    }

    // 碰撞检测
    function check() {
        var t = state.coordinate;
        var len = t.length;
        var tB = t[len - 1];
        var xS, yS, dis;

        for (var i = 0; i < len - 1; i++) {
            xS = Math.abs(tB.x - t[i].x);
            yS = Math.abs(tB.y - t[i].y);
            dis = Math.sqrt(xS * xS + yS * yS);

            if (dis < SMALL_RADIUS * 2) {
                state.res = 3;
                showFailed();
            }
        }
    }

    function showFailed() {
        document.body.style.backgroundColor = "#ff004a";
    }

    function showSuccess() {
        document.body.style.backgroundColor = ""
    }


    var e = document.getElementById('conl');

    function p(s) {
        e.innerHTML = e.innerHTML + "<div>" + s + "</div>";
    }

    init();
})();