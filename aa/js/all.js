(function() {
    var BIG_RADIUS = 50;
    var LINE_LENGTH = 85;
    var SMALL_RADIUS = 12;

    // 初始小球的数量
    var NUMBER = 12;

    var cE = document.getElementById("main");
    var ct = cE.getContext('2d');


    function init() {
        draw();
        // test();

        document.getElementById('trigger').addEventListener('click', function (event) {
            ct.clearRect(0, 0, cE.width, cE.height);
        });
    }

    function draw(angle) {
        drawCircle(angle);
        drawSpoke(angle);
    }

    function drawCircle(angle) {
        var pX = BIG_RADIUS + LINE_LENGTH + SMALL_RADIUS * 2;
        var pY = pX;

        var PP = BIG_RADIUS + LINE_LENGTH + SMALL_RADIUS;

        // 画中心大圆
        ct.beginPath();
        ct.arc(pX, pY, BIG_RADIUS, 0, Math.PI * 2);
        ct.fill();

        // 画数字
        // ct.font = "30px sans-serif";
        // ct.fillStyle = "#fff"
        // ct.fillText('5', pX, pY);

        // 画周围的小圆
        for (var i = 0; i < NUMBER; i++) {
            var sX, sY;

            sX = pX + Math.cos(Math.PI * 2 * i / NUMBER) * PP;
            sY = pY + Math.sin(Math.PI * 2 * i / NUMBER) * PP;

            ct.fillStyle = "#000"
            ct.beginPath();
            ct.arc(sX, sY, SMALL_RADIUS, 0, Math.PI * 2);
            ct.fill();
            // ct.stroke();
        }
    }

    // 画辐条
    function drawSpoke(angle) {
        var pX = BIG_RADIUS + LINE_LENGTH + SMALL_RADIUS * 2;
        var pY = pX;
        var PP = BIG_RADIUS + LINE_LENGTH + SMALL_RADIUS;

        ct.beginPath();

        for (var i = 0; i < NUMBER; i++) {
            var sX, sY;

            sX = pX + Math.cos(Math.PI * 2 * i / NUMBER) * PP;
            sY = pY + Math.sin(Math.PI * 2 * i / NUMBER) * PP;

            ct.moveTo(pX, pY);
            ct.lineTo(sX, sY);
        }

        ct.stroke();
    }

    function test() {
        // ct.fillRect(200, 300, 50, 50);
        ct.lineWidth = 1;
        ct.strokeRect(200, 300, 50, 50);
    }

    init();
})();