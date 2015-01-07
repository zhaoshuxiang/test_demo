(function() {
    var cE = document.getElementById("main");
    var ct = cE.getContext('2d');

    function init() {
        draw();
    }

    function draw (argument) {
        // body...

        ct.beginPath();
        ct.lineWidth = 15;

        var x = cE.width / 2;
        var y = cE.height / 2;
        var radius = 75;
        var startAngle = 1.1 * Math.PI;
        var endAngle = 1.9 * Math.PI;
        var counterClockwise = false;

        ct.arc(x, y, radius, startAngle, endAngle, counterClockwise);

        // line color
        ct.strokeStyle = 'black';
        ct.stroke();
    }

    init();
})();